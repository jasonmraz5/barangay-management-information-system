const KEY='bmis-data-v1';
const seed={residents:[{id:1,name:'Juan Dela Cruz',age:42,sex:'Male',civil:'Married',household:'HH-001',contact:'09171234567',status:'Active',sector:'None',fourPs:'Not Eligible'},{id:2,name:'Maria Santos',age:35,sex:'Female',civil:'Married',household:'HH-001',contact:'09181234567',status:'Active',sector:'Solo Parent',fourPs:'Eligible'},{id:3,name:'Pedro Reyes',age:68,sex:'Male',civil:'Widowed',household:'HH-002',contact:'09191234567',status:'Senior',sector:'Senior Citizen',fourPs:'Not Eligible'}],households:[{id:1,code:'HH-001',head:'Juan Dela Cruz',address:'Purok 1, Barangay Center',members:2,status:'Active'},{id:2,code:'HH-002',head:'Pedro Reyes',address:'Purok 3, Riverside',members:1,status:'Active'}],documents:[{id:1,type:'Barangay Clearance',applicant:'Juan Dela Cruz',date:'2026-09-15',status:'Issued'},{id:2,type:'Certificate of Residency',applicant:'Maria Santos',date:'2026-09-16',status:'Pending'}],officials:[{id:1,name:'Hon. Roberto Garcia',position:'Punong Barangay',term:'2023-2026',contact:'09170000001',status:'Active'},{id:2,name:'Ana Flores',position:'Barangay Secretary',term:'2023-2026',contact:'09170000002',status:'Active'}],payments:[{id:1,payer:'Juan Dela Cruz',purpose:'Barangay Clearance',amount:50,method:'Cash',reference:'PAY-0001',date:'2026-09-15',status:'Paid'},{id:2,payer:'Maria Santos',purpose:'Certificate of Residency',amount:30,method:'GCash',reference:'PAY-0002',date:'2026-09-16',status:'Paid'},{id:3,payer:'Pedro Reyes',purpose:'Certificate of Indigency',amount:0,method:'Free',reference:'PAY-0003',date:'2026-09-17',status:'Waived'}],announcements:[{id:1,title:'Community Clean-up Drive',date:'2026-09-20',status:'Published',details:'All residents are encouraged to participate.'},{id:2,title:'Barangay Assembly',date:'2026-09-28',status:'Published',details:'Quarterly barangay assembly at the covered court.'}],services:[{id:1,name:'Barangay Clearance',category:'Certificates',fee:'₱50',status:'Active'},{id:2,name:'Certificate of Residency',category:'Certificates',fee:'₱30',status:'Active'},{id:3,name:'Certificate of Indigency',category:'Certificates',fee:'Free',status:'Active'},{id:4,name:'Business Clearance',category:'Permits',fee:'₱100',status:'Active'}],activity:[{id:1,action:'System initialized',user:'admin',date:new Date().toLocaleString()}]};
const demoSectorSamples={
senior:[
['Rosa Mendoza',71,'Female','Widowed','HH-003','09170001001','Senior','Senior Citizen','Not Eligible'],
['Jose Navarro',66,'Male','Married','HH-004','09170001002','Senior','Senior Citizen','Not Eligible'],
['Elena Ramos',74,'Female','Widowed','HH-005','09170001003','Senior','Senior Citizen','Not Eligible'],
['Carlos Bautista',63,'Male','Married','HH-006','09170001004','Senior','Senior Citizen','Not Eligible'],
['Lourdes Aquino',69,'Female','Widowed','HH-007','09170001005','Senior','Senior Citizen','Eligible'],
['Manuel Cruz',77,'Male','Widowed','HH-008','09170001006','Senior','Senior Citizen','Not Eligible'],
['Teresa Villanueva',62,'Female','Married','HH-009','09170001007','Senior','Senior Citizen','Not Eligible'],
['Ramon Flores',81,'Male','Widowed','HH-010','09170001008','Senior','Senior Citizen','Not Eligible'],
['Carmen Garcia',68,'Female','Married','HH-011','09170001009','Senior','Senior Citizen','Not Eligible'],
['Antonio Reyes',73,'Male','Widowed','HH-012','09170001010','Senior','Senior Citizen','Eligible']
],
pwd:[
['Danilo Perez',38,'Male','Married','HH-013','09170002001','Active','PWD','Eligible'],
['Grace Lim',29,'Female','Single','HH-014','09170002002','Active','PWD','Eligible'],
['Edwin Torres',45,'Male','Married','HH-015','09170002003','Active','PWD','Eligible'],
['Mila Dizon',52,'Female','Widowed','HH-016','09170002004','Active','PWD','Eligible'],
['Rogelio Santos',34,'Male','Single','HH-017','09170002005','Active','PWD','Not Eligible'],
['Nena Castillo',41,'Female','Married','HH-018','09170002006','Active','PWD','Eligible'],
['Victor Salazar',56,'Male','Married','HH-019','09170002007','Active','PWD','Not Eligible'],
['Irene Mercado',47,'Female','Single','HH-020','09170002008','Active','PWD','Eligible'],
['Mario Valdez',31,'Male','Single','HH-021','09170002009','Active','PWD','Eligible'],
['Liza Fernandez',39,'Female','Married','HH-022','09170002010','Active','PWD','Eligible']
],
fourps:[
['Alma Reyes',48,'Female','Married','HH-033','09170004001','Active','None','Eligible'],
['Bernardo Cruz',54,'Male','Married','HH-034','09170004002','Active','None','Eligible'],
['Clara Mendoza',39,'Female','Single','HH-035','09170004003','Active','None','Eligible'],
['Domingo Garcia',57,'Male','Married','HH-036','09170004004','Active','None','Eligible'],
['Estela Santos',45,'Female','Widowed','HH-037','09170004005','Active','None','Eligible'],
['Felipe Navarro',52,'Male','Married','HH-038','09170004006','Active','None','Eligible'],
['Gloria Ramos',43,'Female','Separated','HH-039','09170004007','Active','None','Eligible'],
['Hector Flores',49,'Male','Married','HH-040','09170004008','Active','None','Eligible'],
['Isabel Aquino',36,'Female','Single','HH-041','09170004009','Active','None','Eligible'],
['Julio Bautista',58,'Male','Married','HH-042','09170004010','Active','None','Eligible']
],
solo:[
['Angela Rivera',33,'Female','Single','HH-023','09170003001','Active','Solo Parent','Eligible'],
['Maricel Gomez',40,'Female','Separated','HH-024','09170003002','Active','Solo Parent','Eligible'],
['Jonathan Diaz',37,'Male','Widowed','HH-025','09170003003','Active','Solo Parent','Eligible'],
['Fe Aquino',29,'Female','Single','HH-026','09170003004','Active','Solo Parent','Eligible'],
['Rina Mendoza',44,'Female','Separated','HH-027','09170003005','Active','Solo Parent','Eligible'],
['Dennis Garcia',35,'Male','Separated','HH-028','09170003006','Active','Solo Parent','Eligible'],
['Sheila Ramos',31,'Female','Single','HH-029','09170003007','Active','Solo Parent','Eligible'],
['Paolo Santos',42,'Male','Widowed','HH-030','09170003008','Active','Solo Parent','Eligible'],
['Cherry Flores',38,'Female','Separated','HH-031','09170003009','Active','Solo Parent','Eligible'],
['Nora Bautista',46,'Female','Single','HH-032','09170003010','Active','Solo Parent','Eligible']
]};
function ensureDemoSectorSamples(){
  db.residents=db.residents||[];
  const existing=new Set(db.residents.map(x=>x.name));
  let next=Date.now();
  Object.values(demoSectorSamples).flat().forEach(([name,age,sex,civil,household,contact,status,sector,fourPs])=>{
    if(!existing.has(name)){db.residents.push({id:next++,name,age,sex,civil,household,contact,status,sector,fourPs});}
  });
  db.residents.forEach(x=>{if(!x.sector)x.sector='None';if(!x.fourPs)x.fourPs='Not Eligible';});
}
let db=JSON.parse(localStorage.getItem(KEY)||'null')||seed;
ensureDemoSectorSamples();
save();
let page='dashboard';
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);function save(){localStorage.setItem(KEY,JSON.stringify(db))}function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2400)}function log(action){db.activity.unshift({id:Date.now(),action,user:'admin',date:new Date().toLocaleString()});db.activity=db.activity.slice(0,100);save()}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}function badge(s){let c=/issued|active|published|senior|paid/i.test(s)?'green':/pending/i.test(s)?'orange':'red';return `<span class="badge ${c}">${esc(s)}</span>`}
function table(headers,rows){return `<div class="table-wrap"><table class="table"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows||`<tr><td colspan="${headers.length}" class="empty">No records found.</td></tr>`}</tbody></table></div>`}
function actions(type,id){return `<div class="actions"><button class="mini" onclick="editRecord('${type}',${id})">Edit</button><button class="mini" onclick="deleteRecord('${type}',${id})">Delete</button></div>`}
function sectorCounts(){
const seniors=db.residents.filter(x=>Number(x.age)>=60||/senior/i.test(x.status)||/senior/i.test(x.sector||'')).length;
const pwd=db.residents.filter(x=>/pwd|person with disability/i.test(x.sector||'')).length;
const solo=db.residents.filter(x=>/solo parent/i.test(x.sector||'')).length;
const fourPs=db.residents.filter(x=>/eligible/i.test(x.fourPs||'')).length;
return {seniors,pwd,solo,fourPs};
}
function analytics(){
const total=db.residents.length||1;
const male=db.residents.filter(x=>/male/i.test(x.sex)).length;
const female=db.residents.filter(x=>/female/i.test(x.sex)).length;
const active=db.residents.filter(x=>/active|senior/i.test(x.status)).length;
const pending=db.documents.filter(x=>/pending/i.test(x.status)).length;
const issued=db.documents.filter(x=>/issued|released/i.test(x.status)).length;
const sectors=sectorCounts();
const max=Math.max(male,female,sectors.seniors,sectors.pwd,sectors.solo,1);
return `<div class="analytics-grid">
<div class="panel analytics-panel"><div class="panel-head"><div><h3>Resident Demographics</h3><div class="muted">Current registry breakdown</div></div></div>
<div class="metric-row"><span>Male</span><b>${male}</b><div class="bar"><i style="width:${male/total*100}%"></i></div></div>
<div class="metric-row"><span>Female</span><b>${female}</b><div class="bar"><i style="width:${female/total*100}%"></i></div></div>
<div class="metric-row"><span>Active / Senior</span><b>${active}</b><div class="bar"><i style="width:${active/total*100}%"></i></div></div>
</div>
<div class="panel analytics-panel"><div class="panel-head"><div><h3>Document Status</h3><div class="muted">Requests and issuance</div></div></div>
<div class="metric-row"><span>Pending</span><b>${pending}</b><div class="bar orange"><i style="width:${pending/Math.max(db.documents.length,1)*100}%"></i></div></div>
<div class="metric-row"><span>Issued / Released</span><b>${issued}</b><div class="bar"><i style="width:${issued/Math.max(db.documents.length,1)*100}%"></i></div></div>
<div class="metric-row"><span>Total Requests</span><b>${db.documents.length}</b><div class="bar"><i style="width:100%"></i></div></div>
</div>
<div class="panel analytics-panel"><div class="panel-head"><div><h3>Special Sector Analytics</h3><div class="muted">Registered sector counts</div></div></div>
<div class="metric-row"><span>Senior Citizens</span><b>${sectors.seniors}</b><div class="bar"><i style="width:${sectors.seniors/max*100}%"></i></div></div>
<div class="metric-row"><span>PWD</span><b>${sectors.pwd}</b><div class="bar"><i style="width:${sectors.pwd/max*100}%"></i></div></div>
<div class="metric-row"><span>Solo Parents</span><b>${sectors.solo}</b><div class="bar"><i style="width:${sectors.solo/max*100}%"></i></div></div><div class="metric-row"><span>4Ps Eligible</span><b>${sectors.fourPs}</b><div class="bar"><i style="width:${sectors.fourPs/max*100}%"></i></div></div>
</div></div>`;
}
function sectorPage(kind){
const labels={senior:'Senior Citizens',pwd:'Persons with Disabilities (PWD)',solo:'Solo Parents',fourps:'4Ps Eligible Residents'};
const test={senior:x=>Number(x.age)>=60||/senior/i.test(x.status)||/senior/i.test(x.sector||''),pwd:x=>/pwd|person with disability/i.test(x.sector||''),solo:x=>/solo parent/i.test(x.sector||''),fourps:x=>/eligible/i.test(x.fourPs||'')}[kind];
const rows=db.residents.filter(test);
return `<div class="welcome"><div><h1>${labels[kind]}</h1><div class="muted">Special sector registry and monitoring.</div></div><button class="btn primary" onclick="openModal('resident')">+ Add Resident</button></div>
<div class="cards sector-cards"><div class="stat"><div class="label">Registered</div><strong>${rows.length}</strong><span>${labels[kind]}</span></div><div class="stat"><div class="label">Households</div><strong>${new Set(rows.map(x=>x.household).filter(Boolean)).size}</strong><span>Households represented</span></div></div>
<div class="panel"><div class="panel-head"><h3>${labels[kind]} Registry</h3></div>${table(['Name','Age','Sex','Household','Contact','Sector','4Ps','Status','Actions'],rows.map(x=>`<tr><td><b>${esc(x.name)}</b></td><td>${x.age}</td><td>${esc(x.sex)}</td><td>${esc(x.household)}</td><td>${esc(x.contact)}</td><td>${esc(x.sector||'None')}</td><td>${badge(x.fourPs||'Not Eligible')}</td><td>${badge(x.status)}</td><td>${actions('residents',x.id)}</td></tr>`).join(''))}</div>`;
}
function dashboard(){const sectors=sectorCounts();return `<div class="welcome"><div><h1>Good day, Admin</h1><div class="muted">Here is your barangay management overview.</div></div><button class="btn primary" onclick="openModal('resident')">+ Add Resident</button></div>
<div class="cards"><div class="stat"><div class="label">Total Residents</div><strong>${db.residents.length}</strong><span>Registered residents</span></div><div class="stat"><div class="label">Households</div><strong>${db.households.length}</strong><span>Active households</span></div><div class="stat"><div class="label">Pending Documents</div><strong>${db.documents.filter(x=>x.status==='Pending').length}</strong><span>Needs processing</span></div><div class="stat"><div class="label">Active Officials</div><strong>${db.officials.filter(x=>x.status==='Active').length}</strong><span>Current directory</span></div></div>
<div class="section-heading"><div><h2>Special Sector Overview</h2><div class="muted">PWD, senior citizen, solo parent, and 4Ps registry</div></div></div>
<div class="sector-grid"><button class="sector-card" onclick="go('senior')"><span class="sector-icon">♙</span><span><b>Senior Citizens</b><small>${sectors.seniors} registered</small></span></button><button class="sector-card" onclick="go('pwd')"><span class="sector-icon">♿</span><span><b>PWD</b><small>${sectors.pwd} registered</small></span></button><button class="sector-card" onclick="go('solo')"><span class="sector-icon">◉</span><span><b>Solo Parents</b><small>${sectors.solo} registered</small></span></button><button class="sector-card" onclick="go('fourps')"><span class="sector-icon">♧</span><span><b>4Ps Eligible</b><small>${sectors.fourPs} eligible residents</small></span></button></div>
${analytics()}
<div class="grid2"><div class="panel"><div class="panel-head"><h3>Recent Document Requests</h3><button class="mini" onclick="go('documents')">View all</button></div>${table(['Document','Applicant','Date','Status'],db.documents.slice(0,5).map(x=>`<tr><td>${esc(x.type)}</td><td>${esc(x.applicant)}</td><td>${esc(x.date)}</td><td>${badge(x.status)}</td></tr>`).join(''))}</div><div class="panel"><div class="panel-head"><h3>Announcements</h3><button class="mini" onclick="go('announcements')">Manage</button></div><div class="list">${db.announcements.slice(0,4).map(x=>`<div class="list-item"><strong>${esc(x.title)}</strong><small>${esc(x.date)} · ${x.status}</small></div>`).join('')||'<div class="empty">No announcements.</div>'}</div></div></div></div>`}

const configs={residents:{title:'Residents',kicker:'Resident Registry',button:'Add Resident',type:'resident',search:'Search residents...',headers:['Name','Age','Sex','Household','Sector','Contact','Status','Actions'],rows:d=>d.map(x=>`<tr><td><b>${esc(x.name)}</b><br><small>${esc(x.civil)}</small></td><td>${x.age}</td><td>${esc(x.sex)}</td><td>${esc(x.household)}</td><td>${esc(x.sector||'None')}</td><td>${esc(x.contact)}</td><td>${badge(x.status)}</td><td>${actions('residents',x.id)}</td></tr>`)},households:{title:'Households',kicker:'Household Registry',button:'Add Household',type:'household',search:'Search households...',headers:['Code','Household Head','Address','Members','Status','Actions'],rows:d=>d.map(x=>`<tr><td><b>${esc(x.code)}</b></td><td>${esc(x.head)}</td><td>${esc(x.address)}</td><td>${x.members}</td><td>${badge(x.status)}</td><td>${actions('households',x.id)}</td></tr>`)},documents:{title:'Documents',kicker:'Document Requests & Issuance',button:'New Document',type:'document',search:'Search documents...',headers:['Document','Applicant','Date','Status','Actions'],rows:d=>d.map(x=>`<tr><td>${esc(x.type)}</td><td>${esc(x.applicant)}</td><td>${esc(x.date)}</td><td>${badge(x.status)}</td><td>${actions('documents',x.id)}</td></tr>`)},officials:{title:'Officials',kicker:'Barangay Directory',button:'Add Official',type:'official',search:'Search officials...',headers:['Name','Position','Term','Contact','Status','Actions'],rows:d=>d.map(x=>`<tr><td><b>${esc(x.name)}</b></td><td>${esc(x.position)}</td><td>${esc(x.term)}</td><td>${esc(x.contact)}</td><td>${badge(x.status)}</td><td>${actions('officials',x.id)}</td></tr>`)},announcements:{title:'Announcements',kicker:'Public Information',button:'New Announcement',type:'announcement',search:'Search announcements...',headers:['Title','Date','Status','Details','Actions'],rows:d=>d.map(x=>`<tr><td><b>${esc(x.title)}</b></td><td>${esc(x.date)}</td><td>${badge(x.status)}</td><td>${esc(x.details)}</td><td>${actions('announcements',x.id)}</td></tr>`)},services:{title:'Barangay Services',kicker:'Services Directory',button:'Add Service',type:'service',search:'Search services...',headers:['Service','Category','Fee','Status','Actions'],rows:d=>d.map(x=>`<tr><td><b>${esc(x.name)}</b></td><td>${esc(x.category)}</td><td>${esc(x.fee)}</td><td>${badge(x.status)}</td><td>${actions('services',x.id)}</td></tr>`)},payments:{title:'Payment Records',kicker:'Payment Collection & Tracking',button:'Add Payment',type:'payment',search:'Search payments...',headers:['Payer','Purpose','Amount','Method','Reference','Date','Status','Actions'],rows:d=>d.map(x=>`<tr><td><b>${esc(x.payer)}</b></td><td>${esc(x.purpose)}</td><td>PHP ${Number(x.amount||0).toLocaleString()}</td><td>${esc(x.method)}</td><td>${esc(x.reference)}</td><td>${esc(x.date)}</td><td>${badge(x.status)}</td><td>${actions('payments',x.id)}</td></tr>`)}};
function listing(type){const c=configs[type];return `<div class="welcome"><div><h1>${c.title}</h1><div class="muted">${c.kicker}</div></div><div class="welcome-actions">${type==='residents'?'<button class="btn import-btn" onclick="openImportModal()">⇧ Import</button>':''}<button class="btn primary" onclick="openModal('${c.type}')">+ ${c.button}</button></div></div><div class="panel"><div class="toolbar"><input id="search" placeholder="${c.search}" oninput="filterTable()"><select id="statusFilter" onchange="filterTable()"><option value="">All statuses</option><option>Active</option><option>Pending</option><option>Issued</option><option>Published</option><option>Senior</option></select></div><div id="tableArea">${table(c.headers,c.rows(db[type]))}</div></div>`}
function filterTable(){const c=configs[page];if(!c)return;const q=($('#search')?.value||'').toLowerCase(),s=$('#statusFilter')?.value||'';const d=db[page].filter(x=>JSON.stringify(x).toLowerCase().includes(q)&&(!s||x.status===s));$('#tableArea').innerHTML=table(c.headers,c.rows(d))}
function reports(){return `<div class="welcome"><div><h1>Reports</h1><div class="muted">Quick summaries for barangay administration.</div></div><button class="btn primary" onclick="window.print()">Print Report</button></div><div class="report-grid">${[['Residents','Total registered residents',db.residents.length],['Households','Registered households',db.households.length],['Documents','Total document records',db.documents.length],['Officials','Active officials',db.officials.filter(x=>x.status==='Active').length],['Services','Available services',db.services.filter(x=>x.status==='Active').length],['Announcements','Published announcements',db.announcements.filter(x=>x.status==='Published').length]].map(x=>`<div class="report-card"><h3>${x[0]}</h3><p>${x[1]}</p><strong style="font-size:30px">${x[2]}</strong></div>`).join('')}</div>`}function activity(){return `<div class="welcome"><div><h1>Activity Log</h1><div class="muted">Administrative actions recorded in this browser.</div></div></div><div class="panel">${table(['Action','User','Date'],db.activity.map(x=>`<tr><td>${esc(x.action)}</td><td>${esc(x.user)}</td><td>${esc(x.date)}</td></tr>`).join(''))}</div>`}
function go(p){page=p;$$('nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===p));$('#title').textContent=p==='dashboard'?'Dashboard':configs[p]?.title||({senior:'Senior Citizens',pwd:'PWD',solo:'Solo Parents',fourps:'4Ps Eligible'}[p]||p[0].toUpperCase()+p.slice(1));$('#kicker').textContent=p==='dashboard'?'Overview':configs[p]?.kicker||(['senior','pwd','solo','fourps'].includes(p)?'Special Sector Registry':'Administration');$('#content').innerHTML=p==='dashboard'?dashboard():configs[p]?listing(p):['senior','pwd','solo','fourps'].includes(p)?sectorPage(p):p==='reports'?reports():activity();$('#sidebar').classList.remove('open')}
function form(type,item={}){const fields={payment:[['payer','Payer'],['purpose','Purpose'],['amount','Amount','number'],['method','Payment Method','select','Cash|GCash|Bank Transfer|Free'],['reference','Reference No.'],['date','Payment Date','date'],['status','Status','select','Paid|Pending|Waived|Cancelled']],resident:[['name','Full Name'],['age','Age','number'],['sex','Sex','select','Male|Female'],['civil','Civil Status','select','Single|Married|Widowed|Separated'],['household','Household Code'],['contact','Contact Number'],['sector','Special Sector','select','None|Senior Citizen|PWD|Solo Parent'],['fourPs','4Ps Eligibility','select','Not Eligible|Eligible'],['status','Status','select','Non-Senior|Senior']],household:[['code','Household Code'],['head','Household Head'],['address','Address'],['members','Number of Members','number'],['status','Status','select','Active|Inactive']],document:[['type','Document Type','select','Barangay Clearance|Certificate of Residency|Certificate of Indigency|Business Clearance|Other'],['applicant','Applicant'],['date','Request Date','date'],['status','Status','select','Pending|Issued|Released|Cancelled']],official:[['name','Full Name'],['position','Position'],['term','Term'],['contact','Contact Number'],['status','Status','select','Active|Inactive']],announcement:[['title','Title'],['date','Date','date'],['status','Status','select','Published|Draft|Archived'],['details','Details','textarea']],service:[['name','Service Name'],['category','Category'],['fee','Fee'],['status','Status','select','Active|Inactive']]};return `<div class="form-grid">${fields[type].map(f=>{const [k,l,t,opts]=f,v=item[k]??(k==='date'?new Date().toISOString().slice(0,10):'');let input=t==='select'?`<select name="${k}">${opts.split('|').map(o=>`<option ${o===v?'selected':''}>${o}</option>`).join('')}</select>`:t==='textarea'?`<textarea name="${k}" rows="4">${esc(v)}</textarea>`:`<input name="${k}" ${t==='number'?'type="number"':t==='date'?'type="date"':''} value="${esc(v)}" ${k==='name'||k==='title'?'required':''}>`;return `<label class="${t==='textarea'?'wide':''}">${l}${input}</label>`}).join('')}</div><div class="form-actions"><button type="button" class="btn" onclick="closeModal()">Cancel</button><button class="btn primary">Save Record</button></div>`}
function openImportModal(){
  $('#modalTitle').textContent='Import Residents';
  $('#modalBody').innerHTML=`<div class="import-box"><div class="import-icon">⇧</div><h3>Import Resident Records</h3><p class="muted">Upload a CSV or JSON file. Existing records are kept; duplicate records with the same name and household are skipped.</p><label class="file-drop"><input id="importFile" type="file" accept=".csv,.json,text/csv,application/json" onchange="previewImport(event)"><span>Choose CSV or JSON file</span><small id="importFileName">No file selected</small></label><div id="importPreview" class="import-preview"></div><div class="import-format"><b>CSV columns</b><code>name,age,sex,civil,household,contact,sector,fourPs,status</code></div></div><div class="form-actions"><button type="button" class="btn" onclick="closeModal()">Cancel</button><button type="button" class="btn primary" id="importConfirm" onclick="importResidents()" disabled>Import Records</button></div>`;
  $('#modal').classList.remove('hidden');
}
let pendingImport=[];
function parseCSV(text){
  const rows=[];let row=[],cell='',quoted=false;
  for(let i=0;i<text.length;i++){const ch=text[i],next=text[i+1];
    if(ch==='"'&&quoted&&next==='"'){cell+='"';i++;continue}
    if(ch==='"'){quoted=!quoted;continue}
    if(ch===','&&!quoted){row.push(cell.trim());cell='';continue}
    if((ch==='\n'||ch==='\r')&&!quoted){if(ch==='\r'&&next==='\n')i++;row.push(cell.trim());cell='';if(row.some(v=>v!==''))rows.push(row);row=[];continue}
    cell+=ch;
  }
  if(cell!==''||row.length){row.push(cell.trim());if(row.some(v=>v!==''))rows.push(row)}
  if(!rows.length)return [];
  const headers=rows.shift().map(h=>h.replace(/^\uFEFF/,'').trim().toLowerCase().replace(/\s+/g,''));
  return rows.map(r=>Object.fromEntries(headers.map((h,i)=>[h,r[i]??''])));
}
function normalizeImportedResident(x){
  const get=(...keys)=>{for(const k of keys)if(x[k]!==undefined&&x[k]!=='')return x[k];return ''};
  return {id:Date.now()+Math.floor(Math.random()*100000),name:get('name','fullname'),age:Number(get('age'))||0,sex:get('sex'),civil:get('civil','civilstatus'),household:get('household','householdcode'),contact:get('contact','contactnumber'),sector:get('sector','specialsector')||'None',fourPs:get('fourps','4ps','4pseligibility')||'Not Eligible',status:get('status')||'Active'};
}
function previewImport(e){
  const file=e.target.files?.[0];pendingImport=[];$('#importConfirm').disabled=true;$('#importPreview').innerHTML='';
  if(!file)return;
  $('#importFileName').textContent=file.name;
  const reader=new FileReader();reader.onload=()=>{
    try{
      let parsed=file.name.toLowerCase().endsWith('.json')?JSON.parse(reader.result):parseCSV(reader.result);
      if(!Array.isArray(parsed))parsed=parsed.residents||[];
      pendingImport=parsed.map(normalizeImportedResident).filter(x=>x.name);
      const existing=new Set(db.residents.map(x=>x.name.toLowerCase()+'|'+String(x.household||'').toLowerCase()));
      const newCount=pendingImport.filter(x=>!existing.has(x.name.toLowerCase()+'|'+String(x.household||'').toLowerCase())).length;
      $('#importPreview').innerHTML=`<div class="import-summary"><b>Ready to import</b><span>${pendingImport.length} valid records · ${newCount} new · ${pendingImport.length-newCount} duplicates will be skipped</span></div>`;
      $('#importConfirm').disabled=newCount===0;
    }catch(err){pendingImport=[];$('#importPreview').innerHTML='<div class="import-error">Could not read this file. Please use a valid CSV or JSON file.</div>'}
  };reader.readAsText(file);
}
function importResidents(){
  if(!pendingImport.length)return;
  const existing=new Set(db.residents.map(x=>x.name.toLowerCase()+'|'+String(x.household||'').toLowerCase()));let added=0;
  pendingImport.forEach(x=>{const key=x.name.toLowerCase()+'|'+String(x.household||'').toLowerCase();if(!existing.has(key)){db.residents.unshift(x);existing.add(key);added++}});
  if(added){log(`Imported ${added} resident record(s)`);save();closeModal();go('residents');toast(`Imported ${added} resident record(s) successfully`)}else toast('No new resident records to import');
  pendingImport=[];
}
function openModal(type,id=null){const map={payment:'payments',resident:'residents',household:'households',document:'documents',official:'officials',announcement:'announcements',service:'services'},collection=map[type],item=id?db[collection].find(x=>x.id===id):{};$('#modalTitle').textContent=(id?'Edit ':'Add ')+type[0].toUpperCase()+type.slice(1);$('#modalBody').innerHTML=`<form onsubmit="saveRecord(event,'${type}',${id||0})">${form(type,item)}</form>`;$('#modal').classList.remove('hidden')}
function closeModal(){$('#modal').classList.add('hidden')}function saveRecord(e,type,id){e.preventDefault();const map={resident:'residents',household:'households',document:'documents',official:'officials',announcement:'announcements',service:'services'},c=map[type],data=Object.fromEntries(new FormData(e.target).entries());Object.keys(data).forEach(k=>{if(k==='age'||k==='members'||k==='amount')data[k]=Number(data[k])});if(id){const i=db[c].findIndex(x=>x.id===id);db[c][i]={...db[c][i],...data};log(`Updated ${type} record`)}else{data.id=Date.now();db[c].unshift(data);log(`Added ${type} record`)}save();closeModal();go(page);toast('Record saved successfully')}
function editRecord(type,id){const map={payments:'payment',residents:'resident',households:'household',documents:'document',officials:'official',announcements:'announcement',services:'service'};openModal(map[type],id)}function deleteRecord(type,id){if(!confirm('Delete this record?'))return;db[type].splice(db[type].findIndex(x=>x.id===id),1);log(`Deleted ${type} record`);save();go(page);toast('Record deleted')}
$('#loginForm').addEventListener('submit',e=>{e.preventDefault();if($('#username').value==='admin'&&$('#password').value==='admin'){$('#login').classList.add('hidden');$('#app').classList.remove('hidden');sessionStorage.setItem('bmis-auth','1');go('dashboard')}else $('#loginError').textContent='Invalid username or password.'});$('#logout').onclick=()=>{sessionStorage.removeItem('bmis-auth');$('#app').classList.add('hidden');$('#login').classList.remove('hidden')};$('#close').onclick=closeModal;$('#menu').onclick=()=>$('#sidebar').classList.toggle('open');$$('nav button').forEach(b=>b.onclick=()=>go(b.dataset.page));const residentToggle=document.querySelector('.resident-toggle');
const residentSubnav=document.querySelector('.resident-subnav');
function toggleResidents(){
  const open=residentSubnav.classList.toggle('collapsed');
  residentToggle.setAttribute('aria-expanded',String(!open));
  residentToggle.classList.toggle('expanded',!open);
}
if(residentToggle){residentToggle.onclick=()=>{go('residents');toggleResidents()};}
$('#date').textContent=new Date().toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'});if(sessionStorage.getItem('bmis-auth')){$('#login').classList.add('hidden');$('#app').classList.remove('hidden');go('dashboard')}
