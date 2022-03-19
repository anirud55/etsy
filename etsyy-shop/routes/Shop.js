const express = require("express");
const app = express();
const router = express.Router();
const { Shop } = require("../models");

//Crete new shop
router.post("/createshop", async (req, res) => {
    const newShop = new Shop({
        shopname: req.body.shopname,
        description: req.body.desc,
        photo: req.body.photourl,
    });

    try {
        const savedShop = await newShop.save();
        res.status(201).json(savedShop);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

//Check availability
router.get("/checkavailability", async (req, res) => {
    const { shopname } = req.body;
    const shop = await Shop.findOne({ where: { shopname: shopname } });
    if (!shop) res.status(200).json( "Shop is available" );
    if (shop) res.status(200).json("Shop is not available");
});

module.exports = router;