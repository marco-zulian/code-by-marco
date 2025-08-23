import sheet from "../styles/tw.css" with { type: "css" };

class ShareButton extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({
      mode: "open",
    });

    this.active = this.getAttribute("active");
    this.render();

    this._button = this._shadowRoot.querySelector(".share-button");
    this._slot = this._shadowRoot.querySelector(".share-content");
    this._getButtonClasses();
  }

  static get observedAttributes() {
    return ["active"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "active") {
      this._button.classList = this._getButtonClasses();
      this.active
        ? this._slot.classList.remove("hidden")
        : this._slot.classList.add("hidden");
    }
  }

  _getButtonClasses() {
    return `
        share-button relative flex justify-center items-center rounded-full size-8 cursor-pointer z-10
        ${
          this.active
            ? "bg-gray-500 fill-white"
            : "fill-gray-500 bg-gray-200 hover:bg-gray-500 hover:fill-white"
        }`;
  }

  render() {
    this._shadowRoot.innerHTML = `
      <button
        class="${this._getButtonClasses()}"
        aria-label="Share content"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="13"><path d="M15 6.495L8.766.014V3.88H7.441C3.33 3.88 0 7.039 0 10.936v2.049l.589-.612C2.59 10.294 5.422 9.11 8.39 9.11h.375v3.867L15 6.495z"/></svg>
      </button>
      <slot
        class="share-content ${this.active ? "" : "hidden"}"
        name="share-content"
      ></slot>
    `;
    this._shadowRoot.adoptedStyleSheets = [sheet];
    this._shadowRoot
      .querySelector(".share-button")
      .addEventListener("click", () => this.toggleActive());
  }

  toggleActive() {
    this.active = !this.active;
    this.active
      ? this.setAttribute("active", "")
      : this.removeAttribute("active");
  }
}

customElements.define("cbm-share-button", ShareButton);
