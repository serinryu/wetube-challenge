import regeneratorRuntime from "regenerator-runtime";
const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelector(".delete-comment"); 
const oneComment = document.querySelector(".video__comment"); 

/* 프로필 사진으로 인해, 너무 복잡해지는 문제 발생. 그냥 리로드로 해결 */
// const addComment = (text, id) => {
//     const videoComments = document.querySelector(".video__comments ul"); //일회성이니까
//     const newComment = document.createElement("li");
//     newComment.dataset.id = id;
//     newComment.className = "video__comment";
//     console.log(id);
//     const p = document.createElement("p");
//     const div = document.createElement("div");
//     const div2 = document.createElement("div");
//     newComment.className = "video__comment";
//     div.className = "comment-text";
//     div2.className = "delete-comment";
//     p.innerText = `${id}`
//     div.innerText = `${text}`;
//     div2.innerText = "❌";
//     newComment.appendChild(div);
//     div.appendChild(div2);
//     videoComments.prepend(newComment);
// };

const deleteComment = (event) => {
    const div = event.srcElement.parentElement; //click 이벤트가 발생한 span의 부모노드
    const li = div.parentElement;
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
        const { newCommentId } = await response.json();
        //addComment(text, newCommentId);
        location.reload();
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