import { Controller } from "stimulus";

export default class extends Controller {
  playSound(e) {
    const audio = this.element.querySelector(`audio[data-key="${e.keyCode}"]`);
    if (!audio) return;
    const key = this.element.querySelector(`div[data-key="${e.keyCode}"]`);
    key.classList.add("playing");
    audio.currentTime = 0;
    audio.play();
  }

  removeTransition(e) {
    if (e.propertyName !== "transform") return;
    e.target.classList.remove("playing");
  }
}
