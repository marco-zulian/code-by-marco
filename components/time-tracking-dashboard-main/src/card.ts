import { LitElement, html, adoptStyles } from 'https://esm.sh/lit';
import { customElement, property } from 'https://esm.sh/lit/decorators.js';
import sheet from "../styles/tw.css" with { type: "css" };

type CardType = "Work" | "Play" | "Study" | "Exercise" | "Social" | "Self Care";
export type CardPeriodicity = "Daily" | "Weekly" | "Monthly";

@customElement('cbm-card')
export default class Card extends LitElement {
  @property({ type: String })
  category: CardType = 'Work';

  @property({ type: String })
  period: CardPeriodicity = 'Daily'

  @property({ type: Number })
  currAmount: number = 0;

  @property({ type: Number })
  lastAmount: number = 0;

  firstUpdated() {
    adoptStyles(this.renderRoot as ShadowRoot, [sheet]);
  }

  render() {
    return html`
      <div class="${this.getBackgroundColor()} relative overflow-hidden pt-9.5 md:pt-11.25 rounded-md">
        <img src="./assets/icon-${this.getIcon()}.svg" alt="" class="absolute right-4.5 top-0">        
        <div class="flex flex-col gap-2 md:gap-4 lg:gap-6 bg-navy-900 hover:bg-navy-800 rounded-t-md p-8 md:p-6 lg:p-8 z-10 relative">
          <div class="flex justify-between items-center md:min-w-35">
            <p class="font-rubik font-medium text-white text-md/[21px]">${this.category}</p>
            <svg class="fill-navy-200 hover:fill-white cursor-pointer" width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill-rule="evenodd"/></svg>
          </div>
          <div class="flex justify-between items-center md:flex-col md:items-start md:gap-2">
            <p class="font-rubik text-white font-light text-xl/[38px] md:text-3xl/[66px] md:align-top">${this.currAmount}hr${this.currAmount > 1 ? 's' : ''}</p>
            <p class="font-rubik text-navy-200 font-regular text-sm/[18px]">${this.getLastLabel()} - ${this.lastAmount}hr${this.lastAmount > 1 ? 's' : '' }</p>
          </div>
        </div>
      </div>
    `
  }

  getLastLabel(): string {
    switch (this.period) {
      case 'Daily': return 'Yesterday'
      case 'Weekly': return 'Last Week' 
      case 'Monthly': return 'Last Month'
    }
  }

  getBackgroundColor(): string {
    switch (this.category) {
      case 'Work': return 'bg-orange-300'
      case 'Play': return 'bg-blue-300'
      case 'Study': return 'bg-pink-400'
      case 'Exercise': return 'bg-green-400'
      case 'Social': return 'bg-purple-700'
      case 'Self Care': return 'bg-yellow-300'
    }
  }

  getIcon(): string {
    switch(this.category) {
      case 'Work': return 'work'
      case 'Play': return 'play'
      case 'Study': return 'study'
      case 'Exercise': return 'exercise'
      case 'Social': return 'social'
      case 'Self Care': return 'self-care'
    }
  }
}