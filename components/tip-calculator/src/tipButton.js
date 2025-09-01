var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, adoptStyles } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import sheet from "./../styles/tw.css" with { type: "css" };
let RadioButton = class RadioButton extends LitElement {
    constructor() {
        super(...arguments);
        this.name = '';
        this.value = '';
        this.label = '';
        this.checked = false;
        this._internals = this.attachInternals();
        this._inputId = `input-${Math.random().toString(36).slice(2)}`;
    }
    firstUpdated(_changedProperties) {
        adoptStyles(this.renderRoot, [sheet]);
        this._syncInputRef();
        this.addEventListener('click', () => this._toggle());
    }
    updated(_changedProperties) {
        if (_changedProperties.has('checked')) {
            this._syncValue();
        }
        ;
    }
    _syncValue() {
        this._internals.setFormValue(this.checked ? this.value : null, this.name);
        let group;
        if (this.checked) {
            group = document.querySelectorAll(`cbm-radio-button[name="${this.name}"], cbm-radio-button-custom[name="${this.name}"]`);
        }
        group === null || group === void 0 ? void 0 : group.forEach(radio => {
            if (radio != this) {
                radio.checked = false;
                radio._internals.setFormValue(null);
            }
        });
        if (this.checked) {
            this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
        }
    }
    _syncInputRef() {
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
    _toggle() {
        if (!this.checked) {
            this.checked = true;
        }
    }
    render() {
        return html `
      <div class="cursor-pointer flex justify-center rounded-sm px-4 py-2 w-full ${this._getButtonBgColor()} ${this._getTextColor()} hover:bg-green-200 hover:text-green-900 font-bold font-space-mono text-xl/[36px]">
        <label class="cursor-pointer" for=${this._inputId}>${this.label}</label>
        <input class="hidden" id=${this._inputId} .checked=${this.checked} @change=${() => this._toggle()} type="radio"/>
      </div>
    `;
    }
    _getButtonBgColor() {
        return this.checked ? 'bg-green-400' : 'bg-green-900';
    }
    _getTextColor() {
        return this.checked ? 'text-green-900' : 'text-grey-50';
    }
};
RadioButton.formAssociated = true;
__decorate([
    property({ type: String })
], RadioButton.prototype, "name", void 0);
__decorate([
    property({ type: String })
], RadioButton.prototype, "value", void 0);
__decorate([
    property({ type: String })
], RadioButton.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], RadioButton.prototype, "checked", void 0);
__decorate([
    query('input')
], RadioButton.prototype, "_input", void 0);
RadioButton = __decorate([
    customElement('cbm-radio-button')
], RadioButton);
export default RadioButton;
