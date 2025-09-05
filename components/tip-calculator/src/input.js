var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, adoptStyles } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
let InputText = class InputText extends LitElement {
    constructor() {
        super(...arguments);
        this.value = "";
        this.label = "";
        this.name = "";
        this._errorMessage = "";
        this._internals = this.attachInternals();
        this._inputId = `input-${Math.random().toString(36).slice(2)}`;
        this._errorId = `error-${Math.random().toString(36).slice(2)}`;
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
        this._input.id = this._inputId;
        this._input.setAttribute("aria-describedby", this._errorId);
        this._input.addEventListener("input", () => {
            this.value = this._input.value;
            this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
        });
        this._input.addEventListener("change", () => {
            this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
        });
        this._input.addEventListener("invalid", () => {
            this.dispatchEvent(new Event("invalid", { bubbles: true, composed: true }));
        });
        const attributes = this.attributes;
        for (const attr of Array.from(attributes)) {
            if (attr.name === "class" || attr.name === "id" || attr.name === "name") {
                continue;
            }
            this._input.setAttribute(attr.name, attr.value);
        }
        this._syncValue();
    }
    updated(_changedProperties) {
        if (_changedProperties.has("value")) {
            this._syncValue();
        }
    }
    _syncValue() {
        var _a;
        this._input.value = (_a = this.value) !== null && _a !== void 0 ? _a : "";
        const formData = new FormData();
        formData.append(this.name, this.value);
        this._internals.setFormValue(formData);
        this._syncValidity();
        this.dispatchEvent(new CustomEvent("validated", {
            detail: { valid: this.checkValidity(), value: this.value },
            bubbles: true,
            composed: true,
        }));
    }
    _syncValidity() {
        if (!this._input.checkValidity()) {
            this._errorMessage = this._input.validationMessage;
            this._internals.setValidity({ customError: true }, this._errorMessage, this._input);
        }
        else {
            this._errorMessage = "";
            this._internals.setValidity({});
        }
    }
    formResetCallback() {
        this.value = "";
        this._syncValue();
    }
    checkValidity() {
        return this._internals.checkValidity();
    }
    reportValidity() {
        return this._internals.reportValidity();
    }
    setCustomValidity(msg) {
        if (msg) {
            this._internals.setValidity({ customError: true }, msg, this._input);
            this._errorMessage = msg;
        }
        else {
            this._internals.setValidity({});
            this._errorMessage = "";
        }
    }
    render() {
        return html `
      <div class="flex flex-col gap-2">
        <div class="flex justify-between">
          <label
            class="text-md/[24px] font-space-mono font-bold text-gray-500"
            for=${this._inputId}
            part="label"
            ><span class="">${this.label}</span></label
          >
          <span
            class="text-md/[24px] font-space-mono font-bold text-orange-400"
            part="error-message"
            id=${this._errorId}
            >${this._errorMessage}</span
          >
        </div>
        <div
          class="bg-grey-50 flex items-center justify-between rounded-sm px-[17px] py-1.5 focus-within:outline-2 focus-within:outline-solid focus-within:not-[:has(:invalid)]:outline-green-400 hover:outline-2 hover:outline-solid hover:not-[:has(:invalid)]:outline-green-400 has-[:invalid]:outline-2! has-[:invalid]:outline-orange-400!"
        >
          <slot name="prefix"></slot>
          <input
            type="text"
            id=${this._inputId}
            class="placeholder:text-grey-550 font-space-mono bg-grey-50 w-full cursor-pointer px-[17px] py-1.5 text-right text-xl/[36px] font-bold text-green-900 outline-none"
          />
        </div>
      </div>
    `;
    }
};
InputText.formAssociated = true;
__decorate([
    property({ type: String })
], InputText.prototype, "value", void 0);
__decorate([
    property({ type: String })
], InputText.prototype, "label", void 0);
__decorate([
    property({ type: String })
], InputText.prototype, "name", void 0);
__decorate([
    state()
], InputText.prototype, "_errorMessage", void 0);
__decorate([
    query("input")
], InputText.prototype, "_input", void 0);
InputText = __decorate([
    customElement("cbm-input")
], InputText);
export default InputText;
