const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const dbname = process.env.DBNAME
const userdb = process.env.USERDB
const passwd = process.env.PASSWD


const uri = `mongodb+srv://${userdb}:${passwd}@supermarketapp.gyn7i.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function(err) {
  if (err) throw err;
  console.log("MongoDB database connection established successfully");
});

module.exports = mongoose