// Capturar los valores
const form=document.querySelector("form")
form.addEventListener("click",async (e)=>{
    e.preventDefault()
    // obtener los valores
    const email=form.email.value
    const name=form.name.value
    const user=form.user.value
    const password=form.password.value
    const phone=form.phone.value
    const region=form.region.value


    try{
        // Obtenemos la informacion de la direccion signup, convertimos los datos en json y añadimos un encabezado
        const fer= await fetch("/signup",{
            method:"POST",
            body:JSON.stringify({email,name,user,password,phone,region}),
            headers:{"Content-Type":"application/json"}
        })
        if(fer.ok){
            window.location.href="http://localhost:4000/signin"
        } else {
            console.log("no funciono")
        }
    }
    catch(error){
        console.log(error)
    }


})