/**criando e configurando um ODM
 * ele que sera responsavel por define todos os
 * requisitos dos documentos persistidos no banco
 */

const mongoose = require("mongoose");

const creditSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: {
    type: Number,
    min: 0,
    required: [true, "Informe o valor do credito"],
  },
});

const debtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: {
    type: Number,
    min: 0,
    required: [true, "Informe o valor do debito"],
  },
  status: {
    type: String,
    required: false,
    uppercase: true,
    enum: ["PAGO", "PENDENTE", "AGENDADO"],
  },
});

const billingCycleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  month: { type: Number, min: 1, max: 12, required: true },
  year: { type: Number, min: 1970, max: 2100, required: true },
  credits: [creditSchema],
  debts: [debtSchema],
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, min: 6, max: 12, required: true },
  billingCycle: [billingCycleSchema],
});

//modelo se chamara BillingCycle, apontando para essa configuração
module.exports = mongoose.model("BillingCycle", userSchema);
