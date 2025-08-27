var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, adoptStyles } from 'https://esm.sh/lit';
import { customElement, property, state } from 'https://esm.sh/lit/decorators.js';
import sheet from "../styles/tw.css" with { type: "css" };
let UserCard = class UserCard extends LitElement {
    constructor() {
        super(...arguments);
        this.src = '';
        this.alt = '';
        this.name = '';
        this._selected = 'Weekly';
    }
    firstUpdated() {
        adoptStyles(this.renderRoot, [sheet]);
    }
    render() {
        return html `
      <div class="rounded-md bg-navy-900 flex flex-col h-full">
        <div class="rounded-md bg-purple-600 p-8 flex gap-6 items-center lg:flex-col lg:items-start lg:gap-10 lg:grow-1">
          <img class="box-content h-16 border-white border-solid border-3 rounded-[50%]" src="${this.src}" alt="${this.alt}">
          <div>
            <p class="font-rubik text-navy-200 text-sm/[18px] font-regular">Report for</p>
            <p class="font-rubik text-white text-lg/[28px] lg:text-2xl/[47px] font-light">${this.name}</p>
          </div>
        </div>
        <div class="grid grid-cols-3 py-6 w-full md:w-[343px] lg:w-full self-center lg:grid-cols-1 lg:grid-rows-3 lg:items-start lg:p-8 lg:mt-auto lg:gap-5">
          <button @click=${() => this._dispatchPeriodChange('Daily')} class="lg:items-start lg:flex"><span class="font-rubik cursor-pointer ${this._selected == 'Daily' ? 'text-white' : 'text-purple-500'} hover:text-white text-md/[21px] font-regular">Daily</span></button>
          <button @click=${() => this._dispatchPeriodChange('Weekly')} class="lg:flex lg:items-start"><span class="font-rubik cursor-pointer ${this._selected == 'Weekly' ? 'text-white' : 'text-purple-500'} hover:text-white text-md/[21px] font-regular">Weekly</span></button>
          <button @click=${() => this._dispatchPeriodChange('Monthly')} class="lg:flex lg:items-start"><span class="font-rubik cursor-pointer ${this._selected == 'Monthly' ? 'text-white' : 'text-purple-500'} hover:text-white text-md/[21px] font-regular"<p>Monthly</span></button>
        </div>
      </div>
    `;
    }
    _dispatchPeriodChange(period) {
        if (period === this._selected) {
            return;
        }
        this.dispatchEvent(new CustomEvent('period-change', { detail: period, bubbles: true, composed: true }));
        this._selected = period;
    }
};
__decorate([
    property({ type: String })
], UserCard.prototype, "src", void 0);
__decorate([
    property({ type: String })
], UserCard.prototype, "alt", void 0);
__decorate([
    property({ type: String })
], UserCard.prototype, "name", void 0);
__decorate([
    state({ type: String })
], UserCard.prototype, "_selected", void 0);
UserCard = __decorate([
    customElement('cbm-user-card')
], UserCard);
