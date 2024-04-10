const form = document.forms[0];
const controls = Array.from(form.elements);

const inputPlaceholdersMapping = {};

function validateForm(event) {
    event.preventDefault();
    const formIsValid = form.checkValidity();
    if (!formIsValid) {
        form.classList.add("invalid");
    } else {
        form.classList.remove("invalid");
        form.submit();
    }
}

function reportError({target: control}) {
    checkInputValidity({target: control});
}

function checkInputValidity({target: input}) {
    const fieldName = input.getAttribute("placeholder") || inputPlaceholdersMapping[input.getAttribute("name")];
    const errorSpan = input.nextElementSibling;

    if (input.validity.valid) {
        input.setAttribute("placeholder", fieldName);
        input.classList.remove("invalid");
        errorSpan.textContent = "";
    } else {
        const {valueMissing, typeMismatch} = input.validity;
        input.classList.add("invalid");
        input.setAttribute("placeholder", "");
        inputPlaceholdersMapping[input.getAttribute("name")] = fieldName;
        if (valueMissing) {
            errorSpan.textContent = `${fieldName} cannot be empty`; 
        }
        if (typeMismatch) {
            errorSpan.textContent = `Looks like this is not an email`;
        }
    }
}

form.addEventListener("submit", validateForm);
controls.forEach(control => control.addEventListener("invalid", reportError));
controls.forEach(control => control.addEventListener("change", checkInputValidity));