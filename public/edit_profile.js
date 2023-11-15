let btnNombre = document.querySelector(".edit-name")
let btnUsuario = document.querySelector(".edit-user")
let btnTelefono = document.querySelector(".edit-phone")
let inputNombre = document.getElementById("name-input")
let inputUsuario = document.getElementById("user-input")
let inputTelefono = document.getElementById("phone-input")
let guardar = document.getElementById("guardar")

btnNombre.addEventListener("click",()=>{
    guardar.removeAttribute("disabled")
    inputNombre.removeAttribute("disabled")
})

btnUsuario.addEventListener("click",()=>{
    guardar.removeAttribute("disabled")
    inputUsuario.removeAttribute("disabled")
})

btnTelefono.addEventListener("click",()=>{
    guardar.removeAttribute("disabled")
    inputTelefono.removeAttribute("disabled")
})