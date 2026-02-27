const url = "https://pokeapi.co/api/v2/pokemon";
const contenedor = document.getElementById("contenedor");

fetch(url)
  .then(respuesta => {
    if (respuesta.ok) return respuesta.json();
  })
  .then(datos => {

    for (let i = 0; i < datos.results.length; i++) {
      Peticion2(datos.results[i].url);
    }

  })
  .catch(error => {
    console.error(error.message);
  });


function Peticion2(urlPokemon) {

  fetch(urlPokemon)
    .then(respuesta => {
      if (respuesta.ok) return respuesta.json();
    })
    .then(dato => {

      const carta = document.createElement("div");
      carta.classList.add("carta");

      carta.innerHTML = `
        <h3>${dato.name}</h3>
        <img src="${dato.sprites.front_default}" alt="${dato.name}">
        <p><strong>Altura:</strong> ${dato.height}</p>
        <p><strong>Peso:</strong> ${dato.weight}</p>
      `;

      contenedor.appendChild(carta);

    });
}