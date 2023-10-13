let menos = document.querySelectorAll(".minusButton")
let mas = document.querySelectorAll(".plusButton")
let numCantidad = document.querySelectorAll(".counterNumber")
let añadir = document.querySelectorAll(".añadir")



const variables= []
// Funciones
// deshablitar botón -
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
    numCantidad[i].innerHTML=variables[i]
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

añadir[i].addEventListener("click", async ()=>{

    //busqueda de datos
        //consigo el src de la imagen
        let contenedor = await event.target.closest('.contendorproductos'); //elemtno padre del boton

        // busco la imagen
        let imagen = await contenedor.querySelector('img');
        let src=  await imagen.getAttribute('src');//src

        // busco el nombre
        let clasenombre= await contenedor.querySelector('.nombreproducto');
        let nombre= await clasenombre.innerHTML

        // busco el precio
        let claseprecio= await contenedor.querySelector('.precioproducto');
        let precio= await claseprecio.innerHTML // aca hay que hacer un regex para que solo tome el precio

        //catidad de prodcutos
        let cantidad = variables[i]
        //id del producto es el mismo del id del boton(seteados en html)
        let iden= event.target.id;
        //console.log( "son",cantidad," ",nombre,"su id es",iden,"y su imagen es", src , "y vale", precio)
        variables[i]=1
        deshabilitarMenos(i)

})

}
// Las funciones dentro del addEventListener actualizan el contador en el document por cada click.