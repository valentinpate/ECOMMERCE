let link = document.querySelectorAll(".link")
let eliminarCompra = document.querySelector(".eliminarCompra")
let cerrar = document.querySelector(".cerrar")
console.log(link)
console.log(eliminarCompra)
console.log(cerrar)
document.addEventListener("DOMContentLoaded", function() {
    let buclePrincipal = [...link].forEach((elemento)=>{

    elemento.addEventListener('click', function(e) {
        e.preventDefault(); 
        // console.log(e.target)
        let id=e.target.id;
        // console.log("este es el id=",id)
        const url = new URL(window.location.href); //copiamos la url

        const querys = url.searchParams.get('detalles');//tomo el valor de la query
        console.log(url.searchParams.size)
        console.log(querys)
        url.searchParams.set('detalles', querys == 'true'? false : true); // Cambiar el valor del parámetro 'detalles' 
        url.searchParams.set('id', id); 
        elemento.href = url;// actualizar el enlace
        window.location.href= url;//redirigir
    });
 })
})