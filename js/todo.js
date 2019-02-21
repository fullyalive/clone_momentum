const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const toDoContent = document.querySelector(".text");

const TODOS_LS = "toDos"; // 투두 로컬스토리지
let toDos = [];

function deleteToDos(event) {
  // 투두리스트를 삭제하는 함수
  const btn = event.target;
  const content = btn.parentNode;
  toDoList.removeChild(content);

  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(content.id); // content.id가 string이기 때문에 int로 바꿔준다
  }); // filter는 조건에 맞는 애들을 array에서 찾아준다.

  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  // 투두를 가져와서 로컬스토리지에 저장하는 역할
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  // 새로운 toDo 리스트 생성 함수
  const toDo = document.createElement("li");
  const deleteBtn = document.createElement("button");
  const toDoContent = document.createElement("span");
  toDoContent.classList.add("text");
  const newId = toDos.length + 1;

  deleteBtn.innerHTML = "❌";
  deleteBtn.addEventListener("click", deleteToDos);

  toDoContent.innerText = text; // submit에서 온 값
  toDo.appendChild(deleteBtn);
  toDo.appendChild(toDoContent);
  toDo.id = newId;
  toDoList.appendChild(toDo);

  const toDoObj = {
    text: text,
    id: newId
  };

  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = ""; // 엔터치고 나서 인풋 폼을 공백으로 만듣는 것
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); // parse, 가져온 것을 자바스크립트 object로 변환시켜줌
    parsedToDos.forEach(function(content) {
      // 각각에 대해서 paintToDo 함수 실행 | content는 potato 등으로 변경해줘도 상관없는 인스턴스
      paintToDo(content.text);
      // modifyToDo(content.text);
    });
    // forEach : array의 속성 - 기본적으로 함수를 실행하는데, array에 담겨 있는 것들 각각에 한번씩 함수를 실행시켜준다.
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
