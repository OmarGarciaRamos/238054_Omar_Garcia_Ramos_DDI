const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");


let trazoIniciado = false;
let figurasDibujadas = []; 
let figuraSeleccionada = null; 
let imagenParaDibujar = null; 

let puntosTrazoActual = [];
let colorRellenoSeleccionado = '#ffff00';
let colorLineaSeleccionado = '#ff0000';
let snapshot; 
let historialDeshacer = [];
let historialRehacer = [];
let imagenBase = null;


let grosorLineaActual = 5;
const BORRADOR_SIZE = 30; 

let posicionCuirosor = {
    iniciales: { x: 0, y: 0 },
    actuales: { x: 0, y: 0 },
    finales: { x: 0, y: 0 }
};

function guardarEstado() {
    historialDeshacer.push(
        canvas.toDataURL()
    );
    historialRehacer = [];
}

function cargarEstado(dataURL) {

    const img = new Image();

    img.onload = () => {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0);

        imagenBase = img;
    };

    img.src = dataURL;
}

function cambiarFigura(nuevaFigura) {
    figuraSeleccionada = nuevaFigura;
    if (nuevaFigura !== 'Imagen') {
        imagenParaDibujar = null;
    }
    document.querySelectorAll('#menu button').forEach(btn => {
        if (btn.id === `btn${nuevaFigura}`) {
            btn.classList.add('activo');
        } else {
            btn.classList.remove('activo');
        }
    });
}
//hola
function registrarPosicionCursor(event) {

    const rect = canvas.getBoundingClientRect();

    return {
        x: (event.clientX - rect.left) *
           (canvas.width / rect.width),

        y: (event.clientY - rect.top) *
           (canvas.height / rect.height)
    };
}

function guardarSnapshot() {
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function restaurarSnapshot() {
    if (snapshot) ctx.putImageData(snapshot, 0, 0);
}

function redibujarTodo() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (imagenBase) {
        ctx.drawImage(imagenBase, 0, 0);
    }

    for (const figura of figurasDibujadas) {
        figura.dibujar(ctx);
    }
}

function cargarImagen(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                imagenParaDibujar = img;
                cambiarFigura('Imagen');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function aplicarFiltro(tipo) {

    guardarEstado();

    redibujarTodo();

    const imageData =
        ctx.getImageData(0, 0, canvas.width, canvas.height);

    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {

        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        if (tipo === 'bn') {

            const gris = (r + g + b) / 3;

            data[i] = gris;
            data[i + 1] = gris;
            data[i + 2] = gris;
        }

        else if (tipo === 'sepia') {

            data[i]     = (r * .393) + (g * .769) + (b * .189);
            data[i + 1] = (r * .349) + (g * .686) + (b * .168);
            data[i + 2] = (r * .272) + (g * .534) + (b * .131);
        }

        else if (tipo === 'negativo') {

            data[i] = 255 - r;
            data[i + 1] = 255 - g;
            data[i + 2] = 255 - b;
        }

        else if (tipo === 'rojo') {

            data[i] = Math.min(255, r + 80);
            data[i + 1] *= 0.8;
            data[i + 2] *= 0.8;
        }

        else if (tipo === 'verde') {

            data[i + 1] = Math.min(255, g + 80);
            data[i] *= 0.8;
            data[i + 2] *= 0.8;
        }

        else if (tipo === 'azul') {

            data[i + 2] = Math.min(255, b + 80);
            data[i] *= 0.8;
            data[i + 1] *= 0.8;
        }
    }

    ctx.putImageData(imageData, 0, 0);

    imagenBase = new Image();

    imagenBase.onload = () => {

        figurasDibujadas = [];

        redibujarTodo();
    };

    imagenBase.src = canvas.toDataURL();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('grosorInput')
    .addEventListener('input', (e) => {
        grosorLineaActual = e.target.value;
    });
    document.getElementById('btnDeshacer')
    .addEventListener('click', () => {

        if (historialDeshacer.length > 0) {

            historialRehacer.push(
                canvas.toDataURL()
            );

            const ultimo =
                historialDeshacer.pop();

            cargarEstado(ultimo);
        }
    });
    document.getElementById('btnRehacer')
    .addEventListener('click', () => {

        if (historialRehacer.length > 0) {

            historialDeshacer.push(
                canvas.toDataURL()
            );

            const ultimo =
                historialRehacer.pop();

            cargarEstado(ultimo);
        }
    });
    document.getElementById('btnGuardar')
    .addEventListener('click', () => {

        const link = document.createElement('a');

        link.download = 'dibujo.png';

        link.href = canvas.toDataURL();

        link.click();
    });
    document.getElementById('btnCuadrado')?.addEventListener('click', () => cambiarFigura('Cuadrado'));
    document.getElementById('btnCirculo')?.addEventListener('click', () => cambiarFigura('Circulo'));
    document.getElementById('btnCorazon')?.addEventListener('click', () => cambiarFigura('Corazon'));
    document.getElementById('btnLinea')?.addEventListener('click', () => cambiarFigura('Linea'));
    document.getElementById('btnLapiz')?.addEventListener('click', () => cambiarFigura('Lapiz'));
    document.getElementById('btnBorrador')?.addEventListener('click', () => cambiarFigura('Borrador'));
    document.getElementById('btnBN')
    .addEventListener('click', () => aplicarFiltro('bn'));

    document.getElementById('btnSepia')
    .addEventListener('click', () => aplicarFiltro('sepia'));

    document.getElementById('btnNegativo')
    .addEventListener('click', () => aplicarFiltro('negativo'));

    document.getElementById('btnRojo')
    .addEventListener('click', () => aplicarFiltro('rojo'));

    document.getElementById('btnVerde')
    .addEventListener('click', () => aplicarFiltro('verde'));

    document.getElementById('btnAzul')
    .addEventListener('click', () => aplicarFiltro('azul'));
        
    document.getElementById('fileInput')?.addEventListener('change', cargarImagen);

    document.getElementById('colorRellenoInput')?.addEventListener('input', (event) => {
        colorRellenoSeleccionado = event.target.value;
    });
    
    document.getElementById('colorLineaInput')?.addEventListener('input', (event) => {
        colorLineaSeleccionado = event.target.value;
    });

    document.getElementById('btnLimpiar')?.addEventListener('click', () => {
        figurasDibujadas = [];
        imagenBase = null;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        cambiarFigura(null);
    });
    
    cambiarFigura('Lapiz'); 
});

canvas.addEventListener('mousedown', (event) => {
    guardarEstado();
    if (!figuraSeleccionada) return; 
    
    posicionCuirosor.iniciales = registrarPosicionCursor(event);
    
    if (figuraSeleccionada === 'Imagen' && imagenParaDibujar) {
        
        const pos = posicionCuirosor.iniciales;
        const STICKER_SIZE = 100; 
        
        const x = pos.x - (STICKER_SIZE / 2);
        const y = pos.y - (STICKER_SIZE / 2);
        
        const sticker = new Imagen(imagenParaDibujar, x, y, STICKER_SIZE, STICKER_SIZE);
        figurasDibujadas.push(sticker);
        redibujarTodo();
        
   
        
    } else {
        trazoIniciado = true;
        
        if (figuraSeleccionada === 'Lapiz' || figuraSeleccionada === 'Borrador') {
            puntosTrazoActual = [posicionCuirosor.iniciales];
        } else {
            guardarSnapshot();
        }
    }
});

canvas.addEventListener('mousemove', (event) => {
    if (!trazoIniciado) return;

    posicionCuirosor.actuales = registrarPosicionCursor(event);
    const actual = posicionCuirosor.actuales;
    const inicio = posicionCuirosor.iniciales;
    let figuraPrevisual;

    if (figuraSeleccionada === 'Imagen' && imagenParaDibujar) {

    redibujarTodo();

    const STICKER_SIZE = 100;

    ctx.globalAlpha = 0.5;

    ctx.drawImage(
        imagenParaDibujar,
        actual.x - STICKER_SIZE / 2,
        actual.y - STICKER_SIZE / 2,
        STICKER_SIZE,
        STICKER_SIZE
    );

    ctx.globalAlpha = 1;

    return;
}
    if (figuraSeleccionada === 'Lapiz' || figuraSeleccionada === 'Borrador') {
        
        puntosTrazoActual.push(actual);
        
        const isEraser = figuraSeleccionada === 'Borrador';
        ctx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';
        ctx.strokeStyle = isEraser ? '#000000' : colorLineaSeleccionado;
        ctx.lineWidth = isEraser ? BORRADOR_SIZE : grosorLineaActual;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        
        if (puntosTrazoActual.length >= 2) {
            const last = puntosTrazoActual.length - 1;
            ctx.beginPath();
            ctx.moveTo(puntosTrazoActual[last - 1].x, puntosTrazoActual[last - 1].y);
            ctx.lineTo(puntosTrazoActual[last].x, puntosTrazoActual[last].y);
            ctx.stroke();
        }
        
        ctx.globalCompositeOperation = 'source-over'; 
        
    } else { 
        
        restaurarSnapshot(); 

        const w = actual.x - inicio.x;
        const h = actual.y - inicio.y;
        
        const rellenoPreview = "rgba(128, 128, 128, 0.4)"; 

        if (figuraSeleccionada === 'Cuadrado') {
            const x = Math.min(inicio.x, actual.x);
            const y = Math.min(inicio.y, actual.y);
            const ancho = Math.abs(w);
            const alto = Math.abs(h);
            
            figuraPrevisual = new Cuadrado(x, y, ancho, alto, colorLineaSeleccionado, rellenoPreview, grosorLineaActual);
            
        } else if (figuraSeleccionada === 'Circulo') {
            const radio = Math.hypot(w, h); 
            figuraPrevisual = new Circulo(inicio.x, inicio.y, radio, colorLineaSeleccionado, rellenoPreview, grosorLineaActual);
            
        } else if (figuraSeleccionada === 'Corazon') {
            const tamano = Math.hypot(w, h) / 2;
            figuraPrevisual = new Corazon(inicio.x, inicio.y, tamano, colorLineaSeleccionado, rellenoPreview, grosorLineaActual);
            
        } else if (figuraSeleccionada === 'Linea') {
            figuraPrevisual = new Linea(inicio.x, inicio.y, actual.x, actual.y, colorLineaSeleccionado, grosorLineaActual);
        }
        
        if (figuraPrevisual) {
            figuraPrevisual.dibujar(ctx);
        }
    }
});

canvas.addEventListener('mouseup', (event) => {
    if (!trazoIniciado) return;
    trazoIniciado = false;
    posicionCuirosor.finales = registrarPosicionCursor(event);

    const inicio = posicionCuirosor.iniciales;
    const final = posicionCuirosor.finales;
    const w = final.x - inicio.x;
    const h = final.y - inicio.y;
    let figura;
    
    
    if (figuraSeleccionada === 'Cuadrado') {
        const x = Math.min(inicio.x, final.x);
        const y = Math.min(inicio.y, final.y);
        const ancho = Math.abs(w);
        const alto = Math.abs(h);
        
        figura = new Cuadrado(x, y, ancho, alto, colorLineaSeleccionado, colorRellenoSeleccionado, grosorLineaActual);
        
    } else if (figuraSeleccionada === 'Circulo') {
        const radio = Math.hypot(w, h);
        figura = new Circulo(inicio.x, inicio.y, radio, colorLineaSeleccionado, colorRellenoSeleccionado, grosorLineaActual);
        
    } else if (figuraSeleccionada === 'Corazon') {
        const tamano = Math.hypot(w, h) / 3;
        figura = new Corazon(inicio.x, inicio.y, tamano, colorLineaSeleccionado, colorRellenoSeleccionado, grosorLineaActual);
        
    } else if (figuraSeleccionada === 'Linea') {
        figura = new Linea(inicio.x, inicio.y, final.x, final.y, colorLineaSeleccionado, grosorLineaActual);
        
    } else if (figuraSeleccionada === 'Lapiz') { 
        if (puntosTrazoActual.length > 1) {
            figura = new Lapiz(colorLineaSeleccionado, grosorLineaActual, puntosTrazoActual);
        }
        
    } 
    else if (figuraSeleccionada === 'Borrador') {

        imagenBase = new Image();

        imagenBase.onload = () => {

            figurasDibujadas = [];

            redibujarTodo();
        };

        imagenBase.src = canvas.toDataURL();

        puntosTrazoActual = [];

        return;
    }
    
    if (figura) {
        figurasDibujadas.push(figura);
    }
    
    snapshot = null; 
    redibujarTodo(); 
    puntosTrazoActual = [];
});

function convertirTouchAMouse(tipo, touch) {

    return new MouseEvent(tipo, {
        clientX: touch.clientX,
        clientY: touch.clientY,
        bubbles: true
    });
}

function convertirTouchAMouse(tipo, touch) {

    return new MouseEvent(tipo, {
        clientX: touch.clientX,
        clientY: touch.clientY,
        bubbles: true
    });
}

canvas.addEventListener('touchstart', (e) => {

    e.preventDefault();

    const touch = e.touches[0];

    canvas.dispatchEvent(
        convertirTouchAMouse('mousedown', touch)
    );
});

canvas.addEventListener('touchmove', (e) => {

    e.preventDefault();

    const touch = e.touches[0];

    canvas.dispatchEvent(
        convertirTouchAMouse('mousemove', touch)
    );
});

canvas.addEventListener('touchend', (e) => {

    e.preventDefault();

    const touch =
        e.changedTouches[0];

    canvas.dispatchEvent(
        convertirTouchAMouse('mouseup', touch)
    );
});