const loginLi = document.getElementById("loginLi");
const loginForm = document.querySelector("#login form");
const inputEmail = document.getElementById("emailInputLog");
const inputMdp = document.getElementById("mdpInputLog");
const loginSection = document.getElementById("login");
const main = document.querySelector("main");

loginLi.addEventListener("click", () => {
  const openLoginPage = () => {
    if ((loginSection.style.display = "none")) {
      loginLi.style.fontWeight = "bold";
      main.style.display = "none";
      loginSection.style.display = "flex";
    }

    if (loginLi.textContent === "logout") {
      loginLi.textContent = "login";
    }
  };
  openLoginPage();
});

const closeLoginPage = () => {
  if ((loginSection.style.display = "flex")) {
    loginLi.style.fontWeight = "normal";
    main.style.display = "block";
    loginSection.style.display = "none";
  }

  if (loginLi.textContent === "login") {
    loginLi.textContent = "logout";
  }
};
// Evènement submit quand on clique sur le bouton se connecter après avoir rempli le form

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // On récupère les valeurs des inputs en objet
  const completedForm = {
    email: inputEmail.value,
    password: inputMdp.value,
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
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
    });

  //   if (email && mdp) {
  //     loginLi.style.fontWeight = "normal";
  //     loginSection.style.display = "none";
  //     main.style.display = "block";

  //     if (loginLi.textContent === "login") {
  //       loginLi.textContent = "logout";
  //     }

  //     inputs.forEach((input) => (input.value = ""));
  //   } else {
  //     alert("Veuillez remplir les champs correctement");
  //   }
});
