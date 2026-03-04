const formulario = document.querySelector("#formulario");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const datosFormulario = new FormData(formulario);
    const datos = Object.fromEntries(datosFormulario.entries());

    const usuarioEncontrado = usuarios.find((u) => u.correo === datos.correo);

    if (!usuarioEncontrado) {
        alert("Correo no registrado");
        window.location.href = "registro.html";
        return;
    }

    if (datos.contraseña !== datos.verificar) {
        alert("Las contraseñas no coinciden");
        return;
    }

    if (usuarioEncontrado.contraseña !== datos.contraseña) {
        alert("La contraseña es incorrecta");
        return;
    }

    alert("Inicio de sesión exitoso");

    window.location.href = "api.html";
});