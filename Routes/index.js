const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>res.send({message:'Tudo ok com o método GET da raiz'}))
router.post('/', (req, res)=>res.send({message:'Tudo ok com o método POST da raiz'}))

module.exports = router