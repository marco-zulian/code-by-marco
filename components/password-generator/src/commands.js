const form = document.querySelector("#generate-pw-form");
const passwordInput = document.querySelector("#password-input");
const strengthDisplay = document.querySelector("#strength-display");
const copyButton = document.querySelector("#copy-button");
const copiedLabel = document.querySelector("#copied-label");
form.addEventListener('submit', submitForm);
copyButton.addEventListener('click', copyPassword);
function submitForm(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const password = generatePassword(data);
    const entries = Object.fromEntries(data);
    passwordInput.value = password;
    if (password.length === 0) {
        return;
    }
    copiedLabel.classList.add('hidden');
    if (password.length <= 8) {
        strengthDisplay.strength = 'Too Weak';
    }
    else if (password.length <= 15) {
        strengthDisplay.strength = 'Weak';
    }
    else {
        strengthDisplay.strength = 'Medium';
        if (entries.lower !== undefined && entries.upper !== undefined && entries.numbers !== undefined && entries.symbols !== undefined) {
            strengthDisplay.strength = 'Strong';
        }
    }
}
function generatePassword(options) {
    let lowercases = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let uppercases = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '~', ':', ';', '?', '>', '<', '[', ']'];
    let characters = [];
    let passwordLength = Number(options.get('length'));
    if (options.get('lower') !== null) {
        characters.push(...lowercases);
    }
    if (options.get('upper') !== null) {
        characters.push(...uppercases);
    }
    if (options.get('numbers') !== null) {
        characters.push(...numbers);
    }
    if (options.get('symbols') !== null) {
        characters.push(...symbols);
    }
    if (characters.length === 0 || passwordLength === 0) {
        copiedLabel.classList.add('hidden');
        strengthDisplay.strength = null;
        return '';
    }
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}
function copyPassword() {
    const textToCopy = passwordInput.value;
    if (textToCopy.length === 0) {
        return;
    }
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
        copiedLabel.classList.remove('hidden');
    });
}
export {};
