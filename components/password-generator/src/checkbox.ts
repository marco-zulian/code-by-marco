import { LitElement, html, adoptStyles, PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("cbm-checkbox")
export default class Checkbox extends LitElement {
  static formAssociated = true;

  @property({ type: String }) name = "";
  @property({ type: String }) value = "";
  @property({ type: String }) label = "";
  @property({ type: Boolean, reflect: true }) checked = false;

  @query("input") protected _input!: HTMLInputElement;

  protected _internals = this.attachInternals();
  protected _inputId = `input-${Math.random().toString(36).slice(2)}`;
 
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

  protected updated(_changedProperties: PropertyValues): void {
    if (_changedProperties.has("checked")) {
      this._syncValue();
    }
  }

  protected _syncValue() {
    this._internals.setFormValue(this.checked ? this.value : null, this.name);

    if (this.checked) {
      this.dispatchEvent(
        new Event("change", { bubbles: true, composed: true }),
      );
    }
  }

  protected _syncInputRef() {
    this._input.id = this._inputId;

    const attributes = this.attributes;
    for (const attr of Array.from(attributes)) {
      if (attr.name === "class" || attr.name === "id") {
        continue;
      }
      this._input.setAttribute(attr.name, attr.value);
    }

    this._syncValue();
  }

  protected _toggle() {
    this.checked = !this.checked;
  }

  render() {
    return html`
      <div
        @click=${() => this._toggle()}
        class="font-jet-brains-mono text-grey-200 text-md flex gap-4 md:gap-6 w-full cursor-pointer justify-center items-center"
      >
        <input
          class="hidden"
          id=${this._inputId}
          .checked=${this.checked}
          type="checkbox"
        />
        <div class="flex items-center justify-center w-5 h-5 ${this._getCheckboxClasses()}">${this.checked ? html`<svg width="14" height="12" xmlns="http://www.w3.org/2000/svg"><path stroke="#18171F" stroke-width="3" fill="none" d="M1 5.607 4.393 9l8-8"/></svg>` : ""}</div>
        <label @click=${() => this._toggle()} class="cursor-pointer" for=${this._inputId}>${this.label}</label>
      </div>
    `;
  }

  private _getCheckboxClasses() {
    return this.checked ? "bg-green-200" : "border-2 border-white border-solid";
  }
}
