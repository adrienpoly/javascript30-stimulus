import { Controller } from "stimulus";

export default class extends Controller {
  static targets = [
    "video",
    "toggle",
    "progressBar",
    "progress",
    "progressTarget"
  ];

  connect() {
    this.isPaused = true;
    this.isMousedown = false;
  }

  togglePlay(event) {
    const method = this.isPaused ? "play" : "pause";
    this.video[method]();

    this.isPaused = !this.isPaused;

    const icon = this.isPaused ? "►" : "❚ ❚";
    this.toggleTarget.textContent = icon;
  }

  skip(event) {
    this.video.currentTime += parseFloat(event.target.dataset.skip);
  }

  rangeUpdate(event) {
    this.video[event.target.name] = event.target.value;
  }

  progressUpdate(event) {
    const percent = this.video.currentTime / this.video.duration * 100;
    this.progressBarTarget.style.flexBasis = `${percent}%`;
  }

  scrub(event) {
    const scrubTime =
      event.offsetX / this.progressTarget.offsetWidth * this.video.duration;
    this.video.currentTime = scrubTime;
  }

  mousemove(event) {
    this.isMousedown && this.scrub(event);
  }

  mousedown() {
    this.isMousedown = true;
  }

  mouseup() {
    this.isMouseup = false;
  }

  set isPaused(bool) {
    this.data.set("paused", bool);
  }

  set isMousedown(bool) {
    this.data.set("mousedown", bool);
  }

  get isMousedown() {
    return this.data.get("mousedown") === "true";
  }

  get isPaused() {
    return this.data.get("paused") === "true";
  }

  get video() {
    return this.videoTarget;
  }
}
