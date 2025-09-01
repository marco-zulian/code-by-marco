var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, adoptStyles } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import sheet from "./../styles/tw.css" with { type: "css" };
let ResultPannel = class ResultPannel extends LitElement {
    constructor() {
        super(...arguments);
        this.people = 0;
        this.price = 0;
        this.disabled = true;
        this.tipPercentage = null;
    }
    firstUpdated(_changedProperties) {
        adoptStyles(this.renderRoot, [sheet]);
        this._button.disabled = this.disabled;
    }
    render() {
        return html `
      <div class="flex flex-col gap-6 justify-between rounded-md bg-green-900 px-8 py-6 lg:px-10 lg:py-9.5 h-full">
        <div class="flex flex-col gap-6">
          <div class="flex justify-between items-center">
            <p class="font-bold font-space-mono text-md/[24px] text-white">Tip Amount<br><span class="text-sm/[19px] text-grey-400">/ person</span></p>
            <p class="font-bold font-space-mono text-2xl/[47px] text-green-400 lg:text-3xl/[71px]">${this._getPerPersonTip()}</p>
          </div>
          <div class="flex justify-between items-center">
            <p class="font-bold font-space-mono text-md/[24px] text-white">Total<br><span class="text-sm/[19px] text-grey-400">/ person</span></p>
            <p class="font-bold font-space-mono text-2xl/[47px] text-green-400 lg:text-3xl/[71px]">${this._getPerPersonPrice()}</p>
          </div>
        </div>
        
        <button @click=${() => this._resetFields()} class="not-disabled:cursor-pointer disabled:bg-green-750 disabled:bg-green-800 rounded-sm px-8 py-2 w-full uppercase text-green-900 bg-green-400 hover:bg-green-200 font-bold font-space-mono text-lg/[30px]">Reset</button>
      </div>
    `;
    }
    setData(data) {
        var _a, _b, _c;
        this.people = (_a = data['number-of-people']) !== null && _a !== void 0 ? _a : 0;
        this.price = (_b = data['bill']) !== null && _b !== void 0 ? _b : null;
        this.tipPercentage = (_c = data['percentage']) !== null && _c !== void 0 ? _c : null;
        this.disabled = this.people === 0 && this.price === null && this.tipPercentage === null;
        this._button.disabled = this.disabled;
    }
    _areFieldsValid() {
        return this.people > 0 && this.price !== null && this.price >= 0 && this.tipPercentage != null && this.tipPercentage > 0;
    }
    _getPerPersonTip() {
        let perPersonPrice;
        if (!this._areFieldsValid()) {
            perPersonPrice = 0;
        }
        else {
            perPersonPrice = ((this.price * (this.tipPercentage / 100)) / this.people);
        }
        return new Intl.NumberFormat('en-us', {
            style: 'currency',
            currency: 'USD'
        }).format(perPersonPrice);
    }
    _getPerPersonPrice() {
        let perPersonPrice;
        if (!this._areFieldsValid()) {
            perPersonPrice = 0;
        }
        else {
            perPersonPrice = ((this.price * (1 + this.tipPercentage / 100)) / this.people);
        }
        return new Intl.NumberFormat('en-us', {
            style: 'currency',
            currency: 'USD'
        }).format(perPersonPrice);
    }
    _resetFields() {
        this.dispatchEvent(new CustomEvent("reset-form", {
            bubbles: true,
            composed: true,
        }));
        this.setData({});
    }
};
__decorate([
    state()
], ResultPannel.prototype, "people", void 0);
__decorate([
    state()
], ResultPannel.prototype, "price", void 0);
__decorate([
    state()
], ResultPannel.prototype, "disabled", void 0);
__decorate([
    state()
], ResultPannel.prototype, "tipPercentage", void 0);
__decorate([
    query('button')
], ResultPannel.prototype, "_button", void 0);
ResultPannel = __decorate([
    customElement('cbm-result-pannel')
], ResultPannel);
export default ResultPannel;
