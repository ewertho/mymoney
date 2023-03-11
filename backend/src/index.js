const database = require("./config/database");
require("dotenv").config();

const express = require("express");
const app = express();

const swaggerUi = require("swagger-ui-express");

const swaggerFile = require("../swagger_output.json");

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const routes = require("./routes");

const port = process.env.PORT || 3000;
app.use(express.json());

// app.use("/oapi", routes.openApi);
// app.use("/api", routes.protectedApi);
app.use("/api", routes);

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use(express.json());
app.listen(port, () => {
  console.log(`Backend is running on port: ${port}`);
});
