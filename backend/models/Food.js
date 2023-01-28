const mongoose = require('mongoose');

const Food = mongoose.Schema({
    id: { type: Number },
    name: { type: String},
    price: { type: Number },
    status: { type: String },
    type: { type: String },
    img: { type: String },
    socials: { type: String },
    description: { type: String },
    statusFood: { type: Number },
})

module.exports = mongoose.model('Food', Food);