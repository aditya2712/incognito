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

medicalShopDataSchema.index({'$**': 'text'});


module.exports = mongoose.model('medicalShopData', medicalShopDataSchema);