let menos = document.querySelectorAll(".minusButton")
let mas = document.querySelectorAll(".plusButton")
let numCantidad = document.querySelectorAll(".counterNumber")
let anadir = document.querySelectorAll(".anadir")
let inputcantidad= document.querySelectorAll(".inputcantidad")


document.addEventListener('DOMContentLoaded', () => {
// Funciones
// deshablitar botón -

const variables= []
let cantidad=0
let id=null
for (let i = 0; i < numCantidad.length;i++ ){
  
    variables.push("contador"+i)
    variables[i] = 1;
function deshabilitarInicio(i){
    if(variables[i]==1){
        menos[i].toggleAttribute("disabled")
        menos[i].classList.add("disabled-counter-button")
    }
}

function deshabilitarMenos(i){
    if(variables[i]<=1){
        menos[i].toggleAttribute("disabled")
        menos[i].classList.toggle("disabled-counter-button")
    }else if(variables[i]>1){
        menos[i].removeAttribute("disabled")
        menos[i].classList.remove("disabled-counter-button")
        mas[i].removeAttribute("disabled")
        mas[i].classList.remove("disabled-counter-button")
    }
    mostrarContador()
}

function deshabilitarMas(i){
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
    if(variables[i]!=numCantidad[i].innerHTML){
       numCantidad[i].innerHTML=variables[i]
       cantidad = numCantidad[i].innerHTML
    }
    
}

mostrarContador()
deshabilitarInicio(i)

// Eventos

menos[i].addEventListener("click",()=>{
    variables[i]--
    deshabilitarMenos(i)
})

mas[i].addEventListener("click",()=>{
    variables[i]++
    deshabilitarMas(i)
})
}
for (let j = 0; j < anadir.length;j++ ){//hago un nuevo for para los botones añadir carrito, ya que al renderizar productos en el carrito el numcantidad aumenta y la variable i del primer for toma un valor mas alto de los botones añadircarrito que hay, entonces cuando no habia productos en carrito andaba bien y cuando ponias productos en carrito ya no!

 anadir[j].addEventListener('click', async (e) => { //uso un fetch para enviar la info cantidad y el id a carrito

    e.preventDefault()
    
   id= anadir[j].id
        const fer= await fetch("/carrito",{
            method:"POST",
            body:JSON.stringify({cantidad,id}),//esta cantidad es la que hay que usar para agregar a DB
            headers:{"Content-Type":"application/json"}
        })
        if(fer.ok){
            window.location.reload();}
            else{console.log("no funciono")}
  });
}
})
// Las funciones dentro del addEventListener actualizan el contador en el document por cada click.