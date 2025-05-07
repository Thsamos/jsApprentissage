const form = document.getElementById("monFormulaire");
const inputNom = document.getElementById("nom");
const inputEmail = document.getElementById("email");
const spanError = document.getElementById("spanError");
const spanErrorEmail = document.getElementById("spanErrorEmail");
const inputSubmit = document.getElementById("btnSubmit");
const error = document.querySelectorAll("input");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    resetError();

    let isEmailValid;
    let isNomValid;
    try {
        isNomValid = validerNom(inputNom.value);
    } catch (error) {
        afficherMessageErrorNom(error.message);
    }

    try {
        isEmailValid = validerEmail(inputEmail.value);
    } catch (error) {
        afficherMessageErrorEmail(error.message);
    }

    // Si tout est valide, soumettre le formulaire

    if (isNomValid && isEmailValid) {
        /*  alert(
            "Formulaire validé avec succès!\nNom: " +
                document.getElementById("nom").value +
                "\nEmail: " +
                document.getElementById("email").value
        );*/
        inputNom.value = "";
        inputNom.style.border = "none";
        inputEmail.value = "";
        inputEmail.style.border = "none";
       /* setTimeout(() => {
            window.location.href = "dashbord.html";
        }, 5000);*/
    }
});

function validerNom(nom) {
    if (!nom.trim()) {
        throw new Error("Le nom est obligation");
    }

    // Validation supplémentaire : seulement des lettres et espaces

    if (!/^[a-zA-Z -]+$/.test(nom)) {
        throw new Error("Le nom ne doit contenir que des lettres");
    }

    inputNom.classList.add("validChamp");
    spanError.innerHTML = "";
    return true;
}

function validerEmail(email) {
    if (!email.trim()) {
        throw new Error("L'email est obligatoire");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error(
            "Veuillez entrer un email valide (ex: exemple@domaine.com)"
        );
    }

    spanErrorEmail.innerHTML = "";
    inputEmail.classList.add("validChamp");
    return true;
}

function afficherMessageErrorNom(messageError) {
    spanError.innerText = messageError;
    inputNom.classList.add("errorChamp");
}

function afficherMessageErrorEmail(messageError) {
    spanErrorEmail.innerHTML = messageError;
    inputEmail.classList.add("errorChamp");
}

function resetError() {
    document.querySelectorAll("input").forEach((input, index) => {
        input.classList.remove("errorChamp", "validChamp");
    });
    document.querySelectorAll(".spanErro").forEach((spanError, index) => {
        spanError.innerHTML = "";
    });
}

// Validation en temps réel

inputNom.addEventListener("input", (event) => {
    inputNom.classList.remove("errorChamp", "validChamp");
    spanError.innerHTML = "";
});

inputEmail.addEventListener("input", (event) => {
    inputEmail.classList.remove("errorChamp", "validChamp");
    spanErrorEmail.innerHTML = "";
});
