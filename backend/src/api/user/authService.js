/**importações importantes */
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./user')
const env = require('../../.env')

//expressões regulares para validação de email e senha
const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{6,20})/

/**metodo para tratar erros com o banco de dados com ajuda do lodash
 * todas as mensagens serão amontoadas num array e retornas com
 * erro 400, erro interno
 * e informando os erros
*/
const sendErrorsFromDB = (res, dbErrors) => {

    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))

    return res.status(400).json({errors})
}

/**pegar o login do usuario 
 * requisições serão pegas pelo body e adicionada a variaveis de controle
 * sera feita uma pesquisa somente pelo email primeiramente,
*/
const login = (req, res, next) => {

    const email = req.body.email || ''
    const password = req.body.password || ''

    //pesquisar unico email, associando email a user, juntamente ao erro que pode vim junto
    User.findOne({email}, (err, user) => {

        if(err) {
            return sendErrorsFromDB(res, err)

        } else if (user && bcrypt.compareSync(password, user.password)) {
            /**se não houver erros é visto a senha
             * se houver email na base e senha associada ao email for iqual ao hash passado(senha),
             * é feito um token com validade de 1 dia
             */
            const token = jwt.sign({...user}, env.authSecret, {
                expiresIn: "1 day"
            })
            const { name, email } = user
            //ideal é não passar o token e senha em produção
            res.json({ name, email, token })
        } else {
            return res.status(400).send({errors: ['Usuário/Senha inválidos']})
        }
    })
}

//validar token
const validateToken = (req, res, next) => {

    const token = req.body.token || ''

    jwt.verify(token, env.authSecret, function(err, decoded) {
        return res.status(200).send({valid: !err})
    })
}

/**codigo de validações para cadastro
 * validações sempre seram feitas pela logica de negativo manda notificação
 * positivo passa para a proxima validação
 */
const signup = (req, res, next) => {

    const name = req.body.name || ''
    const email = req.body.email || ''
    const password = req.body.password || ''
    const confirmPassword = req.body.confirm_password || ''
    
    //ve se email esta dentro das normas estabelecidas pela expressão regular
    if(!email.match(emailRegex)) {
      return res.status(400).send({errors: ['O e-mail informa está inválido']})
    }

    //ve se senha esta dentro das normas estabelecidas pela expressão regular
    if(!password.match(passwordRegex)) {
      return res.status(400).send({errors: [
        "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(!@#$%) e tamanho entre 6-20."
      ]})
    }

    //cria saltos para encripitar a senha
    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)
    
    //ve se a senha e o campo confirme senha são realmente identicos
    if(!bcrypt.compareSync(confirmPassword, passwordHash)) {
      return res.status(400).send({errors: ['Senhas não conferem.']})
    }
    
    /**verifica se ja tem email cadastrado no sistema
     * sempre verificando possiveis erros no banco
     */
    User.findOne({email}, (err, user) => {

        if(err) {
            return sendErrorsFromDB(res, err)
        } else if (user) {
            return res.status(400).send({errors: ['Usuário já cadastrado.']})
        } else {
            //cadastro de novo usuario, passando sempre a senha encryptada
            const newUser = new User({ name, email, password: passwordHash })
            newUser.save(err => {
                //novamente verifica se tem erros no banco
                if(err) {
                    return sendErrorsFromDB(res, err)
                } else {
                    /**caso cadastrado 
                     * passa pelo login ja levando os dados recem cadastrados
                     * e automaticamente vai para a aplicação principal
                     */
                    login(req, res, next)
                }
            })
        }
    })
}

module.exports = { login, signup, validateToken }