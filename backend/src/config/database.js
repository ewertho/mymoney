const mongoose = require("mongoose");
require("dotenv").config();

const mongostring = process.env.DATABASE_URL;
mongoose.connect(mongostring);
const database = mongoose.connection;

module.exports = database;
