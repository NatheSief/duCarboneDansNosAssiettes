const setDragEvents = () => {
  document.querySelectorAll('.aliment').forEach(aliment =>
    aliment.addEventListener('dragstart', ({ dataTransfer, target }) =>
      dataTransfer.setData("text/plain", target.dataset.nom)
    )
  );
};

const setDropEvents = () => {
  document.querySelectorAll('.cercle').forEach(cercle => {
    cercle.addEventListener('dragover', e => e.preventDefault());

    cercle.addEventListener('drop', async e => {
      e.preventDefault();
      const nom = e.dataTransfer.getData("text/plain");

      ajouterAliment(nom); // appel logique

      const original = document.querySelector(`.aliment[data-nom="${nom}"]`);
      if (!original) return;

      const clone = original.cloneNode(true);
      clone.classList.add('dans-le-cercle');
      cercle.appendChild(clone);

      clone.addEventListener('click', () => {
        cercle.removeChild(clone);
        retirerAliment(nom);
      });
    });
  });
};

const initDragDrop = () => {
  setDragEvents();
  setDropEvents();
};

window.addEventListener('DOMContentLoaded', initDragDrop);
