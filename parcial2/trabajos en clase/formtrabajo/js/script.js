const formulario = document.querySelector("#formulario");

class Usuario {
    constructor(nombru, apelliru, correu, contra) {
        this.nombre = nombru;
        this.apellido = apelliru;
        this.correo = correu;
        this.contraseña = contra;
    }
}

function LeerDatos() {
    const datosFormulario = new FormData(formulario);
    const datos = Object.fromEntries(datosFormulario.entries());   
    
    let usuarioNuevo = new Usuario(datos.nombre, datos.apellido, datos.correo, datos.contraseña);
    console.log(usuarioNuevo);

    if (datos.nombre.trim() === "" || datos.apellido.trim() === "" || datos.correo.trim() === "" || datos.contraseña.trim() === "") {
        console.log("faltan datos");
    } else {
        console.log("Sesión iniciada correctamente");
    }
}