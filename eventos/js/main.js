let login = document.getElementById("login");
let register = document.getElementById("register");
let registrarse = document.getElementById("registrarse");
let iniciarsesion = document.getElementById("iniciarsesion");
const formulario = document.getElementById('formulario');

let usuarios = [];

// Cambiar de sección
function cambioDeSeccion() {
    login.addEventListener('click', function() {
        login.classList.remove("text-secondary");
        login.classList.add("text-white");

        register.classList.remove("text-white");
        register.classList.add("text-secondary");
        registrarse.style.display = 'none';
        iniciarsesion.style.display = 'block';
    });

    register.addEventListener('click', function() {
        register.classList.remove("text-secondary");
        register.classList.add("text-white");

        login.classList.remove("text-white");
        login.classList.add("text-secondary");
        iniciarsesion.style.display = 'none';
        registrarse.style.display = 'block';
    });
}

// Registrarse y validaciones



cambioDeSeccion();