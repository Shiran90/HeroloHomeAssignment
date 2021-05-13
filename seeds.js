const mongoose = require('mongoose');
const Message = require('./models/message');


mongoose.connect('mongodb://localhost:27017/messaageDB', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
  console.log("db conected")
})
.catch((err)=>{
  console.log(err)
})


const m = new Message({
    sender: "shiran",
    
    reciever: "doron",
    message: "blaa bla",
    subject: "hi"
})

m.save().then(p=> {
    console.log(p)
}).catch(e=>{
    console.log(e)
})