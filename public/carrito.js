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
// Variables globales que cambian valor en funciones locales
let arrayprecio=[]
let cantidad=null
let subtotal=null
let sumaTotal = 0
let arrayPromocion= ['martin','valentin','enzo','leonel']
let promocion = null
let totalOperacion= 0
let descuentoFinal = null

//ENVÍO -> Precio del envío. id envio en EJS. De "$2500" pasa a 2500 Number
envio = envio.innerHTML
envio = parseFloat(envio.replace(/\$|,/g, ''));
envio=Number(envio)

//precio por unidad
//Paso 1 -> Saco los valores del QuerySelectorAll del array NodeList precio (let precio) y los paso a un array en donde pueda trabajar.

let precionumber = [...precio].forEach((elemento)=>{// recorro el nodelist, extraigo el contenido y lo convierto en un numero con dos deciamles
   let pre= elemento.innerHTML.match(/\$([0-9,]+)/g) //tomo el contenido y extraigo los numeros
   pre = parseFloat(pre[0].replace(/\$|,/g, ''));//le saco el signo $. pre[0] porque el match devuelve array
   pre= (pre/100).toFixed(2);// hago que quede con dos decimales
   pre = Number(pre)
   arrayprecio.push(pre) //pushear precios sin $ y comas al arrayprecio []
})

//cantidad de productos
precio.forEach((elemento,index)=>{
    function render (){
        if (index < descuentoIndex.length){ // si el index del querySelector de precio (que siempre es 0 porque hay un solo valor con class="precio" en EJS) es menor a descuentoIndex que tiene o uno (precio) o dos valores (precio y descuento)
        //al recorrer el array usando el forEach, el primer index es 0 por cada recorrido el index sube un número. (1,2,3,etc.)
            let lugar = descuentoIndex[index].value //valor de descuentoIndex[parámetro del forEach que viene del forEach de carrito.ejs]. Lugar en donde se encuentra el producto con descuento
            let descuentoFinal = descuento[index].value//extraigo el valor del input (ese input lo pongo solo para traer el valor hasta el counter.js, ya que no supe como hacer)

            cantidad =elementoCantidad[lugar].innerHTML //Busco la cantidad del producto con descuento de lugar entrando al array de elementoCantidad (querySelectorAll) y tomando su valor
            subtotal=arrayprecio[lugar]*cantidad //Selecciono el valor del precio del producto con descuento en arrayprecio y lo multiplico por la cantidads

            let precioTotal = subtotal-((subtotal*descuentoFinal)/100)
            precioTotal= precioTotal.toFixed(2);//hago el descuento pre es el precio comun y le resto el descuento, lo del parentesis es un porcenatje comun
            precioTotal = Number(precioTotal)

            subtotal= subtotal.toFixed(2);

            inputPrecioporcantproducto[lugar].value= subtotal //entro a los arrays querySelectorAll de los inputs, voy al index de lugar y piso los valores por estos
            inputPreciocondesc[lugar].value= precioTotal

            precioFinal[lugar].innerHTML='$'+ precioTotal//imprimo el precio en el HTML del EJS
            precioXcantidad[lugar].innerHTML='$'+subtotal

            sumaTotal=sumaTotal+precioTotal //cambio sumaTotal
        }

        if(precioFinal[index].innerHTML == ""){ //si no hay precio con descuento
            cantidad =elementoCantidad[index].innerHTML

            subtotal=arrayprecio[index]*cantidad
            subtotal= subtotal.toFixed(2);
            subtotal = Number(subtotal)

            inputPreciocondesc[index].value= subtotal

            precioFinal[index].innerHTML='$'+subtotal

            sumaTotal=sumaTotal+subtotal
        }

        totalOperacion=sumaTotal + envio //suma de la suma total de los precios con el envío

        if(index == precio.length-1){ //último forEach 
            totalOperacion = Number(totalOperacion) //convierto totalOperacion a número y lo dejo con dos decimales
            totalOperacion=totalOperacion.toFixed(2)
            sumaTotal = Number(sumaTotal)
            sumaTotal=sumaTotal.toFixed(2)
        }
        //inserto sumaTotal y totalOperacion en el HTML + paso valores a inputPrecio e inputTotal
        precioSumaTotal.innerHTML = '$'+sumaTotal
        inputPrecio.value= sumaTotal
        total.innerHTML = '$'+ totalOperacion 
        inputTotal.value = totalOperacion
    }
render()
})

document.addEventListener('valorCambiado', (event) => { //valorCambiado de counter.js en mostrarContador(). detalle del evento valorCambiado: la cantidad
    const nuevoValor = event.detail; //toma el valor nuevo que se cambia en la cantidad (counterNumber)
    sumaTotal = 0
    subtotal = null
    
    precio.forEach((elemento,index)=>{
        if(precioXcantidad[index].innerHTML != ""){ //precioXcantidad es el querySelectorAll de los precios tachados. Si hay un index que no tenga vacío ("") es que tiene un precio original tachado - > un producto con descuento.
            //La condición de este if es si el producto es uno con descuento.
            inputCantidad[index].value=elementoCantidad[index].innerHTML //El primero toma la cantidad del front y la pone como valor en el inputCantidad

            let precioTotal = precioFinal[index].innerHTML //El segundo toma el precio final que era el precio con descuento del front y lo pasa a precioTotal
            precioTotal = parseFloat(precioTotal.replace(/\$|,/g, '')) //Después le saca los $ y las comas y lo hace Number
            precioTotal= Number(precioTotal)

            subtotal = precioXcantidad[index].innerHTML //Con el subtotal lo mismo pero pasa con precioXCantidad
            subtotal= parseFloat(subtotal.replace(/\$|,/g, ''))
            subtotal = Number(subtotal)

            descuentoFinal = (100 * precioTotal - 100 * subtotal) / -subtotal

            cantidad = elementoCantidad[index].innerHTML //se agarra la cantidad del index en el front
            
            subtotal=arrayprecio[index]*cantidad //se agarra el precio del front en el array de precios y se multiplica por la cantidad

            precioTotal = subtotal-((subtotal*descuentoFinal)/100)
            precioTotal= precioTotal.toFixed(2);//hago el descuento pre es el precio comun y le resto el descuento, lo del parentesis es un porcenatje comun
            precioTotal = Number(precioTotal)

            subtotal = subtotal.toFixed(2)

            inputPrecioporcantproducto[index].value = subtotal //se pasan los valores
            inputPreciocondesc[index].value = precioTotal
            
            precioFinal[index].innerHTML=precioTotal//imprimo el precio en el front
            precioXcantidad[index].innerHTML=subtotal

            sumaTotal=sumaTotal+precioTotal
        
        }else if(precioXcantidad[index].innerHTML == ""){ //CONDICIÓN: Si el producto no tiene descuento
            inputCantidad[index].value = elementoCantidad[index].innerHTML
            cantidad = elementoCantidad[index].innerHTML

            subtotal=arrayprecio[index]*cantidad
            subtotal= subtotal.toFixed(2)
            subtotal = Number(subtotal)

            inputPreciocondesc[index].value= subtotal//back
            precioFinal[index].innerHTML=subtotal

            sumaTotal=sumaTotal+subtotal
        }

        totalOperacion=sumaTotal + envio

        if(index == precio.length-1){//último forEach. solo dos decimales en la cuenta final
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

    buttonPromo.addEventListener('click', (event) => {//para que el div id="promocion" aparezca en el modal del carrito
        event.preventDefault()
        arrayPromocion.forEach(elemento=>{
        if (elemento == inputPromocion.value){ //si el elemento de arrayPromocion es igual a lo que ponemos en el input de código de promoción
            promoRender.style.display = "flex"; //promoRender = id="promocion"
            
            let promoFinal =totalOperacion-((totalOperacion*20)/100) //precio con descuento. le dejo dos decimales y lo paso al HTML
            promoFinal=promoFinal.toFixed(2)
            total.innerHTML= '$'+ promoFinal

            promocion = '20%' //le asigno como valor "20%" a promocion y lo paso al HTML
            descuentoPromo.innerHTML = promocion
            }
        })
        
    })
})
