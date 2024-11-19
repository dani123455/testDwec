// Array para almacenar las tareas
let tareas = [];
let idTareaEditando = null;

// Referencias al DOM
const descripcionInput = document.getElementById('descripcionInput');
const mensajeError = document.getElementById('mensajeError');
const formulario = document.getElementById('formulario');
const tablaTareas = document.querySelector('tbody');

// Evento para agregar o editar tareas
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const descripcion = descripcionInput.value.trim();

    if (!descripcion) {
        mensajeError.style.display = 'block';
        return;
    }
    mensajeError.style.display = 'none';

    if (idTareaEditando !== null) {
        // Editar tarea existente
        const tarea = tareas.find(t => t.id === idTareaEditando);
        tarea.descripcion = descripcion;
        idTareaEditando = null;
        document.getElementById('tituloModal').textContent = 'Añadir tarea';
    } else {
        // Agregar nueva tarea
        const nuevaTarea = {
            id: Date.now(),
            descripcion,
        };
        tareas.push(nuevaTarea);
    }

    descripcionInput.value = '';
    actualizarTabla();
    const modalElement = bootstrap.Modal.getInstance(document.getElementById('modal'));
    modalElement.hide();
});

// Actualiza la tabla con las tareas
function actualizarTabla() {
    tablaTareas.innerHTML = '';
    tareas.forEach(tarea => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${tarea.id}</td>
            <td>${tarea.descripcion}</td>
            <td class="text-center">
                <button class="btn btn-primary btn-sm me-4" onclick="editarTarea(${tarea.id})"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger btn-sm" onclick="eliminarTarea(${tarea.id})"><i class="bi bi-trash3"></i></button>
            </td>
        `;
        tablaTareas.appendChild(fila);
    });
}

// Editar una tarea
function editarTarea(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        descripcionInput.value = tarea.descripcion;
        idTareaEditando = id;
        document.getElementById('tituloModal').textContent = 'Editar tarea';
        const modal = new bootstrap.Modal(document.getElementById('modal'));
        modal.show();
    }
}

// Eliminar una tarea con confirmación
function eliminarTarea(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        tareas = tareas.filter(t => t.id !== id);
        actualizarTabla();
    }
}

// Inicialización
actualizarTabla();
