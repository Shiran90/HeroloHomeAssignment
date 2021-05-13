const express = require('express');
const router = express.Router();
const passport = require('passport');
const { v4: uuidv4 } = require('uuid');
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync');
const messages = require('../controllers/messages');
const {isLoggedIn, isAllowToDelete} = require('../middleware/middleware');

const Message = require('../models/message');


//new message
router.post('/', isLoggedIn, catchAsync(messages.createNewMsg))

//get all messages
router.get('/', isLoggedIn, catchAsync(messages.getAllMsgsForUser))

//get all unread messages
router.get('/unread', isLoggedIn, catchAsync(messages.getAllUnreadMsgsForUser))

//read a message
router.get('/:id', isLoggedIn, catchAsync(messages.readMsg));


//delete a message
router.delete('/:id', isLoggedIn, isAllowToDelete, catchAsync(messages.deleteMsg))

module.exports = router;

// router.post('/', catchAsync(async (req, res, next) => {
//     console.log("--------------new message");

//     //if user loggedin
//     if(!req.isAuthenticated()){
//         // return res.status(401).send("user must loggedin")
//         return next(new ExpressError("user must loggedin", 401));
//     }
//     const {recieverName, recieverId, message, subject} = req.body;

//     console.log(req.user);

//     const senderName = req.user.username;
//     const senderId = req.user.id;

//     //create id to the new msg
//     const id = uuidv4();
   
//     const NewMessage = new Message({senderName, recieverName, recieverId, senderId, message, subject, id});
//     await NewMessage.save();

//     res.send(message);
    
//     console.log(`--------------message 
//     from: ${senderName}
//     to: ${recieverName},
//     subject: ${subject},
//     message: ${message} 
//     stored--------------------------------`);
//   }))



//   /////////////////////////////////////////
//   //get all messages

//   router.get('/', catchAsync(async (req, res) => {
//     console.log("--------------get all messages");

//     if(!req.isAuthenticated()){
//         return res.status(401).send("user must loggedin")
//     }

//     const id = req.user.id;

//     const messages = await Message.find({recieverId: id})
//     console.log(messages);

//     res.send(messages);
//   }))


//   /////////////////////////////////////////
//   //get all unread messages

//   router.get('/unread', catchAsync(async (req, res) => {
//     console.log("--------------get all unread messages");

//     if(!req.isAuthenticated()){
//         return res.status(401).send("user must loggedin")
//     }

//     const id = req.user.id;

//     const messages = await Message.find({recieverId: id, hasRead: false})
//     console.log(messages);

//     res.send(messages);
//   }))


//   /////////////////////////////////////////
//   //read a message

//   router.get('/:id', catchAsync(async (req, res, next) => {
//     console.log("--------------read a message");

//     if(!req.isAuthenticated()){
//         return res.status(401).send("user must loggedin")
//     }

//     const userId = req.user.id;
//     const messageId = req.params.id;

//     const message = await Message.findOne({recieverId: userId, id: messageId})
//     console.log(message);

//     if(message == null){
//         return next(new ExpressError('message Not Found', 404));
//     }

//     //update unread to true
//     await Message.updateOne(
//         {recieverId: userId, id: messageId},
//         { $set: { hasRead: true } }
//      );

//     res.send(message);
//   }));


//   /////////////////////////////////////////
//   //delete a message

//   router.delete('/:id', catchAsync(async (req, res, next) => {
//     console.log("--------------read a message");

//     if(!req.isAuthenticated()){
//         return res.status(401).send("user must loggedin")
//     }

//     const userId = req.user.id;
//     const messageId = req.params.id;

//     const message = await Message.findOne({id: messageId})
//     console.log(message);

//     if(message == null){
//         return next(new ExpressError('message Not Found', 404));
//     }

//     if(message.recieverId !== userId && message.senderId !== userId){
//         //not the sender and not the reciever
//         return next(new ExpressError('not allowed', 404));
//     }

//     //delete
//     await Message.deleteOne({id: messageId});

//     res.send(message);
//   }))


