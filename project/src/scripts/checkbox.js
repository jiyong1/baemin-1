export default function (id, required, noArrow, text) {
  this.list = document.createElement("li");
  this.input = document.createElement("input");
  this.label = document.createElement("label");
  this.doc = document.createElement("div");

  if (noArrow) {
    this.list.setAttribute("class", "rightArrow");
  }
  this.input.setAttribute("id", id);
  this.input.setAttribute("name", id);
  this.input.setAttribute("type", "checkbox");
  this.input.setAttribute("class", "checkItem");
  if (required) {
    this.input.classList.add("required");
  }
  this.label.setAttribute("for", id);
  this.doc.innerText = text;

  this.list.appendChild(this.input);
  this.list.appendChild(this.label);
  this.list.appendChild(this.doc);

  this.node = () => { return this.list; }
}