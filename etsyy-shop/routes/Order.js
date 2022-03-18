const express = require("express");
const router = express.Router();
const { Order } = require("../models");

//Register a product
router.post("/createOrder", async (req, res) => {
    const newOrder = new Order({
        userid: req.body.userid,
        productid: req.body.productid,
        quantity: req.body.quantity,
        amount: req.body.amount,
        address: req.body.address,
        status: req.body.status,
    });

    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;