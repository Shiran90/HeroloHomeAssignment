
const User = require('../models/user');
const ExpressError = require('../utils/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        return next(new ExpressError("ERROR: user must login", 401));
    }
    next();
}

module.exports.checkRecieverExists = async (req, res, next) => {
    const user = await User.findOne({id: req.body.recieverId});

    if(user == null){
        return next(new ExpressError("ERROR: recieverId doesn't exist", 401));
    }
    next();
}
