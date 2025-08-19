class Card extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  render() {
    this._shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./styles/card.css">
      <div class="card">
        <div class="card__text">
          <p class="card__text--title text-preset-3">${this.getAttribute('title') || ''}</p>
          <p class="card__text--description text-preset-5">${this.getAttribute('description') || ''}</p>
        </div>
        <img class="card__image"/>
      </div>
    `;

    this.configureImage();
  }

  connectedCallback() {
    this.render();
  }
  
  static get observedAttributes() {
    return ['title', 'description', 'src', 'alt'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  configureImage() {
    const image = this.shadowRoot.querySelector('.card__image');
    const src = this.getAttribute('src') || '';

    if (src === '') {
      image.style.visibility = 'hidden';
    } else {
      image.setAttribute('src', src);
      image.setAttribute('alt', this.getAttribute('alt') || '');
    }
  }
}

customElements.define('cbm-card', Card);