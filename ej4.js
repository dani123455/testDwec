let palabras = ["Hola", "Mundo", "Soy", "Daniel"];

function letras(){
    return palabras.filter(x=>x.length>5);
}

function invertir(){
    return palabras.map(palabra => palabra.split('').reverse().join(''));
}

function ordenar(){
    return palabras.sort((a,b)=>b.length-a.length);
}

console.log(letras());
console.log(invertir());
console.log(ordenar());