let link = document.querySelectorAll(".link")
let cerrar = document.querySelector(".cerrar")
let containerPedidos = document.querySelectorAll(".container-detalles-pedidos")
let muestraDetalles = document.querySelector(".muestra-detalles-del-pedido")
let orden = document.querySelectorAll(".orden")
let aceptoEliminar = document.querySelector(".aceptoEliminar")

const url = new URL(window.location.href)

document.addEventListener("DOMContentLoaded", function() {
    let buclePrincipal = [...link].forEach((elemento)=>{

        elemento.addEventListener('click', function(e) {
            e.preventDefault(); 
            // console.log(e.target)
            let id=e.target.id;
            // console.log("este es el id=",id)
            //const url = new URL(window.location.href); //copiamos la url

            const querys = url.searchParams.get('detalles');//tomo el valor de la query
            console.log(url.searchParams.size)
            console.log(querys)
            url.searchParams.set('detalles', querys == 'true'? false : true); // Cambiar el valor del parámetro 'detalles' 
            url.searchParams.set('id', id); 
            elemento.href = url;// actualizar el enlace
            window.location.href= url;//redirigir
        });
    })

    cerrar.addEventListener("click",()=>{
        let urlValue = window.location.href
        const cerrar = urlValue.slice(0,-42)
        window.location.href = cerrar
    })
    
    aceptoEliminar.addEventListener("click",async()=>{
        let arrayID = Array.from(orden)
        let urlID = url.searchParams.get("id")
        let index = arrayID.findIndex(element => element.innerHTML===urlID)
        let id = arrayID[index].innerHTML
        if(index != -1){
            try{
                const enviarRespuesta = await fetch(`/eliminar-compra/${id}`,{
                    method:"DELETE"
                })
                if(enviarRespuesta.ok){
                    console.log("se mandó")
                    containerPedidos[index].style.display="none"
                    muestraDetalles.style.display="none"
                    aceptoEliminar.toggleAttribute("disabled")
                }
            }catch(err){
                console.log(err)
            }
        }
    })
    

})