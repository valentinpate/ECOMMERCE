let menos = document.querySelectorAll(".minusButton")
let mas = document.querySelectorAll(".plusButton")
let numCantidad = document.querySelectorAll(".counterNumber")

let contador = 1

// Funciones
// deshablitar botón -
function deshabilitarInicio(){
    if(contador==1){
        menos.forEach((meno)=>{
            meno.toggleAttribute("disabled")
            meno.classList.add("disabled-counter-button")
        })
    }
}

function deshabilitarMenos(){
    if(contador<=1){
        menos.forEach((meno)=>{
            meno.toggleAttribute("disabled")
            meno.classList.toggle("disabled-counter-button")
        })
    }else if(contador>1){
        menos.forEach((meno)=>{
            meno.removeAttribute("disabled")
            meno.classList.remove("disabled-counter-button")
        })
        mas.forEach((ma)=>{
            ma.removeAttribute("disabled")
            ma.classList.remove("disabled-counter-button")
        })
    }
    mostrarContador()
}

function deshabilitarMas(){
    if(contador>=10){
        mas.forEach((ma)=>{
            ma.toggleAttribute("disabled")
            ma.classList.toggle("disabled-counter-button")
        })
    }else if(contador<10){
        mas.forEach((ma)=>{
            ma.removeAttribute("disabled")
            ma.classList.remove("disabled-counter-button")
        })
        menos.forEach((meno)=>{
            meno.removeAttribute("disabled")
            meno.classList.remove("disabled-counter-button")
        })
    }
    mostrarContador()
}

function mostrarContador(){
    numCantidad.forEach((num)=>{
        num.innerHTML=contador
    })
}

mostrarContador()
deshabilitarInicio()

// Eventos

menos.forEach((meno)=>{
    meno.addEventListener("click",()=>{
        contador--
        deshabilitarMenos()
    })
})

mas.forEach((ma)=>{
    ma.addEventListener("click",()=>{
        contador++
        deshabilitarMas()
    })
})


// Las funciones dentro del addEventListener actualizan el contador en el document por cada click.