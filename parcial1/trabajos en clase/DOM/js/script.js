let contenido = document.querySelector("#contenedor_contenido");

const boton = document.querySelector("#boton");

let bandera = false;

function cambiarcolor(color) {
    contenido.style.background = color;
}
function cambiartamano(ancho, alto){
    contenido.style.height = ancho;
    contenido.style.width = alto;
}
function tamano2(){
    console.log("cambiar tamano");
contenido.style.height = "800px";
contenido.style.width = "800px";
cambiarcolor("red");
}
function tamano3(){
    console.log("cambiar tamano");
contenido.style.height = "200px";
contenido.style.width = "200px";
cambiarcolor("blue");
}

boton.addEventListener('click', () => {console.log("holaq")
    if(bandera){
        cambiarcolor("blue");
        bandera = false;
        cambiartamano("900px","900px")
    }
    else{
    
    cambiarcolor("red");
    bandera = true;
    cambiartamano("500px","500px")
    }
  
});

setInterval(tamano2, 1000);
setInterval(tamano3, 2000);