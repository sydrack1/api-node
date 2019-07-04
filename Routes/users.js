const express = require('express')
const router = express.Router()
const Users = require('../model/user')
const bcrypt = require('bcrypt')

router.get('/', async (req, res)=> {
    try{
        const users = await Users.find({})
        return res.send(users)
    }catch(err){
         return res.send({error:'Erro na consulta de usuários'})
    }
})
router.post('/create',async (req, res)=>{
    const {email, password} = req.body
    if(!email || !password) return res.send({error: 'Dados insuficientes! '})

    try{
        if(await Users.findOne({email})) return res.send({error: 'Usuário já cadastrado'})

        const user = await Users.create(req.body)
        data.password = undefined
         return res.send(data)
    }catch(err){
        return res.send({error: 'Erro na busca de usuário!'})
    }
})
router.post('/auth', async (req,res)=>{
    const {email, password} = req.body
    if(!email || !password) return res.send({error: 'Dados insuficientes'})
    try{
        const user = await Users.findOne({email}).select('+password')
        if(!user) res.send({error:'Usuário não cadastrado'})

        const password_ok = await bcrypt.compare(password, user.password)
        if(!password_ok)  return res.send({error: 'Erro ao autênticar usuário'+err})
        user.password = undefined

        return res.send(user)
    }catch(err){
        return res.send({error:'Erro na busca do usuário'})
    }
})

module.exports = router