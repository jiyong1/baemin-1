export default function (ptext, check=false, type="text", erase=true) {
  this.label = document.createElement('label');
  this.label.setAttribute('class', 'input-label');
  this.input = document.createElement('input');
  this.input.setAttribute("type", type);
  this.input.setAttribute("class", "signin-input");
  this.paragraph = document.createElement('p');
  this.paragraph.setAttribute("class", "input-label-p");
  this.paragraph.innerText = ptext;

  this.label.appendChild(this.input);
  this.label.appendChild(this.paragraph);
  

  if (erase) {
    this.inputEraseBtn = document.createElement('button');
    this.inputEraseBtn.setAttribute("class", "input-erase-btn");
    this.inputEraseBtn.innerHTML = `<svg viewBox="0 0 100 100">
      <line x1="30" y1="30" x2="70" y2="70" stroke="white" />
      <line x1="30" y1="70" x2="70" y2="30" stroke="white" />
    </svg>`;
    this.inputEraseBtn.style.display = "none";
    this.input.addEventListener("focus", () => {
      console.log('bye')
      this.inputEraseBtn.style.display = "block";
    }, true);
    this.input.addEventListener("blur", () => {
      this.inputEraseBtn.style.display = "none";
    })
    this.label.addEventListener('mousedown', (e) => {
      let current = e.target;
      while (current !== this.label) {
        if (current === this.inputEraseBtn) {
          this.input.value = "";
          return;
        }
        current = current.parentNode;
      }
    }, true);
    this.label.appendChild(this.inputEraseBtn);
  }

  if (check) {
    this.checkIcon = document.createElement('i');
    this.checkIcon.setAttribute('class', 'fas fa-check check-icon');
    this.input.addEventListener('keyup', (e) => check(e));
    this.label.appendChild(this.checkIcon);
  }
  this.node = () => { return this.label }
}