
// const { campgroundSchema, reviewSchema } = require('./schemas.js');
const Message = require('../models/message');

const ExpressError = require('../utils/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
    console.log("in isLoggedIn")
    if(!req.isAuthenticated()){
        return next(new ExpressError("user must loggedin", 401));
    }
    next();
}



module.exports.isAllowToDelete = async (req, res, next) => {
    const userId = req.user.id;
    const messageId = req.params.id;

    const message = await Message.findOne({id: messageId})
    console.log(message);

    if(message == null){
        return next(new ExpressError('message Not Found', 404));
    }

    if(message.recieverId !== userId && message.senderId !== userId){
        //not the sender and not the reciever
        return next(new ExpressError('not allowed', 404));
    }

    next();
}


module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    console.log(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}