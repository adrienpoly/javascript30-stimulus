import { Controller } from "stimulus";
const END_POINT =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

export default class extends Controller {
  static targets = ["suggestions", "input"];

  connect() {
    this.cities = {};
    fetch(END_POINT)
      .then(response => {
        return response.json();
      })
      .then(d => {
        this.cities = d;
      });
  }

  autocomplete(event) {
    const wordToSearch = this.inputTarget.value;
    const results = this.cities
      .filter(el => {
        return (el.city + ", " + el.state)
          .toLowerCase()
          .includes(wordToSearch.toLowerCase());
      })
      .slice(0, 10);

    this.render(wordToSearch ? results : [], wordToSearch);
  }

  select(event) {
    const cityName = event.target
      .closest("li")
      .querySelector(".name")
      .textContent.trim();
    this.inputTarget.value = cityName;
    this.suggestionsTarget.innerHTML = "";
  }

  render(results, wordToSearch) {
    this.suggestionsTarget.innerHTML = results.reduce((html, result) => {
      const population = parseInt(result.population, 10).toLocaleString();
      return (html += `<li>
          <span class="name">
            ${this.highlight(result.city, wordToSearch)}, ${this.highlight(
        result.state,
        wordToSearch
      )}
          </span>
          <span class="population">${population}</span>
        </li>`);
    }, "");
  }

  highlight(string, word) {
    //hightling function to preserve original Case of the string
    const regex = new RegExp(word, "gi");
    const matches = string.match(regex);
    if (matches) {
      //keep only unique matches
      const casedWordsToSearch = [...new Set(matches)];
      casedWordsToSearch.forEach(word => {
        //regex to exclude what is inside <....>
        const regex = new RegExp(`(${word})(?![^<]*>|[^<>]*<\/)`, "g");
        string = string.replace(regex, `<span class="hl">${word}</span>`);
      });
    }
    return string;
  }
}
