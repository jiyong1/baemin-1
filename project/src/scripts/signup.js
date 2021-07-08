import Phone from './phone.js';

function signUp() {
  const rootContainer = document.querySelector("#signup-container");
  const phone = new Phone();
  rootContainer.appendChild(phone.node());
}

document.addEventListener("DOMContentLoaded", signUp);