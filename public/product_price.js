let price = document.querySelector(".price")
let contador = document.querySelector(".counterNumber")
let menosBTN = document.querySelector(".minusButton")
let masBTN = document.querySelector(".plusButton")
let totalProd = document.querySelector(".total_")
let descuentoInp = document.getElementById("descuentoinp")

let regex = /\$([\d,.]+)/;

function regexPrecio(){
    let match = price.innerHTML.match(regex)
    let regexPrecio = match[0].replace(".","")
    console.log("Regex Antes:", regexPrecio)
    regexPrecio = Number(parseFloat(regexPrecio.replace("$", '')))
    console.log("Regex Desp:",regexPrecio)
    if(descuentoInp != undefined){
        let descuento = regexPrecio*Number(descuentoInp.value)/100
        let regexDescontado = regexPrecio-descuento
        return {og:regexPrecio, desc:regexDescontado}
    }else{
        return regexPrecio
    }
}

if(regexPrecio().desc){
    let span = document.createElement("span")
    span.innerHTML = "$" + regexPrecio().og
    price.innerHTML = span.outerHTML + "$" + regexPrecio().desc.toFixed(2)
    totalProd.innerHTML = "$" + regexPrecio().desc.toFixed(2)
}else{
    totalProd.innerHTML = "$" + regexPrecio().toFixed(2)
}

//innerHTML toma los valores anteriores al click
menosBTN.addEventListener("click",()=>{
    let precioOriginal = regexPrecio()
    let contadorOriginal = Number(contador.innerHTML)-1
    if(regexPrecio().desc){
        let precioConDescuento = regexPrecio().desc
        let resultado = precioConDescuento*contadorOriginal
        totalProd.innerHTML = "$"+resultado.toFixed(2)
    }else{
        let resultado = precioOriginal*contadorOriginal
        totalProd.innerHTML = "$"+resultado.toFixed(2)
    }
})

masBTN.addEventListener("click",()=>{
    let precioOriginal = regexPrecio()
    let contadorOriginal = Number(contador.innerHTML)+1
    if(regexPrecio().desc){
        let precioConDescuento = regexPrecio().desc
        let resultado = precioConDescuento*contadorOriginal
        totalProd.innerHTML = "$"+resultado.toFixed(2)
    }else{
        let resultado = precioOriginal*contadorOriginal
        totalProd.innerHTML = "$"+resultado.toFixed(2)
    }
})