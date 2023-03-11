/**arquivo de rotas da aplicação */

const express = require("express");
const route = express.Router();
const auth = require("./config/auth");
const AuthService = require("./api/user/authService");
const BillingCycle = require("./api/billingCycle/billingCycleService");

//recebendo como parametro o server criado em server.js

/**todas as rotas que presizarem do servidor passaram por "/api"
 * definir URL base para todas as rotas
 * Rotas protegidas por Token JWT
 */

// protectedApi.use(auth);

//rotas do ciclo de pagamento

// BillingCycle.register(protectedApi, "/billingCycles");

route.post("/login", AuthService.login);
route.post("/signup", AuthService.signup);
route.post("/validateToken", AuthService.validateToken);

route.use(auth);
route.get("/count", BillingCycle.count);
route.get("/get", BillingCycle.get);
route.delete("/remove/:id", BillingCycle.remove);
route.post("/update/:id", BillingCycle.update);
route.get("/summary", BillingCycle.summary);
route.post("/insert", BillingCycle.insert);
/*
 * Rotas abertas
 */
// const openApi = express.Router();

module.exports = route;
