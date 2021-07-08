import Clause from './clause.js';
import Phone from './phone.js';
import UserInfo from './userinfo.js';

function signUp() {
  const rootContainer = document.querySelector("#signup-container");
  const headerNextBtn = document.querySelector(".right-btn");
  const headerPrevBtn = document.querySelector(".back-btn");
  const nextEvent = new CustomEvent("validNext");
  let currentObj;
  let level = 0;
  let historyInfo;
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
      renderObj: UserInfo
    },
  ];
  
  function setState(info) {
    historyInfo = {
      ...historyInfo,
      ...info
    }
  }
  function goNext() {
    setState(currentObj.getState());
    level++;
    render();
  }
  function goBack() {
    level --;
    if (level < 0) history.back();
    render(false);
  }

  function render(isRight=true) {
    window.scrollTo(0, 0);
    currentObj = new pageInfo[level].renderObj(nextEvent);
    currentObj.init(historyInfo);
    if (pageInfo[level].useHeaderBtn) {
      headerNextBtn.innerText = pageInfo[level].headerBtnText;
      headerNextBtn.style.display = "block";
      headerNextBtn.disabled = true;
    } else {
      headerNextBtn.style.display = "none";
      currentObj.nextBtn().addEventListener('click', goNext);
    }
    if (rootContainer.hasChildNodes()) {
      // slide
      if (isRight) {
        rootContainer.appendChild(currentObj.node());
        rootContainer.style.transform = "translate3D(-100%, 0 , 0)";
        setTimeout(() => {
          rootContainer.removeChild(rootContainer.firstChild);
          rootContainer.setAttribute("style", "transition: none;");
          setTimeout(() => {
            rootContainer.removeAttribute("style");
          }, 100)
        }, 600);
      } else {
        rootContainer.style.transition = "none";
        rootContainer.insertBefore(currentObj.node(), rootContainer.firstChild);
        rootContainer.style.transform = "translate3D(-100%, 0 , 0)";
        setTimeout(() => {
          rootContainer.removeAttribute("style");
          setTimeout(() => {
            rootContainer.removeChild(rootContainer.lastChild);
          }, 600);
        }, 0);
      }
    } else {
      rootContainer.appendChild(currentObj.node());
    }
  }
  render();

  rootContainer.addEventListener("validNext", () => {
    if (pageInfo[level].useHeaderBtn) {
      headerNextBtn.disabled = false;
    }
  })
  headerNextBtn.addEventListener("click", goNext);
  headerPrevBtn.addEventListener("click", goBack);
}

document.addEventListener("DOMContentLoaded", signUp);