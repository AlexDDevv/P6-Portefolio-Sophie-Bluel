const loginLi = document.getElementById("loginLi");
const loginForm = document.querySelector("#login form");
const inputsForm = document.querySelectorAll("#login input");

loginLi.addEventListener("click", () => {
  if (localStorage.getItem("userId") && localStorage.getItem("token")) {
    // Si l'utilisateur est connecté, effectuer la déconnexion
    localStorage.clear();
    // Une fois déconnecté, mettre à jour le texte du lien
    loginLi.textContent = "login";
  }
  window.location.href = "login.html";
});

// Fonction pour signaler une erreur
const errorDisplay = (tag, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.classList.add("error");
  } else {
    container.classList.remove("error");
    span.classList.remove("error");
  }
};

// Fonction pour afficher un message d'erreur
const errorConnection = (valid) => {
  const pError = document.querySelector(".erreur-connexion");

  if (!valid) {
    pError.classList.add("error");
  } else {
    pError.classList.remove("error");
  }
};

// Fonction pour vérifier la validité de l'input email
const emailChecker = (value) => {
  if (value.length == 0) {
    errorDisplay("email");
    errorEmail.textContent = "Ne doit pas être vide.";
  } else if (!value.match(/^\w+[\w.-]*@\w+(-\w+)*\.\w{2,4}$/)) {
    errorDisplay("email");
    errorEmail.textContent = "E-mail invalide.";
  } else if (value === "sophie.bluel@test.tld") {
    errorDisplay("email", true);
  } else {
    errorDisplay("email", true);
  }
};

// Fonction pour vérifier la validité de l'input password
const passwordChecker = (value) => {
  if (value.length == 0) {
    errorDisplay("mdp");
  } else {
    errorDisplay("mdp", true);
  }
};

inputsForm.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "emailInputLog":
        emailChecker(e.target.value);
        break;
      case "mdpInputLog":
        passwordChecker(e.target.value);
        break;
      default:
        nul;
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("userId") && localStorage.getItem("token")) {
    loginLi.textContent = "logout";

    const modifModeBar = document.querySelector(".publish-changes");
    modifModeBar.style.display = "flex";

    const header = document.querySelector("header");
    header.style.paddingTop = "50px";

    const modifSpans = document.querySelectorAll(".span-modif");
    modifSpans.forEach((span) => {
      span.classList.add("display-modif");
    });
  }
});

// Evènement submit quand on clique sur le bouton se connecter après avoir rempli le form
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // On récupère les valeurs des inputs en objet
  const completedForm = {
    email: emailInputLog.value,
    password: mdpInputLog.value,
  };

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(completedForm),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        window.location.href = "index.html";
      } else {
        errorDisplay("email");
        errorDisplay("mdp");
        errorConnection();
      }
    });
});
