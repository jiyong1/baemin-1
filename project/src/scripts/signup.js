

function signUp() {
  const signupContainer = document.querySelector("#signup-container");
  const clauseContainer = document.querySelector(".clause-container");
  const phoneContainer = document.querySelector(".phone-container");
  const $backBtn = document.querySelector(".back-btn");

  function init() {
    while (signupContainer.childNodes.length > 1) signupContainer.removeChild(signupContainer.lastChild);
  }

  function historyBack() {
    history.back();
  }
  function phoneValueChange(e) {
    const charArr = e.target.value.split('');
    const numArr = charArr.filter(char => {
      if (+char || char === "0") return true;
      else return false;
    })
    if (numArr.length > 11) {
      alert('휴대전화 형식에 알맞게 작성해주십시오.');
      numArr.splice(11, numArr.length-11);
    }
    const resultValue = numArr.reduce((prestr, numChar, idx, { length }) => {
      let plusChar = numChar
      if ((idx === 3)||(idx === 6 && length !== 11)||(idx===7 && length === 11)) plusChar = '-' + plusChar;
      return prestr + plusChar
    }, '')
    e.target.value = resultValue;
  }
  init();
  $backBtn.addEventListener('click', historyBack);
  document.querySelector('.phone-input').addEventListener('keyup', phoneValueChange);
}

document.addEventListener("DOMContentLoaded", signUp);