import Clause from './clause.js';
import Phone from './phone.js';

function signUp() {
  const rootContainer = document.querySelector("#signup-container");
  const headerNextBtn = document.querySelector(".right-btn")
  let level = 0;
  const pageInfo = [
    {
      useHeaderBtn: false,
      renderObj: Clause,
    },
    {
      useHeaderBtn: true,
      headerBtnText: "다음",
      renderObj: Phone,
    },
    {
      useHeaderBtn: true,
      headerBtnText: "완료",
    },
  ]
  // const phone = new Phone();
  
  function render() {
    if (pageInfo[level].useHeaderBtn) {
      headerNextBtn.innerText = pageInfo[level].headerBtnText;
      headerNextBtn.style.display = "block";
    } else {
      headerNextBtn.style.display = "none";
    }
    const currentObj = new pageInfo[level].renderObj();
    rootContainer.appendChild(currentObj.node());
  }
  render();
}

document.addEventListener("DOMContentLoaded", signUp);