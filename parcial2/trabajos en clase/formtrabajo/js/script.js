const formulario = document.querySelector("#formulario");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

class Usuario {
    constructor(nombre, apellido, correo, contraseña) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.contraseña = contraseña;
    }
}

formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const datosFormulario = new FormData(formulario);
    const datos = Object.fromEntries(datosFormulario.entries());

    const existe = usuarios.some((u) => u.correo === datos.correo);

    if (existe) {
        alert("Ese correo ya está registrado");
        return;
    }

    let usuarioNuevo = new Usuario(
        datos.nombre,
        datos.apellido,
        datos.correo,
        datos.contraseña
    );

    usuarios.push(usuarioNuevo);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado correctamente");

    window.location.href = "index.html";
});