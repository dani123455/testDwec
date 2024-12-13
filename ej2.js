let ciudades = ["Jerez","Madrid","Sevilla","Malaga","Barcelona"];

function mayus(){
    return ciudades.map(x=> x.toUpperCase());
}

function alfabeticamente(){
    return ciudades.sort((a,b)=> a - b);
}

function letra(){
    return ciudades.some(x => x.includes("M"));
}

function caracteres(){
    return ciudades.every(x => x.length > 4);
}

console.log(mayus());
console.log(alfabeticamente());
console.log(letra());
console.log(caracteres());