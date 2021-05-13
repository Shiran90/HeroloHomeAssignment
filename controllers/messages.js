
const short = require('short-uuid');
const ExpressError = require('../utils/ExpressError')
const Message = require('../models/message');
const User = require('../models/user');


module.exports.createNewMsg = async (req, res, next) => {
    const {recieverName, recieverId, message, subject} = req.body;
    const senderName = req.user.name;
    const senderId = req.user.id;

    //create id to the new msg
    const id = short.generate();
   
    const newMessage = new Message({senderName, recieverName, recieverId, senderId, message, subject, id});
    await newMessage.save();

    res.status(200).send("SUCCESS: message sent");
  }


  module.exports.getAllUserMsgs = async (req, res) => {
    const id = req.user.id;
    const messages = await Message.find({recieverId: id}).select({"_v": 0, "_id": 0})

    res.status(200).send(messages);
  }


  module.exports.getAllUserUnreadMsgs = async (req, res) => {
    const id = req.user.id;
    const messages = await Message.find({recieverId: id, hasRead: false}).select({"_v": 0, "_id": 0})

    res.status(200).send(messages);
  }


  module.exports.readMsg = async (req, res, next) => {
    const userId = req.user.id;
    const messageId = req.params.id;

    const message = await Message.findOne({recieverId: userId, id: messageId}).select({"_v": 0, "_id": 0})

    if(message == null){
        return next(new ExpressError('ERROR: message not found', 404));
    }

    //update unread field to true
    await Message.updateOne(
        {recieverId: userId, id: messageId},
        { $set: { hasRead: true } }
     );

    res.status(200).send(message);
  }


  module.exports.deleteMsg = async (req, res, next) => {
    const userId = req.user.id;
    const messageId = req.params.id;

    const message = await findMsgById(messageId);

    if(message == null){
      return next(new ExpressError('ERROR: message not found', 404));
  }

  //check if the user is the sender (owner) of the msg or the reciever 
    const isAllowed = await isAllowedToDelete(userId, message.recieverId, message.senderId);

    if (!isAllowed){
      return next(new ExpressError('ERROR: user is not allowed to delete this message', 404));
    }
    //delete
    const deletedMsg = await Message.deleteOne({id: messageId});

    res.send(`SUCCESS: message deleted ${messageId}`);
  }


  //check if the user is the sender or the reciever of the message
const isAllowedToDelete = async (userId, recieverId, senderId) => {
    if(recieverId !== userId && senderId !== userId){
        //not the sender nor the reciever
        return false;
    }
    return true;
}


const findMsgById = async (messageId) => {
  const message = await Message.findOne({id: messageId})
    console.log(message);

    return message;
}