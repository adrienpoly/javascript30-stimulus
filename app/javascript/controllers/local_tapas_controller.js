import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["itemsList", "input", "form"];

  connect() {
    this.render();
  }

  submit(e) {
    e.preventDefault(); // prevent from refreshing the page on submit
    const item = { name: this.inputTarget.value, checked: false };
    this.items.push(item);
    this.formTarget.reset();
    this.storage = this.items;
    this.render();
  }

  check(e) {
    const index = e.target.dataset.index;
    this.items[index].checked = !this.items[index].checked;
    this.storage = this.items;
  }

  clear(e) {
    this.storage = [];
    this.render();
  }

  render() {
    this.items = this.storage;
    const html = this.items.reduce((html, item, index) => {
      return (html += this.itemHTML(item.name, item.checked, index));
    }, "");
    this.itemsListTarget.innerHTML = html;
  }

  itemHTML(name, checked, index) {
    const html = `
      <li>
        <input type="checkbox" data-action="local-tapas#check" data-index="${index}" id="item${index}" ${
      checked ? "checked" : ""
    }>
        <label for="item${index}">${name}</label>
      </li>
    `;
    return html;
  }

  get storage() {
    return JSON.parse(window.localStorage.getItem("myItems")) || [];
  }

  set storage(items) {
    window.localStorage.setItem("myItems", JSON.stringify(items));
  }
}
