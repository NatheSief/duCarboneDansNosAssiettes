const impactData = {};
const alimentsDansLeCercle = new Set();
const conversions = {
  train: 0.004,
  bus: 0.089,
  voiture: 0.192
};

async function chargerTousLesImpacts() {
  const res = await fetch('data/aliments.json');
  const data = await res.json();
  Object.assign(impactData, data);
}

function afficherTotal() {
  let total = 0;
  alimentsDansLeCercle.forEach(nom => {
    if (impactData[nom]) total += impactData[nom];
  });

  document.getElementById('impactTotal').textContent = `Total : ${total.toFixed(2)} kg CO₂e`;

  const distances = Object.entries(conversions)
    .map(([moyen, coef]) => `${(total / coef).toFixed(1)} km en ${moyen}`)
    .join(" / ");

  document.getElementById('equivalence').textContent = `Équivaut à : ${distances}`;
}

function ajouterAliment(nom) {
  alimentsDansLeCercle.add(nom);
  afficherTotal();
}

function retirerAliment(nom) {
  alimentsDansLeCercle.delete(nom);
  afficherTotal();
}

window.addEventListener('DOMContentLoaded', chargerTousLesImpacts);
