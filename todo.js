const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos"; // toDos Local Storage

function paintToDo(text) {
  const toDo = document.createElement("li");
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "❌";
  const toDoContent = document.createElement("span");
  toDoContent.innerText = text; // submit에서 온 값
  toDo.appendChild(deleteBtn);
  toDo.appendChild(toDoContent);
  toDoList.appendChild(toDo);
}

function loadToDos() {
  const toDos = localStorage.getItem(TODOS_LS);
  if (toDos !== null) {
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
