import { LitElement, html, adoptStyles } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import sheet from "../styles/tw.css" with { type: "css" };

@customElement("cbm-user-card")
class UserCard extends LitElement {
  @property({ type: String })
  src: string = "";

  @property({ type: String })
  alt: string = "";

  @property({ type: String })
  name: string = "";

  @state()
  _selected: string = "Weekly";

  firstUpdated() {
    adoptStyles(this.renderRoot as ShadowRoot, [sheet]);
  }

  render() {
    return html`
      <div class="rounded-md bg-navy-900 flex flex-col h-full">
        <div class="rounded-md bg-purple-600 p-8 flex gap-6 items-center lg:flex-col lg:items-start lg:gap-10 lg:grow-1">
          <img class="box-content h-16 border-white border-solid border-3 rounded-[50%] lg:h-19.5" src="${this.src}" alt="${this.alt}">
          <div>
            <p class="font-rubik text-navy-200 text-sm/[18px] font-regular">Report for</p>
            <p class="font-rubik text-white text-lg/[28px] lg:text-2xl/[47px] font-light">${this.name}</p>
          </div>
        </div>
        <div class="grid grid-cols-3 py-6 w-full md:w-[343px] lg:w-full self-center lg:grid-cols-1 lg:grid-rows-3 lg:items-start lg:p-8 lg:mt-auto lg:gap-5">
          <button @click=${() => this._dispatchPeriodChange("Daily")} class="lg:items-start lg:flex"><span class="font-rubik cursor-pointer ${this._selected == "Daily" ? "text-white" : "text-purple-500"} hover:text-white text-md/[21px] font-regular">Daily</span></button>
          <button @click=${() => this._dispatchPeriodChange("Weekly")} class="lg:flex lg:items-start"><span class="font-rubik cursor-pointer ${this._selected == "Weekly" ? "text-white" : "text-purple-500"} hover:text-white text-md/[21px] font-regular">Weekly</span></button>
          <button @click=${() => this._dispatchPeriodChange("Monthly")} class="lg:flex lg:items-start"><span class="font-rubik cursor-pointer ${this._selected == "Monthly" ? "text-white" : "text-purple-500"} hover:text-white text-md/[21px] font-regular"<p>Monthly</span></button>
        </div>
      </div>
    `;
  }

  _dispatchPeriodChange(period: string) {
    if (period === this._selected) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent("period-change", {
        detail: period,
        bubbles: true,
        composed: true,
      }),
    );
    this._selected = period;
  }
}
