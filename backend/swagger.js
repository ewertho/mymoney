const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routes.js"];

const doc = {
  info: {
    version: "1.0.0",
    title: "Mymoney",
    description: "Api auxiliar para ciclos de pagamentos.",
  },
  host: "localhost:3003",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "BillingCycle",
      description: "",
    },
    {
      name: "User",
      description: "",
    },
  ],
  securityDefinitions: {
    api_key: {
      type: "basic",
      name: "Login e senha",
      in: "header",
    },
  },
  definitions: {
    User: {
      name: "Joao",
      email: "joao@email.com",
    },
    AddUser: {
      $name: "Joao",
      email: "joao@email.com",
      password: "P4ssw@rd",
      confirm_passwword: "P4ssw@ord",
    },
    BillingCycle: {
      name: "PAN",
      month: 3,
      year: 2023,
      credits: {
        name: "pix",
        value: 25,
      },
      debts: {
        name: "cartao",
        value: 45,
        status: "PENDENTE",
      },
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./src/index.js");
});
