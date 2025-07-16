class Button extends HTMLElement {
  constructor() {
    super()

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
      <link rel="stylesheet" href="../../styles/product-preview/product-preview-button.css">
      <button class="product-preview-button">
        <p class="type-preset-2 product-preview-button__content"><slot></slot></p>
      </button>
    `
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['icon-left'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }
}

customElements.define('cbm-button', Button);