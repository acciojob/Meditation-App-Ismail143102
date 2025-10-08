//your JS code here. If required.
const audio = document.getElementById("audio");
const background = document.getElementById("background");
const playBtn = document.querySelector(".play");
const soundButtons = document.querySelectorAll(".sound-picker button");
const timeButtons = document.querySelectorAll(".time-select button");
const timeDisplay = document.querySelector(".time-display");

let fakeDuration = 600; // default 10 mins in seconds
let timer;
let isPlaying = false;

// Play / Pause
playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    playBtn.textContent = "Pause";
    isPlaying = true;
    startTimer();
  } else {
    audio.pause();
    playBtn.textContent = "Play";
    isPlaying = false;
    clearInterval(timer);
  }
});

// Switch Meditation Sound & Background Image
soundButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const sound = btn.getAttribute("data-sound");
    const img = btn.getAttribute("data-image");
    audio.src = `Sounds/${sound}.mp3`;
    background.src = img;
    if(isPlaying){
      audio.play();
    }
  });
});

// Select Meditation Time
timeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if(btn.id === "smaller-mins") fakeDuration = 120;
    if(btn.id === "medium-mins") fakeDuration = 300;
    if(btn.id === "long-mins") fakeDuration = 600;
    updateTimeDisplay(fakeDuration);
  });
});

// Timer Function
function startTimer(){
  clearInterval(timer);
  let currentTime = fakeDuration;
  timer = setInterval(() => {
    currentTime--;
    updateTimeDisplay(currentTime);
    if(currentTime <= 0){
      audio.pause();
      playBtn.textContent = "Play";
      isPlaying = false;
      clearInterval(timer);
    }
  }, 1000);
}

// Update Time Display
function updateTimeDisplay(time){
  let minutes = Math.floor(time/60);
  let seconds = time % 60;
  timeDisplay.textContent = `${minutes}:${seconds}`;
}

// Initialize Display
updateTimeDisplay(fakeDuration);
