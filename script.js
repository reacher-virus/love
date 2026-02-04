/* --- CONFIGURATION (EDIT THIS) --- */
const startDate = new Date(2023, 9, 13); // Month is 0-indexed (Sept = 8)
const phoneNumber = "916305883725"; // Your phone number

/* --- ELEMENTS --- */
const music = document.getElementById("music");
const cursorHeart = document.getElementById("cursor-heart");
const noBtn = document.getElementById("noBtn");

/* --- NAVIGATION --- */
function showSection(id) {
  document
    .querySelectorAll("section")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* --- ENVELOPE & TYPEWRITER --- */
function openEnvelope() {
  document.querySelector(".envelope").classList.add("open");
  setTimeout(() => {
    showSection("letter");
    music.play().catch((e) => console.log("Audio requires interaction"));
    typeWriter();
  }, 1200);
}

const letterText = `I don’t remember the exact moment it started.
I just know that at some point,
things felt easier when you were around.

Talking to you felt natural.
Sitting quietly didn’t feel awkward.

I didn’t plan to feel this way.

It just happened 
and it stayed.`;

function typeWriter() {
  const container = document.querySelector(".letter-text");
  container.innerHTML = "";
  let i = 0;
  const speed = 50;

  function type() {
    if (i < letterText.length) {
      const char = letterText.charAt(i);
      container.innerHTML += char === "\n" ? "<br>" : char;
      i++;
      setTimeout(type, speed);
    } else {
      document.getElementById("decision-block").style.opacity = "1";
    }
  }
  type();
}

/* --- ACCEPT FLOW --- */
function accept() {
  showSection("accepted");
  setTimeout(() => {
    showSection("gift");
    startTimer();
  }, 3500);
}

/* --- RUNAWAY BUTTON --- */
if (noBtn) {
  noBtn.addEventListener("mouseover", moveButton);
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveButton();
  });
}

function moveButton() {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

/* --- EXTRAS --- */
function startTimer() {
  function update() {
    const diff = new Date() - startDate;
    document.getElementById("days").innerText = Math.floor(
      diff / (1000 * 60 * 60 * 24),
    );
  }
  update();
  setInterval(update, 3600000);
}

function sendWhatsapp() {
  const msg = "I saw the website. I love it (and you).";
  window.open(
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`,
    "_blank",
  );
}

/* --- CURSOR --- */
let mouseX = 0,
  mouseY = 0,
  heartX = 0,
  heartY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateHeart() {
  heartX += (mouseX - heartX) * 0.15;
  heartY += (mouseY - heartY) * 0.15;
  if (cursorHeart) {
    cursorHeart.style.left = heartX + "px";
    cursorHeart.style.top = heartY + "px";
  }
  requestAnimationFrame(animateHeart);
}
animateHeart();

/* --- CLICK HEARTS --- */
document.addEventListener("click", (e) => {
  const h = document.createElement("div");
  h.textContent = "♥";
  Object.assign(h.style, {
    position: "fixed",
    left: e.clientX + "px",
    top: e.clientY + "px",
    color: `hsl(${Math.random() * 60 + 300},100%,70%)`,
    fontSize: Math.random() * 20 + 10 + "px",
    pointerEvents: "none",
    zIndex: "9999",
    animation: "floatUp 1.5s ease-out forwards",
  });
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 1500);
});

const style = document.createElement("style");
style.innerHTML = `@keyframes floatUp { to { transform: translateY(-100px); opacity: 0; } }`;
document.head.appendChild(style);
