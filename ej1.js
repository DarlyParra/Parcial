
let sumarCuadros =(array)=>{
    for(let numero in array){
    
    
    cuadroString = "";
    for (var i = 0; i < 6; i++) {
        cuadroString += "------\n";
    }
    cuadroString += "| " + numero + " |\n";
    for (var i = 0; i < 6; i++) {
        cuadroString += "------\n";
    }
    
    // Mostrar el cuadro
    cuadro.innerText = cuadroString;
}
}

console.log(sumarCuadros([[1,23,453,3267,12354, 123456]])) 