const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const url = 'mongodb+srv://admin:adminmaluco123@primeiraapi-4apoj.mongodb.net/test?retryWrites=true&w=majority'
const options = { 
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 5,
    useNewUrlParser: true 
}

mongoose.connect(url, options)
mongoose.set('useCreateIndex', true)
mongoose.connection.on('error', err => console.log(`Erro ao conectar no banco de dados ${err}`))
mongoose.connection.on('disconnected', ()=>console.log('Aplicação desconectada do banco de dados'))
mongoose.connection.on('connected', ()=> console.log('Aplicação conectada com o banco de dados'))


// BODY PARSER

app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json())

const indexRoute = require('./Routes/index')
const usersRoute = require('./Routes/users')

app.use('/', indexRoute) 
app.use('/users', usersRoute)

app.listen(3000)

module.exports = app