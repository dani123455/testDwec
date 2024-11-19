document.addEventListener('DOMContentLoaded', () => {
    let lista = [];

    const objTareas = {
        id: '',
        descripcion: ''
    }

    let editando = false;

    const formulario = document.querySelector('#formulario');
    const descripcionInput = document.querySelector('#descripcionInput');
    const mensajeError = document.querySelector('#mensajeError');
    const tbodyTareas = document.querySelector('tbody');

    formulario.addEventListener('submit', validarFormulario);

    // Función de validación
    function validarFormulario(evento) {
        evento.preventDefault(); 

        if (descripcionInput.value === '') {
            mensajeError.style.display = 'inline'; 
        } else {
            mensajeError.style.display = 'none';
            if (editando) {
                editarTareas();
                editando = false;
            } else {
                objTareas.id = Date.now();
                objTareas.descripcion = descripcionInput.value;
                agregarTareas();
            }
        }
    }

    function agregarTareas() {
        lista.push({ ...objTareas });
        mostrarTareas();
        formulario.reset();
        limpiarObjeto();
    }

    function limpiarObjeto() {
        objTareas.id = '';
        objTareas.descripcion = '';
    }

    function mostrarTareas() {
        limpiarHtml();
        tbodyTareas.innerHTML = '';

        lista.forEach(tareas => {
            const { id, descripcion } = tareas;

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
            editarBoton.onclick = () => cargarTareas(tareas);
            editarBoton.innerHTML = '<i class="bi bi-pencil-square"></i>';
            editarBoton.classList.add('btn', 'btn-primary', 'btn-sm', 'me-4');

            tdAcciones.appendChild(editarBoton);

            const eliminarBoton = document.createElement('button');
            eliminarBoton.onclick = () => eliminarTareas(id);
            eliminarBoton.innerHTML = '<i class="bi bi-trash3"></i>';
            eliminarBoton.classList.add('btn', 'btn-danger', 'btn-sm');

            tdAcciones.appendChild(eliminarBoton);

            tr.appendChild(tdAcciones);
            tbodyTareas.appendChild(tr);
        });
    }

    function cargarTareas(tareas) {
        const { id, descripcion } = tareas;

        descripcionInput.value = descripcion;
        objTareas.id = id;

        const submitButton = formulario.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.textContent = 'Actualizar';
        } else {
            console.error('No se encontró el botón de submit.');
        }

        editando = true;
    }

    function eliminarTareas(id) {
        lista = lista.filter(tarea => tarea.id !== id);
        mostrarTareas();
    }

    function limpiarHtml() {
        while (tbodyTareas.firstChild) {
            tbodyTareas.removeChild(tbodyTareas.firstChild);
        }
    }
});