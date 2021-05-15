const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  }
})
//user's schema's fields: 
//name
//id
//username (unique, added by passport)
//password ("hushed" and added by passport)

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);