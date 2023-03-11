/**criação da API REST  em cima do modelo ja criado*/

const BillingCycle = require("./billingCycle");
const errorHandler = require("../common/errorHandler");

//metodos que seram aceitos pela API
// BillingCycle.methods(["get", "post", "put", "delete"]);

/**comando para o metodo put não burlar as validações do banco
 * "new: true" - sempre ira trazer o objeto ja atualizado, por padrão traz o antigo
 * "runValidators: true" - sempre ira fazer validações de todo o schema antes de atualizar
 */
// BillingCycle.updateOptions({ new: true, runValidators: true });

//aplicação de tratamento da mensagem de erro apos o post e put com midleware erroHandler
// BillingCycle.after("post", errorHandler).after("put", errorHandler);

/**codigo feito pois a versão do node-restful apresenta problemas
 * sugerido pela equipe do curso:
 * um codigo onde o mongoose ira procurar todos os registros
 * caso não encontre erro ira retornar todos os documentos
 * caso tenha ira retornar mensagem de erro proveniente do banco
 */

const insert = async (req, res) => {
  // #swagger.tags = ['BillingCycle']
  // #swagger.description = 'Endpoint para inserir novos pagamentos.'
  const data = new BillingCycle({
    name: req.body.name,
    month: req.body.month,
    year: req.body.year,
    credits: {
      name: req.body.credits.name,
      value: req.body.credits.value,
    },
    debts: {
      name: req.body.debts.name,
      value: req.body.debts.value,
      status: req.body.debts.status,
    },
  });

  try {
    const dataToSave = await data.save();
    /* #swagger.responses[201] = { 
      schema: { $ref: "#/definitions/BillingCycle" },
               description: 'Cadastro efetuado.' 
        } */
    return res.status(201).json(dataToSave);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const get = async (req, res) => {
  // #swagger.tags = ['BillingCycle']
  // #swagger.description = 'Endpoint para recuperar todos os pagamentos do usuário'
  try {
    const item = await BillingCycle.find();
    return res.json(item);
  } catch (error) {
    return res.status(500).json({ errors: error.message });
  }
};

const count = async (req, res) => {
  // #swagger.tags = ['BillingCycle']
  // #swagger.description = 'Endpoint para informar quantos pagamentos existem'
  try {
    const item = await BillingCycle.count();
    return res.json({ item });
  } catch (error) {
    return res.status(500).json({ errors: error.message });
  }
};

const summary = async (req, res) => {
  // #swagger.tags = ['BillingCycle']
  // #swagger.description = 'Endpoint para informar o credito e debito total do usuário'
  try {
    const item = await BillingCycle.aggregate([
      {
        //agregação e projeção de somente os valores de credito e debitos
        $project: {
          credit: { $sum: "$credits.value" },
          debt: { $sum: "$debts.value" },
        },
      },
      {
        $group: {
          _id: null,
          credit: { $sum: "$credit" },
          debt: { $sum: "$debt" },
        },
      },
      {
        $project: { _id: 0, credit: 1, debt: 1 },
      },
    ]).exec();

    return res.json(item[0] || { credit: 0, debt: 0 });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

const remove = async (req, res) => {
  // #swagger.tags = ['BillingCycle']
  // #swagger.description = 'Endpoint para remover pagamentos.'
  try {
    // #swagger.parameters['id'] = { description: 'ID do pagamento.' }
    const id = req.params.id;
    const data = await BillingCycle.findByIdAndDelete(id);
    res.status(200).send(`Document: ${data.name} has been deleted`);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

const update = async (req, res) => {
  // #swagger.tags = ['BillingCycle']
  // #swagger.description = 'Endpoint para atualizar pagamentos.'
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await BillingCycle.findByIdAndUpdate(
      id,
      updatedData,
      options
    );

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// BillingCycle.route("get", (req, res, next) => {
//   BillingCycle.find({}, (err, docs) => {
//     if (!err) {
//       res.json(docs);
//     } else {
//       res.status(500).json({ errors: [error] });
//     }
//   });
// });

// //serviços da aplicação

// //rota para contagem de elementos no banco
// BillingCycle.route("count", (req, res, next) => {
//   BillingCycle.count((error, value) => {
//     if (error) {
//       res.status(500).json({ errors: [error] });
//     } else {
//       res.json({ value });
//     }
//   });
// });

// /**sumario de pagamentos
//  * comandos: project e group vem do mongodb
//  * project: projeção de determinados atriutos
//  * group: agrupamento de valores
//  */
// BillingCycle.route("summary", (req, res, next) => {
//   BillingCycle.aggregate([
//     {
//       //agregação e projeção de somente os valores de credito e debitos
//       $project: {
//         credit: { $sum: "$credits.value" },
//         debt: { $sum: "$debts.value" },
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         credit: { $sum: "$credit" },
//         debt: { $sum: "$debt" },
//       },
//     },
//     {
//       $project: { _id: 0, credit: 1, debt: 1 },
//     },
//   ]).exec((error, result) => {
//     if (error) {
//       res.status(500).json({ errors: [error] });
//     } else {
//       res.json(result[0] || { credit: 0, debt: 0 });
//     }
//   });
// });

module.exports = { count, summary, get, insert, remove, update };
