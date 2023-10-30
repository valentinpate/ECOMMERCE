
 let link = document.querySelectorAll(".link")
 console.log(link)
 let buclePrincipal = [...link].forEach((elemento,index)=>{

 elemento.addEventListener('click', function(e) {
     e.preventDefault(); 

     const url = new URL(window.location.href); //copiamos la url
   
    const querys = url.searchParams.get('detalles');//tomo el valor de la query
       
     url.searchParams.set('detalles', querys == 'true'? false : true); // Cambiar el valor del parámetro 'detalles' 
     elemento.href = url;// actualizar el enlace
     window.location.href= url;//redirigir
  
   });

 })