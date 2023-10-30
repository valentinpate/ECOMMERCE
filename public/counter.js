let menos = document.querySelectorAll(".minusButton")
let mas = document.querySelectorAll(".plusButton")
let numCantidad = document.querySelectorAll(".counterNumber")
let anadir = document.querySelectorAll(".anadir")



document.addEventListener('DOMContentLoaded', () => {
// Funciones
// deshablitar botón -

const variables= []
let cantidad=1
let id=null
let llaveContador= false
for (let i = 0; i < numCantidad.length;i++ ){
  
    variables.push("contador"+i)
    variables[i] = Number(numCantidad[i].innerHTML)
    
  
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
    if(variables[i]!=numCantidad[i].innerHTML && llaveContador){
       numCantidad[i].innerHTML=variables[i]
       cantidad = numCantidad[i].innerHTML
       const evento = new CustomEvent('valorCambiado', { detail: cantidad });
       document.dispatchEvent(evento);
       llaveContador = false
       return cantidad
    }
    
}

mostrarContador()
deshabilitarInicio(i)

// Eventos

menos[i].addEventListener("click",(event)=>{
    llaveContador=true
    variables[i]--
    deshabilitarMenos(i)
    event.preventDefault();
})

mas[i].addEventListener("click",(event)=>{
    llaveContador=true
    variables[i]++
    deshabilitarMas(i)
    event.preventDefault();
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