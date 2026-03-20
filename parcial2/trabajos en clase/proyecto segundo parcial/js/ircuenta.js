document.addEventListener("DOMContentLoaded", () => {

    const img = document.querySelector("#fotoUsuario");
    if (!img) return;

    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (usuario && usuario.foto) {
        img.src = usuario.foto;
    }

});

function irCuenta() {
    window.location.href = "cuenta.html";
}