//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
const usersRoute = require("./routes/Users");
const db = require('./models');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(bodyParser.json());

app.use("/auth", usersRoute);

//start your server on port 3001
db.sequelize.sync().then(() => {
  app.listen(3001);
  console.log("Server Listening on port 3001");
});
