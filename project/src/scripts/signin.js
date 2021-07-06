function signIn() {
  const $form = document.querySelector('form');

  function removeErrorMessage(elem) {
    const labelNode = elem.parentNode;
    while (labelNode.lastChild !== elem) {
      labelNode.removeChild(labelNode.lastChild);
    }
  }

  function renderError(elem, message) {
    removeErrorMessage(elem);
    const pElem = document.createElement('p');
    pElem.innerText = message;
    pElem.setAttribute('class', 'error-message');
    elem.parentNode.appendChild(pElem);
  }
  
  function formSubmit(e) {
    e.preventDefault();
    const $idElem = e.target.login_id;
    const $pwElem = e.target.login_pw;
    if ($idElem.value.length === 0) {
      renderError($idElem, '아이디를 입력해주세요.')
      $idElem.classList.add('error');
    } else {
      removeErrorMessage($idElem);
      $idElem.classList.remove('error');
    }
    if ($pwElem.value.length === 0) {
      renderError($pwElem, '비밀번호를 입력해주세요.')
      $pwElem.classList.add('error');
    } else {
      removeErrorMessage($pwElem);
      $pwElem.classList.remove('error');
    }
  }
  $form.addEventListener('submit', formSubmit);
}
document.addEventListener('DOMContentLoaded', signIn);