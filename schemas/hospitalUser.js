require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');

const hospitalUserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    token: {
        type: String
    }
})

hospitalUserSchema.pre('save',function(next){
    var hospital = this;

    bcrypt.hash(process.env.BCRYPT_PLAIN_KEY, salt, function(err, hash) {
        hospital.password = hash;
        console.log(hospital)
        next();
    });

})

hospitalUserSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password, function(err, isMatch){
        if(err)
        return cb(next);
        cb(null, isMatch);
    });
}

hospitalUserSchema.methods.generateToken = function(cb){
    var hospital = this;
    var token = jwt.sign(hospital._id.toHexString(), process.env.JWT_TOKEN );
    hospital.token = token;
    hospital.save(function(err, hospital){
        if(err)
        return cb(err);
        cb(null, hospital);
    })
}

hospitalUserSchema.statics.findByToken=function(token,cb){
    var hospital=this;

    jwt.verify(token,confiq.SECRET,function(err,decode){
        hospital.findOne({"_id": decode, "token":token},function(err,hospital){
            if(err) return cb(err);
            cb(null,hospital);
        })
    })
};

module.exports = mongoose.model('hospital', hospitalUserSchema );