import { html } from "lit";
import { customElement, query } from "lit/decorators.js";
import RadioButton from "./tipButton.js";

export type Radios = RadioButton | RadioButtonCustom;

@customElement("cbm-radio-button-custom")
export default class RadioButtonCustom extends RadioButton {
  @query('input[type="number"]') private _inputText!: HTMLInputElement;

  private _updateValue() {
    this.value = this._inputText.value;
    this._syncValue();
  }

  render() {
    return html`
      <div
        class="bg-grey-50 text-grey-550 font-space-mono flex w-full cursor-pointer justify-center rounded-sm px-4 py-2 text-xl/[36px] font-bold has-checked:outline-2 has-checked:outline-green-900 has-checked:outline-solid"
      >
        <input
          class="hidden"
          id=${this._inputId}
          .checked=${this.checked}
          @change=${() => this._toggle()}
          type="radio"
        />
        <input
          class="placeholder:text-grey-550 w-full text-center outline-none"
          id=${this._input + "_text"}
          type="number"
          @input=${() => this._updateValue()}
          placeholder="Custom"
        />
      </div>
    `;
  }
}
