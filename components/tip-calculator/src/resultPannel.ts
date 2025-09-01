import { LitElement, html, adoptStyles, PropertyValues } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import sheet from "./../styles/tw.css" with { type: "css" };

@customElement("cbm-result-pannel")
export default class ResultPannel extends LitElement {
  @state()
  people: number = 0;

  @state()
  price: number = 0;

  @state()
  disabled: boolean = true;

  @state()
  tipPercentage: number = null;

  @query("button") private _button!: HTMLButtonElement;

  protected firstUpdated(_changedProperties: PropertyValues): void {
    adoptStyles(this.renderRoot as ShadowRoot, [sheet]);
    this._button.disabled = this.disabled;
  }

  render() {
    return html`
      <div
        class="flex h-full flex-col justify-between gap-6 rounded-md bg-green-900 px-8 py-6 lg:px-10 lg:py-9.5"
      >
        <div class="flex flex-col gap-6">
          <div class="flex items-center justify-between">
            <p class="font-space-mono text-md/[24px] font-bold text-white">
              Tip Amount<br /><span class="text-grey-400 text-sm/[19px]"
                >/ person</span
              >
            </p>
            <p
              class="font-space-mono text-2xl/[47px] font-bold text-green-400 lg:text-3xl/[71px]"
            >
              ${this._getPerPersonTip()}
            </p>
          </div>
          <div class="flex items-center justify-between">
            <p class="font-space-mono text-md/[24px] font-bold text-white">
              Total<br /><span class="text-grey-400 text-sm/[19px]"
                >/ person</span
              >
            </p>
            <p
              class="font-space-mono text-2xl/[47px] font-bold text-green-400 lg:text-3xl/[71px]"
            >
              ${this._getPerPersonPrice()}
            </p>
          </div>
        </div>

        <button
          @click=${() => this._resetFields()}
          class="disabled:bg-green-750 font-space-mono w-full rounded-sm bg-green-400 px-8 py-2 text-lg/[30px] font-bold text-green-900 uppercase not-disabled:cursor-pointer hover:bg-green-200 disabled:bg-green-800"
        >
          Reset
        </button>
      </div>
    `;
  }

  setData(data: object) {
    this.people = data["number-of-people"] ?? 0;
    this.price = data["bill"] ?? null;
    this.tipPercentage = data["percentage"] ?? null;

    this.disabled =
      this.people === 0 && this.price === null && this.tipPercentage === null;
    this._button.disabled = this.disabled;
  }

  _areFieldsValid() {
    return (
      this.people > 0 &&
      this.price !== null &&
      this.price >= 0 &&
      this.tipPercentage != null &&
      this.tipPercentage > 0
    );
  }

  _getPerPersonTip() {
    let perPersonPrice: number;
    if (!this._areFieldsValid()) {
      perPersonPrice = 0;
    } else {
      perPersonPrice = (this.price * (this.tipPercentage / 100)) / this.people;
    }

    return new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
    }).format(perPersonPrice);
  }

  _getPerPersonPrice() {
    let perPersonPrice: number;
    if (!this._areFieldsValid()) {
      perPersonPrice = 0;
    } else {
      perPersonPrice =
        (this.price * (1 + this.tipPercentage / 100)) / this.people;
    }

    return new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
    }).format(perPersonPrice);
  }

  _resetFields() {
    this.dispatchEvent(
      new CustomEvent("reset-form", {
        bubbles: true,
        composed: true,
      }),
    );

    this.setData({});
  }
}
