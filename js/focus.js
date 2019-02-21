const focusForm = document.querySelector(".js-focusForm");
const focusInput = focusForm.querySelector("input");
const focus = document.querySelector(".js-focus");

const FOCUS_LS = "todayFocus"; // todayFocus
const SHOWING_CF = "showing"; // showing className

function saveFocus(text) {
  localStorage.setItem(FOCUS_LS, text);
}

function askForFocus() {
  focusForm.classList.add(SHOWING_CF);
  focusForm.addEventListener("submit", handleSubmit);
}

function paintFocus(text) {
  focusForm.classList.remove(SHOWING_CF);
  focus.classList.add(SHOWING_CF);
  focus.innerText = `${text}`;
}

function modifyFocus() {
  focus.addEventListener("click", handleModify);
  focusForm.addEventListener("submit", handleSubmit);
}

function handleModify() {
  const currentValue = localStorage.getItem(FOCUS_LS);
  focus.classList.remove(SHOWING_CF);
  focusForm.classList.add(SHOWING_CF);
  focusInput.setAttribute("value", currentValue);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = focusInput.value;
  paintFocus(currentValue);
  saveFocus(currentValue);
}

function loadFocus() {
  const currentFocus = localStorage.getItem(FOCUS_LS);
  if (currentFocus === null) {
    askForFocus();
  } else {
    paintFocus(currentFocus);
    modifyFocus(currentFocus);
  }
}
function init() {
  loadFocus();
}

init();
