
const { v4: uuidv4 } = require('uuid');
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const User = require('../models/user');


module.exports.register = async (req, res) => {
    console.log("--------------user register");
    const {name, username, password} = req.body;
    const id = uuidv4();
  
    const user = new User({id, name, username})
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    res.status(200).send(registeredUser);
    console.log(`--------------user ${username} registerred`);
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
        res.status(200).send(user.username);
      });
    })(req, res, next);
  }


  module.exports.getAllUsers = async (req, res, next) => {
    console.log("--------------get all users");

    const users = await User.find();
    res.send(users);
    console.log(users);

  }