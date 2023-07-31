/* On récupère l'api de la partie qui nous intéresse à savoir les projets */
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    /* Ajout des projets dans la div gallery */
    const gallery = document.querySelector(".gallery");

    // Création d'une boucle for pour éviter de répéter l'opération pour les 11 projets
    let i = 0;

    for (i = 0; i < 11; i++) {
      const figure = document.createElement("figure");
      figure.innerHTML = `<img src="${data[i].imageUrl}" alt="${data[i].title}">
        <figcaption>${data[i].title}</figcaption>`;
      gallery.appendChild(figure);
    }
    /* Ajout des projets dans la div gallery */

    // On déclare la section portfolio pour y ajouter les filtres
    const portfolio = document.getElementById("portfolio");

    /* Création d'un objet set pour récupérer les filtres correspondant aux projets sans les doublons */
    const categories = new Set();

    categories.add("Tous");
    data.forEach((item) => {
      categories.add(item.category.name);
    });
    console.log(categories);
    /* Création d'un objet set pour récupérer les filtres correspondant aux projets sans les doublons */

    // "Transformer" l'objet set en tableau afin d'exploiter ses données
    const categoriesArray = [...categories];

    /* Ajout des boutons pour filtrer les projets dans la section portfolio */
    const filtres = document.createElement("div");
    filtres.classList.add("container-filtres");

    categoriesArray.forEach((cate) => {
      const btnFiltre = document.createElement("button");
      btnFiltre.textContent = cate;
      btnFiltre.classList.add("btn");
      filtres.appendChild(btnFiltre);
    });

    portfolio.appendChild(filtres);
    portfolio.insertBefore(filtres, gallery);
    /* Ajout des boutons pour filtrer les projets dans la section portfolio */
  });
