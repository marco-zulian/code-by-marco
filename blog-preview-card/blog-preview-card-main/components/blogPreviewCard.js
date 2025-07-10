class BlogPreviewCard extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.innerHTML = `
      <div class="preview-card">
        <img 
      </div>
    `;
  }

  connectedCallback() {
    this.updateContent();
  }

  updateContent() {
    const imagePath = this.getAttribute('src') || null;
    if (imagePath !== null) {
      const imageAlt = this.getAttribute('alt') || null;
    }
  }
}