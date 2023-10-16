let menos = document.querySelectorAll(".minusButton")
let mas = document.querySelectorAll(".plusButton")
let numCantidad = document.querySelectorAll(".counterNumber")

const variables= []

// Funciones
// deshablitar botón -
for (let i = 0; i < numCantidad.length;i++ ){
    variables.push("contador"+i) //variables[i] es contador. Variables tomando en cuenta el index (comienza en 0 por el i del for), el cual cambia (se incrementa por 1) cada vez que corre el for

     variables[i] = 1; //Declara que los index de variables sean todos iguales a 1. EJ: "contador"+0 (posición 0)= 1, "contador"+1 (posición 1) = 1
function deshabilitarInicio(){
    if(variables[i]==1){
        menos[i].toggleAttribute("disabled")//menos[i] así activa atributo en cada valor del array de menos. RECORDAR QUE MENOS Y MAS AL VENIR DE QUERYSELECTORALL SON UN ARRAY
        menos[i].classList.add("disabled-counter-button")//menos[i] así activa clase en cada valor del array de menos.
    }
}
// si en vez de llamar a menos[i] llamamos solo a menos solo se toma el primer valor del array menos. Para llamarlos a todos menos[i] cuyo valor empieza en 0 y sube de a 1 mediante el recorrido del for.
function deshabilitarMenos(){
    if(variables[i]<=1){
        menos[i].toggleAttribute("disabled")
        menos[i].classList.toggle("disabled-counter-button")
    }else if(variables[i]>1){
        menos[i].removeAttribute("disabled")
        menos[i].classList.remove("disabled-counter-button")
        mas[i].removeAttribute("disabled")//mas[i] así activa atributo en cada valor del array de mas. RECORDAR QUE MENOS Y MAS AL VENIR DE QUERYSELECTORALL SON UN ARRAY
        mas[i].classList.remove("disabled-counter-button")
    }
    mostrarContador()
}

function deshabilitarMas(){
    if(variables[i]>=10){
        mas[i].toggleAttribute("disabled") 
        mas[i].classList.toggle("disabled-counter-button")
    }else if(variables[i]<10){
        mas[i].removeAttribute("disabled")
        mas[i].classList.remove("disabled-counter-button")
        menos[i].removeAttribute("disabled")
        menos[i].classList.remove("disabled-counter-button")
    }
    mostrarContador()
}

function mostrarContador(){
    numCantidad[i].innerHTML=variables[i]
} // Se inserta cada valor i del array variables en cada numCantidad de las cards. RECORDAR QUE NUMCANTIDAD ES UN ARRAY
//EJ: valor de variables de index 0 del array se inserta en el HTML en el span vacio del index 0 en la card

mostrarContador()
deshabilitarInicio()

// Eventos

menos[i].addEventListener("click",()=>{
    variables[i]--
    deshabilitarMenos()
})

mas[i].addEventListener("click",()=>{
    variables[i]++
    deshabilitarMas()
})

}
// Las funciones dentro del addEventListener actualizan el contador en el document por cada click.