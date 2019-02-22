const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const toDoContent = document.querySelector(".text");
const toDoModifyForm = document.querySelector(".modifyForm");

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

function modifyToDo(event) {
  // 투두리스트를 수정하는 함수
  const modifyForm = event.target.parentNode.lastChild;   // 사용자가 toDo를 선택했을 때 선택한 toDo의 부모인 li element의 마지막 자식인 modifyForm을F 선택
  const previousText = modifyForm.previousSibling; // modifyForm의 이전 형제인 수정 전의 toDo를 가져옴
  previousText.classList.add("removed"); // 수정 전의 toDo에 display: none의 removed클래스를 줘서 안보이게 처리
  modifyForm.classList.add("clicked"); // 수정 할 수 있는 Form을 display: flex의 clicked클래스를 줘서 
  modifyForm.addEventListener("submit", handleSubmit);
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
  const modifyForm = document.createElement("form");
  const modifyInput = document.createElement("input");
  const newId = toDos.length + 1;

  toDo.classList.add("todo");
  toDoContent.classList.add("text");
  modifyForm.classList.add("modifyForm");
  modifyInput.type = "text";
  modifyInput.classList.add("modifyInput");
  modifyInput.setAttribute("value", text);

  deleteBtn.classList.add("deleteBtn");
  deleteBtn.innerHTML = "❌";
  deleteBtn.addEventListener("click", deleteToDos);

  toDoContent.addEventListener("click", modifyToDo);
  toDoContent.innerText = text; // submit에서 온 값

  toDo.appendChild(deleteBtn);
  toDo.appendChild(toDoContent);
  toDo.appendChild(modifyForm);
  modifyForm.appendChild(modifyInput);

  toDo.id = newId;
  toDoList.appendChild(toDo);

  const toDoObj = {
    id: newId,
    text: text
  };

  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const selector = event.target;
  let currentValue = "";
  if (selector.className === "js-toDoForm") {
    currentValue = toDoInput.value;
    toDoInput.value = ""; // 엔터치고 나서 인풋 폼을 공백으로 만드는 것
    paintToDo(currentValue);
  } else {
    currentValue = selector.lastChild.value;
    selector.classList.remove("clicked"); // 엔터 친 이후 input란이 사라지도록
    selector.previousSibling.classList.remove("removed"); // 엔터 친 이후 toDo가 나타나도록
    selector.previousSibling.innerHTML = `${currentValue}`; // 엔터 친 이후 currentValue로
    toDos[selector.parentNode.id - 1].text = `${currentValue}`;
    saveToDos();
  }
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); // parse, 가져온 것을 자바스크립트 object로 변환시켜줌
    parsedToDos.forEach(function(input) {
      // 각각에 대해서 paintToDo 함수 실행 | content는 potato 등으로 변경해줘도 상관없는 인스턴스
      paintToDo(input.text);
    });
    // forEach : array의 속성 - 기본적으로 함수를 실행하는데, array에 담겨 있는 것들 각각에 한번씩 함수를 실행시켜준다.
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
