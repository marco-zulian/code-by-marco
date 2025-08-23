import sheet from "../styles/tw.css" with { type: "css" };

class ArticlePreview extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this.render();
  }

  static get observedAttributes() {
    return [];
  }

  render() {
    this._shadowRoot.innerHTML = `
      <div class="flex flex-col align-middle justify-center md:flex-row gap-8 lg:gap-10 bg-white rounded-md">
        <img
          class="w-full md:w-[229px] lg:w-[285px] object-fill rounded-t-md md:rounded-l-md md:rounded-tr-none"
          src=${this.getAttribute("src")}
          alt=${this.getAttribute("alt")}
        >
        <div class="flex flex-col gap-12 md:gap-6 px-7.5 pb-4.5 md:py-10 md:pl-0 md:pr-9 lg:pr-10 lg:py-7.5 relative">
          <div class="flex flex-col gap-6">
            <h2 class="font-manrope font-bold text-gray-900 text-xl/[1.3] tracking-[0.25px]"><slot name="title"></slot></h2>
            <p class="font-manrope font-medium text-gray-500 text-[13px]/[1.4] tracking-[0.12%]"><slot name="subtitle"></slot></p>
          </div>

          <div class="flex justify-between items-center">
            <cbm-profile-and-date
              src="${this.getAttribute("profile-src")}"
              alt="${this.getAttribute("profile-alt")}"
            >
              <span slot="name"><slot name="author-name"></slot></span>
              <span slot="date"><slot name="publish-date"></slot></span>
            </cbm-profile-and-date>
            <cbm-share-button class="md:relative">
              <div class="flex flex-row bg-gray-900 items-center min-h-19 md:min-h-auto px-7.5 md:px-9.5 py-5.5 md:py-4.5 rounded-b-md md:rounded-md gap-6 absolute left-0 bottom-0 md:bottom-auto w-full md:w-auto md:-top-22 md:-translate-x-[50%] md:left-[50%]" slot="share-content">
                <p class="font-manrope text-gray-400 uppercase text-[13px]/[1.4] tracking-[0.25em]">Share</p>
                <div class="flex flex-row gap-4 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path fill="#FFF" d="M18.896 0H1.104C.494 0 0 .494 0 1.104v17.793C0 19.506.494 20 1.104 20h9.58v-7.745H8.076V9.237h2.606V7.01c0-2.583 1.578-3.99 3.883-3.99 1.104 0 2.052.082 2.329.119v2.7h-1.598c-1.254 0-1.496.597-1.496 1.47v1.928h2.989l-.39 3.018h-2.6V20h5.098c.608 0 1.102-.494 1.102-1.104V1.104C20 .494 19.506 0 18.896 0z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17"><path fill="#FFF" d="M20 2.172a8.192 8.192 0 01-2.357.646 4.11 4.11 0 001.804-2.27 8.22 8.22 0 01-2.605.996A4.096 4.096 0 0013.847.248c-2.65 0-4.596 2.472-3.998 5.037A11.648 11.648 0 011.392 1a4.109 4.109 0 001.27 5.478 4.086 4.086 0 01-1.858-.513c-.045 1.9 1.318 3.679 3.291 4.075a4.113 4.113 0 01-1.853.07 4.106 4.106 0 003.833 2.849A8.25 8.25 0 010 14.658a11.616 11.616 0 006.29 1.843c7.618 0 11.922-6.434 11.663-12.205A8.354 8.354 0 0020 2.172z"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path fill="#FFF" d="M10 0C4.478 0 0 4.477 0 10c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.545 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.522 0 10-4.477 10-10S15.522 0 10 0z"/></svg>
                </div>
                <div class="hidden md:block min-w-5 min-h-5 max-w-5 max-h-5 bg-gray-900 rotate-45 absolute translate-y-[50%] -translate-x-[50%] bottom-0 left-[50%]"></div>
              </div>
            </cbm-share-button>
          </div>
        </div>
      </div>
    `;

    this._shadowRoot.adoptedStyleSheets = [sheet];
  }
}

customElements.define("cbm-article-preview", ArticlePreview);
