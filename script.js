const SECRET = "nidhi"; // CHANGE THIS to your private password

const gate = document.getElementById("gate");
const site = document.getElementById("site");
const password = document.getElementById("password");
const wrong = document.getElementById("wrong");

function unlock() {
  if (password.value.trim().toLowerCase() === SECRET.toLowerCase()) {
    gate.classList.add("hidden");
    site.classList.remove("hidden");
    document.body.style.overflowX = "hidden";
    window.scrollTo(0, 0);
  } else {
    wrong.textContent = "Hmm... that's not our secret. Try again ❤️";
    password.value = "";
    password.focus();
  }
}
document.getElementById("unlock").addEventListener("click", unlock);
password.addEventListener("keydown", e => { if (e.key === "Enter") unlock(); });

document.getElementById("begin").addEventListener("click", () => {
  document.getElementById("letter").scrollIntoView({behavior:"smooth"});
});

const letterText = `I could have just written you a normal message.

But normal felt a little too boring for you.

So I made this tiny corner of the internet instead — a place with your name on it, because you deserve little things made especially for you.

I don't know what the future will look like, or how many stories we'll add to ours.

I just know that when I think about the person I want beside me through all of it, it's you.

Thank you for being you.

And thank you for being my favourite person to annoy, love, laugh with, and come back to.

❤️`;

document.getElementById("envelope").addEventListener("click", () => {
  document.getElementById("envelope").classList.add("hidden");
  const card = document.getElementById("letterCard");
  card.classList.remove("hidden");
  const target = document.getElementById("typed");
  target.textContent = "";
  let i = 0;
  function type() {
    if (i < letterText.length) {
      target.textContent += letterText[i++];
      setTimeout(type, 18);
    }
  }
  type();
});

document.querySelectorAll(".reason").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById("reasonReveal").textContent = btn.dataset.text;
  });
});

document.getElementById("choose").addEventListener("click", () => {
  const msg = document.getElementById("finalMessage");
  msg.classList.remove("hidden");
  document.getElementById("choose").textContent = "Always. ❤️";
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("span");
    heart.textContent = "♥";
    heart.style.position = "fixed";
    heart.style.left = (45 + Math.random()*10) + "vw";
    heart.style.top = "55vh";
    heart.style.fontSize = (14 + Math.random()*22) + "px";
    heart.style.color = "#ff6f91";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "10";
    document.body.appendChild(heart);
    heart.animate([
      {transform:"translateY(0) scale(.7)", opacity:1},
      {transform:`translate(${(Math.random()-.5)*220}px,-${120+Math.random()*300}px) scale(1.3)`,opacity:0}
    ], {duration:1400+Math.random()*700, easing:"ease-out"}).onfinish=()=>heart.remove();
  }
});
