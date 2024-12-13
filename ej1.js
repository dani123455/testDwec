let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function alCuadrado(){
    return array.map(x => x * x);
}

function pares() {
    return array.filter(x => x % 2 === 0);
}

function sumas(){
    return array.reduce((acc, curr) => acc + curr, 0);
}


console.log(alCuadrado());
console.log(pares());
console.log(sumas());