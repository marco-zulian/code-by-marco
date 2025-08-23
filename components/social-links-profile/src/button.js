class LinkButton extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./styles/social-links-profile-button.css">
      <a class="link-button text-preset-2-bold"><slot class="link-button__content"></slot></a>
    `;
  }

  connectedCallback() {
    this.updateSrc();
  }

  static get observedAttributes() {
    return ["src"];
  }

  updateSrc() {
    const anchor = this.shadowRoot.querySelector(".link-button");
    anchor.setAttribute("href", this.getAttribute("href") || "");
  }
}

customElements.define("cbm-link-button", LinkButton);
