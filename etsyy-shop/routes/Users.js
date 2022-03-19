const express = require("express");
const app = express();
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Route to handle Post Request Call
app.post("/login", function (req, res) {
    console.log("Inside Login Post Request");
    console.log("Req Body : ", req.body);
    con.query(
      "SELECT * FROM users where email ='" + req.body.email + "'",
      function (err, result) {
        if (err) {
          console.log(err);
          return;
        }
        if (result.length > 0) {
          if (
            result[0].email === req.body.email &&
            result[0].password === req.body.password
          ) {
            res.cookie("cookie", "admin", {
              maxAge: 900000,
              httpOnly: false,
              path: "/",
            });
            req.session.user = result;
            res.writeHead(200, {
              "Content-Type": "text/plain",
            });
            res.end(JSON.stringify(result));
          } else {
            res.writeHead(400, {
              "Content-Type": "text/plain",
            });
            res.end("Incorrect Password");
          }
        } else {
          res.writeHead(400, {
            "Content-Type": "text/plain",
          });
          res.end("Email is not registered with us");
        }
      }
    );
  });
  
  //Route to handle Post Request Call
  app.post("/register", function (req, res) {
    console.log("Inside register Post Request");
    console.log("Req Body : ", req.body);
    con.query(
      "INSERT INTO users (name, email, password) VALUES ('" +
        req.body.name +
        "','" +
        req.body.email +
        "','" +
        req.body.password +
        "')",
      function (err, result) {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            console.log(err);
            res.writeHead(400, {
              "Content-Type": "text/plain",
            });
            res.end("Email is already registered with us");
            return;
          }
        }
        con.query(
          "SELECT * FROM users where email ='" + req.body.email + "'",
          function (err, result) {
            if (err) {
              console.log(err);
              return;
            }
            res.cookie("cookie", "admin", {
              maxAge: 900000,
              httpOnly: false,
              path: "/",
            });
            req.session.user = result;
            res.writeHead(200, {
              "Content-Type": "text/plain",
            });
            res.end(JSON.stringify(result));
          }
        );
      }
    );
  });
  
// //REGISTER
// router.post("/register", async (req, res) => {
//     const newUser = new Users({
//         fname: req.body.fname,
//         lname: req.body.lname,
//         uname: req.body.uname,
//         email: req.body.email,
//         password: (await bcrypt.hash(req.body.password, 10)).toString(),
//     });

//     try {
//         const savedUser = await newUser.save();
//         res.status(201).json(savedUser);
//     } catch (err) {
//         res.status(500).json(err.message);
//     }
// });

// router.post('/login', async (req, res) => {
//     const { uname, password } = req.body;
//     const user = await Users.findOne({ where: { uname: uname } });
//     console.log(user.uname);
//     if (!user) res.status(401).json({ eror: "User doesn't exist" });
//     bcrypt.compare(password, user.password).then((match) => {
//         if (!match) res.status(401).json({ error: "Wrong Username and password combination" });
//         if (match) res.status(200).json(user.uname);
//     });
// });

// router.put("/:id", async (req, res) => {
//     try {
        
//         const updatedUser = await Users.findByIdAndUpdate(
//             req.params.id,
//             {
//                 $set: req.body,
//             },
//             { new: true }
//         );
//         res.status(200).json(updatedUser);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

// router.get('/logout', (req, res) => {
//     // req.session.destroy();
//     res.status(200).json({ msg: "SUCCESS" });
// });

module.exports = router;