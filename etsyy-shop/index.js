//import the require dependencies
var express = require('express');
var app = express();
const mysql = require('mysql');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
app.set('view engine', 'ejs');
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/Users");
const db = require('./models');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(bodyParser.json());

// const db = mysql.createPool({
//     host : "etsyy.cvpzsnchqnxg.us-east-2.rds.amazonaws.com",
//     user: "admin",
//     password: "admin123",
//     database: "Etsyy_prod"
// });

app.use("/api/auth", authRoute);
app.use("/auth", usersRoute);

//start your server on port 3001
db.sequelize.sync().then(() => {
  app.listen(3001);
  console.log("Server Listening on port 3001");
});

// app.post('/register', (req,res) =>{

//     const fname = req.body.fname;
//     const lname = req.body.lname;
//     const unmae = req.body.uname;
//     const email = req.body.email;
//     const password = req.body.password;
//     console.log(req.body)

//     db.query("INSERT into users (fname, lname, uname, email, password) VALUES (?,?,?,?,?)",[fname, lname, unmae, email, password],(err,result) => {
//                 console.log(err);
//                 if(err){
//                   res.send({message : "Email ID already exists. Please login to continue"})
//                 }
//                else{
//                  res.send(result);
//                }
//       })
// })

// app.post('/login', (req,res) =>{

//     const uname = req.body.uname;
//     const password = req.body.password;
//     console.log("inside customer login post");

//     db.query("SELECT * from tbl_Customer WHERE Email = ? AND Password = ?",[uname, password],(err,result) => {
//                 if(err){
//                   res.send({err : err})
//                 }

//                 if(result.length > 0){
//                   res.send(result[0]);
//                 }
//                 else{
//                   res.send({message : "Incorrect username/password combination"})
//                 }
//             })
// })