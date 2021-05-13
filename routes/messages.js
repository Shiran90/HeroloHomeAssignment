const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const messages = require('../controllers/messages');
const {isLoggedIn, checkRecieverExists} = require('../middleware');


//create a new message
router.post('/', isLoggedIn, checkRecieverExists, catchAsync(messages.createNewMsg))

//get all messages for the logged in user
router.get('/', isLoggedIn, catchAsync(messages.getAllUserMsgs))

//get all unread messages for the logged in user
router.get('/unread', isLoggedIn, catchAsync(messages.getAllUserUnreadMsgs))

//read a speacific message
router.get('/:id', isLoggedIn, catchAsync(messages.readMsg));

//delete a speacific message
router.delete('/:id', isLoggedIn, catchAsync(messages.deleteMsg))

module.exports = router;

