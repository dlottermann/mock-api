const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT
const dbname = process.env.DBNAME
const userdb = process.env.USERDB
const passwd = process.env.PASSWD



const uri = `mongodb+srv://${userdb}:${passwd}@supermarketapp.gyn7i.mongodb.net/${dbname}?retryWrites=true&w=majority`;


mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});



app.get('/', function(req, res) {
    res.send('Olá Mundo connectado!');
  });
  
  app.listen(port, function() {
    console.log('App de Exemplo escutando na porta :'+port);
  });