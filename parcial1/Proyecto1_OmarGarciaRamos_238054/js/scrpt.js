document.addEventListener("DOMContentLoaded", function() {

    const fondoNegro = document.querySelector(".fondo-negro");
    const body = document.body;

    window.addEventListener("scroll", function() {

        let scrollY = window.scrollY;
        let maxScroll = 900;

        // en esta funcion creo el efecto del fondo en el que al bajar con el scroll el fondo negro desaparece dejando a
        //a la vista el fondo de estrellas
        if (fondoNegro) {
            if (scrollY < maxScroll) {
                fondoNegro.style.opacity = 1 - (scrollY / maxScroll);
            } else {
                fondoNegro.style.opacity = 0;
            }
        }

        //parallax que da el efecto de que el fondo se mueve mas lento que el contenido 
        // (tuve que exagerar la cantidad para que realmente se notara)
        let velocidad = scrollY * 2;
        body.style.backgroundPosition = `center ${velocidad}px`;

    });

});

const espiritus = document.querySelectorAll(".espiritu img");

window.addEventListener("scroll", function() {
        //este parallax y transfomr mueve las imagenes de la pagina espiritus mas lento de lo que baja el contenido 
    espiritus.forEach(img => {

        let rect = img.getBoundingClientRect();
        let offset = rect.top * 0.05;
        img.style.transform = `translateY(${offset}px)`;
    });

});

const header = document.querySelector("header");
// este transform hace que el header se mueva un poco mas lento que los demas objetos 
//(honestamente no se nota a menos que lo revises usando un fondo de color pero no queria perder la atmosfera de mi pagina
//y tampoco queria no cimplir con los 2 transform)
window.addEventListener("scroll", function() {
    let scrollY = window.scrollY;
    header.style.transform = `translateY(${scrollY * 0.1}px)`;
});
