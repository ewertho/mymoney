/**configuração do mongodb */

const mongoose = require('mongoose')
//não enviar mensagens de warning
mongoose.Promise = global.Promise

module.exports = mongoose.connect('mongodb://localhost/mymoney', {useNewUrlParser: true})

//mensagens de erro padronizadas para a aplicação
mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatorio"
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite minimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite maximo de '{MAX}'."
mongoose.Error.messages.String.enum = "O '{VALUE}' não é valido para o atributo '{PATH}'."