const express = require("express");
const app = express();
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    const { fname, lname, uname, email, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            fname: fname,
            lname: lname,
            uname: uname,
            email: email,
            password: hash,
        });
        res.json("SUCCESS");
    });
});

router.post('/login', async (req, res) => {
    const { uname, password } = req.body;
    const user = await Users.findOne({ where: { uname: uname } });
    if (!user) res.json({ eror: "User doesn't exist" });
    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({ error: "Wrong Username and password combination" });
        res.json("You Logged In");
    });
});

module.exports = router;