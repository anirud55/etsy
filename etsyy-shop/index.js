//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
app.set('view engine', 'ejs');
const authRoute = require("./routes/auth");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(bodyParser.json());

app.use("/api/auth", authRoute);

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");