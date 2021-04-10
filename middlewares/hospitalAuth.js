const hospitalUser = require('../schemas/hospitalUser');

let hospitalAuth = (req, res, next) => {
    let token = req.cookies.auth;
    hospitalUser.findByToken(token, (err, hospital) => {
        if(err) throw err;
        if(!hospital){
            return res.json({
                error: true
            });
        }
        req.token = token;
        req.user = hospital
        next();
    })
}

module.exports = {hospitalAuth};
