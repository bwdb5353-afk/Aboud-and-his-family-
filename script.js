const config = {
  raised: 327,
  goal: 1000,
  seconds: 45 * 60,
  currentStage: 3,
  viewers: 12500
};

const stepData = [
  "البداية: نتعرف على القصة والهدف",
  "سؤال الجمهور: أنتم تختارون",
  "تحدي المذيع",
  "صندوق المفاجأة",
  "تحدي السرعة (60 ثانية)",
  "اختيار الفريق",
  "مضاعفة الأمل (هدف فرعي)",
  "لغز الأمل",
  "المرحلة الأخيرة (عد تنازلي)",
  "باب الأمل (النهاية الكبرى)"
];

function renderDoors() {
  const el = document.getElementById("doors");
  el.innerHTML = "";
  for (let i = 1; i <= 10; i++) {
    const state = i < config.currentStage ? "open" : i === config.currentStage ? "current" : "locked";
    const label = state === "open" ? "مفتوح ✓" : state === "current" ? "المرحلة الحالية" : "مغلق";
    const lock = state === "locked" ? "🔒" : "";
    el.insertAdjacentHTML("beforeend", `
      <div class="door ${state}">
        <div class="door-shape"><span class="door-num">${i}</span><span class="lock">${lock}</span></div>
        <div class="door-label">${label}</div>
      </div>`);
  }
}
function renderSteps() {
  const el = document.getElementById("steps");
  el.innerHTML = stepData.map((label,i)=>{
    const n=i+1;
    const state=n<config.currentStage?"done":n===config.currentStage?"current":"locked";
    const icon=state==="done"?"✓":state==="current"?"→":"🔒";
    return `<div class="step ${state}"><span class="n">${n}</span><span>${label}</span><span class="state">${icon}</span></div>`;
  }).join("");
}
function renderProgress() {
  const pct=Math.min(100,Math.max(0,(config.raised/config.goal)*100));
  document.getElementById("raised").textContent=`$${config.raised.toLocaleString()}`;
  document.getElementById("progressBar").style.width=pct+"%";
  document.getElementById("progressPct").textContent=pct.toFixed(1)+"%";
}
function renderTimer(){
  const m=Math.floor(config.seconds/60).toString().padStart(2,"0");
  const s=(config.seconds%60).toString().padStart(2,"0");
  document.getElementById("timer").textContent=`${m}:${s}`;
}
function tick(){
  if(config.seconds>0){config.seconds--;renderTimer();}
}
function toast(message){
  const t=document.getElementById("toast");
  t.textContent=message;t.classList.add("show");
  clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove("show"),2200);
}
window.toast=toast;
renderDoors();renderSteps();renderProgress();renderTimer();
setInterval(tick,1000);

// Live-style viewer pulse
setInterval(()=>{
  const delta=Math.floor(Math.random()*81)-40;
  config.viewers=Math.max(1000,config.viewers+delta);
  const k=config.viewers>=1000?(config.viewers/1000).toFixed(1)+"K":String(config.viewers);
  document.getElementById("viewerCount").textContent=k;
},5000);
