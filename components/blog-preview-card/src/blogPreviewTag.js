class BlogPreviewTag extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
      <link rel="stylesheet" href="../../styles/blog-preview-card/blog-preview-tag-style.css">
      <div class="preview-tag">
        <p class="preview-tag__name blog-preview-text-preset-4">
          <slot></slot>
        </p>
      </div>
    `;
  }
}

customElements.define('cbm-blog-preview-tag', BlogPreviewTag);