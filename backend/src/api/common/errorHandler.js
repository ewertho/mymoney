/**configurando os erros para melhor servir a aplicação */

const _ = require('lodash')

/**vai retornar um middleware
 * pega a mensagem que vem por padrão e 
 * extrai somente as mensagens de erro
 */
module.exports = (req, res, next)=>{
    
    const bundle = res.locals.bundle

    if(bundle.errors){
        const errors = parseErrors(bundle.errors)
        res.status(500).json({errors})
    }else{
        next()
    }
}

const parseErrors = (nodeRestfulErros)=>{
    const errors = []
    _.forIn(nodeRestfulErros,error => errors.push(error.message))
    return errors
}