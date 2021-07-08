import Checkbox from "./checkbox.js";
import setAtt from "./setatt.js";

export default function () {
  const wrapper = document.createElement("div");
  this.wrapper = setAtt(wrapper, {
    "class": "clause-container",
    "id": "clause"
  });

  this.clauseTitle = document.createElement("div");
  this.clauseTitle.setAttribute("class", "clauseTitle");
  this.clauseTitle.innerText = "어서오세요\n약관동의가 필요해요";

  this.allCheckWrap = document.createElement("div");
  this.allCheckWrap.setAttribute("class", "allCheckWrap");
  const allCheck = document.createElement("input");
  this.allCheck = setAtt(allCheck, {
    "id": "allCheck",
    "name": "allCheck",
    "type": "checkbox"
  });
  this.allCheckLabel = document.createElement("label");
  this.allCheckLabel.setAttribute("for", "allCheck");
  this.boldText = document.createElement("b");
  this.boldText.innerText = "전체동의";
  this.allCheckWrap.appendChild(this.allCheck);
  this.allCheckWrap.appendChild(this.allCheckLabel);
  this.allCheckWrap.appendChild(this.boldText);

  this.checkLists = document.createElement("ul");
  this.checkLists.setAttribute("class", "checkLists");
  this.checkItems = []
  const checkLists = [{id: 'check_1', text: '배달의민족 이용약관 동의', required : true},{id: 'check_2', text: '전자금융거래 이용약관 동의', required : true},{id: 'check_3', text: '개인정보 수집이용 동의', required : true},{id: 'check_4', text: '개인정보 제3자 제공 동의 (선택)'},{id: 'check_5', text: '마케팅 정보 메일, SMS 수신동의 (선택)', noArrow:true}]
  checkLists.forEach(item => {
    const checkBoxItem = new Checkbox(item.id, item.required, item.noArrow, item.text);
    this.checkItems.push(checkBoxItem);
    this.checkLists.appendChild(checkBoxItem.node());
  });

  this.radioWrap = document.createElement("div");
  this.radioWrap.setAttribute("class", "radioWrap");
  this.radioLabelOver = document.createElement("label");
  this.radioLabelOver.setAttribute("for", "over");
  const radioInputOver = document.createElement("input");
  this.radioInputOver = setAtt(radioInputOver, {
    "type": "radio",
    "name": "overFourteen",
    "id": "over",
    "value": "over",
  });
  this.radioInputOver.checked = true;
  this.redioImg = document.createElement("div");
  this.redioImg.setAttribute("class", "redioImg");
  this.radioTitle = document.createElement("div");
  this.radioTitle.setAttribute("class", "radioTitle");
  this.radioTitle.innerText = "만 14세 이상입니다.";
  const radioImg = document.createElement("img");
  this.radioImg = setAtt(radioImg, {
    "src": "/images/clause-radio-1.png",
    "alt": "라디오버튼이미지",
    "class": "radioImg"
  });
  [this.radioInputOver, this.redioImg, this.radioTitle, this.radioImg].forEach(node => {
    this.radioLabelOver.appendChild(node);
  });
  
  this.radioLabelUnder = document.createElement("label");
  this.radioLabelUnder.setAttribute("for", "nonOver");
  const radioInputUnder = document.createElement("input");
  this.radioInputUnder = setAtt(radioInputUnder, {
    "type": "radio",
    "name": "overFourteen",
    "id": "nonOver",
    "value": "nonOver",
  });
  this.redioImgUnder = document.createElement("div");
  this.redioImgUnder.setAttribute("class", "redioImg");
  this.radioTitleUnder = document.createElement("div");
  this.radioTitleUnder.setAttribute("class", "radioTitle");
  this.radioTitleUnder.innerHTML = `만 14세 미만입니다.<div class="subText">본인확인이 된 보호자의 배민계정이 필요해요.</div>`;
  const radioImgUnder = document.createElement("img");
  this.radioImgUnder = setAtt(radioImgUnder, {
    "src": "/images/clause-radio-2.png",
    "alt": "라디오버튼이미지",
    "class": "radioImg"
  });
  [this.radioInputUnder, this.redioImgUnder, this.radioTitleUnder, this.radioImgUnder].forEach(node => {
    this.radioLabelUnder.appendChild(node);
  });

  const clauseNextBtn = document.createElement("button");
  this.clauseNextBtn = setAtt(clauseNextBtn, {
    "id": "clauseNextBtn",
    "class": "nextBtn",
  });
  this.clauseNextBtn.innerText = "다음으로";
  this.clauseNextBtn.disabled = true;

  [this.radioLabelOver, this.radioLabelUnder, this.clauseNextBtn].forEach(node => {
    this.radioWrap.appendChild(node);
  });

  [this.clauseTitle, this.allCheckWrap, this.checkLists, this.radioWrap].forEach(node => {
    this.wrapper.appendChild(node);
  });

  const nextBtnToggle = () => {
    const requiredCheckBoxes = [];
    this.checkItems.filter(item => {
      if (item.input.classList.contains('required')) {
        requiredCheckBoxes.push(item.input);
      }
    });
    for (let i=0; i<requiredCheckBoxes.length; i++) {
      if (!requiredCheckBoxes[i].checked) {
        this.clauseNextBtn.disabled = true;
        return;
      }
    }
    this.clauseNextBtn.disabled = false;
  }
  const toggleAllCheckBox = (e) => {
    this.checkItems.forEach(item => {
      item.input.checked = e.target.checked;
    });
    nextBtnToggle();
  }

  this.checkItems.forEach(item => {
    if (item.input.classList.contains('required')) {
      item.input.addEventListener('change', nextBtnToggle);
    }
  })
  this.allCheck.addEventListener('change', toggleAllCheckBox);

  this.init = (info) => {
    if (!info || !info.checkCount || !info.overFourteen) return
    this.checkItems.forEach((item, idx) => {
      let flag = false;
      if (item.input.classList.contains('required')) {
        flag = true;
      } else {
        if (idx === 3 && (info.checkCount === 2 || info.checkCount === 4)) {
          flag = true;
        } else if (idx === 4 && (info.checkCount === 3 || info.checkCount === 4)) {
          flag = true;
        }
      }
      item.input.checked = flag;
    })
    if (info.overFourteen === "over") this.radioInputOver.checked = true;
    else this.radioInputUnder.checked = true;
    nextBtnToggle();
  };
  this.getState = () => {
    let checkCount = 1;
    if (this.checkItems[3].input.checked) checkCount += 1;
    if (this.checkItems[4].input.checked) checkCount += 2;
    let overFourteen;
    if (this.radioInputOver.checked) overFourteen = "over";
    else overFourteen = "nonOver";
    return {
      checkCount,
      overFourteen
    }
  }
  this.node = () => { return this.wrapper }
  this.nextBtn = () => { return this.clauseNextBtn }
}