const mongoose = require('mongoose');

const medicalShopDataSchema = mongoose.Schema({
    shopName: {
        type: String
    },
    medicine: {
        type: String
    },
    price: {
        type: Number
    }
}) 

module.exports = mongoose.model('medicalShopData', medicalShopDataSchema);