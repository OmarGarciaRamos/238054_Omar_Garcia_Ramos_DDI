/* subir album firebase */

import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

    const img = document.querySelector("#fotoUsuario");

    // foto usuario
    if (img) {
        const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
        if (usuario && usuario.foto) {
            img.src = usuario.foto;
        }
    }

    // form album
    const formularioAlbum = document.querySelector("#formularioAlbum");
    const btnPortada = document.querySelector("#btnPortada");
    const inputPortada = document.querySelector("#inputPortada");
    const contenedorPrevisualizacion = document.querySelector("#previsualizacionPortada");

    if (!formularioAlbum) return;

    // abrir selector
    btnPortada.addEventListener("click", () => {
        inputPortada.click();
    });

    // preview imagen
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

    // guardar album
    formularioAlbum.addEventListener("submit", function(e) {

        e.preventDefault();

        const datosFormulario = new FormData(formularioAlbum);
        const datos = Object.fromEntries(datosFormulario.entries());

        const archivo = inputPortada.files[0];

        if (!archivo) {
            alert("Debes seleccionar una portada");
            return;
        }

        const reader = new FileReader();

        reader.onload = async function() {

            const portadaBase64 = reader.result;

            await addDoc(collection(db, "albums"), {
                nombre: datos.namealbum,
                descripcion: datos.descalbum,
                portada: portadaBase64
            });

            alert("Álbum subido");

            formularioAlbum.reset();
            contenedorPrevisualizacion.innerHTML = "";

            window.location.href = "paginaprincipal.html";
        };

        reader.readAsDataURL(archivo);
    });
});

// ir a cuenta
document.addEventListener("DOMContentLoaded", () => {

    const btnCuenta = document.querySelector(".cuenta");

    if (btnCuenta) {
        btnCuenta.addEventListener("click", () => {
            window.location.href = "cuenta.html";
        });
    }

});


// ocultar subir si no es admin
const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
const btnSubir = document.querySelector("#btnSubir");

if (btnSubir && usuario && !usuario.admin) {
    btnSubir.style.display = "none";
}