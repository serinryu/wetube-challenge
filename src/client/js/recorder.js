const startBtn = document.getElementById("startBtn")
const video = document.getElementById("preview")
let stream; //stream 전역 변수로 선언
let recorder;
let videoFile;

const handleDownload = () => {
    const a = document.createElement("a");
    a.href = videoFile;
    a.download = "MyRecording.webm";
    document.body.appendChild(a);
    a.click();
    startBtn.removeEventListener("click", handleDownload);
    init();
    startBtn.innerText = "Start Recording";
    startBtn.addEventListener("click", handleStart);
};

const handleStart = () => {
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);

    recorder = new MediaRecorder(stream,{ mimeType: "video/webm" });
    recorder.ondataavailable = (event) => {
      videoFile = URL.createObjectURL(event.data);
      video.srcObject = null;
      video.src = videoFile;
      video.loop = true; // 반복재생
      video.play();
    }; // recorder.stop(); 될 때 실행
    recorder.start();
}

const handleStop = () => {
    startBtn.innerText = "Download Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleDownload);
    recorder.stop();
}

const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
    });
    video.srcObject = stream;
    video.play();
};

init(); //preview 는 계속 보여줌

startBtn.addEventListener("click", handleStart);