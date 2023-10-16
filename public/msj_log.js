let error = document.getElementById("error")
let btn = document.getElementById("btn")

function msj_log(e){
    let input = document.querySelectorAll("input")
    input.forEach((el)=>{
        let val = el.value
        console.log(val)
        if(val==""){
            error.innerHTML = "Ingrese todos los datos para poder acceder"
            e.preventDefault()
        }
    })
    return input
}

btn.addEventListener("click",msj_log)

/* 
caso 1: campos vacíos
caso 2: else del if de la base de datos
caso 3: catch

otro botón c/ id y otro id para la etiqueta p de errorText?
*/