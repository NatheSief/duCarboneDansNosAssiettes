const data = {
  "plate1": {
    "boeuf": 27.0,
    "poulet": 6.9,
    "poisson": 5.5,
    "jambon": 8.4,
    "tofu": 2.0
  },
  "plate2": {
    "pates": 1.3,
    "riz": 2.7,
    "quinoa": 1.5,
    "pommes_de_terre": 0.6
  },
  "plate3": {
    "aubergine": 0.75,
    "chou_fleur": 0.72,
    "courgettes": 0.5,
    "haricots_verts": 1.2,
    "petits_pois_carottes": 1.44,
    "poireaux": 1.48,
    "tomates": 0.75
  }
}

let carbon = 0;

let current = 0;
const pages = document.querySelectorAll(".page");
function nextPage(id) {
  if (id)
  {
    carbon += data[id][document.getElementById(id).dataset.type];
    spanOut.innerText = (carbon * 10 / 2.18).toFixed(2);
  }

  pages[current].classList.remove("active");
  current++;
  pages[current].classList.add("active");
}

let spanOut = document.getElementById("kilometres");

const assiettes = ["plate1", "plate2", "plate3"];
assiettes.forEach((id, i) => {
  const plate = document.getElementById(id);
  plate.addEventListener("dragover", (e) => e.preventDefault());
  plate.addEventListener("drop", function (e) {
    e.preventDefault();
    const imgSrc = e.dataTransfer.getData("src");
  plate.dataset.type = e.dataTransfer.getData("type");
    plate.innerHTML = `<img src="${imgSrc}"  width="120" />`;
    document.getElementById(`btn${i + 2}`).style.display = "block";
  });
});

document.querySelectorAll(".aliment").forEach(el => {
  el.addEventListener("dragstart", function (e) {
    e.dataTransfer.setData("src", this.src);
    e.dataTransfer.setData("type", this.dataset.type);
  });
});
