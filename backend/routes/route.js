const foodController = require('../controllers/foodController');

const express = require('express');
const Food = require('../models/Food');

const router = express.Router();

const api = process.env.API_URL;


router.get(`${api}/get-all-food`, async (req, res) => {
    const productList = await Food.find();
    if(productList) {
        res.status(200).json({
            errCode: 0,
            data: productList
        });
    }
    res.status(400).json({error: 'ERROR!'})
})



module.exports = router;