/* Fix sector navigation buttons */
(function(){
  const sectorPages=new Set(['senior','pwd','solo','fourps']);
  function bindSectorNavigation(){
    document.querySelectorAll('[data-page]').forEach(button=>{
      if(button.dataset.sectorFixBound==='1')return;
      const page=button.getAttribute('data-page');
      if(!sectorPages.has(page))return;
      button.dataset.sectorFixBound='1';
      button.addEventListener('click',function(event){
        event.preventDefault();
        event.stopImmediatePropagation();
        if(typeof window.go==='function'){
          window.go(page);
        }else{
          document.dispatchEvent(new CustomEvent('bmis:navigate',{detail:{page}}));
        }
      },true);
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindSectorNavigation);
  else bindSectorNavigation();
  new MutationObserver(bindSectorNavigation).observe(document.body,{childList:true,subtree:true});
})();

(function(){
  function installReportsNav(){
    const group=document.querySelector('.nav-group-toggle[data-group="insights"]');
    const sub=document.querySelector('[data-subnav="insights"]');
    if(group&&sub){
      group.dataset.group='reports';
      group.setAttribute('aria-controls','submenu-reports');
      group.innerHTML='▤ <span>Reports</span><i>⌄</i>';
      sub.id='submenu-reports';
      sub.dataset.subnav='reports';
      if(sub.dataset.reportsNavReady!=='1'){
        sub.dataset.reportsNavReady='1';
        sub.innerHTML='<button data-page="residentReports">▤ <span>Resident Reports</span></button><button data-page="communityReports">◌ <span>Community Reports</span></button><button data-page="transactionReports">▣ <span>Transaction Reports</span></button><button data-page="financialReports">₱ <span>Financial Reports</span></button><button data-page="reports">▤ <span>Reports Overview</span></button><button data-page="activity">◷ <span>Activity Log</span></button>';
        sub.querySelectorAll('button[data-page]').forEach(button=>{
          button.type='button';
          button.addEventListener('click',event=>{
            event.preventDefault();
            const parentToggle=document.querySelector('.nav-group-toggle[data-group="reports"]');
            if(parentToggle&&typeof closeNavGroups==='function')closeNavGroups(parentToggle);
            if(typeof window.go==='function')window.go(button.dataset.page);
          });
        });
      }
    }
  }

  function loadReports(){
    if(!document.querySelector('link[data-reports-programs-style]')){
      const link=document.createElement('link');
      link.rel='stylesheet';
      link.href='reports-programs.css?v=20260918-reports-programs';
      link.dataset.reportsProgramsStyle='1';
      document.head.appendChild(link);
    }
    const existing=document.querySelector('script[data-reports-programs-script]');
    if(existing){
      installReportsNav();
      return;
    }
    const script=document.createElement('script');
    script.src='reports-programs.js?v=20260918-reports-programs';
    script.dataset.reportsProgramsScript='1';
    script.onload=()=>{
      installReportsNav();
      if(!document.querySelector('script[data-dashboard-graph]')){
        const graph=document.createElement('script');
        graph.src='dashboard-graph.js?v=20260918-dashboard-graph';
        graph.dataset.dashboardGraph='1';
        document.body.appendChild(graph);
      }
    };
    document.body.appendChild(script);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadReports);
  else loadReports();
})();
