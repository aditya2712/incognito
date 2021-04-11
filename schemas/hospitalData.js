const mongoose = require('mongoose');

const hospitalDataSchema = mongoose.Schema({
    hospitalName: {
        type: String
    },
    treatment: {
        type: String
    },
    price: {
        type: Number
    }
}) 

module.exports = mongoose.model('hospitalData', hospitalDataSchema);