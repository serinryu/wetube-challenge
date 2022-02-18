import regeneratorRuntime from "regenerator-runtime";
const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelector(".delete-comment"); 
const oneComment = document.querySelector(".video__comment"); 

const addComment = (text) => {
    const videoComments = document.querySelector(".video__comments ul"); //일회성이니까
    const newComment = document.createElement("li");
    const icon = document.createElement("i");
    const span = document.createElement("span");
    const span2 = document.createElement("span");
    newComment.className = "video__comment";
    icon.className = "fas fa-comment";
    span2.className = "delete-comment";
    span.innerText = ` ${text}`;
    span2.innerText = "❌";
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(span2);
    videoComments.prepend(newComment);
};

const deleteComment = (event) => {
    const li = event.srcElement.parentNode; //click 이벤트가 발생한 span의 부모노드
    li.remove();
};

const handleSubmit =  async (e) => {
    e.preventDefault(); //"submit"이라는 이벤트의 '기본동작'을 멈춰라.
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;  //data-attribute! movie._id 정보를 가지고 있음.
    if (text === "") {
        return;
    }
    const response = await fetch(`/api/movies/${videoId}/comment`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });
    if (response.status === 201) {  //fetch 작업을 성공했을 때 
        textarea.value = "";
        addComment(text);
    }
};

const handleDelete = async (event) => {
    const commentId = oneComment.dataset.id;
    const response = await fetch(`/api/movies/${commentId}/comment/delete`, { 
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    });
    if(response.status === 201) {
        deleteComment(event);
    }
    if(response.status === 403) {
        alert("댓글 주인이 아닙니다.");
    }
};


if(form){
    form.addEventListener("submit", handleSubmit);
};
if(deleteBtn){
    deleteBtn.addEventListener("click", handleDelete);
};