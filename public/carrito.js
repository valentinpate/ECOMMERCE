let precio = document.querySelectorAll(".precio")
let descuento = document.querySelectorAll(".descuento")
let precioFinal = document.querySelectorAll(".preciocondesc")
let descuentoIndex = document.querySelectorAll(".descuentoIndex ")
let elementoCantidad = document.querySelectorAll(".counterNumber ")
let precioXcantidad = document.querySelectorAll(".precioporcantproducto")
let precioSumaTotal = document.getElementById("preciototal")
let total = document.getElementById("total")
let envio = document.getElementById("envio")
let inputPromocion= document.getElementById("inputPromocion")
let descuentoPromo= document.getElementById("descuentoPromo")
let promoRender = document.getElementById("promocion")
let buttonPromo = document.getElementById("buttonPromo")
let inputPrecio = document.getElementById("inputPrecio")
let inputTotal= document.getElementById("inputTotal")
let inputCantidad = document.querySelectorAll(".inputCantidad")
let inputPrecioporcantproducto = document.querySelectorAll(".inputPrecioporcantproducto")
let inputPreciocondesc = document.querySelectorAll(".inputPreciocondesc")


document.addEventListener('DOMContentLoaded', () => {

//SECCION PRECIOS
let arrayprecio=[]
let cantidad=null
let subtotal=null
let sumaTotal = 0
let arrayPromocion= ['martin','valentin','enzo','leonel']
let promocion = null
let totalOperacion= 0
let descuentoFinal = null
envio = envio.innerHTML
envio = parseFloat(envio.replace(/\$|,/g, ''));
envio=Number(envio)

//precio por unidad
let precionumber = [...precio].forEach((elemento)=>{// recorro el nodelist, extraigo el contenido y lo convierto en un numero con dos deciamles
   let pre= elemento.innerHTML.match(/\$([0-9,]+)/g) //tomo el contenido y extraigo los numeros
   pre = parseFloat(pre[0].replace(/\$|,/g, ''));//le saco el signo $
   pre= (pre/100).toFixed(2);// hago que quede con dos decimales IMPORTANTE TENES QUE AGREGAR ESTO EN USER.JS, justo despues de let precio
   pre = Number(pre)
   arrayprecio.push(pre)
  })
 
//cantidad de productos
precio.forEach((elemento,index)=>{

    function render (){
    if (index < descuentoIndex.length){

        let lugar = descuentoIndex[index].value
        let descuentoFinal = descuento[index].value//extraigo el valor del input (ese input lo pongo solo para traer el valor hasta el counter.js, ya que no supe como hacer)

        cantidad =elementoCantidad[lugar].innerHTML
        subtotal=arrayprecio[lugar]*cantidad

        let precioTotal = subtotal-((subtotal*descuentoFinal)/100)

        precioTotal= precioTotal.toFixed(2);//hago el descuento pre es el precio comun y le resto el descuento, lo del parentesis es un porcenatje comun
        precioTotal = Number(precioTotal)
        subtotal= subtotal.toFixed(2);
        inputPrecioporcantproducto[lugar].value= subtotal
        inputPreciocondesc[lugar].value= precioTotal
        precioFinal[lugar].innerHTML='$'+ precioTotal//imprimo el precio
        precioXcantidad[lugar].innerHTML='$'+subtotal
        sumaTotal=sumaTotal+precioTotal
  
        }

    if(precioFinal[index].innerHTML == ""){
        cantidad =elementoCantidad[index].innerHTML
        subtotal=arrayprecio[index]*cantidad
        subtotal= subtotal.toFixed(2);
        subtotal = Number(subtotal)
        inputPreciocondesc[index].value= subtotal
        precioFinal[index].innerHTML='$'+subtotal
        sumaTotal=sumaTotal+subtotal

        }

    totalOperacion=sumaTotal + envio
    if(index == precio.length-1){
        totalOperacion = Number(totalOperacion)
        totalOperacion=totalOperacion.toFixed(2)
        sumaTotal = Number(sumaTotal)
        sumaTotal=sumaTotal.toFixed(2)
        }
    precioSumaTotal.innerHTML = '$'+sumaTotal
    inputPrecio.value= sumaTotal
    total.innerHTML = '$'+ totalOperacion
    inputTotal.value = totalOperacion
    }
    render()

})


document.addEventListener('valorCambiado', (event) => {
    const nuevoValor = event.detail;
    sumaTotal=0
    let subtotal = null

precio.forEach((elemento,index)=>{
     
    if( precioXcantidad[index].innerHTML != ""){//este if es para los productos con descuentos

        inputCantidad[index].value=elementoCantidad[index].innerHTML

        let precioTotal= precioFinal[index].innerHTML
        precioTotal = parseFloat(precioTotal.replace(/\$|,/g, ''));
        precioTotal= Number(precioTotal)

        subtotal = precioXcantidad[index].innerHTML
        subtotal= parseFloat(subtotal.replace(/\$|,/g, ''));
        subtotal = Number(subtotal)

        descuentoFinal = (100 * precioTotal - 100 * subtotal) / -subtotal
    
        cantidad =elementoCantidad[index].innerHTML

        subtotal=arrayprecio[index]*cantidad
        precioTotal = subtotal-((subtotal*descuentoFinal)/100)
        precioTotal= precioTotal.toFixed(2);//hago el descuento pre es el precio comun y le resto el descuento, lo del parentesis es un porcenatje comun
        precioTotal = Number(precioTotal)
        subtotal= subtotal.toFixed(2)
        inputPrecioporcantproducto[index].value= subtotal
        inputPreciocondesc[index].value= precioTotal
        precioFinal[index].innerHTML='$'+precioTotal//imprimo el precio
        precioXcantidad[index].innerHTML='$'+subtotal
        sumaTotal=sumaTotal+precioTotal
    
    }else if( precioXcantidad[index].innerHTML == ""){//este if es para los productos que no tienen descuentos

        inputCantidad[index].value=elementoCantidad[index].innerHTML
        cantidad =elementoCantidad[index].innerHTML
        subtotal=arrayprecio[index]*cantidad
        subtotal= subtotal.toFixed(2)
        subtotal = Number(subtotal)
        inputPreciocondesc[index].value= subtotal//back
        precioFinal[index].innerHTML='$'+subtotal
        sumaTotal=sumaTotal+subtotal
    }
    totalOperacion=sumaTotal + envio
    if(index == precio.length-1){//solo dos decimales en la cuenta final
        totalOperacion = Number(totalOperacion)
        totalOperacion=totalOperacion.toFixed(2)
        sumaTotal = Number(sumaTotal)
        sumaTotal=sumaTotal.toFixed(2)
    }
     precioSumaTotal.innerHTML = '$'+sumaTotal//imprimo subtotal
     inputPrecio.value= sumaTotal//back
     total.innerHTML ='$'+ totalOperacion//imprimo total
     inputTotal.value = totalOperacion//back
})


})
buttonPromo.addEventListener('click', (event) => {//promocion
    event.preventDefault()
    arrayPromocion.forEach(elemento=>{
    if (elemento == inputPromocion.value){
        promoRender.style.display = "flex";
        let promoFinal =totalOperacion-((totalOperacion*20)/100)
        promoFinal=promoFinal.toFixed(2)
        total.innerHTML= '$'+ promoFinal
        promocion = '20%'
        descuentoPromo.innerHTML = promocion
        }
    })
    
})
})

