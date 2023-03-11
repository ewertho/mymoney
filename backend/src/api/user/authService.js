/**importações importantes */
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const billingCycle = require("../billingCycle/billingCycle");
// const env = require("../../.env");
require("dotenv").config();

//expressões regulares para validação de email e senha
const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%_-]).{6,20})/;

/**metodo para tratar erros com o banco de dados com ajuda do lodash
 * todas as mensagens serão amontoadas num array e retornas com
 * erro 400, erro interno
 * e informando os erros
 */
const sendErrorsFromDB = (res, dbErrors) => {
  const errors = [];
  _.forIn(dbErrors.errors, (error) => errors.push(error.message));

  return res.status(400).json({ errors });
};

/**pegar o login do usuario
 * requisições serão pegas pelo body e adicionada a variaveis de controle
 * sera feita uma pesquisa somente pelo email primeiramente,
 */
const login = async (req, res, next) => {
  const email = req.body.email || "";
  const password = req.body.password || "";
  // #swagger.tags = ['User']
  //pesquisar unico email, associando email a user, juntamente ao erro que pode vim junto
  try {
    const user = await billingCycle.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      /**se não houver erros é visto a senha
       * se houver email na base e senha associada ao email for iqual ao hash passado(senha),
       * é feito um token com validade de 1 dia
       */
      const token = jwt.sign({ ...user }, process.env.AUTHSECRET, {
        expiresIn: "1 day",
      });
      const { name, email } = user;
      //ideal é não passar o token e senha em produção
      res.json({ name, email, token });
    } else {
      return res.status(400).send({ errors: ["Usuário/Senha inválidos"] });
    }
  } catch (error) {
    return res.status(500).send({ errors: error });
  }
};

//validar token
const validateToken = (req, res, next) => {
  // #swagger.tags = ['User']
  const token = req.body.token || "";

  jwt.verify(token, process.env.AUTHSECRET, function (err, decoded) {
    return res.status(200).send({ valid: !err });
  });
};

/**codigo de validações para cadastro
 * validações sempre seram feitas pela logica de negativo manda notificação
 * positivo passa para a proxima validação
 */
const signup = async (req, res, next) => {
  // #swagger.tags = ['User']
  const name = req.body.name || "";
  const email = req.body.email || "";
  const password = req.body.password || "";
  const confirmPassword = req.body.confirm_password || "";
  /* #swagger.parameters['newUser'] = {
    in: 'body',
    description: 'Informações do usuário.',
    required: true,
    schema: { $ref: "#/definitions/AddUser" }
  } */

  //ve se email esta dentro das normas estabelecidas pela expressão regular
  if (!email.match(emailRegex)) {
    return res
      .status(400)
      .send({ errors: ["O e-mail informado está inválido"] });
  }

  //ve se senha esta dentro das normas estabelecidas pela expressão regular
  if (!password.match(passwordRegex)) {
    return res.status(400).send({
      errors: [
        "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-20.",
      ],
    });
  }

  //cria saltos para encripitar a senha
  const salt = bcrypt.genSaltSync();
  const passwordHash = bcrypt.hashSync(password, salt);

  //ve se a senha e o campo confirme senha são realmente identicos
  if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
    return res.status(400).send({ errors: ["Senhas não conferem."] });
  }

  /**verifica se ja tem email cadastrado no sistema
   * sempre verificando possiveis erros no banco
   */
  try {
    const user = await billingCycle.findOne({ email });

    if (user) {
      return res.status(400).send({ errors: ["Usuário já cadastrado."] });
    } else {
      //cadastro de novo usuario, passando sempre a senha encryptada
      const newUser = new billingCycle({ name, email, password: passwordHash });
      const save_user = await newUser.save();

      if (save_user) {
        login(req, res, next);
      } else {
        return sendErrorsFromDB(res, err);
      }
    }
  } catch (error) {
    return sendErrorsFromDB(res, err);
  }
};

module.exports = { login, signup, validateToken };
