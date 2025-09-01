import { LitElement, html, adoptStyles, PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import sheet from "./../styles/tw.css" with { type: "css" };

@customElement('cbm-radio-button')
export default class RadioButton extends LitElement {
  static formAssociated = true;

  @property({ type: String }) name = '';
  @property({ type: String }) value = '';
  @property({ type: String }) label = '';
  @property({ type: Boolean, reflect: true }) checked = false;

  @query('input') protected _input!: HTMLInputElement;

  protected _internals = this.attachInternals();
  protected _inputId = `input-${Math.random().toString(36).slice(2)}`;
  
  protected firstUpdated(_changedProperties: PropertyValues): void {
    adoptStyles(this.renderRoot as ShadowRoot, [sheet]);

    this._syncInputRef();
    this.addEventListener('click', () => this._toggle());
  }

  protected updated(_changedProperties: PropertyValues): void {
    if (_changedProperties.has('checked')) {
      this._syncValue();
    };
  }

  protected _syncValue() {
    this._internals.setFormValue(this.checked ? this.value : null, this.name);
    
    let group: NodeListOf<RadioButton>;
    if (this.checked) {
      group = document.querySelectorAll<RadioButton>(`cbm-radio-button[name="${this.name}"], cbm-radio-button-custom[name="${this.name}"]`);
    }
    
    group?.forEach(radio => {
      if (radio != this) {
        radio.checked = false;
        radio._internals.setFormValue(null);
      }
    });

    if (this.checked) {
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }
  }

  protected _syncInputRef() {
    this._input.id = this._inputId;

    const attributes = this.attributes;
    for (const attr of Array.from(attributes)) {
      if (attr.name === 'class' || attr.name === 'id') {
        continue;
      }
      this._input.setAttribute(attr.name, attr.value);
    }

    this._syncValue();
  }

  protected _toggle() {
    if (!this.checked) {
      this.checked = true;
    }
  }

  render() {
    return html`
      <div class="cursor-pointer flex justify-center rounded-sm px-4 py-2 w-full ${this._getButtonBgColor()} ${this._getTextColor()} hover:bg-green-200 hover:text-green-900 font-bold font-space-mono text-xl/[36px]">
        <label class="cursor-pointer" for=${this._inputId}>${this.label}</label>
        <input class="hidden" id=${this._inputId} .checked=${this.checked} @change=${() => this._toggle()} type="radio"/>
      </div>
    `
  }

  _getButtonBgColor() {
    return this.checked ? 'bg-green-400' : 'bg-green-900';
  }

  _getTextColor() {
    return this.checked ? 'text-green-900' : 'text-grey-50';
  }
}