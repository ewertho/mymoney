/**configuração basica do servidor*/

//backend 3003 - frontend 8080


const bodyParser = require("body-parser")
const express  = require("express")
const server = express()
const allowCors = require('./cors')
const queryParser = require('express-query-int')

//midleware para as requisições
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())

server.listen(process.env.PORT || 3000, function(){
    console.log(`BACKEND is running`)
})

//variavel sendo exportada para arquivo de rotas a partir do loader
module.exports = server