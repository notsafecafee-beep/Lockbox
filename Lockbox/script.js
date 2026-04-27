/* FLOWER OPTIONS */
const flowers = [
  "https://i.postimg.cc/3NSm3pJf/Screenshot-2026-04-26-220415.png",
  "https://i.postimg.cc/wTcGnCbF/Screenshot-2026-04-26-215803.png",
  "https://i.postimg.cc/2ychCv8X/Screenshot-2026-04-26-220703.png",
  "https://i.postimg.cc/J06ZRJ4T/Screenshot-2026-04-26-220118.png"
];

/* CORRECT COMBINATION (indexes of flowers[]) */
const correctCode = [2, 0, 3, 1]; // <-- FIXED

/* ELEMENTS */
const slots = document.querySelectorAll(".slot");
const enterBtn = document.getElementById("enter");
const lock = document.getElementById("lock");
const question = document.getElementById("question");
const reveal = document.getElementById("reveal");

/* GLITCH SOUND */
const glitchSound = new Audio("https://cdn.pixabay.com/download/audio/2025/07/24/audio_80472f5d2c.mp3?filename=virtual_vibes-digital-glitch-noise-hd-379465.mp3");

/* CURRENT POSITIONS */
let positions = [0, 0, 0, 0];

/* INITIALIZE FLOWERS */
slots.forEach((slot, index) => {
  const img = slot.querySelector(".flower");
  img.src = flowers[positions[index]];

  slot.querySelector(".up").addEventListener("click", () => {
    positions[index] = (positions[index] + 1) % flowers.length;
    img.src = flowers[positions[index]];
    glitchScreen();
  });

  slot.querySelector(".down").addEventListener("click", () => {
    positions[index] = (positions[index] - 1 + flowers.length) % flowers.length;
    img.src = flowers[positions[index]];
    glitchScreen();
  });
});

/* ENTER BUTTON LOGIC */
enterBtn.addEventListener("click", () => {
  const correct = positions.every((val, i) => val === correctCode[i]);

  if (correct) {
    enterBtn.classList.remove("wrong");
    enterBtn.classList.add("correct");

    lock.style.opacity = "0";
    reveal.classList.remove("hidden");

    // SHOW AUDIO BUTTON
    audioButton.classList.remove("hidden");

  } else {
    enterBtn.classList.remove("correct");
    enterBtn.classList.add("wrong");

    question.classList.add("shake");
    setTimeout(() => question.classList.remove("shake"), 300);

    glitchScreen();
  }
});

/* GLITCH EFFECT */
function glitchScreen() {
  document.body.style.filter = "invert(1)";
  glitchSound.currentTime = 0;
  glitchSound.play();

  setTimeout(() => {
    document.body.style.filter = "invert(0)";
  }, 120);
}

/* AUDIO BUTTON */
const audioButton = document.getElementById("audioButton");
const audioClip = new Audio("audio/tape0.wav");

audioButton.addEventListener("click", () => {
  audioClip.currentTime = 0;
  audioClip.play();
});
