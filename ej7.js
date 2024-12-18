let tamaño = 5; 
let randomArray = [];

for (let i = 0; i < tamaño; i++) {
    let numeros = Math.floor(Math.random() * 100) + 1; 
    randomArray.push(numeros);
}

function numeroAlto(){
    return Math.max(...randomArray);
}

function numeroBaja(){
    return Math.min(...randomArray);
}

function impares(){
    return randomArray.filter(x => x % 2 != 0);
}

console.log(randomArray);
console.log(numeroAlto());
console.log(numeroBaja());
console.log(impares());