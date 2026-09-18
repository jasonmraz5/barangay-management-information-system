/* Projects and budget allocation module */
(function(){
  const projectSamples=[
    {id:1,name:'Barangay Road Improvement',category:'Infrastructure',budget:250000,status:'Ongoing',start:'2026-07-01',end:'2026-11-30',description:'Improvement of priority roads and drainage access.'},
    {id:2,name:'Senior Citizens Wellness Program',category:'Social Services',budget:120000,status:'Planned',start:'2026-10-01',end:'2026-12-15',description:'Health checks, wellness activities, and support services.'},
    {id:3,name:'Community Clean and Green',category:'Environment',budget:85000,status:'Ongoing',start:'2026-08-15',end:'2026-12-31',description:'Community cleanup, tree planting, and waste management.'},
    {id:4,name:'Barangay Learning Support',category:'Education',budget:150000,status:'Planned',start:'2026-09-20',end:'2026-12-20',description:'Learning materials and community tutorial activities.'}
  ];
  const budgetSamples=[
    {id:1,category:'Infrastructure',description:'Road and drainage improvement',allocated:250000,spent:90000,status:'Allocated'},
    {id:2,category:'Social Services',description:'Senior citizens and PWD assistance',allocated:180000,spent:45000,status:'Allocated'},
    {id:3,category:'Environment',description:'Clean and green activities',allocated:85000,spent:30000,status:'Allocated'},
    {id:4,category:'Education',description:'Learning support and supplies',allocated:150000,spent:20000,status:'Allocated'},
    {id:5,category:'Administration',description:'Barangay office operating needs',allocated:100000,spent:55000,status:'Allocated'}
  ];
  function init(){
    db.projects=db.projects||projectSamples.map(x=>({...x}));
    db.budgets=db.budgets||budgetSamples.map(x=>({...x}));
    save();
  }
  function money(v){return '₱'+Number(v||0).toLocaleString('en-PH',{minimumFractionDigits:2,maximumFractionDigits:2})}
  function totalBudget(){return db.budgets.reduce((s,x)=>s+Number(x.allocated||0),0)}
  function totalSpent(){return db.budgets.reduce((s,x)=>s+Number(x.spent||0),0)}
  function pageShell(title,subtitle,body,button){return `<div class="page-head"><div><p class="eyebrow">MANAGEMENT</p><h1>${title}</h1><p class="muted">${subtitle}</p></div>${button||''}</div>${body}`}
  function projectsPage(){
    const rows=db.projects.map(p=>`<tr><td><b>${esc(p.name)}</b><div class="pb-muted">${esc(p.description)}</div></td><td>${esc(p.category)}</td><td>${money(p.budget)}</td><td>${esc(p.start)} – ${esc(p.end)}</td><td>${badge(p.status)}</td><td>${actions('project',p.id)}</td></tr>`).join('');
    return pageShell('Projects','Plan, monitor, and manage barangay projects.',`<div class="panel"><div class="panel-head"><div><h3>Project Registry</h3><div class="muted">Sample projects are included.</div></div><button class="btn primary" onclick="openProjectModal()">+ Add Project</button></div>${table(['Project','Category','Budget','Schedule','Status','Actions'],rows)}</div>`);
  }
  function budgetsPage(){
    const rows=db.budgets.map(b=>`<tr><td><b>${esc(b.category)}</b></td><td>${esc(b.description)}</td><td>${money(b.allocated)}</td><td>${money(b.spent)}</td><td>${money(Number(b.allocated||0)-Number(b.spent||0))}</td><td>${badge(b.status)}</td><td>${actions('budget',b.id)}</td></tr>`).join('');
    return pageShell('Budget Allocations','Track allocated funds, spending, and remaining balances.',`<div class="pb-grid"><div class="panel pb-stat"><div class="pb-muted">Total Allocated</div><strong>${money(totalBudget())}</strong></div><div class="panel pb-stat"><div class="pb-muted">Total Spent</div><strong>${money(totalSpent())}</strong></div></div><div class="panel"><div class="panel-head"><div><h3>Budget Allocation Registry</h3><div class="muted">Sample allocations are included.</div></div><button class="btn primary" onclick="openBudgetModal()">+ Add Allocation</button></div>${table(['Category','Description','Allocated','Spent','Remaining','Status','Actions'],rows)}</div>`);
  }
  function budgetPie(){
    const data=db.budgets.reduce((o,b)=>{const k=b.category||'Other';o[k]=(o[k]||0)+Number(b.allocated||0);return o},{});
    const colors=['#2563eb','#16a34a','#f59e0b','#9333ea','#64748b','#dc2626'];let offset=0;const total=Object.values(data).reduce((a,b)=>a+b,0)||1;
    const stops=[];Object.entries(data).forEach(([k,v],i)=>{const end=offset+v/total*100;stops.push(`${colors[i%colors.length]} ${offset}% ${end}%`);offset=end});
    return `<div class="panel"><div class="panel-head"><div><h3>Budget Allocation Distribution</h3><div class="muted">Allocation share by category</div></div><span class="badge">${money(total)}</span></div><div class="pb-chart"><div class="pb-pie" style="background:conic-gradient(${stops.join(',')})" aria-label="Budget allocation pie chart"></div><div class="pb-legend">${Object.entries(data).map(([k,v],i)=>`<span><i class="pb-dot" style="background:${colors[i%colors.length]}"></i>${esc(k)} · ${money(v)} (${(v/total*100).toFixed(1)}%)</span>`).join('')}</div></div></div>`;
  }
  function dashboardBudget(){
    const content=document.getElementById('content');if(!content||content.querySelector('[data-budget-dashboard]'))return;
    const title=document.getElementById('title');if(!title||!/dashboard/i.test(title.textContent||''))return;
    const wrap=document.createElement('div');wrap.dataset.budgetDashboard='1';wrap.innerHTML=budgetPie();content.appendChild(wrap);
  }
  function modal(title,fields,saveFn){
    const body=`<form onsubmit="${saveFn}(event)"><div class="pb-form-grid">${fields}</div><div class="actions" style="margin-top:16px"><button type="submit" class="btn primary">Save</button><button type="button" class="btn" onclick="closeModal()">Cancel</button></div></form>`;
    window.openModal(title,body);
  }
  window.openProjectModal=function(id){const p=db.projects.find(x=>x.id===id)||{};modal(id?'Edit Project':'Add Project',`<label>Project Name<input name="name" required value="${esc(p.name)}"></label><label>Category<input name="category" required value="${esc(p.category)}"></label><label>Budget<input name="budget" type="number" min="0" required value="${p.budget||''}"></label><label>Status<select name="status"><option>Planned</option><option>Ongoing</option><option>Completed</option><option>On Hold</option></select></label><label>Start Date<input name="start" type="date" required value="${esc(p.start)}"></label><label>End Date<input name="end" type="date" required value="${esc(p.end)}"></label><label class="full">Description<textarea name="description">${esc(p.description)}</textarea></label>`,`saveProjectForm`);window.__editingProject=id||null};
  window.saveProjectForm=function(e){e.preventDefault();const f=new FormData(e.target),p={id:window.__editingProject||Date.now(),name:f.get('name'),category:f.get('category'),budget:Number(f.get('budget')),status:f.get('status'),start:f.get('start'),end:f.get('end'),description:f.get('description')};if(window.__editingProject){db.projects=db.projects.map(x=>x.id===window.__editingProject?p:x)}else db.projects.push(p);save();closeModal();go('projects');toast('Project saved.')};
  window.openBudgetModal=function(id){const b=db.budgets.find(x=>x.id===id)||{};modal(id?'Edit Budget Allocation':'Add Budget Allocation',`<label>Category<input name="category" required value="${esc(b.category)}"></label><label>Status<select name="status"><option>Allocated</option><option>Partially Spent</option><option>Completed</option><option>On Hold</option></select></label><label class="full">Description<input name="description" required value="${esc(b.description)}"></label><label>Allocated Amount<input name="allocated" type="number" min="0" required value="${b.allocated||''}"></label><label>Spent Amount<input name="spent" type="number" min="0" required value="${b.spent||0}"></label>`,`saveBudgetForm`);window.__editingBudget=id||null};
  window.saveBudgetForm=function(e){e.preventDefault();const f=new FormData(e.target),b={id:window.__editingBudget||Date.now(),category:f.get('category'),description:f.get('description'),allocated:Number(f.get('allocated')),spent:Number(f.get('spent')),status:f.get('status')};if(window.__editingBudget){db.budgets=db.budgets.map(x=>x.id===window.__editingBudget?b:x)}else db.budgets.push(b);save();closeModal();go('budgets');toast('Budget allocation saved.')};
  window.editRecordOriginal=window.editRecord;
  window.editRecord=function(type,id){if(type==='project')return openProjectModal(id);if(type==='budget')return openBudgetModal(id);if(typeof window.editRecordOriginal==='function')return window.editRecordOriginal(type,id)};
  window.deleteRecordOriginal=window.deleteRecord;
  window.deleteRecord=function(type,id){if(type==='project'){db.projects=db.projects.filter(x=>x.id!==id);save();go('projects');toast('Project deleted.');return}if(type==='budget'){db.budgets=db.budgets.filter(x=>x.id!==id);save();go('budgets');toast('Budget allocation deleted.');return}if(typeof window.deleteRecordOriginal==='function')return window.deleteRecordOriginal(type,id)};
  const originalGo=window.go;
  if(typeof originalGo==='function')window.go=function(p){if(p==='projects'){$('#content').innerHTML=projectsPage();return}if(p==='budgets'){$('#content').innerHTML=budgetsPage();return}const result=originalGo.apply(this,arguments);setTimeout(dashboardBudget,0);return result};
  function installNav(){const m=document.querySelector('[data-subnav="management"]');if(!m||m.querySelector('[data-page="projects"]'))return;const anchor=m.querySelector('a.nav-link');['projects','budgets'].forEach((p,i)=>{const b=document.createElement('button');b.type='button';b.dataset.page=p;b.innerHTML=i?'▣ <span>Budget Allocations</span>':'◈ <span>Projects</span>';b.onclick=()=>window.go(p);if(anchor)m.insertBefore(b,anchor);else m.appendChild(b)});}
  init();
  const load=()=>{if(!document.querySelector('link[data-projects-budget-style]')){const l=document.createElement('link');l.rel='stylesheet';l.href='projects-budget.css?v=20260918';l.dataset.projectsBudgetStyle='1';document.head.appendChild(l)}installNav();dashboardBudget()};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load);else load();
  new MutationObserver(load).observe(document.body,{childList:true,subtree:true});
})();