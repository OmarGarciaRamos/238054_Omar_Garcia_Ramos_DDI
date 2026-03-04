document.addEventListener("DOMContentLoaded", () => {

  const url = "https://api.thecatapi.com/v1/images/search?limit=10";
  const contenedor = document.getElementById("contenedor");

  fetch(url)
    .then(res => res.json())
    .then(datos => {

      datos.forEach(dato => {

        const carta = document.createElement("div");
        carta.classList.add("carta");

        carta.innerHTML = `
          <img src="${dato.url}" width="200">
        `;

        contenedor.appendChild(carta);

      });

    })
    .catch(error => console.error(error));

});
function eliminarUsuarios() {
  localStorage.removeItem("usuarios");
  alert("Cuenta eliminada");
}