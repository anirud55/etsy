const express = require("express");
const router = express.Router();
const { Cart } = require("../models");

//Register a product
router.post("/addcart", async (req, res) => {
    const newCart = new Cart({
        userid: req.body.userid,
        productid: req.body.productid,
        quantity: req.body.quantity,
        status: req.body.status,
    });

    try {
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;