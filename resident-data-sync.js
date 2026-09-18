/* Centralized resident registry synchronization
   Residents are the single source of truth for all community pages.
   One CSV/JSON import updates Residents, sector pages, 4Ps, and Households.
*/
(function(){
  'use strict';
  const SYNC_FLAG='bmis-resident-sync-v1';

  function normalize(value){
    return String(value ?? '').trim();
  }
  function normalizeSector(value){
    const v=normalize(value).toLowerCase();
    if(v.includes('pwd')||v.includes('person with disability')) return 'PWD';
    if(v.includes('solo')) return 'Solo Parent';
    if(v.includes('senior')) return 'Senior Citizen';
    return 'None';
  }
  function normalizeFourPs(value){
    return /^(eligible|yes|true|1)$/i.test(normalize(value))?'Eligible':'Not Eligible';
  }
  function normalizeStatus(record){
    const age=Number(record.age)||0;
    return age>=60||/senior/i.test(normalize(record.status))||/senior/i.test(normalize(record.sector))?'Senior':'Non-Senior';
  }
  function normalizeResident(record,index){
    const r=Object.assign({},record);
    r.id=r.id||Date.now()+index;
    r.name=normalize(r.name||r.fullName||r.full_name);
    r.age=Number(r.age)||0;
    r.sex=normalize(r.sex||r.gender);
    r.civil=normalize(r.civil||r.civilStatus||r.civil_status);
    r.household=normalize(r.household||r.householdCode||r.household_code||'Unassigned');
    r.contact=normalize(r.contact||r.phone||r.mobile);
    r.sector=normalizeSector(r.sector);
    r.fourPs=normalizeFourPs(r.fourPs||r.fourps||r['4Ps']||r['4ps']);
    r.status=normalizeStatus(r);
    return r;
  }
  function rebuildHouseholds(){
    if(typeof db==='undefined'||!db) return;
    const groups={};
    (db.residents||[]).forEach(r=>{
      const code=normalize(r.household)||'Unassigned';
      if(!groups[code]) groups[code]=[];
      groups[code].push(r);
    });
    const previous=Object.fromEntries((db.households||[]).map(h=>[h.code,h]));
    db.households=Object.entries(groups).map(([code,members],index)=>{
      const old=previous[code]||{};
      return {id:old.id||index+1,code,head:old.head||members[0]?.name||'',address:old.address||'',members:members.length,status:old.status||'Active'};
    });
  }
  function synchronize(){
    if(typeof db==='undefined'||!db) return;
    db.residents=(db.residents||[]).map(normalizeResident);
    rebuildHouseholds();
    if(typeof save==='function') save();
    window.dispatchEvent(new CustomEvent('bmis:data-synchronized'));
  }
  function parseCsv(text){
    const lines=text.replace(/^\uFEFF/,'').split(/\r?\n/).filter(line=>line.trim());
    if(!lines.length) return [];
    const parseLine=line=>{const result=[];let current='',quoted=false;for(let i=0;i<line.length;i++){const c=line[i];if(c==='"'){if(quoted&&line[i+1]==='"'){current+='"';i++;}else quoted=!quoted;}else if(c===','&&!quoted){result.push(current.trim());current='';}else current+=c;}result.push(current.trim());return result;};
    const headers=parseLine(lines.shift()).map(h=>h.replace(/^"|"$/g,''));
    return lines.map(line=>{const values=parseLine(line);return Object.fromEntries(headers.map((h,i)=>[h,values[i]??'']));});
  }
  function importData(text){
    let parsed;
    try{parsed=JSON.parse(text);}catch(error){parsed=parseCsv(text);}
    const records=Array.isArray(parsed)?parsed:(parsed.residents||parsed.data||[]);
    if(!Array.isArray(records)||!records.length) throw new Error('No resident records found.');
    if(typeof db==='undefined'||!db) throw new Error('Database is not ready.');
    db.residents=records.map(normalizeResident);
    rebuildHouseholds();
    if(typeof save==='function') save();
    window.dispatchEvent(new CustomEvent('bmis:data-synchronized'));
    if(typeof toast==='function') toast(`${db.residents.length} resident records synchronized across all pages.`);
    if(typeof go==='function') go('residents');
  }
  function handleFileInput(input){
    if(input.dataset.residentSyncBound) return;
    input.dataset.residentSyncBound='1';
    input.addEventListener('change',function(){
      const file=input.files&&input.files[0];
      if(!file) return;
      const reader=new FileReader();
      reader.onload=()=>{try{importData(String(reader.result||''));}catch(error){if(typeof toast==='function')toast(error.message||'Import failed.');else alert(error.message||'Import failed.');}};
      reader.readAsText(file);
      input.value='';
    });
  }
  function scanFileInputs(){
    document.querySelectorAll('input[type="file"]').forEach(handleFileInput);
  }
  function boot(){
    synchronize();
    scanFileInputs();
    new MutationObserver(scanFileInputs).observe(document.body,{childList:true,subtree:true});
    window.addEventListener('bmis:page-rendered',scanFileInputs);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
  window.bmisResidentSync={synchronize,importData,rebuildHouseholds,normalizeResident};
})();