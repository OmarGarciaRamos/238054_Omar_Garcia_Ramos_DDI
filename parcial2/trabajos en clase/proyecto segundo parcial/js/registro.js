const formulario = document.querySelector("#formulario");
const inputFoto = document.querySelector("#fotoPerfil");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

class Usuario {
    constructor(nombre, apellido, correo, contraseña, foto, admin) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.contraseña = contraseña;
        this.foto = foto;
        this.admin = admin;
    }
}

formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const datosFormulario = new FormData(formulario);
    const datos = Object.fromEntries(datosFormulario.entries());

    if (datos.contraseña !== datos.confirmar) {
        alert("Las contraseñas no coinciden");
        return;
    }

    const existe = usuarios.some((u) => u.correo === datos.correo);

    if (existe) {
        alert("Ese correo ya está registrado");
        return;
    }

    const esAdmin = datos.admin === "on";

    inputFoto.click();

    inputFoto.onchange = function () {
        const archivo = inputFoto.files[0];

        if (!archivo) {
            alert("Debes seleccionar una foto");
            return;
        }

        const reader = new FileReader();

        reader.onload = function () {
            const fotoBase64 = reader.result;

            let usuarioNuevo = new Usuario(
                datos.nombre,
                datos.apellido,
                datos.correo,
                datos.contraseña,
                fotoBase64,
                esAdmin
            );

            usuarios.push(usuarioNuevo);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            alert("Cuenta registrada");

            window.location.href = "../index.html";
        };

        reader.readAsDataURL(archivo);
    };
});