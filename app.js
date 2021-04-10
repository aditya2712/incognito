require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const hospitalUser = require('./schemas/hospitalUser');
const medicalShopUser = require('./schemas/medicalShopUser');
const {hospitalAuth} = require('./middlewares/hospitalAuth');
const {medicalShopAuth} = require('./middlewares/medicalShopAuth');
const salt = 10;


const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs')

mongoose.connect( process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (e)=>{
    if(e){
        console.log(e);
        return;
    }
    console.log("DB connected");
})

app.get('/',(req, res)=> {
    res.render('index')
})

app.post('/hospital/signup', (req, res) => {
    const newHospital = new hospitalUser(req.body);
    hospitalUser.findOne({email: newHospital.email}, function(err, user){
        if(user)
        return res.status(400).json({auth: 'false', message: 'email already exist'})
        newHospital.save();
        res.send("hospital saved");
    })
})

app.post('/medicalshop/signup', (req, res) => {
    const newMedicalShop = new medicalShopUser(req.body);
    medicalShopUser.findOne({email: newMedicalShop.email}, function(err, user){
        if(user)
        return res.status(400).json({auth: 'false', message: 'email already exist'})
        newMedicalShop.save();
        res.send("medical shop saved")
    })
})

const PORT =  process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log("Server Started.")
});


