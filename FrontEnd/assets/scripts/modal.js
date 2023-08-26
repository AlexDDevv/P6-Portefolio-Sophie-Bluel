fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((modalData) => {
    console.log(modalData);
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
