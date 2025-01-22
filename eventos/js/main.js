document.addEventListener("DOMContentLoaded", function() {

if (window.location.pathname.endsWith("index.html")) {

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
let btnVer = document.getElementById('btnVer');
let btnVer2 = document.getElementById('btnVer2');
let btnVer3 = document.getElementById('btnVer3');
let currentLocation = window.location;

console.log(currentLocation)



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

    if (usuarios.find(usuario => usuario.email === inputEmail2.value)) {
        errores.push('Este email ya está registrado');
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


btnVer.addEventListener('click', function ver(evento) {
    evento.preventDefault();
    let seVe = inputPass.type === "text";

    if (seVe) {
        inputPass.type = "password"; 
    } else {
        inputPass.type = "text"; 
    }
});

btnVer2.addEventListener('click', function ver2(evento) {
    evento.preventDefault();
    let seVe2 = inputPass2.type === "text";

    if (seVe2) {
        inputPass2.type = "password"; 
    } else {
        inputPass2.type = "text"; 
    }
});

btnVer3.addEventListener('click', function ver3(evento) {
    evento.preventDefault();
    let seVe3 = inputPass3.type === "text";

    if (seVe3) {
        inputPass3.type = "password"; 
    } else {
        inputPass3.type = "text"; 
    }
});


cambioDeSeccion();
}


//admin.html

if (window.location.pathname.endsWith("admin.html")) {
    let btnCerrar = document.getElementById("btnCerrar");
    let tablaContenido = document.getElementById("tablaContenido");
    let usuarios = [];
//Cerrar sesion
    btnCerrar.addEventListener('click', function Cerrar(evento) {
        evento.preventDefault();
        window.location.href = 'index.html';
    });

    // Verificar si hay usuarios en localStorage
    if (localStorage.getItem('usuarios')) {
        usuarios = JSON.parse(localStorage.getItem('usuarios'));
    }

    // Generar contenido HTML para la tabla
    let contenidoHTML = '';
    usuarios.forEach(usuario => {
        contenidoHTML += `<tr>
            <td>${usuario.email}</td>
            <td>${usuario.password}</td>
        </tr>`;
    });

    // Agregar el contenido a la tabla
    tablaContenido.innerHTML = contenidoHTML;

    // Inicializar DataTable 
    $(document).ready(function () {
        $('#Mytable').DataTable({
            language: {
                processing: "Procesando...",
                search: "Buscar:",
                lengthMenu: "Mostrar _MENU_ registros",
                info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
                infoFiltered: "(filtrado de un total de _MAX_ registros)",
                loadingRecords: "Cargando...",
                zeroRecords: "No se encontraron resultados",
                emptyTable: "Ningún dato disponible en esta tabla",
                paginate: {
                    first: "Primero",
                    previous: "Anterior",
                    next: "Siguiente",
                    last: "Último"
                },
                aria: {
                    sortAscending: ": Activar para ordenar la columna de manera ascendente",
                    sortDescending: ": Activar para ordenar la columna de manera descendente"
                }
            }
        });
    });
}
});