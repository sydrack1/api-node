const jwt = require('jsonwebtoken')

const auth = (req, res, next)=>{
    const token_header = req.headers.auth

    if(!token_header) return res.send({error: 'Token não enviado'})

    jwt.verify(token_header, 'Vocêpodeentrar', (err,decoded)=>{
        if(err) return res.send({error: 'Token inválido'})
        res.locals.auth_data = decoded 
        return next()
    } )
      //  res.locals.auth_data = decoded 
        

}
module.exports = auth