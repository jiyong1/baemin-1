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
    this.inputEraseBtn.innerHTML = `<i class="fas fa-times">`;
    this.inputEraseBtn.addEventListener('click', () => {
      this.input.value = "";
    });
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