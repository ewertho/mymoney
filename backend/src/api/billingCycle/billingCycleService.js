/**criação da API REST  em cima do modelo ja criado*/

const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')

//metodos que seram aceitos pela API
BillingCycle.methods(['get','post','put','delete'])

/**comando para o metodo put não burlar as validações do banco
 * "new: true" - sempre ira trazer o objeto ja atualizado, por padrão traz o antigo
 * "runValidators: true" - sempre ira fazer validações de todo o schema antes de atualizar
 */
BillingCycle.updateOptions({new: true, runValidators: true})

//aplicação de tratamento da mensagem de erro apos o post e put com midleware erroHandler
BillingCycle.after('post', errorHandler).after('put', errorHandler)

/**codigo feito pois a versão do node-restful apresenta problemas
 * sugerido pela equipe do curso:
 * um codigo onde o mongoose ira procurar todos os registros
 * caso não encontre erro ira retornar todos os documentos
 * caso tenha ira retornar mensagem de erro proveniente do banco
 */

BillingCycle.route('get', (req, res, next)=>{
    BillingCycle.find({}, (err, docs)=>{
        if(!err){
            res.json(docs)
        }else{
            res.status(500).json({errors: [error]})
        }
    })
})

//serviços da aplicação

//rota para contagem de elementos no banco
BillingCycle.route('count', (req, res, next)=>{
    BillingCycle.count((error, value)=>{
        if(error){
            res.status(500).json({errors: [error]})
        }else{
            res.json({value})
        }
    })
})

/**sumario de pagamentos
 * comandos: project e group vem do mongodb
 * project: projeção de determinados atriutos
 * group: agrupamento de valores
 */
BillingCycle.route('summary', (req, res, next)=>{
    BillingCycle.aggregate([{
        //agregação e projeção de somente os valores de credito e debitos
        $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}}
    },{
        $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
    },{
        $project: {_id: 0, credit: 1, debt: 1}
    }],(error, result)=>{
        if(error){
            res.status(500).json({errors: [error]})
        }else{
            res.json(result[0] || {credit: 0, debt: 0})
        }
    })
})

module.exports  = BillingCycle