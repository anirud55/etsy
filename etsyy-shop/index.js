//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
const db = require('./models');
const usersRoute = require("./routes/Users");
const shopRoute = require('./routes/Shop');
const prodRoute = require('./routes/Product');
const cartRoute = require('./routes/Cart');
const orderRoute = require('./routes/Order');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(bodyParser.json());

app.use("/auth", usersRoute);
app.use("/shop", shopRoute);
app.use("/product", prodRoute);
app.use("/cart", cartRoute);
app.use("/order", cartRoute);

//start your server on port 3001
db.sequelize.sync().then(() => {
  app.listen(3001);
  console.log("Server Listening on port 3001");
});
