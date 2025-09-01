import { LitElement, html, adoptStyles, PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import sheet from "./../styles/tw.css" with { type: "css" };

@customElement('cbm-input')
export default class InputText extends LitElement {
  static formAssociated = true;

  @property({ type: String }) value = '';
  @property({ type: String }) label = '';
  @property({ type: String }) name = '';
  
  @state() _errorMessage = '';
  @query('input') private _input!: HTMLInputElement;

  private _internals = this.attachInternals();
  private _inputId = `input-${Math.random().toString(36).slice(2)}`;
  private _errorId = `error-${Math.random().toString(36).slice(2)}`;

  protected firstUpdated(_changedProperties: PropertyValues): void {
    adoptStyles(this.renderRoot as ShadowRoot, [sheet]);

    this._syncInputRef();
  }

  private _syncInputRef() {
    this._input.id = this._inputId;
    this._input.setAttribute('aria-describedby', this._errorId);
    this._input.addEventListener('input', () => {
      this.value = this._input!.value;
      this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    });
    this._input.addEventListener('change', () => {
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    });
    this._input.addEventListener('invalid', () => {
      this.dispatchEvent(new Event('invalid', { bubbles: true, composed: true }));
    });

    const attributes = this.attributes;

    for (const attr of Array.from(attributes)) {
      if (attr.name === 'class' || attr.name === 'id' || attr.name === 'name') {
        continue;
      }
      this._input.setAttribute(attr.name, attr.value);
    }

    this._syncValue();
  }

  protected updated(_changedProperties: PropertyValues): void {
    if (_changedProperties.has('value')) {
      this._syncValue();
    };
  }

  private _syncValue() {
    this._input.value = this.value ?? '';

    const formData = new FormData();
    formData.append(this.name, this.value);

    this._internals.setFormValue(formData);
    this._syncValidity();
    this.dispatchEvent(
      new CustomEvent('validated', {
        detail: { valid: this.checkValidity(), value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _syncValidity() {
    if (!this._input.checkValidity()) {
      this._errorMessage = this._input.validationMessage;
      this._internals.setValidity(
        { customError: true },
        this._errorMessage,
        this._input
      )
    } else {
      this._errorMessage = '';
      this._internals.setValidity({});
    }
  }

  formResetCallback() {
    this.value = '';
    this._syncValue();
  }

  checkValidity() {
    return this._internals.checkValidity();
  }

  reportValidity() {
    return this._internals.reportValidity();
  }

  setCustomValidity(msg: string) {
    if (msg) {
      this._internals.setValidity({ customError: true }, msg, this._input);
      this._errorMessage = msg;
    } else {
      this._internals.setValidity({});
      this._errorMessage = '';
    }
  }

  render() {
    return html`
      <div class="flex flex-col gap-2">
        <div class="flex justify-between">
          <label class="text-gray-500 text-md/[24px] font-space-mono font-bold" for=${this._inputId} part="label"><span class="">${this.label}</span></label>
          <span class="text-orange-400 text-md/[24px] font-space-mono font-bold" part="error-message" id=${this._errorId}>${this._errorMessage}</span>
        </div>
        <div class="hover:not-[:has(:invalid)]:outline-green-400 focus-within:not-[:has(:invalid)]:outline-green-400 hover:outline-solid focus-within:outline-solid focus-within:outline-2 hover:outline-2 has-[:invalid]:outline-orange-400! has-[:invalid]:outline-2! flex items-center justify-between bg-grey-50 px-[17px] py-1.5 rounded-sm">
          <slot name="prefix"></slot>
          <input type="text" id=${this._inputId} class="cursor-pointer text-right text-green-900 text-xl/[36px] font-space-mono font-bold outline-none w-full bg-grey-50 px-[17px] py-1.5" />
        </div>
      </div>
    `
  }
}