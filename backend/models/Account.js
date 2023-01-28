const mongoose = require('mongoose');

const Account = mongoose.Schema({
    id: { type: Number },
    email: { type: String},
    password: { type: String },
    name: { type: String },
    img: { type: String },
    gender: { type: Number },
    phoneNumber: { type: String },
    type: { type: Number },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Account', Account);