var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, adoptStyles, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
let RangeInput = class RangeInput extends LitElement {
    constructor() {
        super(...arguments);
        this.name = "";
        this.value = "";
        this.label = "";
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
    _syncInputRef() {
        const attributes = this.attributes;
        for (const attr of Array.from(attributes)) {
            if (attr.name === "class" || attr.name === "id" || attr.name === "name") {
                continue;
            }
            this._input.setAttribute(attr.name, attr.value);
        }
        this._syncValue();
    }
    _syncValue() {
        var _a;
        this.value = this._input.value;
        this._input.value = (_a = this.value) !== null && _a !== void 0 ? _a : "";
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
        var _a, _b;
        return html `
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
          >${(_b = (_a = this._input) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0}</span>
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
};
RangeInput.formAssociated = true;
__decorate([
    property({ type: String })
], RangeInput.prototype, "name", void 0);
__decorate([
    property({ type: String })
], RangeInput.prototype, "value", void 0);
__decorate([
    property({ type: String })
], RangeInput.prototype, "label", void 0);
__decorate([
    query('input')
], RangeInput.prototype, "_input", void 0);
RangeInput = __decorate([
    customElement('cbm-range-input')
], RangeInput);
