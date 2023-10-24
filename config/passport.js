const passport = require ("passport")
const passportLocal = require ("passport-local").Strategy
const bcrypt=require("bcrypt")
const User=require("../models/User")

module.exports.estrategia = async (passport)=>{
    await passport.use(new passportLocal(
    async function(username, password, done) { //parámetros del login, los names de los inputs de signin.ejs. Tienen que coincidir los names y los parámetros si o si.
        console.log("llego passport")
        const busqueda = await User.findOne({user:username}) //busca nombre de usuario en la base (user) y lo compara con el parámetro de nombre que viene del login (username)
        const match = await bcrypt.compare(password,busqueda.password) //compara contraseña ingresada en el signin con contraseña de la base de datos
        if(busqueda.user === username && match){ //si user === username y match es true
            return done(null,{id:busqueda._id, name:busqueda.user})
        } else {
            done(null,false)
        }
    }
    ))
    await passport.serializeUser((user,done)=>{ //user - > acá entra como parámetro el objeto renderizado en el retorno de la estrategia {id:busqueda._id, name:busqueda.user}. El usuario ES el objeto ENTERO.
        done(null,user.id) //se hace el done con la propiedad id del objeto user.
    })
    await passport.deserializeUser(async (id, done) => { //en el parámetro "id" entra el id del done de serializeUser
        const user = await User.findById(id) //busca el id del usuario de la base teniendo en cuenta el id del serializado
        done(null, user); //devuelve user -> el objeto del usuario que se retorna en la estrategia. Se devuelven los datos serializados del usuario.
    });
}