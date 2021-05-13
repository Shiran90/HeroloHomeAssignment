const express = require('express');
const router = express.Router();
const passport = require('passport');
const { v4: uuidv4 } = require('uuid');
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');

const User = require('../models/user');

//register
router.post('/register', catchAsync(users.register));

//login
router.get('/login', users.login);

//get all users
router.get('/', catchAsync(users.getAllUsers));



// router.post('/register', catchAsync(async (req, res) => {
//     console.log("--------------user register");
//     const {name, username, password} = req.body;
//     const id = uuidv4();
  
//     const user = new User({id, name, username})
//     const registeredUser = await User.register(user, password);
//     console.log(registeredUser);
//     res.status(200).send(registeredUser);
//     console.log(`--------------user ${username} registerred`);
//   }))

//   router.post('/login', passport.authenticate('local'), ((req, res) => {
//     console.log("--------------user login");
//     const { username} = req.body;
//     res.send(username);
//     console.log(`--------------user ${username} loggedin`);
//   }))



// router.get('/login', (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//       if (err) {  
//           return next(err); 
//         }
//       if (!user) { 
//           throw new ExpressError(info.message, 404); 
//         }
//       req.logIn(user, (err) => {
//         if (err) { 
//             return next(err); 
//         }
//         res.status(200).send(user.username);
//       });
//     })(req, res, next);
//   });




  // router.get('/', catchAsync(async (req, res, next) => {
  //   console.log("--------------get all users");

  //   const users = await User.find();
  //   res.send(users);
  //   console.log(users);

  // }))

module.exports = router;