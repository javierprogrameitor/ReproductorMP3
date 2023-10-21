const miAudio = document.getElementById("miAudio");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const anteriorBtn = document.getElementById("anteriorBtn");
const siguienteBtn = document.getElementById("siguienteBtn");
const listaReproduccion = document.getElementById("listaReproduccion").getElementsByTagName("a");
const imagenCancion = document.getElementById("imagenCancion");
const nombreCancion = document.getElementById("nombreCancion"); // Agregamos el nombre de la cancion
const rango = document.getElementById("rango");  // Para el rengo de la  barra de reproduccion
const rangoVolumen = document.getElementById("rangoVolumen");  //Para el rango del volumen

let cancionActual = 0;
let girando = false;
let interval;

function cargarCancion(index) {
    miAudio.src = listaReproduccion[index].href;
    cancionActual = index;
    miAudio.load();
    nombreCancion.textContent = listaReproduccion[index].textContent; // Actualizamos el nombre de la canción

}
function iniciarRotacion() {
    if (!girando) {
        imagenCancion.classList.add("rotar-imagen");
        girando = true;
    }
}

function detenerRotacion() {
    if (girando) {
        imagenCancion.classList.remove("rotar-imagen");
        girando = false;
    }
}

function reproducirCancion() {
    miAudio.play();
    iniciarRotacion();
}

function pausarCancion() {
    miAudio.pause();
    detenerRotacion();

}

function cancionAnterior() {
    cancionActual = (cancionActual - 1 + listaReproduccion.length) % listaReproduccion.length;
    cargarCancion(cancionActual);
    reproducirCancion();
    mostrarImagen();
    rango.value = 0;
    clearInterval(interval);
}

function cancionSiguiente() {
    cancionActual = (cancionActual + 1) % listaReproduccion.length;
    cargarCancion(cancionActual);
    reproducirCancion();
    mostrarImagen();
    rango.value = 0;
    clearInterval(interval);
}

function mostrarImagen() {
    const imagenURL = listaReproduccion[cancionActual].getAttribute("data-imagen");
    imagenCancion.src = imagenURL;
}

cargarCancion(cancionActual);
mostrarImagen();

playBtn.addEventListener("click", reproducirCancion);
pauseBtn.addEventListener("click", pausarCancion);
anteriorBtn.addEventListener("click", cancionAnterior);
siguienteBtn.addEventListener("click", cancionSiguiente);


/////Movimiento del punto dentro de la carga de reproduccion///////////////
//////////////////////////////////////////////////////////////////////////
miAudio.addEventListener("play", function() {
  // Inicia la reproducción de la canción
  let valorInicial = parseInt(rango.value);
  
  // Usar un intervalo para actualizar el valor del rango y mover el punto
  interval = setInterval(function() {
    // Incrementa el valor del rango (puedes ajustar la velocidad del movimiento) 
rango.value = parseInt(rango.value) + 1;
    
    // Si el valor alcanza el máximo, detiene el intervalo
    if (parseInt(rango.value) >= parseInt(rango.max)) {
      clearInterval(interval);
    }
  }, 4000); // Cada 1 segundo (ajusta el intervalo de tiempo según sea necesario)
});
  
  miAudio.addEventListener("pause", function() {
    // Pausa la reproducción de la canción
    // Detiene la actualización del valor del rango y, por lo tanto, el movimiento del punto
    clearInterval(interval);
  })

  ////////////////Rango del Volumen///////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
rangoVolumen.addEventListener("input", function(){

    miAudio.volume = parseFloat(rangoVolumen.value);

})
