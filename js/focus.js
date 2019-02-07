const focusForm = document.querySelector(".js-focusForm");
const focusInput = focusForm.querySelector("input");
const focus = document.querySelector(".js-focus");

const FOCUS_LS = "todayFocus"; // todayFocus
const SHOWING_CF = "showing"; // showing className

function saveFocus(text) {
  localStorage.setItem(FOCUS_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = focusInput.value;
  paintFocus(currentValue);
  saveFocus(currentValue);
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

function loadFocus() {
  const currentFocus = localStorage.getItem(FOCUS_LS);
  if (currentFocus === null) {
    askForFocus();
  } else {
    paintFocus(currentFocus);
  }
}
function init() {
  loadFocus();
}

init();
