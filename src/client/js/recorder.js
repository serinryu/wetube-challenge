import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");
let stream; //stream 전역 변수로 선언
let recorder;
let videoFile;

const handleDownload = async () => {
    startBtn.innerText = "Downloading...";
    startBtn.disabled = true;
    const ffmpeg = createFFmpeg({ 
        corePath: "/convert/ffmpeg-core.js",
        log: true 
    });
    await ffmpeg.load();
    ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));
    
    await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");
    await ffmpeg.run(
        "-i",
        "recording.webm",
        "-ss",
        "00:00:01",
        "-frames:v",
        "1",
        "thumbnail.jpg"
      );
    const mp4File = ffmpeg.FS("readFile", "output.mp4");
    const thumbFile = ffmpeg.FS("readFile", "thumbnail.jpg");

    const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
    const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

    const mp4Url = URL.createObjectURL(mp4Blob);
    const thumbUrl = URL.createObjectURL(thumbBlob);

    const a = document.createElement("a");
    a.href = mp4Url;
    a.download = "MyRecording.mp4";
    document.body.appendChild(a);
    a.click();

    const thumbA = document.createElement("a");
    thumbA.href = thumbUrl;
    thumbA.download = "MyThumbnail.jpg";
    document.body.appendChild(thumbA);
    thumbA.click();

    /* 브라우저 속도가 느려지는 것이 걱정된다면, 파일의 링크를 해제할 수 있다.(메모리에서 삭제) */
    ffmpeg.FS("unlink", "recording.webm"); //소스파일
    ffmpeg.FS("unlink", "output.mp4");
    ffmpeg.FS("unlink", "thumbnail.jpg");

    /* 브라우저 속도가 느려지는 것이 걱정된다면, url 삭제할 수 있다. */
    URL.revokeObjectURL(mp4Url);
    URL.revokeObjectURL(thumbUrl);
    URL.revokeObjectURL(videoFile);

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