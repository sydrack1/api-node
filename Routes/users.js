const express = require('express')
const router = express.Router()
const Users = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// FUNÇÕES AUXILIARES
const createUserToken = userId => jwt.sign(
    {
    id: userId
    },
   'Vocêpodeentrar',
   {
       expiresIn: '7d'
   } 
)

router.get('/', async (req, res)=> {
    try{
        const users = await Users.find({})
        return res.send(users)
    }catch(err){
         return res.sattus(500).send({error:'Erro na consulta de usuários'})
    }
})
router.post('/create',async (req, res)=>{
    const {email, password} = req.body
    if(!email || !password) return res.status(400).send({error: 'Dados insuficientes! '})

    try{
        if(await Users.findOne({email})) return res.status(400).send({error: 'Usuário já cadastrado'})

        const user = await Users.create(req.body)
        user.password = undefined
         return res.status(201).send({user, token: createUserToken(user.id)})
    }catch(err){
        return res.status(500).send({error: 'Erro na busca de usuário!'})
    }
})
router.post('/auth', async (req,res)=>{
    const {email, password} = req.body
    if(!email || !password) return res.status(400).send({error: 'Dados insuficientes'})
    try{
        const user = await Users.findOne({email}).select('+password')
        if(!user) res.status(400).send({error:'Usuário não cadastrado'})

        const password_ok = await bcrypt.compare(password, user.password)
        if(!password_ok)  return res.status(401).send({error: 'Erro ao autênticar usuário'+err})
        user.password = undefined

        return res.send({user, token: createUserToken(user.id)})
    }catch(err){
        return res.status(500).send({error:'Erro na busca do usuário'})
    }
})

module.exports = router