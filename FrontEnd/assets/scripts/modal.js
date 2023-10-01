fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((modalData) => {
    // Création de la galerie dans la modal
    const modalGallery = document.querySelector(".modal-gallery");
    const createModalGallery = () => {
      for (let i = 0; i < modalData.length; i++) {
        const modalFigures = document.createElement("figure");
        modalFigures.id = `modalFigure-${modalData[i].id}`;
        modalFigures.innerHTML = `<img src="${modalData[i].imageUrl}" alt="${modalData[i].title}" data-type="${modalData[i].category.name}">
        <div class= "icon-figure">
          <i class="fa-solid fa-trash-can" data-id="${modalData[i].id}" id="trash-${modalData[i].id}"></i>
        </div>`;
        modalGallery.appendChild(modalFigures);
      }
    };
    createModalGallery();

    // Supprimer un projet
    const deleteProject = () => {
      const iconsTrash = document.querySelectorAll(".fa-trash-can");
      iconsTrash.forEach((icon) => {
        icon.addEventListener("click", (e) => {
          e.preventDefault();
          const projectId = e.currentTarget.getAttribute("data-id");
          const userToken = localStorage.getItem("token");

          fetch(`http://localhost:5678/api/works/${projectId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          })
            .then((response) => {
              if (response.status === 204) {
                return null;
              }
              return response.json();
            })
            .then((dataRes) => {
              if (dataRes === null) {
                const modalProjectDelete = document.getElementById(
                  `modalFigure-${projectId}`
                );
                modalProjectDelete.remove();

                const mainProjectDelete = document.getElementById(
                  `mainFigure-${projectId}`
                );
                mainProjectDelete.remove();
                ifDeleteSpanAppear(true);
              } else {
                ifDeleteSpanAppear();
              }
            });
        });
      });
    };
    deleteProject();

    const ifDeleteSpanAppear = (valid) => {
      const spanProject = document.querySelector(".span-project");

      if (valid) {
        spanProject.textContent = "Projet supprimé avec succès !";
        spanProject.style.color = "#4ade80";
      } else {
        spanProject.textContent = "Une erreur est survenue.";
        spanProject.style.color = "#ef4444";
      }
    };
  });

// Ouvrir et fermer la modal
const modalContainer = document.querySelector(".modal-container");
const modalOverlay = document.querySelector(".overlay");
const openModal = document.querySelectorAll(".modal-trigger");

const toggleModal = () => {
  modalContainer.classList.toggle("active-modal");
  modalOverlay.classList.toggle("active-modal");
};

openModal.forEach((trigger) =>
  trigger.addEventListener("click", () => {
    toggleModal();
    clearInputsModal();
    goBackToGallery();
  })
);

// Changer de page dans la modal
const galleryPartModal = document.querySelector(".gallery-part");
const addPicturePartModal = document.querySelector(".add-picture-part");
const titleChange = document.querySelector(".modal-title");
const arrowBack = document.getElementById("goBackModal");

const openAddPicturePage = () => {
  addPicturePartModal.style.display = "flex";
  galleryPartModal.style.display = "none";
  titleChange.textContent = "Ajout photo";
  arrowBack.classList.add("visible-arrow");
};

const goBackToGallery = () => {
  addPicturePartModal.style.display = "none";
  galleryPartModal.style.display = "flex";
  titleChange.textContent = "Galerie photo";
  arrowBack.classList.remove("visible-arrow");
};

const addPictureBtn = document.querySelector(".add-picture");
addPictureBtn.addEventListener("click", () => {
  openAddPicturePage();
});

arrowBack.addEventListener("click", () => {
  goBackToGallery();
  clearInputsModal();
});

// Ajouter une nouvelle image
const inputFile = document.getElementById("addPictureBtn");
const imgPreview = document.querySelector(".preview-img");

inputFile.addEventListener("change", () => {
  file = inputFile.files[0];

  const reader = new FileReader();
  reader.onloadend = function () {
    imgPreview.style.display = "block";
    imgPreview.src = reader.result;
  };
  reader.readAsDataURL(file);
});

// Supprimer l'image choisie et vider les inputs
const clearInputsModal = () => {
  addPicturePartModal.reset();
  imgPreview.style.display = "none";
  imgPreview.src = "";
};

// Permettre l'ajout d'un nouveau projet
const modalInputFile = document.getElementById("addPictureBtn");
const modalInputTitle = document.getElementById("inputTitlePicture");
const modalInputCate = document.getElementById("inputCategoryPicture");

const inputsModalChecker = () => {
  if (
    modalInputFile.value !== "" &&
    modalInputTitle.value !== "" &&
    modalInputCate.value !== ""
  ) {
    validateBtn.classList.add("valide");
  } else {
    validateBtn.classList.remove("valide");
  }
};

modalInputFile.addEventListener("change", inputsModalChecker);
modalInputTitle.addEventListener("change", inputsModalChecker);
modalInputCate.addEventListener("change", inputsModalChecker);

// Ajouter un nouveau projet
const validateBtn = document.querySelector(".validate-btn");

validateBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const userToken = localStorage.getItem("token");
  const formData = new FormData();

  formData.append("title", modalInputTitle.value);
  formData.append("category", modalInputCate.value);
  formData.append("image", modalInputFile.files[0]);

  if (validateBtn.classList.contains("valide")) {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: "application/json",
      },
      body: formData,
    });

    ifAddSpanAppear(true);
    const addedProject = await response.json();
    createNewFigure(addedProject);
    goBackToGallery();
    clearInputsModal();
  } else {
    validateBtn.classList.add("invalide");
    setTimeout(() => {
      validateBtn.classList.remove("invalide");
    }, 820);
  }
});

const createNewFigure = (projectData) => {
  // Création de la nouvelle balise figure pour la modal
  const galleryModal = document.querySelector(".modal-gallery");
  const newModalFigure = document.createElement("figure");

  newModalFigure.id = `modalFigure-${projectData.id}`;
  newModalFigure.innerHTML = `<img src="${projectData.imageUrl}" alt="${projectData.title}" data-type="${modalInputCate.value}">
  <div class= "icon-figure">
    <i class="fa-solid fa-trash-can" data-id="${projectData.id}" id="trash-${projectData.id}"></i>
  </div>`;

  galleryModal.appendChild(newModalFigure);

  // Création de la nouvelle balise figure pour la galerie principale
  const mainGallery = document.querySelector(".gallery");
  const newMainFigure = document.createElement("figure");

  newMainFigure.id = `mainFigure-${projectData.id}`;
  newMainFigure.innerHTML = `<img src="${projectData.imageUrl}" alt="${projectData.title}" data-type="${modalInputCate.value}" data-id="${projectData.id}">
    <figcaption>${projectData.title}</figcaption>`;

  mainGallery.appendChild(newMainFigure);
};

const ifAddSpanAppear = (valid) => {
  const spanProject = document.querySelector(".span-project");

  if (valid) {
    spanProject.textContent = "Projet ajouté avec succès !";
    spanProject.style.color = "#4ade80";
  }
};
