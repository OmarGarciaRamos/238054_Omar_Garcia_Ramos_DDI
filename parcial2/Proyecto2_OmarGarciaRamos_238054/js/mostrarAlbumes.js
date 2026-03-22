/* mostrar albums firebase */
//lo hice funcionar perfecto pero por pedirle a chatgpt como podia subirlo a una 
//base de datos para que todos pudieran moverlo y ver las modificaciones
//movio muchas cosas, pero aun entiendo como funciona todo

import { db } from "./firebase.js";
import { getDocs, collection, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {

    const contenedor = document.querySelector("#albumContenedor");
    if (!contenedor) return;

    const modal = document.querySelector("#modalEliminar");
    const btnCancelar = document.querySelector("#cancelarEliminar");
    const btnConfirmar = document.querySelector("#confirmarEliminar");

    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    let idAEliminar = null;

    // crear tarjeta
    function crearTarjeta(album, id) {

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-album");

        const imagen = document.createElement("img");
        imagen.src = album.portada;
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

        // solo admin elimina
        if (usuario && usuario.admin) {

            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.classList.add("btn-eliminar");

            btnEliminar.addEventListener("click", () => {
                if (!modal) return;

                modal.style.display = "flex";
                idAEliminar = id;
            });

            tarjeta.appendChild(btnEliminar);
        }

        contenedor.appendChild(tarjeta);
    }

    // cargar albums de firebase
    async function renderizar() {
        try {
            contenedor.innerHTML = "";

            const querySnapshot = await getDocs(collection(db, "albums"));

            querySnapshot.forEach((documento) => {
                const album = documento.data();
                const id = documento.id;

                crearTarjeta(album, id);
            });

        } catch (error) {
            console.error("error cargando albums:", error);
        }
    }

    // cancelar
    if (btnCancelar) {
        btnCancelar.addEventListener("click", () => {
            modal.style.display = "none";
            idAEliminar = null;
        });
    }

    // confirmar eliminar
    if (btnConfirmar) {
        btnConfirmar.addEventListener("click", async () => {

            try {
                if (idAEliminar !== null) {
                    await deleteDoc(doc(db, "albums", idAEliminar));
                    await renderizar();
                }
            } catch (error) {
                console.error("error eliminando:", error);
            }

            modal.style.display = "none";
            idAEliminar = null;
        });
    }

    await renderizar();
});