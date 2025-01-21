let login = document.getElementById("login");
let register = document.getElementById("register");
let registrarse = document.getElementById("registrarse");
let iniciarsesion = document.getElementById("iniciarsesion");
let mensajeError = document.getElementById('mensajeError');
let btnInicio = document.getElementById('btnInicio');
let btnRegis = document.getElementById('btnRegis');
let inputEmail2 = document.getElementById('email2');
let inputPass2 = document.getElementById('password2');
let inputPass3 = document.getElementById('password3');
let inputEmail = document.getElementById('email');
let inputPass = document.getElementById('password');
let tieneMayus = false;
let tieneMinus = false;
let tieneNumero = false;

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
if (localStorage.getItem('usuarios')) {
    usuarios = JSON.parse(localStorage.getItem('usuarios'));
}

btnRegis.addEventListener('click', function registro(event) {
    event.preventDefault();
    
    let errores = [];

    if (inputEmail2.value.trim() === '') {
        errores.push('El campo email está vacío');
    } else if (!inputEmail2.value.includes('@')) {
        errores.push('El email debe tener @');
    } else if (inputEmail2.value.includes(" ")) {
        errores.push('El email no debe tener espacios');
    }

    if (inputPass2.value.length < 8) {
        errores.push('Tu contraseña debe ser mayor a 8 caracteres');
    } else if (inputPass2.value.length > 12) {
        errores.push('Tu contraseña debe ser menor a 12 caracteres');
    } else if (!tieneMayusMinus(inputPass2.value)) {
        errores.push('Tu contraseña debe tener mayúsculas y minúsculas');
    } else if (!numero(inputPass2.value)) {
        errores.push('Tu contraseña debe tener números');
    }

    if (inputPass2.value !== inputPass3.value) {
        errores.push('Las contraseñas no coinciden');
    }

    if (errores.length > 0) {
        mensajeError.classList.remove('d-none');
        mensajeError.innerHTML = errores.join('<br>');
    } else {
        mensajeError.classList.add('d-none');
        
        const nuevoUsuario = {
            email: inputEmail2.value,
            password: inputPass2.value
        };
        
        usuarios.push(nuevoUsuario);
        
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        inputEmail2.value = '';
        inputPass2.value = '';
        inputPass3.value = '';
    }
});

function tieneMayusMinus(texto) {
    let tieneMayus = false;
    let tieneMinus = false;

    for (let i = 0; i < texto.length; i++) {
        if (texto[i] === texto[i].toUpperCase()) {
            tieneMayus = true;
        }
        if (texto[i] === texto[i].toLowerCase()) {
            tieneMinus = true;
        }
    }

    return tieneMayus && tieneMinus; 
}

function numero(numeros) {
    let tieneNumero = false;

    for (let b = 0; b < numeros.length; b++) {
        if (!isNaN(numeros[b]) && numeros[b] !== ' ') {
            tieneNumero = true;
        }
    }
    return tieneNumero;
}

// iniciar sesion

btnInicio.addEventListener('click', function inicio(event){
    event.preventDefault();

    let errores2 = [];

    const usuarioEncontrado = usuarios.find(usuario => usuario.email === inputEmail.value && usuario.password === inputPass.value);

    if (!usuarioEncontrado) {
        errores2.push('El email o la contraseña son incorrectos');
    }

    if (errores2.length > 0) {
        mensajeError.classList.remove('d-none');
        mensajeError.innerHTML = errores2.join('<br>');
    } else {
        mensajeError.classList.add('d-none');
        window.location.href = 'admin.html'; 
    }
});

cambioDeSeccion();