require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');

const medicalShopUserSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    password: {
        type: String
    }
});


medicalShopUserSchema.pre('save',function(next){
    var medicalShop = this;
    bcrypt.hash( process.env.BCRYPT_PLAIN_KEY, salt, function(err, hash) {
        medicalShop.password = hash;
        console.log(medicalShop)
        next();
    });
})

medicalShopUserSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password, function(err, isMatch){
        if(err)
        return cb(next);
        cb(null, isMatch);
    });
}

medicalShopUserSchema.methods.generateToken = function(cb){
    var medicalShop = this;
    var token = jwt.sign(medicalShop._id.toHexString(), process.env.JWT_TOKEN );
    medicalShop.token = token;
    medicalShop.save(function(err, medicalShop){
        if(err)
        return cb(err);
        cb(null, medicalShop);
    })
}

medicalShopUserSchema.statics.findByToken=function(token,cb){
    var medicalShop=this;

    jwt.verify(token,confiq.SECRET,function(err,decode){
        medicalShop.findOne({"_id": decode, "token":token},function(err,medicalShop){
            if(err) return cb(err);
            cb(null,medicalShop);
        })
    })
};

module.exports = mongoose.model('medicalShopUser', medicalShopUserSchema);