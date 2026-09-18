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
