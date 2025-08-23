const errorMessage = document.querySelector("#email-error");
const successModal = document.querySelector("#success-modal");
const input = document.querySelector("#email");
const formContent = document.querySelector("#form-content");
const confirmationEmail = document.querySelector("#confirmation-email");
const successModalButton = document.querySelector("#success-modal-button");

const validateForm = (e) => {
  e.preventDefault(e);
  input.classList.add("submitted");

  if (e.target.checkValidity()) {
    errorMessage.classList.add("hidden");
    formContent.classList.add("hidden");

    confirmationEmail.innerHTML = input.value;
    successModal.classList.add("flex");
    successModal.classList.remove("hidden");
  } else {
    errorMessage.classList.remove("hidden");
    successModal.classList.add("hidden");
  }
};

const closeModal = () => {
  input.classList.remove("submitted");
  input.value = "";
  errorMessage.classList.add("hidden");
  formContent.classList.remove("hidden");

  successModal.classList.add("hidden");
  successModal.classList.remove("flex");
};

document.querySelector("form").addEventListener("submit", validateForm);
successModalButton.addEventListener("click", closeModal);
