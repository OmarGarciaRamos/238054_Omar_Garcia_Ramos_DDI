// form registro
const formulario = document.querySelector("#formulario");
const inputFoto = document.querySelector("#fotoPerfil");

// usuarios guardados
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// objeto usuario
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

// submit registro
formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const datosFormulario = new FormData(formulario);
    const datos = Object.fromEntries(datosFormulario.entries());

    // validar contraseñas
    if (datos.contraseña !== datos.confirmar) {
        alert("Las contraseñas no coinciden");
        return;
    }

    // verificar correo repetido
    const existe = usuarios.some((u) => u.correo === datos.correo);

    if (existe) {
        alert("Ese correo ya está registrado");
        return;
    }

    // admin o no
    const esAdmin = datos.admin === "on";

    // abrir selector de imagen
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

            // crear usuario
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