const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT
const dbname = process.env.DBNAME
const userdb = process.env.USERDB
const passwd = process.env.PASSWD


const authorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    created: { 
      type: Date,
      default: Date.now
  }
})

const Author = mongoose.model('Author', authorSchema);

let author = new Author ({
      _id: new mongoose.Types.ObjectId(), 
      firstName: 'diego',
      lastName: 'lottermann'
});


const uri = `mongodb+srv://${userdb}:${passwd}@supermarketapp.gyn7i.mongodb.net/${dbname}?retryWrites=true&w=majority`;


mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function(err) {
  if (err) throw err;
  console.log("MongoDB database connection established successfully");
});



  app.get('/', function(req, res) {
    res.send('Olá Mundo connectado!');
    
    author.save(function(err) {
      if (err) throw err;
       
      console.log('Author successfully saved.');
    })

  });
  
  app.listen(port, function() {
    console.log('App de Exemplo escutando na porta :'+port);
  });