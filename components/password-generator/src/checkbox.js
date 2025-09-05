var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, adoptStyles } from "lit";
import { customElement, property, query } from "lit/decorators.js";
let Checkbox = class Checkbox extends LitElement {
    constructor() {
        super(...arguments);
        this.name = "";
        this.value = "";
        this.label = "";
        this.checked = false;
        this._internals = this.attachInternals();
        this._inputId = `input-${Math.random().toString(36).slice(2)}`;
    }
    firstUpdated(_changedProperties) {
        fetch("./styles/tw.css")
            .then((res) => {
            return res.text();
        })
            .then((cssText) => {
            const sheet = new CSSStyleSheet();
            sheet.replaceSync(cssText);
            adoptStyles(this.renderRoot, [sheet]);
        });
        this._syncInputRef();
    }
    updated(_changedProperties) {
        if (_changedProperties.has("checked")) {
            this._syncValue();
        }
    }
    _syncValue() {
        this._internals.setFormValue(this.checked ? this.value : null, this.name);
        if (this.checked) {
            this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
        }
    }
    _syncInputRef() {
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
    _toggle() {
        this.checked = !this.checked;
    }
    render() {
        return html `
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
        <div class="flex items-center justify-center w-5 h-5 ${this._getCheckboxClasses()}">${this.checked ? html `<svg width="14" height="12" xmlns="http://www.w3.org/2000/svg"><path stroke="#18171F" stroke-width="3" fill="none" d="M1 5.607 4.393 9l8-8"/></svg>` : ""}</div>
        <label @click=${() => this._toggle()} class="cursor-pointer" for=${this._inputId}>${this.label}</label>
      </div>
    `;
    }
    _getCheckboxClasses() {
        return this.checked ? "bg-green-200" : "border-2 border-white border-solid";
    }
};
Checkbox.formAssociated = true;
__decorate([
    property({ type: String })
], Checkbox.prototype, "name", void 0);
__decorate([
    property({ type: String })
], Checkbox.prototype, "value", void 0);
__decorate([
    property({ type: String })
], Checkbox.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Checkbox.prototype, "checked", void 0);
__decorate([
    query("input")
], Checkbox.prototype, "_input", void 0);
Checkbox = __decorate([
    customElement("cbm-checkbox")
], Checkbox);
export default Checkbox;
