let numeroAleatorio;
let intentos;
let dificultadSeleccionada;
let recordIntentos = {
    facil: parseInt(localStorage.getItem('recordFacil')) || Infinity,
    medio: parseInt(localStorage.getItem('recordMedio')) || Infinity,
    dificil: parseInt(localStorage.getItem('recordDificil')) || Infinity
};

function iniciarJuego() {
    dificultadSeleccionada = document.getElementById('dificultad').value;

    switch (dificultadSeleccionada) {
        case 'facil':
            numeroAleatorio = Math.floor(Math.random() * 10) + 1;
            intentos = 5;
            break;
        case 'medio':
            numeroAleatorio = Math.floor(Math.random() * 50) + 1; 
            intentos = 7;
            break;
        case 'dificil':
            numeroAleatorio = Math.floor(Math.random() * 100) + 1; 
            intentos = 10;
            break;
    }

    alert(`Juego iniciado. Tienes ${intentos} intentos para adivinar el número.`);
    mostrarRecordIntentos();
}

function adivinar() {
    const respuestaUsuario = parseInt(document.getElementById('respuesta').value);
    
    if (isNaN(respuestaUsuario) || respuestaUsuario < 1 || 
        (dificultadSeleccionada === 'facil' && respuestaUsuario > 10) ||
        (dificultadSeleccionada === 'medio' && respuestaUsuario > 50) ||
        (dificultadSeleccionada === 'dificil' && respuestaUsuario > 100)) {
        alert("Por favor, introduce un número válido dentro del rango permitido.");
        return;
    }

    intentos--; 

    if (respuestaUsuario === numeroAleatorio) {
        const intentosUsados = (dificultadSeleccionada === 'facil' ? 5 : dificultadSeleccionada === 'medio' ? 7 : 10) - intentos; 
        alert(`¡Has ganado! El número era ${numeroAleatorio}. Usaste ${intentosUsados} intentos.`);
        actualizarRecordIntentos(intentosUsados);
        iniciarJuego(); 
    } else if (respuestaUsuario < numeroAleatorio) {
        alert(`No has adivinado el número. Te quedan ${intentos} intentos. El número es más alto.`);
    } else if (respuestaUsuario > numeroAleatorio) {
        alert(`No has adivinado el número. Te quedan ${intentos} intentos. El número es más bajo.`);
    }

    if (intentos === 0) {
        alert(`Has perdido. El número era ${numeroAleatorio}.`);
        reiniciarJuego();
    }
}

function reiniciarJuego() {
    intentos = null;
    numeroAleatorio = null;
    dificultadSeleccionada = null;
    document.getElementById('respuesta').value = '';
}

function mostrarRecordIntentos() {
    const recordElement = document.getElementById('record');
    recordElement.innerHTML = `Récord de intentos: ${recordIntentos[dificultadSeleccionada] === Infinity ? 'Ninguno' : recordIntentos[dificultadSeleccionada]}`;
}

function actualizarRecordIntentos(intentosUsados) {
    if (intentosUsados < recordIntentos[dificultadSeleccionada]) {
        recordIntentos[dificultadSeleccionada] = intentosUsados;
        localStorage.setItem(`record${dificultadSeleccionada.charAt(0).toUpperCase() + dificultadSeleccionada.slice(1)}`, recordIntentos[dificultadSeleccionada]);
        mostrarRecordIntentos();
        alert('¡Has establecido un nuevo récord de intentos!');
    }
}