document.addEventListener("DOMContentLoaded", () => {

    // usuario actual
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const form = document.querySelector("#formCuenta");
    const inputFoto = document.querySelector("#inputFoto");
    const btnFoto = document.querySelector("#btnFoto");

    const modal = document.querySelector("#modalGuardar");
    const btnGuardar = document.querySelector("#guardarCambios");
    const btnDescartar = document.querySelector("#descartar");

    const btnCerrar = document.querySelector("#cerrarSesion");

    let cambiosPendientes = false;
    let nuevaFoto = usuario.foto;

    // llenar datos
    form.nombre.value = usuario.nombre;
    form.correo.value = usuario.correo;

    if (form.apellido) {
        form.apellido.value = usuario.apellido;
    }

    // detectar cambios
    form.addEventListener("input", () => {
        cambiosPendientes = true;
    });

    // cambiar foto
    btnFoto.addEventListener("click", () => {
        inputFoto.click();
    });

    inputFoto.addEventListener("change", () => {

        const archivo = inputFoto.files[0];
        if (!archivo) return;

        const reader = new FileReader();

        reader.onload = () => {
            nuevaFoto = reader.result;
            cambiosPendientes = true;
        };

        reader.readAsDataURL(archivo);
    });

    // guardar
    function guardar() {

        const datos = new FormData(form);
        const nuevosDatos = Object.fromEntries(datos.entries());

        const index = usuarios.findIndex(u => u.correo === usuario.correo);
        if (index === -1) return;

        usuarios[index].nombre = nuevosDatos.nombre;
        usuarios[index].correo = nuevosDatos.correo;

        if (usuarios[index].apellido !== undefined) {
            usuarios[index].apellido = nuevosDatos.apellido || usuarios[index].apellido;
        }

        if (nuevosDatos.contraseña) {
            usuarios[index].contraseña = nuevosDatos.contraseña;
        }

        usuarios[index].foto = nuevaFoto;

        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarios[index]));

        cambiosPendientes = false;

        alert("Cambios guardados");
        window.location.href = "../paginas/paginaprincipal.html";
    }

    // submit
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        guardar();
    });

    // cerrar sesión
    btnCerrar.addEventListener("click", () => {
        localStorage.removeItem("usuarioActivo");
        window.location.href = "../index.html";
    });

    // intentar salir
    window.intentarSalir = function(destino) {

        if (cambiosPendientes) {

            modal.style.display = "flex";

            btnGuardar.onclick = () => {
                guardar();
                window.location.href = destino + ".html";
            };

            btnDescartar.onclick = () => {
                window.location.href = destino + ".html";
            };

        } else {
            window.location.href = destino + ".html";
        }
    };
});