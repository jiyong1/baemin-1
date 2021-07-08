import Label from './label.js';

export default function () {
  function randomNumGenerator() {
    let randomNum = parseInt(Math.random() * (9999 - 1) + 1);

    if (randomNum < 10) randomNum = '000' + randomNum;
    else if (randomNum < 100) randomNum = '00' + randomNum;
    else if (randomNum < 1000) randomNum = '0' + randomNum;
    else randomNum = String(randomNum);

    return randomNum;
  }
  const phoneValueChange = (e) => {
    const charArr = e.target.value.split('');
    const numArr = charArr.filter(char => {
      if (+char || char === "0") return true;
      else return false;
    })
    if (numArr.length > 11) {
      alert('휴대전화 형식에 알맞게 작성해주십시오.');
      numArr.splice(11, numArr.length-11);
    }
    if (numArr.length >= 10) {
      this.authBtn.disabled = false;
    } else {
      this.authBtn.disabled = true;
    }
    const resultValue = numArr.reduce((prestr, numChar, idx, { length }) => {
      let plusChar = numChar
      if ((idx === 3)||(idx === 6 && length !== 11)||(idx===7 && length === 11)) plusChar = '-' + plusChar;
      return prestr + plusChar
    }, '')
    e.target.value = resultValue;
  }

  const phoneAuthBtnClickHandler = () => {
    this.wrapper.removeChild(this.wrapper.lastChild);

    this.authNumLabel = new Label("인증번호", false, "text", false);

    this.reAuthContainer = document.createElement('div');
    this.reAuthContainer.setAttribute('class', 're-auth-container');
    
    this.reAuthButton = document.createElement('button');
    this.reAuthButton.setAttribute('class', 'bg-none-btn re-auth-btn');
    this.reAuthButton.innerText = "인증번호 다시받기"

    this.reAuthContainer.appendChild(this.reAuthButton);

    this.wrapper.appendChild(this.authNumLabel.node());
    this.wrapper.appendChild(this.reAuthContainer);

    const randomNumPush = () => {
      const randomNum = randomNumGenerator();
      setTimeout(() => {
        console.log(this.authNumLabel.input);
        this.authNumLabel.input.value = randomNum;
      }, 2000)
    }
    randomNumPush();

    this.reAuthButton.addEventListener('click', randomNumPush);
  }
  this.wrapper = document.createElement("div");
  this.wrapper.setAttribute("class", "input-container");
  this.label = new Label("휴대전화", phoneValueChange, "text");
  this.authBtn = document.createElement("button");
  this.authBtn.setAttribute("class", "phone-auth-btn");
  this.authBtn.innerText = "인증번호 받기";
  this.authBtn.addEventListener("click", phoneAuthBtnClickHandler);
  this.wrapper.appendChild(this.label.node());
  this.wrapper.appendChild(this.authBtn);

  this.node = () => { return this.wrapper };

}