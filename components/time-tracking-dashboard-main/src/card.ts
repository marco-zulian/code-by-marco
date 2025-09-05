import { LitElement, html, adoptStyles } from "lit";
import { customElement, property } from "lit/decorators.js";

type CardType = "Work" | "Play" | "Study" | "Exercise" | "Social" | "Self Care";
export type CardPeriodicity = "Daily" | "Weekly" | "Monthly";

@customElement("cbm-card")
export default class Card extends LitElement {
  @property({ type: String })
  category: CardType = "Work";

  @property({ type: String })
  period: CardPeriodicity = "Daily";

  @property({ type: Number })
  currAmount: number = 0;

  @property({ type: Number })
  lastAmount: number = 0;

  firstUpdated() {
    fetch("./styles/tw.css")
      .then((res) => {
        return res.text()
      })
      .then((cssText) => {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(cssText);

        adoptStyles(this.renderRoot as ShadowRoot, [sheet]);
      });
  }

  render() {
    return html`
      <div
        class="${this.getBackgroundColor()} relative overflow-hidden rounded-md pt-9.5 md:pt-11.25"
      >
        <img
          src="./assets/icon-${this.getIcon()}.svg"
          alt=""
          class="absolute top-0 right-4.5"
        />
        <div
          class="bg-navy-900 hover:bg-navy-800 relative z-10 flex flex-col gap-2 rounded-t-md p-8 md:gap-4 md:p-6 lg:gap-6 lg:p-8"
        >
          <div class="flex items-center justify-between md:min-w-35">
            <p class="font-rubik text-md/[21px] font-medium text-white">
              ${this.category}
            </p>
            <svg
              class="fill-navy-200 cursor-pointer hover:fill-white"
              width="21"
              height="5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                fill-rule="evenodd"
              />
            </svg>
          </div>
          <div
            class="flex items-center justify-between md:flex-col md:items-start md:gap-2"
          >
            <p
              class="font-rubik text-xl/[38px] font-light text-white md:align-top md:text-3xl/[66px]"
            >
              ${this.currAmount}hr${this.currAmount > 1 ? "s" : ""}
            </p>
            <p class="font-rubik text-navy-200 font-regular text-sm/[18px]">
              ${this.getLastLabel()} -
              ${this.lastAmount}hr${this.lastAmount > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>
    `;
  }

  getLastLabel(): string {
    switch (this.period) {
      case "Daily":
        return "Yesterday";
      case "Weekly":
        return "Last Week";
      case "Monthly":
        return "Last Month";
    }
  }

  getBackgroundColor(): string {
    switch (this.category) {
      case "Work":
        return "bg-orange-300";
      case "Play":
        return "bg-blue-300";
      case "Study":
        return "bg-pink-400";
      case "Exercise":
        return "bg-green-400";
      case "Social":
        return "bg-purple-700";
      case "Self Care":
        return "bg-yellow-300";
    }
  }

  getIcon(): string {
    switch (this.category) {
      case "Work":
        return "work";
      case "Play":
        return "play";
      case "Study":
        return "study";
      case "Exercise":
        return "exercise";
      case "Social":
        return "social";
      case "Self Care":
        return "self-care";
    }
  }
}
