/**arquivo de rotas da aplicação */

const express  =  require('express')
const auth = require('./auth')

//recebendo como parametro o server criado em server.js
module.exports = function(server){

    /**todas as rotas que presizarem do servidor passaram por "/api"
    * definir URL base para todas as rotas 
    * Rotas protegidas por Token JWT
    */
    const protectedApi = express.Router()
    server.use('/api', protectedApi)
    protectedApi.use(auth)

    //rotas do ciclo de pagamento
    const BillingCycle = require('../api/billingCycle/billingCycleService')
    BillingCycle.register(protectedApi, '/billingCycles')

    /*
    * Rotas abertas
    */
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')
    
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)

}