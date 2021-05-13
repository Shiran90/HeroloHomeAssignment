const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');


//register
router.post('/register', catchAsync(users.register));

//login
router.post('/login', users.login);

//get all users to allow the user to choose the recipient in the frontend
router.get('/', catchAsync(users.getAllUsers));

module.exports = router;