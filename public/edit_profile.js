let btnNombre = document.querySelector(".edit-name")
let btnUsuario = document.querySelector(".edit-user")
let btnTelefono = document.querySelector(".edit-phone")
let inputNombre = document.getElementById("name-input")
let inputUsuario = document.getElementById("user-input")
let inputTelefono = document.getElementById("phone-input")

btnNombre.addEventListener("click",()=>{
    inputNombre.removeAttribute("disabled")
})

btnUsuario.addEventListener("click",()=>{
    inputUsuario.removeAttribute("disabled")
})

btnTelefono.addEventListener("click",()=>{
    inputTelefono.removeAttribute("disabled")
})