let contenido = document.querySelector("#contenedor_contenido");
const boton = document.querySelector("#boton");

let bandera = false;
let intervalo = null; //controp cambio

function cambiarcolor(color) {
    contenido.style.background = color;
}

function tamanoGrande() {
    contenido.style.height = "800px";
    contenido.style.width = "800px";
    cambiarcolor("red");
}

function tamanoPequeno() {
    contenido.style.height = "400px";
    contenido.style.width = "400px";
    cambiarcolor("blue");
}
function alternarTamano() {
    if (bandera) {
        tamanoGrande();
    } else {
        tamanoPequeno();
    }
    bandera = !bandera;
}
//mouseout hace que un evento se active cuando el mouse esta fuera del area
contenido.addEventListener("mouseout", () => {
    if (!intervalo) {
        intervalo = setInterval(alternarTamano, 500);
    }
});

//mouseover hace que un eventio se active cuando el mouse esta dentro del area
contenido.addEventListener("mouseover", () => {
    clearInterval(intervalo);
    intervalo = null;
});
