const video = document.querySelector("video");
const videoControls = document.getElementById("videoControls");
const timeline = document.getElementById("timeline");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");

let volumeValue = 0.5;
video.volume = volumeValue;
const formatTime = (seconds) => {
    return new Date(seconds * 1000).toISOString().substring(14, 19);
};
let controlsTimeout = null; 
let controlsMovementTimeout = null; //전역변수로 만듬

const handlePlayClick = (e) => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}
const handlePause = () => {
    playBtnIcon.classList = "fas fa-play";
    volumeValue = video.value;
}
const handlePlay = () => {
    playBtnIcon.classList = "fas fa-pause";
    volumeValue = video.value;
};

const handleMute = (e) => {
    if (video.muted) {
        video.muted = false;
    }
    else {
        video.muted = true;
    }
    muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
    volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolume = (event) => {
    const {
        target : { value },
    } = event;
    if (video.muted) { //mute 가 풀어진다
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    volumeValue = value;
    video.volume = volumeValue;
}

const handleLoadedMetadata = () => {
    console.log("hi");
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);
};
const handleTimeUpdate = () => {
    currenTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value = Math.floor(video.currentTime);
};
const handleTimeline = (event) => {
    const {
        target: { value },
    } = event;
    video.currentTime = value;
};
const handleFullscreen = () => {
    const fullscreen = document.fullscreenElement;
    if (fullscreen) {
        document.exitFullscreen();
        fullScreenIcon.classList = "fas fa-expand";
    } else {
        videoContainer.requestFullscreen();
        fullScreenIcon.classList = "fas fa-compress";
    }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout); //가지고 있던 timeout 취소
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000); //타이머 시작. 3초 후에 hideControls 실행됩니다
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(() => {
    videoControls.classList.remove("showing");
  }, 3000);  //바로 사라지게 하는 것이 아니라 3초 기다리고 class 제거
};

/*키보드-영상 단축키 모음*/
const keyboardShortcut = (e) => {
    if(e.code == 'Space'&& e.target.id !== "textarea"){
        handlePlayClick();
    }
    if(e.code == 'KeyF'&& e.target.id !== "textarea"){
        handleFullscreen();
    }
};

const handleEnded = () => {
    const { id } = videoContainer.dataset;
    fetch(`/api/movies/${id}/view`, {
      method: "POST",
    });
};

video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
playBtn.addEventListener("click", handlePlayClick);
video.addEventListener("click", handlePlayClick);
video.addEventListener("pause", handlePause);
video.addEventListener("play", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolume);
video.addEventListener("loadeddata", handleLoadedMetadata); 
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimeline);
fullScreenBtn.addEventListener("click", handleFullscreen);
document.addEventListener("keydown", keyboardShortcut);
video.addEventListener("ended", handleEnded);