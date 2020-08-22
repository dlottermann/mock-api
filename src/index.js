const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require('dotenv');
const routes = require('../src/routes')

dotenv.config();
const port = process.env.PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


routes(app)


app.listen(port, function () {
  console.log("App de Exemplo escutando na porta :" + port);
});
