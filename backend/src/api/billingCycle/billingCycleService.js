const BillingCycle = require("./billingCycle");
const errorHandler = require("../common/errorHandler");

const insert = async (req, res) => {
  // #swagger.tags = ['BillingCycle']
  // #swagger.description = 'Endpoint para inserir novos pagamentos.'
  const data = new BillingCycle({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    billingCycle: {
      name: req.body.billingCycle.name,
      month: req.body.billingCycle.month,
      year: req.body.billingCycle.year,
      credits: {
        name: req.body.billingCycle.credits.name,
        value: req.body.billingCycle.credits.value,
      },
      debts: {
        name: req.body.billingCycle.debts.name,
        value: req.body.billingCycle.debts.value,
        status: req.body.billingCycle.debts.status,
      },
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
  const id = req.body.id;
  try {
    const item = await BillingCycle.findById(id);
    return res.json(item.billingCycle);
  } catch (error) {
    return res.status(500).json({ errors: error.message });
  }
};

const count = async (req, res) => {
  // #swagger.tags = ['BillingCycle']
  // #swagger.description = 'Endpoint para informar quantos pagamentos existem'
  try {
    const id = req.body.id;
    const item = await BillingCycle.findById(id);
    // const item = await BillingCycle.count();
    return res.json(item.billingCycle.length);
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

module.exports = { count, summary, get, insert, remove, update };
