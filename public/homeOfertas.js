let comprar = document.querySelectorAll(".buy-btn")
let cantidad = document.getElementById("cantidadOfertasCarrito")
let enviar = document.getElementById("post")

let arrayId=[]
let buclePrincipal=[...comprar].forEach((elemento)=>{

    //console.log(elemento)
    elemento.addEventListener('click', (e)=>{
        e.preventDefault()

      if(elemento.style.backgroundColor == "rgb(251, 120, 33)"){
        elemento.style.backgroundColor ="transparent"
        elemento.style.color="#FB7821"
        arrayId = arrayId.filter(function(item) {
          return item !== e.target.id;
        });
        cantidad.innerHTML="("+arrayId.length+")"
        //console.log(arrayId)
       }else{
        elemento.style.backgroundColor ="#FB7821"
        elemento.style.color="white"
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