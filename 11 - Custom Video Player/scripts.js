const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const videoPlayButton = player.querySelector(".toggle");
const progress = player.querySelector(".progress");
const soundSlider = player.querySelector('[name="volume"]');
const playBackSlider = player.querySelector('[name="playbackRate"]');
const skip25 = player.querySelector('[data-skip="25"]');
const back10 = player.querySelector('[data-skip="-10"]');

window.timeInterval = 1000; // 1 sec

let currentDuration = 0;
let interval;
let volumeSliderCliked = false;
let playBackSliderCliked = false;
let progressbar = 0;
let progressBarMulitplier = 0;

let percentageIndex = 0;
let newProgressbar = 0;

function playVideo() {
  let method = null;
  let icon = null;

  if (video.paused) {
    method = "play";
    icon = "❚ ❚";
    interval = setInterval(handleProgressBar, window.timeInterval);
  } else {
    method = "pause";
    icon = "►";
    clearInterval(interval);
  }

  video[method]();
  videoPlayButton.innerHTML = icon;
}

function handleProgressBar() {
  const videoDuration = 100 / video.duration;

  currentDuration = currentDuration + videoDuration;

  if (!video.ended) {
    document.documentElement.style.setProperty(
      "--progressBar",
      `${currentDuration}%`
    );
  } else {
    icon = "►";
    videoPlayButton.innerHTML = icon;
    currentDuration = 0;
    clearInterval(interval);
  }
}

function adjustTimeSlider(e) {
  let progress = e.offsetX / this.offsetWidth;
  progressbar = progress * 100;
  video.currentTime = video.duration * progress;
  document.documentElement.style.setProperty(
    "--progressBar",
    `${progressbar}%`
  );
  currentDuration = progressbar;
}

function adjustVolume(e) {
  if (volumeSliderCliked) {
    video.volume = e.srcElement.value;
  }
}

function adjustPlayBackRate(e) {
  if (playBackSliderCliked && !video.paused) {
    let playBackValue = e.srcElement.valueAsNumber;
    video.playbackRate = playBackValue;

    window.timeInterval = 1000 / playBackValue;

    clearInterval(interval);
    if (!video.ended) {
      interval = setInterval(handleProgressBar, window.timeInterval);
    }

    console.log(playBackValue);
  }
}

video.addEventListener("click", playVideo);
videoPlayButton.addEventListener("click", playVideo);
progress.addEventListener("click", adjustTimeSlider);
soundSlider.addEventListener("mousedown", () => (volumeSliderCliked = true));
soundSlider.addEventListener("mousemove", adjustVolume);
playBackSlider.addEventListener(
  "mousedown",
  () => (playBackSliderCliked = true)
);
playBackSlider.addEventListener("mousemove", adjustPlayBackRate);

//FOR PLAY SKIP 25S
skip25.addEventListener("click", e => {
  video.currentTime = video.currentTime + 25; // plus 25 secs.

  progressbar = document.documentElement.style.getPropertyValue(
    "--progressBar",
    `${progressbar}%`
  );

  percentageIndex = progressbar.indexOf("%");
  progressBarMulitplier = 100 / (video.duration / 25);
  progressbar = Number(progressbar.substring(0, percentageIndex));

  progressbar = progressbar + progressBarMulitplier;

  document.documentElement.style.setProperty(
    "--progressBar",
    `${progressbar}%`
  );
  currentDuration = progressbar;
});
// END

//FOR PLAY BACK 10S
back10.addEventListener("click", e => {
  video.currentTime = video.currentTime - 10; // minus 10 secs.

  progressbar = document.documentElement.style.getPropertyValue(
    "--progressBar",
    `${progressbar}%`
  );

  percentageIndex = progressbar.indexOf("%");
  progressBarMulitplier = 100 / (video.duration / 10);
  progressbar = Number(progressbar.substring(0, percentageIndex));

  progressbar = progressbar - progressBarMulitplier;

  document.documentElement.style.setProperty(
    "--progressBar",
    `${progressbar}%`
  );
  currentDuration = progressbar;
  clearInterval(interval);
  interval = setInterval(handleProgressBar, window.timeInterval);
});
//END
