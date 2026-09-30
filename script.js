const joyCards = [...document.querySelectorAll(".joy-card")];
const joyReveal = document.getElementById("joyReveal");
const surpriseButton = document.getElementById("surpriseButton");
const surpriseMessage = document.getElementById("surpriseMessage");

joyCards.forEach((card) => {
  card.addEventListener("click", () => {
    joyCards.forEach((item) => {
      item.classList.remove("is-selected");
      item.setAttribute("aria-pressed", "false");
    });
    card.classList.add("is-selected");
    card.setAttribute("aria-pressed", "true");

    joyReveal.innerHTML = `<span class="reveal-sparkle" aria-hidden="true">${card.dataset.icon}</span><p>${card.dataset.message}</p>`;
  });
  card.setAttribute("aria-pressed", "false");
});

const tinyNotes = [
  "You deserve the kind of care that feels calm, kind, and real. ♡",
  "I hope something lovely finds you today. You deserve that. ✦",
  "Your smile is one of my favorite things in this whole world. ☼",
  "Just a reminder from me: you are so, so loved. ♥",
  "Sending you a pocket-sized hug and lots of affection. ✿"
];
let noteIndex = 0;

surpriseButton.addEventListener("click", () => {
  surpriseMessage.textContent = tinyNotes[noteIndex % tinyNotes.length];
  noteIndex += 1;
  sendHearts();
});

function sendHearts() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  for (let i = 0; i < 13; i += 1) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = i % 3 === 0 ? "✦" : "♥";
    heart.style.left = `${42 + Math.random() * 16}vw`;
    heart.style.fontSize = `${12 + Math.random() * 15}px`;
    heart.style.setProperty("--drift", `${(Math.random() - 0.5) * 210}px`);
    heart.style.setProperty("--spin", `${(Math.random() - 0.5) * 70}deg`);
    document.body.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove(), { once: true });
  }
}
