/* Normalize resident sector data and keep sector pages consistent. */
(function(){
  const SENIOR='Senior';
  const NON_SENIOR='Non-Senior';
  const SECTOR_NONE='None';
  const SECTOR_SENIOR='Senior Citizen';
  const SECTOR_PWD='PWD';
  const SECTOR_SOLO='Solo Parent';

  function canonicalSector(value){
    const s=String(value||'').trim().toLowerCase();
    if(/senior/.test(s))return SECTOR_SENIOR;
    if(/^pwd$|person with disability/.test(s))return SECTOR_PWD;
    if(/solo parent/.test(s))return SECTOR_SOLO;
    return SECTOR_NONE;
  }

  function canonicalFourPs(value){
    const s=String(value||'').trim().toLowerCase();
    return s==='eligible' ? 'Eligible' : 'Not Eligible';
  }

  function normalizeResidents(){
    if(typeof db==='undefined' || !Array.isArray(db.residents))return false;
    let changed=false;
    db.residents.forEach(r=>{
      const age=Number(r.age)||0;
      const sector=canonicalSector(r.sector);
      const fourPs=canonicalFourPs(r.fourPs);
      const status=(age>=60 || sector===SECTOR_SENIOR || /senior/i.test(String(r.status||''))) ? SENIOR : NON_SENIOR;
      if(r.sector!==sector){r.sector=sector;changed=true}
      if(r.fourPs!==fourPs){r.fourPs=fourPs;changed=true}
      if(r.status!==status){r.status=status;changed=true}
    });
    if(changed&&typeof save==='function')save();
    return changed;
  }

  const hasSector=(r,sector)=>canonicalSector(r.sector)===sector;
  const isSenior=r=>{
    const age=Number(r.age)||0;
    return age>=60 || r.status===SENIOR || hasSector(r,SECTOR_SENIOR);
  };
  const isPwd=r=>hasSector(r,SECTOR_PWD);
  const isSolo=r=>hasSector(r,SECTOR_SOLO);
  const isFourPsEligible=r=>canonicalFourPs(r.fourPs)==='Eligible';

  normalizeResidents();

  window.normalizeResidentData=normalizeResidents;

  window.sectorCounts=function(){
    const residents=db.residents||[];
    return {
      seniors:residents.filter(isSenior).length,
      pwd:residents.filter(isPwd).length,
      solo:residents.filter(isSolo).length,
      fourPs:residents.filter(isFourPsEligible).length
    };
  };

  window.sectorPage=function(kind){
    const labels={
      senior:'Senior Citizens',
      pwd:'Persons with Disabilities (PWD)',
      solo:'Solo Parents',
      fourps:'4Ps Eligible Residents'
    };
    const tests={senior:isSenior,pwd:isPwd,solo:isSolo,fourps:isFourPsEligible};
    const rows=(db.residents||[]).filter(tests[kind]||(()=>false));
    const label=labels[kind]||kind;
    return `<div class="welcome"><div><h1>${label}</h1><div class="muted">Special sector registry and monitoring.</div></div><button class="btn primary" onclick="openModal('resident')">+ Add Resident</button></div>
<div class="cards sector-cards"><div class="stat"><div class="label">Registered</div><strong>${rows.length}</strong><span>${label}</span></div><div class="stat"><div class="label">Households</div><strong>${new Set(rows.map(x=>x.household).filter(Boolean)).size}</strong><span>Households represented</span></div></div>
<div class="panel"><div class="panel-head"><h3>${label} Registry</h3></div>${table(['Name','Age','Sex','Household','Contact','Sector','4Ps','Status','Actions'],rows.map(x=>`<tr><td><b>${esc(x.name)}</b></td><td>${x.age}</td><td>${esc(x.sex)}</td><td>${esc(x.household)}</td><td>${esc(x.contact)}</td><td>${esc(x.sector||SECTOR_NONE)}</td><td>${badge(x.fourPs||'Not Eligible')}</td><td>${badge(x.status)}</td><td>${actions('residents',x.id)}</td></tr>`).join(''))}</div>`;
  };

  /* Keep newly saved/imported residents consistent with the same rules. */
  const originalSaveRecord=window.saveRecord;
  if(typeof originalSaveRecord==='function'){
    window.saveRecord=function(e,type,id){
      const result=originalSaveRecord.apply(this,arguments);
      if(type==='resident'){
        normalizeResidents();
        if(typeof go==='function')go(page);
      }
      return result;
    };
  }

  const originalImportResidents=window.importResidents;
  if(typeof originalImportResidents==='function'){
    window.importResidents=function(){
      const result=originalImportResidents.apply(this,arguments);
      normalizeResidents();
      if(typeof go==='function' && page==='residents')go('residents');
      return result;
    };
  }
})();