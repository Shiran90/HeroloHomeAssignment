
const short = require('short-uuid');
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const User = require('../models/user');


module.exports.register = async (req, res) => {
    const {name, username, password} = req.body;
    const id = short.generate();
  
    const user = new User({id, name, username})
    const registeredUser = await User.register(user, password);

    res.status(200).send(id);
  }


  module.exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {  
          return next(err); 
        }
      if (!user) { 
          throw new ExpressError(info.message, 404); 
        }
      req.logIn(user, (err) => {
        if (err) { 
            return next(err); 
        }
        res.status(200).send('SUCCESS: user logged in successfully');
      });
    })(req, res, next);
  }


  //fetch users list to allow the user to choose the recipient in the frontend
  module.exports.getAllUsers = async (req, res, next) => {
    const users = await User.find().select({"__v": 0, "_id": 0});
    res.status(200).send(users);
  }