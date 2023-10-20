const passport = require ("passport")
const passportLocal = require ("passport-local").Strategy
const bcrypt=require("bcrypt")
const User=require("../models/User")

module.exports.estrategia = async (passport)=>{
   await passport.use(new passportLocal(
  async function(username, password, done) {
            const usuario = await User.findOne({user:username})
            const match = await bcrypt.compare(password,usuario.password) //compara contraseña ingresada en el signin con contraseña de la base de datos   
            if(usuario.user === username && match){      
            return done(null,usuario)
                    }else{  
                    done(null,false)
            }
    }
  ))

await passport.serializeUser((usario,done)=>{
    done(null,usario.id)
})

await passport.deserializeUser(async (id, done) => {
   const usuario = await User.findById(id)
      done(null, usuario);
  });
}
