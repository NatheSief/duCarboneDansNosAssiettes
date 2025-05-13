document.addEventListener('DOMContentLoaded', () => {
  const etapes = ['etape-proteines', 'etape-feculent', 'etape-legumes', 'etape-recap'];
  let currentEtape = 0;

  const showEtape = (index) => {
    etapes.forEach((id, i) => {
      document.getElementById(id).classList.toggle('active', i === index);
    });
  };

  document.getElementById('next-prot').addEventListener('click', () => {
    currentEtape++;
    showEtape(currentEtape);
  });

  document.getElementById('next-feculent').addEventListener('click', () => {
    currentEtape++;
    showEtape(currentEtape);
  });

  document.getElementById('next-legumes').addEventListener('click', () => {
    currentEtape++;
    showEtape(currentEtape);
    afficherTotal();
  });

  // Drag & Drop
  document.querySelectorAll('.aliment').forEach(el => {
    el.addEventListener('dragstart', e => {
      e.dataTransfer.setData("text/plain", el.dataset.nom);
    });
  });

  document.querySelectorAll('.plate').forEach(cercle => {
    cercle.addEventListener('dragover', e => e.preventDefault());

    cercle.addEventListener('drop', async e => {
      e.preventDefault();
      const nom = e.dataTransfer.getData("text/plain");
      ajouterAliment(nom);

      const original = document.querySelector(`.aliment[data-nom="${nom}"]`);
      if (original) {
        const clone = original.cloneNode(true);
        clone.classList.add('dans-le-cercle');
        cercle.appendChild(clone);

        clone.addEventListener('click', () => {
          cercle.removeChild(clone);
          retirerAliment(nom);
        });
      }
    });
  });
});

