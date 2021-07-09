function signIn() {
  const $form = document.querySelector('form');
  const $closeBtn = document.querySelector(".close-btn");

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
  
  async function formSubmit(e) {
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
    if($idElem.value.length && $pwElem.value.length) {
      const data = {
        email : $idElem.value,
        pw : $pwElem.value
      }
      try {
        let res = await fetch('/signin', {
          method : "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
        res = await res.json()
        if(!!!res.url) {
          const $errorMsg = document.querySelector('.server-error-msg');
          $errorMsg.innerText = res.message;
          $errorMsg.classList.add('shake');
          setTimeout(() =>{
            $errorMsg.classList.remove('shake');
          },520)
          throw res
        }
        window.location.replace(res.url);    
            
      } catch (error) {
        console.error(error)
      }
    }
  }
  $form.addEventListener('submit', formSubmit);
  $closeBtn.addEventListener("click", () => {
    window.location.href = "/";
  })
}
document.addEventListener('DOMContentLoaded', signIn);