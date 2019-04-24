let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const EndDisplay = document.querySelector(".display__end-time");
const twentySecBreak = document.querySelector('[data-time="20"]');
const fiveMinutesBreak = document.querySelector('[data-time="300"]');
const fifteenMinBreak = document.querySelector('[data-time="900"]');
const twentyMinBreak = document.querySelector('[data-time="1200"]');
const lunchBreak = document.querySelector('[data-time="3600"]');
const customBreak = document.querySelector('[name="customForm"]');
function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayEndTime(then);
  displayTimeLeft(seconds);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  const display = `${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
  timerDisplay.textContent = display;
  //console.log({ minutes, secondsLeft });
}

function displayEndTime(timeStamp) {
  const datetime = new Date(timeStamp);
  const minutes = datetime.getMinutes();
  const hours = datetime.getHours();
  EndDisplay.innerHTML = `Be back at ${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

twentySecBreak.addEventListener("click", function() {
  timer(this.dataset.time);
});

fiveMinutesBreak.addEventListener("click", function() {
  timer(this.dataset.time);
});

fifteenMinBreak.addEventListener("click", function() {
  timer(this.dataset.time);
});

twentyMinBreak.addEventListener("click", function() {
  timer(this.dataset.time);
});

lunchBreak.addEventListener("click", function() {
  timer(this.dataset.time);
});

customBreak.addEventListener("submit", function(e) {
  e.preventDefault();
  const minutes = this.querySelector("input").value;
  const seconds = minutes * 60;
  timer(seconds);
});
