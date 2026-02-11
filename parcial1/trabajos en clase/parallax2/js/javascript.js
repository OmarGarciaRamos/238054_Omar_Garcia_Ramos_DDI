const titulo = document.querySelector("#titulo");

window.addEventListener("scroll", (event) => (
    titulo.style.right = window.scrollY * 2 + "px"

))