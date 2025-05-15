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

document.querySelectorAll(".aliment").forEach(el => {
  el.addEventListener("dragstart", function (e) {
    e.dataTransfer.setData("src", this.src);
  });
});