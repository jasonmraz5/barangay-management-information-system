/* Dedicated reports and programs pages */
(function(){
  if(typeof db==='undefined')return;

  function escHtml(v){return typeof esc==='function'?esc(v):String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
  function pill(v){return typeof badge==='function'?badge(v):'<span class="badge">'+escHtml(v)+'</span>'}
  function card(label,value,note=''){
    return `<div class="stat report-stat"><div class="label">${escHtml(label)}</div><strong>${value}</strong><span>${escHtml(note)}</span></div>`;
  }
  function section(title,subtitle,body,action=''){
    return `<div class="panel report-section"><div class="panel-head"><div><h3>${title}</h3><div class="muted">${subtitle}</div></div>${action}</div>${body}</div>`;
  }
  function printButton(){return '<button class="btn" onclick="window.print()">Print Report</button>'}

  function emptyPrograms(){
    if(Array.isArray(db.programs))return;
    db.programs=[
      {id:5001,name:'Senior Citizens Wellness Program',category:'Social Welfare',targetGroup:'Senior Citizens',budget:50000,startDate:'2026-01-15',endDate:'2026-12-15',status:'Active',description:'Health, wellness, and social support activities for senior citizens.'},
      {id:5002,name:'PWD Support and Accessibility Program',category:'Social Welfare',targetGroup:'PWD',budget:65000,startDate:'2026-02-01',endDate:'2026-11-30',status:'Active',description:'Assistance, accessibility support, and community inclusion activities for PWD residents.'},
      {id:5003,name:'Solo Parent Assistance Program',category:'Family Support',targetGroup:'Solo Parents',budget:45000,startDate:'2026-03-01',endDate:'2026-10-31',status:'Active',description:'Skills, support, and referral services for registered solo parents.'},
      {id:5004,name:'4Ps Community Development Program',category:'Community Development',targetGroup:'4Ps Eligible',budget:80000,startDate:'2026-01-20',endDate:'2026-12-20',status:'Active',description:'Community-based support and development activities for eligible 4Ps households.'},
      {id:5005,name:'Barangay Clean and Green Project',category:'Environment',targetGroup:'All Residents',budget:30000,startDate:'2026-04-01',endDate:'2026-09-30',status:'Completed',description:'Community clean-up, waste reduction, and greening activities.'}
    ];
    save();
  }
  emptyPrograms();

  function residentReport(){
    const residents=db.residents||[];
    const male=residents.filter(x=>/male/i.test(x.sex)).length;
    const female=residents.filter(x=>/female/i.test(x.sex)).length;
    const senior=residents.filter(x=>Number(x.age)>=60||x.status==='Senior'||/senior/i.test(x.sector||'')).length;
    const nonSenior=residents.length-senior;
    const pwd=residents.filter(x=>/pwd|person with disability/i.test(x.sector||'')).length;
    const solo=residents.filter(x=>/solo parent/i.test(x.sector||'')).length;
    const fourps=residents.filter(x=>String(x.fourPs||'').toLowerCase()==='eligible').length;
    const civil={};
    residents.forEach(x=>civil[x.civil||'Unspecified']=(civil[x.civil||'Unspecified']||0)+1);
    const civilRows=Object.entries(civil).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<tr><td>${escHtml(k)}</td><td><b>${v}</b></td><td>${residents.length?Math.round(v/residents.length*100):0}%</td></tr>`).join('');
    return `<div class="welcome"><div><h1>Resident Reports</h1><div class="muted">Demographic and resident registry summaries.</div></div>${printButton()}</div>
<div class="report-card-grid">${card('Total Residents',residents.length,'Registered residents')}${card('Senior Citizens',senior,'Age 60+ / Senior')}${card('Non-Senior',nonSenior,'Residents below senior classification')}${card('PWD',pwd,'Registered PWD')}${card('Solo Parents',solo,'Registered solo parents')}${card('4Ps Eligible',fourps,'Eligible residents')}</div>
<div class="report-grid-two">${section('Sex Distribution','Current resident registry',`<div class="report-metric-list"><div><span>Male</span><b>${male}</b></div><div><span>Female</span><b>${female}</b></div></div>`)}${section('Civil Status','Current resident registry',table(['Civil Status','Residents','Share'],civilRows))}</div>
${section('Resident Registry Snapshot','Records included in the current resident database',table(['Name','Age','Sex','Household','Sector','4Ps','Status'],residents.map(x=>`<tr><td><b>${escHtml(x.name)}</b></td><td>${x.age}</td><td>${escHtml(x.sex)}</td><td>${escHtml(x.household)}</td><td>${escHtml(x.sector||'None')}</td><td>${pill(x.fourPs||'Not Eligible')}</td><td>${pill(x.status)}</td></tr>`).join('')))}
`;
  }

  function communityReport(){
    const residents=db.residents||[], households=db.households||[], sectors=typeof sectorCounts==='function'?sectorCounts():{seniors:0,pwd:0,solo:0,fourPs:0};
    const purok={};
    households.forEach(h=>{const p=(String(h.address||'').match(/Purok\s+[^,]+/i)||['Unspecified'])[0];purok[p]=(purok[p]||0)+1});
    const status={};
    households.forEach(h=>status[h.status||'Unspecified']=(status[h.status||'Unspecified']||0)+1);
    const purokRows=Object.entries(purok).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<tr><td>${escHtml(k)}</td><td><b>${v}</b></td></tr>`).join('');
    const hsRows=Object.entries(status).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<tr><td>${pill(k)}</td><td><b>${v}</b></td></tr>`).join('');
    return `<div class="welcome"><div><h1>Community Reports</h1><div class="muted">Household, community, and sector summaries.</div></div>${printButton()}</div>
<div class="report-card-grid">${card('Residents',residents.length,'Community population registry')}${card('Households',households.length,'Registered households')}${card('Senior Citizens',sectors.seniors,'Sector count')}${card('PWD',sectors.pwd,'Sector count')}${card('Solo Parents',sectors.solo,'Sector count')}${card('4Ps Eligible',sectors.fourPs,'Eligible records')}</div>
<div class="report-grid-two">${section('Household Status','Current household registry',table(['Status','Households'],hsRows))}${section('Households by Purok','Derived from household addresses',table(['Purok / Area','Households'],purokRows))}</div>
${section('Community Sector Summary','Residents grouped by registered sector',table(['Sector','Residents','Description'],
[
['Senior Citizens',sectors.seniors,'Senior classification'],['PWD',sectors.pwd,'Persons with Disabilities'],['Solo Parents',sectors.solo,'Registered solo parents'],['4Ps Eligible',sectors.fourPs,'Eligible 4Ps residents']
].map(x=>`<tr><td><b>${x[0]}</b></td><td>${x[1]}</td><td>${x[2]}</td></tr>`).join('')))}
`;
  }

  function transactionReport(){
    const docs=db.documents||[], payments=db.payments||[], services=db.services||[], ann=db.announcements||[];
    const docStatus={}, paymentStatus={}, serviceStatus={}, methods={};
    docs.forEach(x=>docStatus[x.status||'Unspecified']=(docStatus[x.status||'Unspecified']||0)+1);
    payments.forEach(x=>{paymentStatus[x.status||'Unspecified']=(paymentStatus[x.status||'Unspecified']||0)+1;methods[x.method||'Unspecified']=(methods[x.method||'Unspecified']||0)+1});
    services.forEach(x=>serviceStatus[x.status||'Unspecified']=(serviceStatus[x.status||'Unspecified']||0)+1);
    const paid=payments.filter(x=>x.status==='Paid').reduce((n,x)=>n+Number(x.amount||0),0);
    const pending=payments.filter(x=>x.status==='Pending').reduce((n,x)=>n+Number(x.amount||0),0);
    const rows=obj=>Object.entries(obj).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<tr><td>${pill(k)}</td><td><b>${v}</b></td></tr>`).join('');
    return `<div class="welcome"><div><h1>Transaction Reports</h1><div class="muted">Documents, payments, services, and administrative transactions.</div></div>${printButton()}</div>
<div class="report-card-grid">${card('Documents',docs.length,'Document requests')}${card('Payments',payments.length,'Payment records')}${card('Collected','PHP '+paid.toLocaleString(),'Paid transactions')}${card('Pending','PHP '+pending.toLocaleString(),'Pending payment amount')}${card('Services',services.length,'Configured services')}${card('Announcements',ann.length,'Recorded announcements')}</div>
<div class="report-grid-two">${section('Document Status','Document workflow breakdown',table(['Status','Records'],rows(docStatus)))}${section('Payment Status','Payment workflow breakdown',table(['Status','Records'],rows(paymentStatus)))}</div>
<div class="report-grid-two">${section('Payment Methods','Payment methods used',table(['Method','Records'],rows(methods)))}${section('Service Status','Configured service availability',table(['Status','Services'],rows(serviceStatus)))}</div>
${section('Recent Documents','Latest document requests',table(['Document','Applicant','Date','Status'],docs.slice(0,10).map(x=>`<tr><td>${escHtml(x.type)}</td><td>${escHtml(x.applicant)}</td><td>${escHtml(x.date)}</td><td>${pill(x.status)}</td></tr>`).join('')))}
`;
  }

  function financialReport(){
    const payments=db.payments||[], services=db.services||[];
    const paidRows=payments.filter(x=>x.status==='Paid');
    const totalPaid=paidRows.reduce((n,x)=>n+Number(x.amount||0),0);
    const pending=payments.filter(x=>x.status==='Pending').reduce((n,x)=>n+Number(x.amount||0),0);
    const waived=payments.filter(x=>x.status==='Waived').reduce((n,x)=>n+Number(x.amount||0),0);
    const cancelled=payments.filter(x=>x.status==='Cancelled').reduce((n,x)=>n+Number(x.amount||0),0);
    const byPurpose={};
    const byMethod={};
    payments.forEach(x=>{byPurpose[x.purpose||'Unspecified']=(byPurpose[x.purpose||'Unspecified']||0)+Number(x.amount||0);byMethod[x.method||'Unspecified']=(byMethod[x.method||'Unspecified']||0)+Number(x.amount||0)});
    const purposeRows=Object.entries(byPurpose).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<tr><td>${escHtml(k)}</td><td>PHP ${v.toLocaleString()}</td></tr>`).join('');
    const methodRows=Object.entries(byMethod).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<tr><td>${escHtml(k)}</td><td>PHP ${v.toLocaleString()}</td></tr>`).join('');
    const serviceFees=services.map(s=>`<tr><td>${escHtml(s.name)}</td><td>${escHtml(s.category)}</td><td>${escHtml(s.fee)}</td><td>${pill(s.status)}</td></tr>`).join('');
    return `<div class="welcome"><div><h1>Financial Reports</h1><div class="muted">Collection, payment, and service-fee summaries.</div></div>${printButton()}</div>
<div class="report-card-grid">${card('Total Collected','PHP '+totalPaid.toLocaleString(),'Paid amount')}${card('Pending','PHP '+pending.toLocaleString(),'Pending amount')}${card('Waived','PHP '+waived.toLocaleString(),'Waived amount')}${card('Cancelled','PHP '+cancelled.toLocaleString(),'Cancelled amount')}${card('Paid Records',paidRows.length,'Completed payments')}${card('Payment Records',payments.length,'All payment records')}</div>
<div class="report-grid-two">${section('Collections by Purpose','Amount recorded across payment purposes',table(['Purpose','Amount'],purposeRows))}${section('Collections by Method','Amount recorded by payment method',table(['Method','Amount'],methodRows))}</div>
${section('Service Fee Schedule','Configured fees from the services directory',table(['Service','Category','Fee','Status'],serviceFees))}
`;
  }

  function reportPage(kind){
    return ({resident:residentReport,community:communityReport,transaction:transactionReport,financial:financialReport}[kind]||residentReport)();
  }

  window.openProgramModal=function(id=null){
    const item=id?(db.programs||[]).find(x=>x.id===id):{};
    const value=k=>escHtml(item[k]??(k==='status'?'Planned':k==='startDate'||k==='endDate'?new Date().toISOString().slice(0,10):''));
    $('#modalTitle').textContent=(id?'Edit ':'Add ')+'Program';
    $('#modalBody').innerHTML=`<form onsubmit="saveProgram(event,${id||0})"><div class="form-grid">
<label>Program Name<input name="name" value="${value('name')}" required></label>
<label>Category<input name="category" value="${value('category')}" required></label>
<label>Target Group<select name="targetGroup">${['All Residents','Senior Citizens','PWD','Solo Parents','4Ps Eligible','Youth','Women','Other'].map(o=>`<option ${o===item.targetGroup?'selected':''}>${o}</option>`).join('')}</select></label>
<label>Budget<input name="budget" type="number" min="0" step="0.01" value="${value('budget')}"></label>
<label>Start Date<input name="startDate" type="date" value="${value('startDate')}"></label>
<label>End Date<input name="endDate" type="date" value="${value('endDate')}"></label>
<label>Status<select name="status">${['Planned','Active','Completed','Suspended'].map(o=>`<option ${o===item.status?'selected':''}>${o}</option>`).join('')}</select></label>
<label class="wide">Description<textarea name="description" rows="4">${value('description')}</textarea></label>
</div><div class="form-actions"><button type="button" class="btn" onclick="closeModal()">Cancel</button><button class="btn primary">Save Program</button></div></form>`;
    $('#modal').classList.remove('hidden');
  };

  window.saveProgram=function(e,id){
    e.preventDefault();
    const data=Object.fromEntries(new FormData(e.target).entries());
    data.budget=Number(data.budget)||0;
    if(id){
      const i=db.programs.findIndex(x=>x.id===id);
      if(i>=0)db.programs[i]={...db.programs[i],...data};
    }else{
      data.id=Date.now();
      db.programs.unshift(data);
    }
    save();
    closeModal();
    if(typeof go==='function')go('programs');
    toast(id?'Program updated successfully':'Program added successfully');
  };

  window.editProgram=function(id){openProgramModal(id)};
  window.deleteProgram=function(id){
    if(!confirm('Delete this program?'))return;
    db.programs.splice(db.programs.findIndex(x=>x.id===id),1);
    save();
    if(typeof go==='function')go('programs');
    toast('Program deleted successfully');
  };

  function programsPage(){
    const rows=db.programs||[];
    const totalBudget=rows.reduce((n,x)=>n+Number(x.budget||0),0);
    const active=rows.filter(x=>x.status==='Active').length;
    return `<div class="welcome"><div><h1>Programs</h1><div class="muted">Barangay programs, projects, and community initiatives.</div></div><button class="btn primary" onclick="openProgramModal()">+ Add Program</button></div>
<div class="report-card-grid program-stats">${card('Programs',rows.length,'Total programs')}${card('Active',active,'Currently active')}${card('Total Budget','PHP '+totalBudget.toLocaleString(),'Combined program budget')}${card('Target Groups',new Set(rows.map(x=>x.targetGroup).filter(Boolean)).size,'Distinct beneficiary groups')}</div>
${section('Program Registry','Manage ongoing and planned barangay programs',table(['Program','Category','Target Group','Budget','Start','End','Status','Actions'],rows.map(x=>`<tr><td><b>${escHtml(x.name)}</b><br><small>${escHtml(x.description||'')}</small></td><td>${escHtml(x.category)}</td><td>${escHtml(x.targetGroup)}</td><td>PHP ${Number(x.budget||0).toLocaleString()}</td><td>${escHtml(x.startDate)}</td><td>${escHtml(x.endDate)}</td><td>${pill(x.status)}</td><td><div class="actions"><button class="mini" onclick="editProgram(${x.id})">Edit</button><button class="mini" onclick="deleteProgram(${x.id})">Delete</button></div></td></tr>`).join(''))}`)
`;
  }

  const originalGo=window.go;
  window.go=function(p){
    if(['residentReports','communityReports','transactionReports','financialReports'].includes(p)){
      document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===p));
      const titles={residentReports:'Resident Reports',communityReports:'Community Reports',transactionReports:'Transaction Reports',financialReports:'Financial Reports'};
      document.getElementById('title').textContent=titles[p];
      document.getElementById('kicker').textContent='REPORTS';
      document.getElementById('content').innerHTML=reportPage(p.replace('Reports','').toLowerCase()==='resident'?'resident':p.replace('Reports','').toLowerCase());
      document.getElementById('sidebar').classList.remove('open');
      return;
    }
    if(p==='programs'){
      document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===p));
      document.getElementById('title').textContent='Programs';
      document.getElementById('kicker').textContent='PROGRAM MANAGEMENT';
      document.getElementById('content').innerHTML=programsPage();
      document.getElementById('sidebar').classList.remove('open');
      return;
    }
    originalGo(p);
  };
})();