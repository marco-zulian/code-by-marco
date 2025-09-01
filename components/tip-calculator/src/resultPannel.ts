import { LitElement, html, adoptStyles, PropertyValues } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import sheet from "./../styles/tw.css" with { type: "css" };

@customElement('cbm-result-pannel')
export default class ResultPannel extends LitElement {
  @state()
  people: number = 0;

  @state()
  price: number = 0;

  @state()
  disabled: boolean = true;

  @state()
  tipPercentage: number = null;

  @query('button') private _button!: HTMLButtonElement;

  protected firstUpdated(_changedProperties: PropertyValues): void {
    adoptStyles(this.renderRoot as ShadowRoot, [sheet]);
    this._button.disabled = this.disabled;
  }

  render() {
    return html`
      <div class="flex flex-col gap-6 justify-between rounded-md bg-green-900 px-8 py-6 lg:px-10 lg:py-9.5 h-full">
        <div class="flex flex-col gap-6">
          <div class="flex justify-between items-center">
            <p class="font-bold font-space-mono text-md/[24px] text-white">Tip Amount<br><span class="text-sm/[19px] text-grey-400">/per person</span></p>
            <p class="font-bold font-space-mono text-2xl/[47px] text-green-400 lg:text-3xl/[71px]">${this._getPerPersonTip()}</p>
          </div>
          <div class="flex justify-between items-center">
            <p class="font-bold font-space-mono text-md/[24px] text-white">Total<br><span class="text-sm/[19px] text-grey-400">/per person</span></p>
            <p class="font-bold font-space-mono text-2xl/[47px] text-green-400 lg:text-3xl/[71px]">${this._getPerPersonPrice()}</p>
          </div>
        </div>
        
        <button @click=${() => this._resetFields()} class="not-disabled:cursor-pointer disabled:bg-green-750 rounded-sm px-8 py-2 w-full uppercase text-green-900 bg-green-400 hover:bg-green-200 font-bold font-space-mono text-lg/[30px]">Reset</button>
      </div>
    `
  }

  setData(data: object) {
    this.people = data['number-of-people'] ?? 0;
    this.price = data['bill'] ?? null;
    this.tipPercentage = data['percentage'] ?? null;

    this.disabled = this.people === 0 && this.price === null && this.tipPercentage === null;
    this._button.disabled = this.disabled;
  }

  _areFieldsValid() {
    return this.people > 0 && this.price !== null && this.price >= 0 && this.tipPercentage != null && this.tipPercentage > 0;
  }

  _getPerPersonTip() {
    let perPersonPrice: number;
    if (!this._areFieldsValid()) {
      perPersonPrice = 0
    } else {
      perPersonPrice = ((this.price * (this.tipPercentage / 100)) / this.people);
    }

    return new Intl.NumberFormat('en-us', {
      style: 'currency',
      currency: 'USD'
    }).format(perPersonPrice);
  }

  _getPerPersonPrice() {
    let perPersonPrice: number;
    if (!this._areFieldsValid()) {
      perPersonPrice = 0
    } else {
      perPersonPrice = ((this.price * (1 + this.tipPercentage / 100)) / this.people);
    }

    return new Intl.NumberFormat('en-us', {
      style: 'currency',
      currency: 'USD'
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