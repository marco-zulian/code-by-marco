class BlogPreviewCard extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });

    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./styles/blog-preview-card-style.css">
      <div class="preview-card">
        <img class="preview-card__image" />

        <div class="preview-card__content">
          <slot></slot>
          <p class="preview-card__creation-date blog-preview-text-preset-3"></p>
          <p class="preview-card__title blog-preview-text-preset-1"></p>
          <p class="preview-card__subtitle blog-preview-text-preset-2"></p>
        </div>

        <div class="preview-card__author">
          <img class="preview-card__author--image" alt="blog post author's avatar image"/>
          <p class="preview-card__author--name blog-preview-text-preset-4"></p>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.updateContent();
  }

  static get observedAttributes() {
    return ['img', 'src', 'title', 'subtitle', 'author', 'avatar-src', 'date'];
  }

  updateImage() {
    const image = this.shadowRoot.querySelector('.preview-card__image');
    const imagePath = this.getAttribute('src') || null;
    if (imagePath !== null) {
      const imageAlt = this.getAttribute('alt') || null;
      image.setAttribute('src', imagePath);
      image.setAttribute('alt', imageAlt);
      image.style.display = 'block';
    } else {
      image.style.display = 'none';
    }
  }

  updateTexts() {
    this.shadowRoot.querySelector('.preview-card__creation-date').textContent = `Published ${this.getAttribute('date') || ''}`;
    this.shadowRoot.querySelector('.preview-card__title').textContent = this.getAttribute('title') || '';
    this.shadowRoot.querySelector('.preview-card__subtitle').textContent = this.getAttribute('subtitle') || '';
    this.shadowRoot.querySelector('.preview-card__author--name').textContent = this.getAttribute('author') || '';
  }

  updateAuthor() {
    const avatarImage = this.shadowRoot.querySelector('.preview-card__author--image');
    avatarImage.setAttribute('src', this.getAttribute('avatar-src') || '');
  }

  updateContent() {
    this.updateImage();
    this.updateTexts();
    this.updateAuthor();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
    case 'img', 'src':
      this.updateImage();
      break
    case 'title', 'subtitle', 'author', 'date':
      this.updateTexts();
      break
    case 'avatar-src':
      this.updateAuthor();
      break
    }
  }
}

customElements.define('cbm-blog-preview-card', BlogPreviewCard);