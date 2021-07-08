import label from './label.js';
import Label from './label.js';
import setAttrs from './setatt.js';

export default function (validEvent) {
  this.container = document.createElement("div");
  this.container.classList.add("userinfo-container","input-container");
  
  //각 인풋 라벨들
  const labels = {
    email : new Label("이메일", ()=>{}, 'email'),
    password : new Label("비밀번호", passwordEvent, 'password'),
    nickname : new Label("닉네임", nickNameEvent),
    brith : new Label("생년월일", brithEvent)
  }
  //이메일에는 keyup 함수가아닌 중복확인으로만 설저
  labels.email.input.removeEventListener('keyup', ()=>{});
  //생년월일 인풋 placeholder
  labels.brith.input.setAttribute('placeholder', '예) 2000.01.01')
  //생년월일 체크아이콘 제거
  labels.brith.checkIcon.remove();

  //이메일 중복확인 Wrap
  this.duplicateWrap = document.createElement("div");
  this.duplicateWrap.classList.add('duplicate-wrap');
  this.duplicateWrap.appendChild(labels.email.node());

  //중복확인 버튼
  this.confirmEmailBtn = document.createElement('button')
  this.confirmEmailBtn.innerText = '중복확인';
  setAttrs(this.confirmEmailBtn, {
    id : 'confirm-email', class : 'confirm-duplicate'
  })
  //이메일 중복검사 체크 확인
  this.confirmEmailBtn.addEventListener('click',(e) => emailRegex(e))
  this.duplicateWrap.appendChild(this.confirmEmailBtn);
  
  //이메일 라벨 추가
  this.container.appendChild(this.duplicateWrap);

  this.bottomLabelsWrap = document.createElement('div')
  this.bottomLabelsWrap.classList.add('bottom-labels-wrap', 'display-none')

  let _labels = ['password', 'nickname', 'brith'];
  _labels.forEach(a => {
    this.bottomLabelsWrap.appendChild(labels[a].node());
  })
  this.container.appendChild(this.bottomLabelsWrap)

  this.node = () => {return this.container};
  this.init = () => {};
  
  for(let [_, value] of Object.entries(labels)) {
    value.input.addEventListener('input', () => {
      const $checks = document.querySelectorAll('.input-label .check-icon.correct');
      const $inputs = document.querySelectorAll('.input-label input');
      
      if($checks.length == 3 && $inputs[$inputs.length - 1].value.length > 9){
        this.container.parentNode.dispatchEvent(validEvent);
      }
    })
  }

  
}

//공용함수
function passwordValidator(pw) {
  let count = 0;
  const emptyRe = /\s/;
  const smaeCountRe = /(\d)\1\1/;
  const numberRe = /\d+/;
  const upperAlphaRe = /[A-Z]+/;
  const lowerAlphaRe = /[a-z]+/;
  const specialCharRe = /[~!@#$%^&*()_+\-|<>?:;`,{}\]\[/\'\"\\\']+/;

  if (emptyRe.test(pw)) return false; //공백 사용
  if (smaeCountRe.test(pw)) return false; //같은 숫자 3개
  if (pw.length < 10) return false;

  let numArr = pw.match(/\d{3,}/g) || [];

  for (let a of numArr) {
    let preNumber = +a[0];
    let upperCount = 1;
    let lowerCount = 1;
    for (let i = 1; i < a.length; i++) {
      let lowerFlag = false;
      let upperFlag = false;
      if (preNumber === +a[i] + 1) lowerFlag = true;
      else if (preNumber === +a[i] - 1) upperFlag = true;

      if (lowerFlag) lowerCount++;
      else lowerCount = 1;
      if (upperFlag) upperCount++;
      else upperCount = 1;

      if (upperCount === 3 || lowerCount === 3) return false;
      preNumber = +a[i];
    }
  }

  if (numberRe.test(pw)) count++;
  if (upperAlphaRe.test(pw)) count++;
  if (lowerAlphaRe.test(pw)) count++;
  if (specialCharRe.test(pw)) count++;
  if (count < 2) return false;

  return true;
}

function removeErrorMessage(elem) {
  let labelNode = elem.parentNode.childNodes;
  for (let $node of labelNode) {
    if ($node.classList.contains('error')) $node.classList.remove('error');
    if ($node.classList.contains('error-message')) $node.remove();
  }
}

function renderError(elem, message) {
  removeErrorMessage(elem);
  const pElem = document.createElement('p');
  pElem.innerText = message;
  pElem.setAttribute('class', 'error-message');
  elem.parentNode.appendChild(pElem);
}


//이벤트 함수
function emailRegex(e) {
  let regex = /([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/;
  let $email = document.querySelector('input[type=email]');
  let $checkIcon = false;
  for (let $node of $email.parentNode.childNodes) {
    if ($node.classList.contains('check-icon')) $checkIcon = $node;
  }

  if (!regex.test($email.value)) {
    renderError($email, '올바른 이메일 주소를 입력해주세요');
    $email.classList.add('error');
    $checkIcon?.classList.remove('correct');
  } else {
    removeErrorMessage($email);
    $checkIcon?.classList.add('correct');
    e.target.setAttribute('disabled', true);
    $email.setAttribute('readonly', true);
    document.querySelector('.bottom-labels-wrap').classList.remove('display-none');
  }
}
  
function nickNameEvent(e) {
    let $checkIcon = '';
    for (let $node of e.target.parentNode.childNodes) {
      if ($node.classList.contains('check-icon')) $checkIcon = $node;
    }
    e.target.value == '' ? $checkIcon.classList.remove('correct') : $checkIcon.classList.add('correct');
}

function passwordEvent(e) {
  const $pw = e.target;
  let $checkIcon = '';
  
  for (let $node of $pw.parentNode.childNodes) {
    if ($node.classList.contains('check-icon')) $checkIcon = $node;
  }

  if (!passwordValidator(e.target.value)) {
    if ($pw.parentNode.lastChild.classList.contains("error-message")) {
      return;
    }
    renderError($pw, '10자 이상 영어 대문자, 소문자, 숫자, 특수문자 중 2종류를 조합해야 합니다');
    $pw.classList.add('error');
    $checkIcon?.classList.remove('correct');
  } else {
    removeErrorMessage($pw);
    $checkIcon?.classList.add('correct');
  }
};

function brithEvent(e) {
  let $brith = e.target;
  $brith.value = $brith.value.slice(0, 10);
  $brith.value = $brith.value.replace(/[^0-9.]/g, '');
  $brith.value = $brith.value.replace(/(\d{4})(\d{2})(\d{1})/, '$1.$2.$3');
}
