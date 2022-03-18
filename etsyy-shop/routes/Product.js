const express = require("express");
const app = express();
const router = express.Router();
const { Product } = require("../models");

//Register a product
router.post("/addproduct", async (req, res) => {
    const newProd = new Product({
        categoryid: req.body.categoryid,
        title: req.body.title,
        desc: req.body.desc,
        img: req.body.img,
        size: req.body.size,
        color: req.body.color,
        price: req.body.price,
        inStock: req.body.inStock,
        quantity: req.body.quantity,
    });

    try {
        const savedProd = await newProd.save();
        res.status(201).json(savedProd);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;