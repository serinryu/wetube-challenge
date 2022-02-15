const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = (event) => {
    event.preventDefault(); //"submit"이라는 이벤트의 '기본동작'을 멈춰라.
    const textarea = form.querySelector("textarea");
    const btn = form.querySelector("button");
    const text = textarea.value;
    const video = videoContainer.dataset.id; 
};

if(form){
    form.addEventListener("submit", handleSubmit);
};
