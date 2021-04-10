const medicalShopUser = require('../schemas/medicalShopUser');

let medicalShopAuth = (req, res, next) => {
    let token = req.cookies.auth;
    medicalShopUser.findByToken(token, (err, medicalShop) => {
        if(err) throw err;
        if(!medicalShop){
            return res.json({
                error: true
            });
        }
        req.token = token;
        req.user = medicalShop
        next();
    })
}

module.exports = {medicalShopAuth};
