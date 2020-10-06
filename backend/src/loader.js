/**arquivo de inicialização
 * carregara o mongo e o server ao mesmo tempo;
 * Para que seja feito o carregamento das rotas
 * com a instancia do servidor ja criado foi definido a variavel server
 * e passado como parametro para as rotas
 * o arquivo das rotas esta tratando o parametro
 */
const server = require("./config/server")
require('./config/database')
require('./config/routes')(server)