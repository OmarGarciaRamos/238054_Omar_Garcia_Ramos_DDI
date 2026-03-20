document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.querySelector("#albumContenedor");
    if (!contenedor) return;

    const albums = JSON.parse(localStorage.getItem("albums")) || [];

    function crearTarjeta(album) {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-album");

        const imagen = document.createElement("img");
        imagen.src = album.portada;
        imagen.alt = album.nombre;
        imagen.classList.add("imagen-album");

        const titulo = document.createElement("div");
        titulo.textContent = album.nombre;
        titulo.classList.add("titulo-album");

        const descripcion = document.createElement("div");
        descripcion.textContent = album.descripcion;
        descripcion.classList.add("descripcion-album");

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(descripcion);

        contenedor.appendChild(tarjeta);
    }

    albums.forEach(crearTarjeta);
});