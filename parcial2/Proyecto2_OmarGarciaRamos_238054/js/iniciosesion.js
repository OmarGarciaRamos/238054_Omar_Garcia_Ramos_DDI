// form login
const formulario = document.querySelector("#formulario");

// usuarios
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// submit login
formulario.addEventListener("submit", function (e) {

    e.preventDefault();

    const datosFormulario = new FormData(formulario);
    const datos = Object.fromEntries(datosFormulario.entries());

    // buscar usuario
    const usuarioEncontrado = usuarios.find((u) => u.correo === datos.correo);

    if (!usuarioEncontrado) {
        alert("Correo no registrado");
        return;
    }

    // validar contraseñas
    if (datos.contraseña !== datos.verificar) {
        alert("Las contraseñas no coinciden");
        return;
    }

    if (usuarioEncontrado.contraseña !== datos.contraseña) {
        alert("La contraseña es incorrecta");
        return;
    }

    // guardar sesión
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

    alert("Inicio de sesión exitoso");

    window.location.href = "paginas/paginaprincipal.html";
});