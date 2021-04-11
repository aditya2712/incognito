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

hospitalDataSchema.index({'$**': 'text'});

module.exports = mongoose.model('hospitalData', hospitalDataSchema);