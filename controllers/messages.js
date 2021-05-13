
const { v4: uuidv4 } = require('uuid');
const ExpressError = require('../utils/ExpressError')
const Message = require('../models/message');



module.exports.createNewMsg = async (req, res, next) => {
    console.log("--------------new message");

    //if user loggedin
    // if(!req.isAuthenticated()){
    //     // return res.status(401).send("user must loggedin")
    //     return next(new ExpressError("user must loggedin", 401));
    // }
    const {recieverName, recieverId, message, subject} = req.body;

    console.log(req.user);

    const senderName = req.user.username;
    const senderId = req.user.id;

    //create id to the new msg
    const id = uuidv4();
   
    const NewMessage = new Message({senderName, recieverName, recieverId, senderId, message, subject, id});
    await NewMessage.save();

    res.send(message);
    
    console.log(`--------------message 
    from: ${senderName}
    to: ${recieverName},
    subject: ${subject},
    message: ${message} 
    stored--------------------------------`);
  }


  module.exports.getAllMsgsForUser = async (req, res) => {
    console.log("--------------get all messages");

    // if(!req.isAuthenticated()){
    //     return res.status(401).send("user must loggedin")
    // }

    const id = req.user.id;

    const messages = await Message.find({recieverId: id})
    console.log(messages);

    res.send(messages);
  }


  module.exports.getAllUnreadMsgsForUser = async (req, res) => {
    console.log("--------------get all unread messages");

    // if(!req.isAuthenticated()){
    //     return res.status(401).send("user must loggedin")
    // }

    const id = req.user.id;

    const messages = await Message.find({recieverId: id, hasRead: false})
    console.log(messages);

    res.send(messages);
  }


  module.exports.readMsg = async (req, res, next) => {
    console.log("--------------read a message");

    // if(!req.isAuthenticated()){
    //     return res.status(401).send("user must loggedin")
    // }

    const userId = req.user.id;
    const messageId = req.params.id;

    const message = await Message.findOne({recieverId: userId, id: messageId})
    console.log(message);

    if(message == null){
        return next(new ExpressError('message Not Found', 404));
    }

    //update unread to true
    await Message.updateOne(
        {recieverId: userId, id: messageId},
        { $set: { hasRead: true } }
     );

    res.send(message);
  }


  module.exports.deleteMsg = async (req, res, next) => {
    console.log("--------------delete a message");

    // if(!req.isAuthenticated()){
    //     return res.status(401).send("user must loggedin")
    // }

    //const userId = req.user.id;
    const messageId = req.params.id;

    //const message = await Message.findOne({id: messageId})
    //console.log(message);

    // if(message == null){
    //     return next(new ExpressError('message Not Found', 404));
    // }

    // if(message.recieverId !== userId && message.senderId !== userId){
    //     //not the sender and not the reciever
    //     return next(new ExpressError('not allowed', 404));
    // }

    //delete
    const deletedMsg = await Message.deleteOne({id: messageId});

    res.send(deletedMsg);
  }