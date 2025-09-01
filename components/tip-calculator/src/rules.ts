import InputText from "./input";
import ResultPannel from "./resultPannel";
import RadioButton from "./tipButton";

const billInput = document.querySelector("#bill-input") as InputText;
const peopleInput = document.querySelector("#people-input") as InputText;
const tipsForm = document.querySelector("#tips-form") as HTMLFormElement;
const resultPannel = document.querySelector("#result-pannel") as ResultPannel;
const buttons = document.querySelectorAll("cbm-radio-button");

billInput.addEventListener("input", (e: Event) => {
  const element = e.target as HTMLInputElement;
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

peopleInput.addEventListener("input", (e: Event) => {
  const element = e.target as HTMLInputElement;
  if (element.value === "") {
    element.setCustomValidity("");
    resultPannel.setData(buildData());
    return;
  }

  const value = Number(element.value);

  if (value < 0) {
    element.setCustomValidity("Can't be smaller than zero");
  } else if (value === 0) {
    element.setCustomValidity("Can't be zero");
  }

  resultPannel.setData(buildData());
});

tipsForm.addEventListener("change", (e: Event) => {
  const target = e.target as RadioButton;

  if (target?.checked) {
    e.stopPropagation();
    resultPannel.setData(buildData());
  }
});

document.addEventListener("reset-form", () => {
  tipsForm?.reset();
  buttons.forEach((e) => {
    const input = e as HTMLInputElement;
    if (input) {
      input.checked = false;
    }
  });
});

function buildData() {
  const data = new FormData(tipsForm);
  return Object.fromEntries((data as any).entries());
}
