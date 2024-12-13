const arrEstudiantes = [
    { nombre: "Ana", edad: 20, nota: 8 },
    { nombre: "Luis", edad: 22, nota: 5 },
    { nombre: "María", edad: 19, nota: 7 },
    { nombre: "Carlos", edad: 21, nota: 4 }
];

function aprobados(){
    return arrEstudiantes.filter(x=>x.nota>=5);
}

function edad(){
    return arrEstudiantes.sort((a,b)=>a.edad-b.edad);
}

function soloNombre(){
    return arrEstudiantes.map(x=>x.nombre);
}

function media(){
    return arrEstudiantes.reduce((acc, curr) => acc * curr.nota, 0);
}

console.log(aprobados());
console.log(edad());
console.log(soloNombre());
console.log(media());

//corregir entero