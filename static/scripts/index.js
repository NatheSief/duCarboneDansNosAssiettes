let currentCategory = 0;
const categories = ["proteines", "glucides", "legumes"];
const selections = {};

function startSelection() {
  document.getElementById("landing-page").classList.add("hidden");
  document.getElementById("selection-page").classList.remove("hidden");
  loadCategory();
}

function loadCategory() {
  const category = categories[currentCategory];
  document.getElementById("category-title").innerText = `Choisis un(e) ${category}`;
  const container = document.getElementById("items-container");
  container.innerHTML = '';

  fetch('data/aliments.json')
    .then(res => res.json())
    .then(data => {
      Object.keys(data[category]).forEach(nom => {
        const img = document.createElement("img");
        img.src = `images/${category}/${nom}.jpg`;
        img.alt = nom;
        img.draggable = true;
        img.dataset.nom = nom;
        img.dataset.categorie = category;
        img.addEventListener("dragstart", e => {
          e.dataTransfer.setData("text/plain", JSON.stringify({
            nom: nom,
            categorie: category
          }));
        });
        container.appendChild(img);
      });
    });
}

function handleDrop(event) {
  event.preventDefault();
  const data = JSON.parse(event.dataTransfer.getData("text/plain"));
  selections[data.categorie] = data.nom;

  const plate = document.getElementById("plate");
  plate.innerHTML = '';
  const img = document.createElement("img");
  img.src = `images/${data.categorie}/${data.nom}.jpg`;
  img.alt = data.nom;
  img.style.width = "100px";
  img.style.borderRadius = "8px";
  plate.appendChild(img);
}

function nextCategory() {
  if (!selections[categories[currentCategory]]) {
    alert("Merci de sélectionner un aliment.");
    return;
  }
  currentCategory++;
  if (currentCategory < categories.length) {
    loadCategory();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("selection-page").classList.add("hidden");
  document.getElementById("result-page").classList.remove("hidden");
  calculerEmpreinte(selections);
}
