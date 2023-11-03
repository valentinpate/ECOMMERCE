let comprar = document.querySelectorAll(".buy-btn")
let cantidad = document.getElementById("cantidadOfertasCarrito")
let enviar = document.getElementById("post")

let arrayId=[]
let buclePrincipal=[...comprar].forEach((elemento)=>{

    //console.log(elemento)
    elemento.addEventListener('click', (e)=>{
        e.preventDefault()

      if(elemento.style.backgroundColor == "orange"){
        elemento.style.backgroundColor ="blue"
        arrayId = arrayId.filter(function(item) {
          return item !== e.target.id;
        });
        cantidad.innerHTML="("+arrayId.length+")"
        console.log(arrayId)
       }else{
        elemento.style.backgroundColor ="orange"
        arrayId.push(e.target.id)
        cantidad.innerHTML="("+arrayId.length+")"

       }

    })
});
enviar.addEventListener("click",async(e)=>{
  e.preventDefault()
let cantidad=1
       const fer= await fetch("/carrito",{
           method:"POST",
           body:JSON.stringify({arrayId,cantidad}),
           headers:{"Content-Type":"application/json"}
       })
       if(fer.ok){
           window.location.reload();}
           else{console.log("no funciono")}
})