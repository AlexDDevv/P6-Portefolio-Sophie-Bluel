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
        <i class="fa-solid fa-trash-can"></i>
      </div>`;
      modalGallery.appendChild(modalFigures);
    }
  });

const modalContainer = document.querySelector(".modal-container");
const modalOverlay = document.querySelector(".overlay");
const openModal = document.querySelectorAll(".modal-trigger");

const toggleModal = () => {
  modalContainer.classList.toggle("active-modal");
  modalOverlay.classList.toggle("active-modal");
};

openModal.forEach((trigger) => trigger.addEventListener("click", toggleModal));

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
});
