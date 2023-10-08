let menos = document.getElementById("minusButton")
let mas = document.getElementById("plusButton")
let numCantidad = document.getElementById("counterNumber")

let contador = 1

// Funciones
// deshablitar botón -
function deshabilitarInicio(){
    if(contador==1){
        menos.toggleAttribute("disabled")
        menos.classList.add("disabled-counter-button")
    }
    return contador
}

function deshabilitarMenos(){
    if(contador<=1){
        menos.toggleAttribute("disabled")
        menos.classList.toggle("disabled-counter-button")
    }else if(contador>1){
        menos.removeAttribute("disabled")
        menos.classList.remove("disabled-counter-button")
        mas.removeAttribute("disabled")
        mas.classList.remove("disabled-counter-button")
    }
    mostrarContador()
}

function deshabilitarMas(){
    if(contador>=10){
        mas.toggleAttribute("disabled")
        mas.classList.toggle("disabled-counter-button")
    }else if(contador<10){
        mas.removeAttribute("disabled")
        mas.classList.remove("disabled-counter-button")
        menos.removeAttribute("disabled")
        menos.classList.remove("disabled-counter-button")
    }
    mostrarContador()
}

function mostrarContador(){
    numCantidad.innerHTML=contador
}

mostrarContador()
deshabilitarInicio()

// Eventos

menos.addEventListener("click",()=>{
    contador--
    deshabilitarMenos()
})

mas.addEventListener("click",()=>{
    contador++
    deshabilitarMas()
})

// Las funciones dentro del addEventListener actualizan el contador en el document por cada click.