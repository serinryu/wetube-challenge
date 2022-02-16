const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.className = "video__comment";
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    newComment.appendChild(icon);
    newComment.appendChild(span);
    videoComments.prepend(newComment);
};

const handleSubmit =  async  (event) => {
    event.preventDefault(); //"submit"이라는 이벤트의 '기본동작'을 멈춰라.
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;  //data-attribute! movie._id 정보를 가지고 있음.
    if (text === "") {
        return;
    }
    const { status } = await fetch(`/api/movies/${videoId}/comment`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });
    textarea.value = "";
    if (status === 201) {  //fetch 작업을 성공했을 때 
        addComment(text);
    }
};

if(form){
    form.addEventListener("submit", handleSubmit);
};
