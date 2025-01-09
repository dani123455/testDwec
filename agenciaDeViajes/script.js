class Cliente {
    constructor(nombre, apellido, email, telefono) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
    }
}

class Viaje {
    constructor(codigo, destino, precio, disponibilidad = true) {
        this.codigo = codigo;
        this.destino = destino;
        this.precio = precio;
        this.disponibilidad = disponibilidad;
    }

    getInfo() {
        return `Viaje [${this.codigo}] a ${this.destino}, precio: ${this.precio} euros`;
    }
}

class Vuelo extends Viaje {
    constructor(codigo, destino, precio, aerolinea, duracion) {
        super(codigo, destino, precio);
        this.aerolinea = aerolinea;
        this.duracion = duracion;
    }

    getInfo() {
        return `${super.getInfo()}, Aerolínea: ${this.aerolinea}, Duración: ${this.duracion} horas`;
    }
}

class Hotel extends Viaje {
    constructor(codigo, destino, precio, estrellas, tipoHabitacion) {
        super(codigo, destino, precio);
        this.estrellas = estrellas;
        this.tipoHabitacion = tipoHabitacion;
    }

    getInfo() {
        return `${super.getInfo()}, Hotel ${this.estrellas} estrellas, Habitación: ${this.tipoHabitacion}`;
    }
}

class Paquete extends Viaje {
    constructor(codigo, destino, precio, vuelo, hotel) {
        super(codigo, destino, precio);
        this.vuelo = vuelo;
        this.hotel = hotel;
    }

    getInfo() {
        return `${super.getInfo()}\n - Vuelo: ${this.vuelo.getInfo()}\n - Hotel: ${this.hotel.getInfo()}`;
    }
}

class Reserva {
    constructor(cliente, viaje, fecha = new Date()) {
        this.cliente = cliente;
        this.viaje = viaje;
        this.fecha = fecha;
    }

    getResumen() {
        return `${this.cliente.nombre} ${this.cliente.apellido} ha reservado el viaje: ${this.viaje.getInfo()}`;
    }
}





let clientes =JSON.parse(localStorage.getItem('clientes')) ? JSON.parse(localStorage.getItem('clientes')) : [];
let viajes =JSON.parse(localStorage.getItem('viajes')) ? JSON.parse(localStorage.getItem('viajes')) : [];
let reservas = JSON.parse(localStorage.getItem('reservas')) ? JSON.parse(localStorage.getItem('reservas')).map(reserva => {
    reserva.fecha = new Date(reserva.fecha);
    return reserva;
}) : [];



function guardarLocal() {
    localStorage.setItem('clientes', JSON.stringify(clientes));
    localStorage.setItem('viajes', JSON.stringify(viajes));
    localStorage.setItem('reservas', JSON.stringify(reservas));
}

document.getElementById('formularioCliente').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    if (nombre && apellido && email && telefono) {
        const cliente = new Cliente(nombre, apellido, email, telefono);
        clientes.push(cliente);

        guardarLocal();
        actualizarTablaClientes();

        document.getElementById('formularioCliente').reset();
    }
});

function actualizarTablaClientes() {
    const clientesTabla = document.getElementById('clientesTabla');
    clientesTabla.innerHTML = '';

    clientes.forEach(cliente => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cliente.nombre}</td>
            <td>${cliente.apellido}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefono}</td>
            <td><button class="btn btn-danger" onclick="eliminarCliente('${cliente.email}')">Eliminar</button></td>
        `;
        clientesTabla.appendChild(fila);
    });

    actualizarSelectClientes();
}

function eliminarCliente(email) {
    clientes = clientes.filter(cliente => cliente.email !== email);
    guardarLocal();
    actualizarTablaClientes();
}

document.getElementById('viajeFormulario').addEventListener('submit', function (e) {
    e.preventDefault();

    const codigo = document.getElementById('codigo').value;
    const destino = document.getElementById('destino').value;
    const precio = document.getElementById('precio').value;
    const tipoViaje = document.getElementById('tipoViaje').value;

    if (codigo && destino && precio && tipoViaje) {
        let viaje;

        if (tipoViaje === 'vuelo') {
            viaje = new Vuelo(codigo, destino, precio);
        } else if (tipoViaje === 'hotel') {
            viaje = new Hotel(codigo, destino, precio);
        } else if (tipoViaje === 'paquete') {
            const vuelo = new Vuelo(codigo, destino, precio);
            const hotel = new Hotel(codigo, destino, precio);
            viaje = new Paquete(codigo, destino, precio, vuelo, hotel);
        }

        viajes.push(viaje);


        guardarLocal();
        actualizarTablaViajes();

        document.getElementById('viajeFormulario').reset();
    }
});

function actualizarTablaViajes() {
    const viajesTabla = document.getElementById('viajesTabla');
    viajesTabla.innerHTML = '';

    viajes.forEach(viaje => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${viaje.codigo}</td>
            <td>${viaje.destino}</td>
            <td>${viaje.precio}</td>
            <td>${viaje.constructor.name}</td>
            <td><button class="btn btn-danger" onclick="eliminarViaje('${viaje.codigo}')">Eliminar</button></td>
        `;
        viajesTabla.appendChild(fila);
    });

    actualizarSelectViajes();
}

function eliminarViaje(codigo) {
    viajes = viajes.filter(viaje => viaje.codigo !== codigo);
    guardarLocal();
    actualizarTablaViajes();
}

document.getElementById('reservaFormulario').addEventListener('submit', function (e) {
    e.preventDefault();

    const clienteSelect = document.getElementById('clienteSelect').value;
    const viajeSelect = document.getElementById('viajeSelect').value;

    if (clienteSelect && viajeSelect) {
        const cliente = clientes.find(c => c.email === clienteSelect);
        const viaje = viajes.find(v => v.codigo === viajeSelect);

        if (cliente && viaje) {
            const reserva = new Reserva(cliente, viaje);
            reservas.push(reserva);

            guardarLocal();
            actualizarTablaReservas();

            document.getElementById('reservaFormulario').reset();
        }
    }
});

function actualizarTablaReservas() {
    const reservasTabla = document.getElementById('reservasTabla');
    reservasTabla.innerHTML = '';

    reservas.forEach((reserva, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${reserva.cliente.nombre} ${reserva.cliente.apellido}</td>
            <td>${reserva.viaje.destino}</td>
            <td>${reserva.fecha.toLocaleDateString()}</td>
            <td><button class="btn btn-danger" onclick="eliminarReserva(${index})">Eliminar</button></td>
        `;
        reservasTabla.appendChild(fila);
    });
}

function eliminarReserva(index) {
    reservas.splice(index, 1); // Elimina la reserva en el índice especificado
    guardarLocal();
    actualizarTablaReservas();
}

function actualizarSelectClientes() {
    const clienteSelect = document.getElementById('clienteSelect');
    clienteSelect.innerHTML = '<option value="">Seleccionar Cliente</option>';
    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.email;
        option.textContent = `${cliente.nombre} ${cliente.apellido}`;
        clienteSelect.appendChild(option);
    });
}

function actualizarSelectViajes() {
    const viajeSelect = document.getElementById('viajeSelect');
    viajeSelect.innerHTML = '<option value="">Seleccionar Viaje</option>';
    viajes.forEach(viaje => {
        const option = document.createElement('option');
        option.value = viaje.codigo;
        option.textContent = `${viaje.destino} (${viaje.codigo})`;
        viajeSelect.appendChild(option);
    });
}

actualizarTablaClientes();
actualizarTablaViajes();
actualizarTablaReservas();
