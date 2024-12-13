//la fecha meterlo coomo una propiedad de reserva y que coja la fecha actual

//clase viaje 
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

//clase vuelo
class Vuelo extends Viaje {
    constructor(codigo, destino, precio, aerolinea, duracion){
        super(codigo, destino, precio);
        this.aerolinea =aerolinea;
        this.duracion = duracion;
    }

    getInfo() {
        return `${super.getInfo()}, Aerolínea: ${this.aerolinea}, Duración: ${this.duracion} horas`;
    }
}

//class Hotel
class Hotel extends Viaje {
    constructor(codigo, destino, precio, estrellas, tipoHabitacion){
        super(codigo, destino, precio);
        this.estrellas = estrellas;
        this.tipoHabitacion = tipoHabitacion;
    }

    getInfo() {
        return `${super.getInfo()}, Hotel ${this.estrellas} estrellas, Habitación: ${this.tipoHabitacion}`;
    }
}

//class paquete
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

//class cliente
class Cliente {
    constructor(nombre, apellido, email, telefono) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
    }
    
    getResumen() {
        return `Cliente: ${this.nombre} ${this.apellido}, Email: ${this.email}, Teléfono: ${this.telefono}`;
    }
}

//class reserva
class Reserva {
    constructor(cliente, viaje, fecha = new Date()) {
        this.cliente = cliente;
        this.viaje = viaje;
        this.fecha = fecha;
    }
    
    getResumen() {
        return `${this.cliente.getResumen()}\nReservó: ${this.viaje.getInfo()}`;
    }
}

//crud
let clientes = [];
let viajes = [];
let reservas = [];

const nombre = document.getElementById('nombre').value;
const apellido = document.getElementById('apellido').value;
const email = document.getElementById('email').value;
const telefono = document.getElementById('telefono').value;
let mensajeError = document.getElementById('mensajeError');


//seccion clientes
function agregar() {
    formularioClientes.on('submit', function(event) {
        event.preventDefault();

        if (input.val().trim() === '') {
            mensajeError.removeClass('d-none');
        } else {
            mensajeError.addClass('d-none');
            let tareaTexto = input.val().trim();
            contadorId++;
            let nuevaTarea = { id: contadorId, texto: tareaTexto };
            todas.push(nuevaTarea);
            pendientes.push(nuevaTarea);
            input.val('');
            actualizarTablaTodas();
            actualizarTablaPendientes();
        }
    });
}


        function actualizarTabla() {
            clientesTableBody.innerHTML = '';

            clientes.forEach((cliente, index) => {
                const nuevaFila = document.createElement('tr');
                nuevaFila.innerHTML = `
                    <td>${cliente.nombre}</td>
                    <td>${cliente.apellido}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.telefono}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="eliminarCliente(${index})">Eliminar</button>
                    </td>
                `;
                clientesTableBody.appendChild(nuevaFila);
            });
        }




//arreglar
