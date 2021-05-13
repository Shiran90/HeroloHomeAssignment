const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
//   password: {
//     type: String,
//     required: true
//   },
  id: {
    type: String,
    required: true
  }
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
// // messageSchema.methods.getAllUnreadedMsgs = function() {

// // }

// const getAllUnreadedMsgs = () => {
//   const unread = await Message.filter((msg) => {msg.hasRead === false});
//   return unread;

//   const unread = Character.find({ hasRead: false });
//   return unread.get
// }