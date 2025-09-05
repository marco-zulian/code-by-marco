import { LitElement, PropertyValues, adoptStyles, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

@customElement('cbm-range-input')
class RangeInput extends LitElement {
  static formAssociated = true;

  @property({ type: String }) name = "";
  @property({ type: String }) value = "";
  @property({ type: String }) label = "";

  private _internals = this.attachInternals();
  private _inputId = `input-${Math.random().toString(36).slice(2)}`;

  @query('input') private _input: HTMLInputElement;

  protected firstUpdated(_changedProperties: PropertyValues): void {
    fetch("./styles/tw.css")
      .then((res) => {
        return res.text()
      })
      .then((cssText) => {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(cssText);

        adoptStyles(this.renderRoot as ShadowRoot, [sheet]);
      });

    this._syncInputRef();
  }

  private _syncInputRef() {
    const attributes = this.attributes;

    for (const attr of Array.from(attributes)) {
      if (attr.name === "class" || attr.name === "id" || attr.name === "name") {
        continue;
      }
      this._input.setAttribute(attr.name, attr.value);
    }

    this._syncValue();
  }

  private _syncValue() {
    this.value = this._input.value;
    this._input.value = this.value ?? "";

    const percentageFilled = Number(this.value) * 100 / Number(this._input.max);
    this._input.style.background = `linear-gradient(to right, #a4ffaf ${percentageFilled}%, #18171f ${percentageFilled}%)`;

    const formData = new FormData();
    formData.append(this.name, this.value);

    this._internals.setFormValue(formData);
  }

  checkValidity() {
    return this._internals.checkValidity();
  }

  reportValidity() {
    return this._internals.reportValidity();
  }

  render() {
    return html`
      <div class="flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <label
            for=${this._inputId}
            class="text-md text-grey-200 font-jet-brains-mono font-bold"
            part="label"
            ><span class="">${this.label}</span></label
          >
          <span
            part="letter-counter"
            class="text-xl text-green-200 font-jet-brains-mono font-boldx"
          >${this._input?.value ?? 0}</span>
        </div>
        <input
          type="range"
          class="accent-green-200 border-none outline-none"
          id=${this._inputId}
          @input=${() => this._syncValue()}
        />
      </div>
    `;
  }
}