const arrFrase = ["La", "vida", "es", "bella", "y", "divertida"];

function reconstruir(){
    return arrFrase.reduce((acc, curr) => acc + curr);
}

function invertir(){
    return arrFrase.reverse();
}

function buscar(){
    return arrFrase.includes("bella");
}

console.log(reconstruir());
console.log(invertir());
console.log(buscar());