function calculerEmpreinte(selections) {
  fetch('data/aliments.json')
    .then(res => res.json())
    .then(data => {
      let total = 0;
      for (const cat in selections) {
        const nom = selections[cat];
        const val = data[cat][nom];
        total += val;
      }

      const km_voiture = (total / 0.192).toFixed(1); // 0.192 kg CO2/km
      const km_train = (total / 0.014).toFixed(1);   // 0.014 kg CO2/km
      const km_bus = (total / 0.105).toFixed(1);     // 0.105 kg CO2/km

      const result = `
        <p>Ton repas émet <strong>${total.toFixed(2)} kg de CO₂</strong>.</p>
        <p>Soit l'équivalent de :</p>
        <ul>
          <li>🚗 ${km_voiture} km en voiture</li>
          <li>🚆 ${km_train} km en train</li>
          <li>🚌 ${km_bus} km en bus</li>
        </ul>
      `;

      document.getElementById("result-content").innerHTML = result;
    });
}
