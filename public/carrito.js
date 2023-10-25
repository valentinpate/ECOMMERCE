let precio = document.querySelectorAll(".precio")
let descuento = document.querySelectorAll(".descuento")
let precioFinal = document.querySelectorAll(".preciocondesc")
let descuentoIndex = document.querySelectorAll(".descuentoIndex ")
let elementoCantidad = document.querySelectorAll(".counterNumber ")
let precioXcantidad = document.querySelectorAll(".precioporcantproducto")

document.addEventListener('DOMContentLoaded', () => {

//SECCION PRECIOS
let arrayprecio=[]
let cantidad=null
let subtotal=null
//precio por unidad
let precionumber = [...precio].forEach((elemento,index)=>{// recorro el nodelist, extraigo el contenido y lo convierto en un numero con dos deciamles
   let pre= elemento.innerHTML.match(/\$([0-9,]+)/g) //tomo el contenido y extraigo los numeros
   pre = parseFloat(pre[0].replace(/\$|,/g, ''));//le saco el signo $
   pre= (pre/100).toFixed(2);// hago que quede con dos decimales IMPORTANTE TENES QUE AGREGAR ESTO EN USER.JS, justo despues de let precio
   pre = Number(pre)
   arrayprecio.push(pre)
  })
  console.log(arrayprecio)
//cantidad de productos
let renderizardescuentos = precio.forEach((elemento,index)=>{

    function render (){
    if (index < descuentoIndex.length){

        let lugar = descuentoIndex[index].value
        let descuentoFinal = descuento[index].value//extraigo el valor del input (ese input lo pongo solo para traer el valor hasta el counter.js, ya que no supe como hacer)

        cantidad =elementoCantidad[lugar].innerHTML
        subtotal=arrayprecio[lugar]*cantidad

        let precioTotal = subtotal-((subtotal*descuentoFinal)/100)

        precioTotal= precioTotal.toFixed(2);//hago el descuento pre es el precio comun y le resto el descuento, lo del parentesis es un porcenatje comun
        precioFinal[lugar].innerHTML=precioTotal//imprimo el precio
        precioXcantidad[lugar].innerHTML=subtotal

    
}

if(precioFinal[index].innerHTML == ""){
    cantidad =elementoCantidad[index].innerHTML
    subtotal=arrayprecio[index]*cantidad
    precioFinal[index].innerHTML=subtotal
}

}
render()

})

let descuentoFinal = null
document.addEventListener('valorCambiado', (event) => {
    const nuevoValor = event.detail;
    
    let cambiocantudad = precio.forEach((elemento,index)=>{

        let subtotal = null
    if(elementoCantidad[index].innerHTML ==  nuevoValor &&  precioXcantidad[index].innerHTML != ""){
  
        let precioTotal= precioFinal[index].innerHTML
        precioTotal= Number(precioTotal)
        subtotal = precioXcantidad[index].innerHTML
        subtotal = Number(subtotal)
        descuentoFinal = (100 * precioTotal - 100 * subtotal) / -subtotal
       
    
        //subtotal = precioXcantidad[index].innerHTML
        cantidad =elementoCantidad[index].innerHTML
        subtotal=arrayprecio[index]*cantidad
        console.log("subtotal= ",subtotal)
        console.log("descuentofinal= ",descuentoFinal)
        precioTotal = subtotal-((subtotal*descuentoFinal)/100)
        console.log("precioTotal= ",precioTotal)
        precioTotal= precioTotal.toFixed(2);//hago el descuento pre es el precio comun y le resto el descuento, lo del parentesis es un porcenatje comun
        subtotal= subtotal.toFixed(2)
        precioFinal[index].innerHTML=precioTotal//imprimo el precio
        precioXcantidad[index].innerHTML=subtotal
    
    }else if(elementoCantidad[index].innerHTML ==  nuevoValor &&  precioXcantidad[index].innerHTML == ""){
        cantidad =elementoCantidad[index].innerHTML
        subtotal=arrayprecio[index]*cantidad
        subtotal= subtotal.toFixed(2)
        precioFinal[index].innerHTML=subtotal
    }
})
    console.log('El valor ha cambiado:', nuevoValor);})

})