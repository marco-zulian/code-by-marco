const billInput = document.querySelector("#bill-input");
const peopleInput = document.querySelector("#people-input");
const tipsForm = document.querySelector("#tips-form");
const resultPannel = document.querySelector("#result-pannel");
const buttons = document.querySelectorAll("cbm-radio-button");
billInput.addEventListener("input", (e) => {
    const element = e.target;
    if (element.value === "") {
        element.setCustomValidity("");
        resultPannel.setData(buildData());
        return;
    }
    const value = Number(element.value);
    if (value < 0) {
        element.setCustomValidity("Can't be smaller than zero");
    }
    resultPannel.setData(buildData());
});
peopleInput.addEventListener("input", (e) => {
    const element = e.target;
    if (element.value === "") {
        element.setCustomValidity("");
        resultPannel.setData(buildData());
        return;
    }
    const value = Number(element.value);
    if (value < 0) {
        element.setCustomValidity("Can't be smaller than zero");
    }
    else if (value === 0) {
        element.setCustomValidity("Can't be zero");
    }
    resultPannel.setData(buildData());
});
tipsForm.addEventListener("change", (e) => {
    const target = e.target;
    if (target === null || target === void 0 ? void 0 : target.checked) {
        e.stopPropagation();
        resultPannel.setData(buildData());
    }
});
document.addEventListener("reset-form", () => {
    tipsForm === null || tipsForm === void 0 ? void 0 : tipsForm.reset();
    buttons.forEach((e) => {
        const input = e;
        if (input) {
            input.checked = false;
        }
    });
});
function buildData() {
    const data = new FormData(tipsForm);
    return Object.fromEntries(data.entries());
}
export {};
