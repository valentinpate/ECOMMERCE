let comprar = document.querySelectorAll(".buy-btn")

let buclePrincipal=[...comprar].forEach((elemento)=>{

    elemento.addEventListener('click', (e)=>{
        e.preventDefault()
      let estilos = window.getComputedStyle(elemento);
      console.log(elemento)
    })
})