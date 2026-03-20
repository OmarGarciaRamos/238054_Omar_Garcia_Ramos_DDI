document.addEventListener("DOMContentLoaded", () => {
    const img = document.querySelector("#fotoUsuario");
    if (img) {
        const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
        if (usuario && usuario.foto) {
            img.src = usuario.foto;
        }
    }

    const formularioAlbum = document.querySelector("#formularioAlbum");
    const btnPortada = document.querySelector("#btnPortada");
    const inputPortada = document.querySelector("#inputPortada");
    const contenedorPrevisualizacion = document.querySelector("#previsualizacionPortada");

    if (!formularioAlbum || !btnPortada || !inputPortada || !contenedorPrevisualizacion) return;

    let albums = JSON.parse(localStorage.getItem("albums")) || [];

    class Album {
        constructor(nombre, descripcion, portadaBase64) {
            this.nombre = nombre;
            this.descripcion = descripcion;
            this.portada = portadaBase64;
        }
    }

    btnPortada.addEventListener("click", () => {
        inputPortada.click();
    });

    inputPortada.addEventListener("change", () => {
        const archivo = inputPortada.files[0];
        contenedorPrevisualizacion.innerHTML = "";
        if (archivo) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgPrev = document.createElement("img");
                imgPrev.src = e.target.result;
                imgPrev.style.width = "300px";
                imgPrev.style.height = "300px";
                imgPrev.style.objectFit = "cover";
                imgPrev.style.border = "2px solid #1db954";
                imgPrev.style.borderRadius = "10px";
                imgPrev.style.display = "block";
                imgPrev.style.margin = "10px auto";
                contenedorPrevisualizacion.appendChild(imgPrev);
            };
            reader.readAsDataURL(archivo);
        }
    });

    formularioAlbum.addEventListener("submit", function(e) {
        e.preventDefault();
        const datosFormulario = new FormData(formularioAlbum);
        const datos = Object.fromEntries(datosFormulario.entries());
        const archivo = inputPortada.files[0];
        if (!archivo) {
            alert("Debes seleccionar una portada para el álbum");
            return;
        }
        const reader = new FileReader();
        reader.onload = function() {
            const portadaBase64 = reader.result;
            const albumNuevo = new Album(datos.namealbum, datos.descalbum, portadaBase64);
            albums.push(albumNuevo);
            localStorage.setItem("albums", JSON.stringify(albums));
            alert("Álbum registrado correctamente!");
            formularioAlbum.reset();
            contenedorPrevisualizacion.innerHTML = "";
        };
        reader.readAsDataURL(archivo);
        window.location.href = "paginaprincipal.html";
    });
});

function irCuenta() {
    window.location.href = "cuenta.html";
}