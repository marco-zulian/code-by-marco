var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { customElement, query } from "lit/decorators.js";
import RadioButton from "./tipButton.js";
let RadioButtonCustom = class RadioButtonCustom extends RadioButton {
    _updateValue() {
        this.value = this._inputText.value;
        this._syncValue();
    }
    render() {
        return html `
      <div class="has-checked:outline-2 has-checked:outline-solid has-checked:outline-green-900 cursor-pointer flex justify-center rounded-sm px-4 py-2 w-full bg-grey-50 text-grey-550 font-bold font-space-mono text-xl/[36px]">
        <input class="hidden" id=${this._inputId} .checked=${this.checked} @change=${() => this._toggle()} type="radio"/>
        <input class="w-full text-center outline-none" id=${this._input + '_text'} type="number" @input=${() => this._updateValue()} placeholder="Custom"/>
      </div>
    `;
    }
};
__decorate([
    query('input[type="number"]')
], RadioButtonCustom.prototype, "_inputText", void 0);
RadioButtonCustom = __decorate([
    customElement('cbm-radio-button-custom')
], RadioButtonCustom);
export default RadioButtonCustom;
