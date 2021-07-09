function eventListens() {
  const allCheckbox = document.getElementById('allCheck');
  const checkBoxList = document.querySelectorAll('input[type=checkbox].checkItem.required');

  checkBoxList.forEach(node => node.addEventListener('change', ()=> nextBtnToggle()))
  allCheckbox.addEventListener('change', function() {toggleAllCheckBox(this)})
}

//체크박스 전체 토글
function toggleAllCheckBox(e) {
  const checkBoxList = document.querySelectorAll('input[type=checkbox].checkItem');
  checkBoxList.forEach(box => box.checked = e.checked)
  nextBtnToggle()
}

//다음화면 이동용 버튼 토글
function nextBtnToggle() {
  const radioVal = document.querySelector('input[name="overFourteen"]:checked')?.value || false;
  const checkBoxList = document.querySelectorAll('input[type="checkbox"].checkItem.required:checked');
  const nextBtn = document.getElementById('clauseNextBtn')

  if(radioVal && checkBoxList.length === 3) {
    nextBtn.removeAttribute('disabled');
  } else {
    nextBtn.setAttribute('disabled', true);
  }
}

document.addEventListener('DOMContentLoaded', () => eventListens());