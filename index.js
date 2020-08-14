const express = require('express');
const app = express();
const port = process.env.PORT


app.get('/', function(req, res) {
    res.send('Olá Mundo!');
  });
  
  app.listen(port, function() {
    console.log('App de Exemplo escutando na porta :'+port);
  });