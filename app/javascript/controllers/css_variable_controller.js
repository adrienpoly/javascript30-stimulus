import { Controller } from "stimulus";

export default class extends Controller {
  update(event) {
    document.documentElement.style.setProperty(
      `--${this.element.name}`,
      this.element.value + this.suffix
    );
  }

  get suffix() {
    return this.data.get("suffix") || "";
  }
}
