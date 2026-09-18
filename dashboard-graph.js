/* Dashboard analytics graph */
(function(){
  function drawDashboardGraph(){
    const content=document.getElementById('content');
    if(!content||!document.getElementById('dashboard-activity-graph'))return;
    const canvas=document.getElementById('dashboard-activity-graph');
    if(!canvas)return;
    const ctx=canvas.getContext('2d');
    const dpr=window.devicePixelRatio||1;
    const width=canvas.clientWidth||700,height=300;
    canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,width,height);
    const data=[12,18,14,22,27,21,31,28,36,42];
    const labels=['May 1','May 2','May 3','May 4','May 5','May 6','May 7','May 8','May 9','May 10'];
    const pad={l:42,r:18,t:24,b:42},cw=width-pad.l-pad.r,ch=height-pad.t-pad.b,max=50;
    ctx.font='12px sans-serif';
    ctx.strokeStyle='rgba(120,130,150,.18)';ctx.lineWidth=1;
    for(let i=0;i<=5;i++){const y=pad.t+ch-(ch*i/5);ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(width-pad.r,y);ctx.stroke();ctx.fillStyle='#6b7280';ctx.fillText(String(i*10),8,y+4)}
    const pts=data.map((v,i)=>({x:pad.l+(cw*i/(data.length-1)),y:pad.t+ch-(v/max*ch)}));
    const grad=ctx.createLinearGradient(0,pad.t,0,pad.t+ch);grad.addColorStop(0,'rgba(59,130,246,.24)');grad.addColorStop(1,'rgba(59,130,246,0)');
    ctx.beginPath();ctx.moveTo(pts[0].x,pad.t+ch);pts.forEach(p=>ctx.lineTo(p.x,p.y));ctx.lineTo(pts.at(-1).x,pad.t+ch);ctx.closePath();ctx.fillStyle=grad;ctx.fill();
    ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.strokeStyle='#3b82f6';ctx.lineWidth=3;ctx.stroke();
    pts.forEach((p,i)=>{ctx.beginPath();ctx.arc(p.x,p.y,4,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();ctx.strokeStyle='#3b82f6';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle='#6b7280';ctx.font='10px sans-serif';ctx.fillText(labels[i],p.x-14,height-16)});
  }
  function ensureGraph(){
    const content=document.getElementById('content');
    if(!content||content.querySelector('#dashboard-activity-graph'))return;
    const heading=content.querySelector('h1');
    if(!heading||!/dashboard/i.test(heading.textContent||''))return;
    const panel=document.createElement('div');
    panel.className='panel dashboard-graph-panel';
    panel.innerHTML='<div class="panel-head"><div><h3>Community Activity Trend</h3><div class="muted">Sample daily transactions and community activities</div></div><span class="badge">10-day sample</span></div><canvas id="dashboard-activity-graph" aria-label="Community activity trend graph"></canvas>';
    const firstPanel=content.querySelector('.panel');
    if(firstPanel)firstPanel.parentNode.insertBefore(panel,firstPanel);else content.appendChild(panel);
    drawDashboardGraph();
  }
  const originalGo=window.go;
  if(typeof originalGo==='function'){
    window.go=function(p){const result=originalGo.apply(this,arguments);setTimeout(ensureGraph,0);return result};
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(ensureGraph,0));else setTimeout(ensureGraph,0);
  window.addEventListener('resize',drawDashboardGraph);
  new MutationObserver(ensureGraph).observe(document.body,{childList:true,subtree:true});
})();