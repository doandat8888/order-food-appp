const mongoose = require('mongoose');

const Type = mongoose.Schema({
    id: { type: Number },
    name: { type: String },
    status: { type: Number },
    img: { type: String },
})

module.exports = mongoose.model('Type', Type);