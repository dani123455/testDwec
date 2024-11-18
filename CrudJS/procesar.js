let lista = [];

const objTareas = {
    id: '',
    descripcion: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const descripcionInput = document.querySelector('#descripcionInput');
const btnAñadir = document.querySelector('#btnAñadir');
const mensajeError = document.querySelector('#mensajeError');
const tbodyTareas = document.querySelector('tbody');


btnAñadir.addEventListener('click', validarformulario);

//funcion de validación
function validarformulario(evento) {
    evento.preventDefault(); 

    if (descripcionInput.value === '') {
        mensajeError.style.display = 'inline'; 
    } else {
        
        mensajeError.style.display = 'none';
    }

    if(editando){
        editando = false;
    } else {
        objTareas.id = Date.now();
        objTareas.descripcion = descripcionInput.value;

        agregarTarea();
    }
}

function agregarTarea(){
    lista.push({...objTareas});
    mostrarTarea();
}

function mostrarTarea(){
    // Limpiar el contenido anterior
    tbodyTareas.innerHTML = '';

    lista.forEach(tareas => {
        const {id, descripcion} = tareas;

        const tr = document.createElement('tr');

        const tdId = document.createElement('td');
        tdId.textContent = id;
        tr.appendChild(tdId);

        const tdDescripcion = document.createElement('td');
        tdDescripcion.textContent = descripcion;
        tr.appendChild(tdDescripcion);

        const tdAcciones = document.createElement('td');
        tdAcciones.classList.add('text-center');

        const editarBoton = document.createElement('button');
        editarBoton.innerHTML = '<i class="bi bi-pencil-square"></i>';
        editarBoton.classList.add('btn', 'btn-primary', 'btn-sm', 'me-4');
        // Aquí podrías añadir la lógica para editar tareas
        tdAcciones.appendChild(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.innerHTML = '<i class="bi bi-trash3"></i>';
        eliminarBoton.classList.add('btn', 'btn-danger', 'btn-sm');
        // Aquí podrías añadir la lógica para eliminar tareas
        tdAcciones.appendChild(eliminarBoton);

        tr.appendChild(tdAcciones);
        tbodyTareas.appendChild(tr);
    });

    //minuto 16:37 https://youtu.be/IuGqaTRyRlI?si=fsnqoomAEJMV8vjq
    //Arreglar el modal para cuando se añada la terea se quite y ademas cuando añada una tarea diferente no este puesto del tiron el añadido anteriormente
    // y poner estilo a la tabla de js. Eliminar y editar. Cookies.
}