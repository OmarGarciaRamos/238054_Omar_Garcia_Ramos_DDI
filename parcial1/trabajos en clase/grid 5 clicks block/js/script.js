document.getElementById("cuadro1").onclick = function () {
    alert("hiciste click, ola ");
};

document.getElementById("cuadro2").ondblclick = function () {
    this.style.backgroundColor = "red";
};

document.getElementById("cuadro3").onmouseover = function () {
    this.style.backgroundColor = "purple";
};

document.getElementById("cuadro3").onmouseout = function () {
    this.style.backgroundColor = "yellowgreen";
};

document.getElementById("cuadro4").onmousedown = function () {
    this.style.transform = "scale(0.5)";
};

document.getElementById("cuadro4").onmouseup = function () {
    this.style.transform = "scale(1)";
};

document.getElementById("cuadro5").onclick = function () {
    this.innerHTML = "ola";
    this.style.fontSize = "24px";
    this.style.display = "flex";
    this.style.alignItems = "center";
    this.style.justifyContent = "center";
};