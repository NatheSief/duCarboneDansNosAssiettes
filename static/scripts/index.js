let current = 0;
const pages = document.querySelectorAll(".page");
function nextPage() {
  pages[current].classList.remove("active");
  current++;
  pages[current].classList.add("active");
}
const assiettes = ["plate1", "plate2", "plate3"];
assiettes.forEach((id, i) => {
  const plate = document.getElementById(id);
  plate.addEventListener("dragover", (e) => e.preventDefault());
  plate.addEventListener("drop", function (e) {
    e.preventDefault();
    const imgSrc = e.dataTransfer.getData("src");
    plate.innerHTML = `<img src="${imgSrc}" width="120" />`;
    document.getElementById(`btn${i + 2}`).style.display = "block";
  });
});
document.querySelectorAll('.aliment').forEach(el => {
  el.addEventListener('dragstart', e => {
    e.dataTransfer.setData("text/plain", el.dataset.nom);
  });
});

document.querySelectorAll('.cercle').forEach(cercle => {
  cercle.addEventListener('dragover', e => e.preventDefault());

  cercle.addEventListener('drop', async e => {
    e.preventDefault();
    const nom = e.dataTransfer.getData("text/plain");
    ajouterAliment(nom);
  });
});

// Pour retirer manuellement (bouton, glissé dehors, etc.)
document.querySelectorAll('.retirer').forEach(btn => {
  btn.addEventListener('click', () => {
    retirerAliment(btn.dataset.nom);
  });
});
