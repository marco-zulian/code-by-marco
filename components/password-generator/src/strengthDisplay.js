var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, adoptStyles, html } from "lit";
import { property, customElement, state } from "lit/decorators.js";
let StrengthDisplay = class StrengthDisplay extends LitElement {
    constructor() {
        super(...arguments);
        this.strength = null;
        this.filledBars = 0;
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
    }
    willUpdate(changedProperties) {
        if (changedProperties.has('strength')) {
            this._updateFilledBarsCount();
        }
    }
    render() {
        return html `
      <div class="flex justify-between items-center p-4 md:px-8 md:py-4 bg-grey-850">
        <p class="text-md text-grey-600 font-jet-brains-mono uppercase">Strength</p>
        <div class="flex gap-4">
          ${this.strength !== null ? html `<p class="text-lg text-grey-200 font-jet-brains-mono uppercase">${this._getStrengthLabel()}</p>` : ""}
          <div class="flex gap-2 items-center">
            ${[1, 2, 3, 4].map(v => {
            return v <= this.filledBars ? html `<div class="w-2.5 h-7 ${this._getFilledBarColor()}"></div>` : html `<div class="w-2.5 h-7 border-2 border-solid border-grey-200"></div>`;
        })}
          </div>
        </div>
      </div>
    `;
    }
    _getStrengthLabel() {
        return this.strength == "Too Weak" ? this.strength + "!" : this.strength;
    }
    _updateFilledBarsCount() {
        switch (this.strength) {
            case "Too Weak":
                this.filledBars = 1;
                break;
            case "Weak":
                this.filledBars = 2;
                break;
            case "Medium":
                this.filledBars = 3;
                break;
            case "Strong":
                this.filledBars = 4;
                break;
            default: this.filledBars = 0;
        }
    }
    _getFilledBarColor() {
        switch (this.strength) {
            case "Too Weak": return "bg-red-500";
            case "Weak": return "bg-orange-400";
            case "Medium": return "bg-yellow-300";
            case "Strong": return "bg-green-200";
            default: return "bg-white";
        }
    }
};
__decorate([
    property({ type: String })
], StrengthDisplay.prototype, "strength", void 0);
__decorate([
    state()
], StrengthDisplay.prototype, "filledBars", void 0);
StrengthDisplay = __decorate([
    customElement("cbm-strength-display")
], StrengthDisplay);
export default StrengthDisplay;
