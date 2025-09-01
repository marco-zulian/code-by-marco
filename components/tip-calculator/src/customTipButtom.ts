import { html } from "lit";
import { customElement, query } from "lit/decorators.js";
import RadioButton from "./tipButton.js";

export type Radios = RadioButton | RadioButtonCustom;

@customElement('cbm-radio-button-custom')
export default class RadioButtonCustom extends RadioButton {
  @query('input[type="number"]') private _inputText!: HTMLInputElement;

  private _updateValue() {
    this.value = this._inputText.value;
    this._syncValue();
  }

  render() {
    return html`
      <div class="has-checked:outline-2 has-checked:outline-solid has-checked:outline-green-900 cursor-pointer flex justify-center rounded-sm px-4 py-2 w-full bg-grey-50 text-grey-550 font-bold font-space-mono text-xl/[36px]">
        <input class="hidden" id=${this._inputId} .checked=${this.checked} @change=${() => this._toggle()} type="radio"/>
        <input class="w-full text-center outline-none placeholder:text-grey-550" id=${this._input + '_text'} type="number" @input=${() => this._updateValue()} placeholder="Custom"/>
      </div>
    `
  }
}