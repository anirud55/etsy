const express = require("express");
const app = express();
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new Users({
        fname: req.body.fname,
        lname: req.body.lname,
        uname: req.body.uname,
        email: req.body.email,
        password: (await bcrypt.hash(req.body.password, 10)).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    const { uname, password } = req.body;
    const user = await Users.findOne({ where: { uname: uname } });
    console.log(user.uname);
    if (!user) res.status(401).json({ eror: "User doesn't exist" });
    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.status(401).json({ error: "Wrong Username and password combination" });
        res.status(200).json({
            msg:"SUCCESS",
            user : user.uname,
    });
    });
});

router.get('/logout', (req, res) => {
    // req.session.destroy();
    res.status(200).json({msg:"SUCCESS"});
  });

module.exports = router;