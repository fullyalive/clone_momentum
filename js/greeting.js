const greetingForm = document.querySelector(".js-form");
const greetingInput = greetingForm.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser"; // user localStorage
const SHOWING_CN = "showing"; // showing className

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = greetingInput.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  greetingForm.classList.add(SHOWING_CN);
  greetingForm.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  const date = new Date();
  const time = date.getHours();
  let greetingWord = "";

  if (time < 7) {
    greetingWord = "Good day";
  } else if (time < 10) {
    greetingWord = "Good morning";
  } else if (time < 18) {
    greetingWord = "Good afternoon";
  } else {
    greetingWord = "Good evening";
  }

  greetingForm.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `${greetingWord}, ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
