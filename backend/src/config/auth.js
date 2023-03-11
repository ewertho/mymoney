const jwt = require("jsonwebtoken");
//const env = require("../../.env");
require("dotenv").config();

const security = (req, res, next) => {
  /**verifica se a requisição é somente para ver se cors ta habilitado
   * nesses casos não é feita nenhuma validação
   * essa validação é feita somente no formato options
   */
  if (req.method === "OPTIONS") {
    next();
  } else {
    //verifica onde ta o token, se na body(put, post) ou na request(get, delete)
    const token =
      req.body.token || req.query.token || req.headers["authorization"];
    //se não houver token
    if (!token) {
      return res.status(403).send({ errors: ["No token provided."] });
    }

    jwt.verify(token, process.env.AUTHSECRET, function (err, decoded) {
      if (err) {
        //se token não bater com token que a aplicação disponibilizou dentro do periodo
        return res.status(403).send({
          errors: ["Failed to authenticate token."],
        });
      } else {
        //adiciona na request (não é necessario) e passa pra proxima
        //req.decoded = decoded
        next();
      }
    });
  }
};

module.exports = security;
