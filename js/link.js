const button = document.querySelector(".linkBox");
const linkIcon = document.querySelector(".linkBox i");
const linkContainer = document.querySelector(".linkContainer");
const addLink = document.querySelector(".addLink");
const cancelBtn = document.querySelector(".cancelBtn");
const linkForm = document.querySelector(".js-linkForm");

function handleAddLink() {
  cancelBtn.classList.remove("removed");
  addLink.classList.add("removed");
  linkForm.classList.add("showing");
}

function handleCancelBtn() {
  cancelBtn.classList.add("removed");
  addLink.classList.remove("removed");
  linkForm.classList.remove("showing");
}

function handleClick() {
  linkContainer.classList.toggle("showing");
  addLink.addEventListener("click", handleAddLink);
  cancelBtn.addEventListener("click", handleCancelBtn);
  console.log(cancelBtn, 111);
}

function loadLinks() {
  linkIcon.addEventListener("click", handleClick);
}

function init() {
  loadLinks();
}

init();
