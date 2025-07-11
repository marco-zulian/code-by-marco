class SocialLinksProfile extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="../../styles/social-links-profile/social-links-profile.css">
      <div class="social-links">
        <img class="social-links__avatar" src=${this.getAttribute('src') || ''} alt=${this.getAttribute('alt') || ''}></img>
        <div class="social-links__info">
          <p class="social-links__info--name text-preset-1">${this.getAttribute('name')}</p>
          <p class="social-links__info--subtitle text-preset-2-bold">${this.getAttribute('subtitle')}</p>
        </div>
        <p class="social-links__bio text-preset-2">${this.getAttribute('bio')}</p>
        <div class="social-links__links"><slot></slot></div>
      </div>
    `;
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['src', 'alt', 'name', 'subtitle', 'bio'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }
}

customElements.define('cbm-social-links-profile', SocialLinksProfile);