import Card, { CardPeriodicity } from "./card";

let values;
const cards = {
  "Work": document.querySelector('#work-card') as unknown as Card,
  "Play": document.querySelector('#play-card') as unknown as Card,
  "Study": document.querySelector('#study-card') as unknown as Card,
  "Exercise": document.querySelector('#exercise-card') as unknown as Card,
  "Social": document.querySelector('#social-card') as unknown as Card,
  "Self Care": document.querySelector('#self-care-card') as unknown as Card
};

document.querySelector('#user-card').addEventListener('period-change', (e) => {
  const customEvent = e as CustomEvent;
  updateCards(customEvent.detail);
});

const data = fetch('./data.json')
  .then((response) => {
    if(!response.ok) return console.log('An error occured while fetching data');
    return response.json();
  })
  .then((data) => {
    values = data.reduce((acc: object, curr: any) => {
      const title = curr.title;
      const props = { ...curr.timeframes };

      acc[title] = props;
      return acc;
    }, {});
  })
  .then(() => {
    updateCards('Weekly');
  });

function updateCards(period: CardPeriodicity) {
  Object.entries(cards).map(([name, card], _) => {
    card.period = period
    card.currAmount = values[name][period.toLowerCase()].current;
    card.lastAmount = values[name][period.toLowerCase()].previous;
  });
}
