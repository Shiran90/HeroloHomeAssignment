const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session')

const config = require('./configuration')
const User = require('./models/user');
const ExpressError = require('./utils/ExpressError')
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/messages')


const app = express()
const port = config.server_port;


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const sessionConfig = {
  secret: 'thisshouldbeabettersecret!',
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7
  }
}

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/users', userRoutes);
app.use('/messages', messageRoutes);


const mongoose = require('mongoose');
mongoose.connect(config.database_conecting_string, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
  console.log("db conected")
})
.catch((err)=>{
  console.log(err)
})

mongoose.set('useCreateIndex', true);

  //unknown route
  app.all('*', (req, res, next) => {
    console.log("unknown route")
    next(new ExpressError('Page Not Found', 404));
  })

  app.use((err, req, res, next) => {
    console.log("error");
    //console.log(err);
    const { statusCode = 500, message = "error"} = err;
    res.status(statusCode).send(message);
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
/////////////////////////////////////////////////



