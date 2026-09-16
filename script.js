const SECRET = "nidhi";
const $ = id => document.getElementById(id);
const gate = $("gate"), site = $("site"), password = $("password"), wrong = $("wrong");

function unlock(){
  if(password.value.trim().toLowerCase() === SECRET){
    gate.classList.add("hidden"); site.classList.remove("hidden"); window.scrollTo(0,0);
  } else { wrong.textContent="That doesn't seem to be our secret. Try again ❤️"; password.value=""; password.focus(); }
}
$("unlock").addEventListener("click",unlock);
password.addEventListener("keydown",e=>{if(e.key==="Enter")unlock()});

$("begin").addEventListener("click",()=>$("letter").scrollIntoView({behavior:"smooth"}));

const letterText=`I know an interactive website cannot fix what happened.

And I don't want it to.

I want to start by saying I'm sorry. I'm sorry for the things I did that hurt you, for the moments when I didn't understand what you needed, and for every time my actions made you feel like your feelings weren't important.

I love you, Nidhi. But loving you also means respecting you when you're angry, hurt, confused, or unsure about us.

I'm not asking you to forget anything. I'm asking whether there is any part of you that still wants to have an honest conversation and see whether I can do better.

If there is, I'll listen. If there isn't, I'll respect that too.

Thank you for reading this. ❤️`;

$("envelope").addEventListener("click",()=>{
  $("envelope").classList.add("hidden"); const card=$("letterCard"); card.classList.remove("hidden");
  const target=$("typed"); let i=0; function type(){if(i<letterText.length){target.textContent+=letterText[i++];setTimeout(type,14)}} type();
});

document.querySelectorAll(".reason").forEach(btn=>btn.addEventListener("click",()=>$("reasonReveal").textContent=btn.dataset.text));

document.querySelectorAll(".choice-row button").forEach(btn=>btn.addEventListener("click",()=>{
  btn.parentElement.querySelectorAll("button").forEach(b=>b.classList.remove("selected")); btn.classList.add("selected");
}));

function getAnswers(){
  const selected=q=>{const b=document.querySelector(`[data-question="${q}"] .selected`);return b?b.dataset.value:"Not answered"};
  return {hurt:$("q1").value.trim()||"Not answered",chance:selected("q2"),needs:$("q3").value.trim()||"Not answered",love:$("q4").value.trim()||"Not answered",respect:selected("q5")};
}
function summary(){const a=getAnswers();return `NIDHI — HONEST CONVERSATION\n\nWhat hurt you most:\n${a.hurt}\n\nDo you still want a chance:\n${a.chance}\n\nWhat you would need from me:\n${a.needs}\n\nOne thing you loved about us:\n${a.love}\n\nDo you want your decision respected:\n${a.respect}`}

$("finishQuestions").addEventListener("click",()=>{
  localStorage.setItem("nidhiAnswers",JSON.stringify(getAnswers()));
  $("saveStatus").textContent="Saved only in this browser. Nothing was uploaded. ❤️";
  $("finale").scrollIntoView({behavior:"smooth"});
});

$("showFinal").addEventListener("click",()=>{
  $("finalMessage").classList.remove("hidden"); $("showFinal").textContent="Thank you for hearing me. ❤️";
  for(let i=0;i<18;i++){const h=document.createElement("span");h.textContent="♥";h.style.position="fixed";h.style.left=(45+Math.random()*10)+"vw";h.style.top="55vh";h.style.fontSize=(14+Math.random()*22)+"px";h.style.pointerEvents="none";h.style.zIndex=10;document.body.appendChild(h);h.animate([{transform:"translateY(0) scale(.7)",opacity:1},{transform:`translate(${(Math.random()-.5)*220}px,-${120+Math.random()*300}px) scale(1.3)`,opacity:0}],{duration:1400+Math.random()*700,easing:"ease-out"}).onfinish=()=>h.remove()}
});

$("copySummary").addEventListener("click",async()=>{
  try{await navigator.clipboard.writeText(summary());$("copyStatus").textContent="Copied. If you screen-record this page, please make sure she knows and is comfortable with the recording. ❤️"}
  catch(e){$("copyStatus").textContent="Copy wasn't available here. The answers remain in this browser."}
});

$("clearAnswers").addEventListener("click",()=>{
  localStorage.removeItem("nidhiAnswers"); ["q1","q3","q4"].forEach(id=>$(id).value=""); document.querySelectorAll(".choice-row button").forEach(b=>b.classList.remove("selected")); $("copyStatus").textContent="Answers cleared from this browser.";
});

try{
 const saved=JSON.parse(localStorage.getItem("nidhiAnswers"));
 if(saved){$("q1").value=saved.hurt==="Not answered"?"":saved.hurt;$("q3").value=saved.needs==="Not answered"?"":saved.needs;$("q4").value=saved.love==="Not answered"?"":saved.love;}
}catch(e){}
