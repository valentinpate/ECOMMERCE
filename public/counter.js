let menos = document.querySelectorAll(".minusButton")
let mas = document.querySelectorAll(".plusButton")
let numCantidad = document.querySelectorAll(".counterNumber")
let anadir = document.querySelectorAll(".anadir")
let inputcantidad= document.querySelectorAll(".inputcantidad")
let page = document.querySelectorAll(".page-item")

document.addEventListener('DOMContentLoaded', () => {

const variables= []
let cantidad=1
let id=null
let llaveContador = false
let numPage

// Funciones
// deshablitar botón -
for (let i = 0; i < numCantidad.length;i++ ){
    variables.push("contador"+i) //variables[i] es contador. Variables tomando en cuenta el index (comienza en 0 por el i del for), el cual cambia (se incrementa por 1) cada vez que corre el for
    variables[i] = Number(numCantidad[i].innerHTML); //Declara que los index de variables sean todos iguales a 1. EJ: "contador"+0 (posición 0)= 1, "contador"+1 (posición 1) = 1

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
        if(variables[i]!=numCantidad[i].innerHTML && llaveContador){
            numCantidad[i].innerHTML=variables[i]
            cantidad = numCantidad[i].innerHTML
            const evento = new CustomEvent('valorCambiado', { detail: cantidad }); //se crea un nuevo evento "valorCambiado", su detalle es el valor de la cantidad
            document.dispatchEvent(evento); //dispatchEvent envía el evento
            llaveContador = false
            return cantidad
        }
        //numCantidad[i].innerHTML=variables[i]
    } // Se inserta cada valor i del array variables en cada numCantidad de las cards. RECORDAR QUE NUMCANTIDAD ES UN ARRAY
    //EJ: valor de "variables" index 0 del array se inserta en el HTML en el span vacio del index 0 en la card

    mostrarContador()
    deshabilitarInicio()

// Eventos

menos[i].addEventListener("click",(event)=>{
    llaveContador = true
    variables[i]--
    deshabilitarMenos()
    event.preventDefault()
})

mas[i].addEventListener("click",(event)=>{
    llaveContador = true
    variables[i]++
    deshabilitarMas()
    event.preventDefault()
})

}
for (let j = 0; j < anadir.length;j++ ){//hago un nuevo for para los botones añadir carrito, ya que al renderizar productos en el carrito el numcantidad aumenta y la variable i del primer for toma un valor mas alto de los botones añadircarrito que hay, entonces cuando no habia productos en carrito andaba bien y cuando ponias productos en carrito ya no!
//segundo for para productos con el botón de añadir al carrito. (no toma productos en el popup del carrito.)
    anadir[j].addEventListener('click', async (e) => { //uso un fetch para enviar la info cantidad y el id a carrito
   
       e.preventDefault()
       
      id= anadir[j].id
           const fer= await fetch("/carrito",{
               method:"POST",
               body:JSON.stringify({cantidad,id}),//esta cantidad es la que hay que usar para agregar a DB. Cantidad del contador. Toma su último valor.
               headers:{"Content-Type":"application/json"}
           })
           if(fer.ok){
               window.location.reload();}
               else{console.log("no funciono")}
     });
   }
// Las funciones dentro del addEventListener actualizan el contador en el document por cada click.

   page.forEach((e)=>{
        e.addEventListener("click",()=>{
            localStorage.removeItem("paginaActual")
            let elementoA = e.querySelector("a")
            numPage = elementoA.innerHTML
            console.log("este", elementoA.innerHTML)
            localStorage.setItem("paginaActual", numPage)
            return numPage
        })

        numPage = localStorage.getItem("paginaActual")
        let elementoA = e.querySelector("a")
        let condicion = elementoA.innerHTML
        if(numPage != undefined && condicion == numPage){
            e.classList.add("active")
        }
   })
})