import sheet from '../styles/tw.css' with { type: 'css' }

class ProfileAndDate extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
      <div class="flex gap-4">
        <img class="rounded-full w-10" src="${this.getAttribute("src")}" alt="${this.getAttribute("alt")}">
        <div class="flex flex-col self-center">
          <p class="font-manrope font-bold text-[13px]/[1.4] text-gray-900"><slot name="name"></slot></p>
          <p class="font-manrope font-medium text-[13px]/[1.4] text-gray-400"><slot name="date"></slot></p>
        </div>
      </div>
    `
    this._shadowRoot.adoptedStyleSheets = [sheet];
  }
}

customElements.define('cbm-profile-and-date', ProfileAndDate);