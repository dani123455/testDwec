let numeros1 = [1,2,3,4,5,6];
let numeros2 = [7,8,9,10,11,12];

function suma() {
    return numeros1.map((a, index) => a + numeros2[index]);
}

function multiplicacion(){
    return numeros1.map((a, index) => a * index);
}

function buscar(){
    return numeros2.findIndex(num => num>10);
}


console.log(suma());
console.log(multiplicacion());
console.log(buscar());
