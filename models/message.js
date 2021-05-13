const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: true
  },
  recieverName: {
    type: String,
    required: true
  },
  senderId: {
    type: String,
    required: true
  },
  recieverId: {
    type: String,
    required: true
  },
  message: String,
  subject: String,
  creationDate: { type: Date, default: Date.now },
  hasRead: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    required: true
  }
})

const Message = mongoose.model('Message', messageSchema);


module.exports = Message;
// // messageSchema.methods.getAllUnreadedMsgs = function() {

// // }

// const getAllUnreadedMsgs = () => {
//   const unread = await Message.filter((msg) => {msg.hasRead === false});
//   return unread;

//   const unread = Character.find({ hasRead: false });
//   return unread.get
// }