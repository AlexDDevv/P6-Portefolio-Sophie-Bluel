fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((modalData) => {
    // console.log(modalData);
    const modalGallery = document.querySelector(".modal-gallery");

    let i = 0;

    for (i = 0; i < modalData.length; i++) {
      const modalFigures = document.createElement("figure");
      modalFigures.innerHTML = `<img src="${modalData[i].imageUrl}" alt="${modalData[i].title}" data-type="${modalData[i].category.name}"
      <figcaption>éditer</figcaption>
      <div class= "icon-figure">
        <i class="fa-solid fa-arrows-up-down-left-right"></i>
        <i class="fa-solid fa-trash-can" id="${modalData[i].id}"></i>
      </div>`;
      modalGallery.appendChild(modalFigures);
    }

    // Supprimer un projet
    const deleteProject = () => {
      const iconsTrash = document.querySelectorAll(".fa-trash-can");
      iconsTrash.forEach((icon) => {
        icon.addEventListener("click", (e) => {
          const projectId = e.currentTarget.id;
          // console.log(projectId);
          const userToken = localStorage.getItem("token");
          // console.log(userToken);

          fetch(`http://localhost:5678/api/works/${projectId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          })
            .then((response) => response.json())
            .then((dataRes) => {
              // console.log(dataRes);
              if (dataRes === 204) {
                console.log("Projet supprimé.");
              } else {
                console.log("Une erreur est survenue.");
              }
            });
        });
      });
    };
    deleteProject();
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
    clearImagePreview();
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
  clearImagePreview();
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

// Supprimer l'image choisie
const clearImagePreview = () => {
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

validateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateBtn.classList.contains("valide")) {
    validateBtn.style.background = "red";
  } else {
    validateBtn.classList.add("invalide");
    setTimeout(() => {
      validateBtn.classList.remove("invalide");
    }, 820);
  }
});
