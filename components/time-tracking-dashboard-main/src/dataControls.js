let values;
const cards = {
    Work: document.querySelector("#work-card"),
    Play: document.querySelector("#play-card"),
    Study: document.querySelector("#study-card"),
    Exercise: document.querySelector("#exercise-card"),
    Social: document.querySelector("#social-card"),
    "Self Care": document.querySelector("#self-care-card"),
};
document.querySelector("#user-card").addEventListener("period-change", (e) => {
    const customEvent = e;
    updateCards(customEvent.detail);
});
const data = fetch("./data.json")
    .then((response) => {
    if (!response.ok)
        return console.log("An error occured while fetching data");
    return response.json();
})
    .then((data) => {
    values = data.reduce((acc, curr) => {
        const title = curr.title;
        const props = Object.assign({}, curr.timeframes);
        acc[title] = props;
        return acc;
    }, {});
})
    .then(() => {
    updateCards("Weekly");
});
function updateCards(period) {
    Object.entries(cards).map(([name, card], _) => {
        card.period = period;
        card.currAmount = values[name][period.toLowerCase()].current;
        card.lastAmount = values[name][period.toLowerCase()].previous;
    });
}
export {};
