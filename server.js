const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
require('dotenv').config()

const passport = require('./services/passport')
const AuthRoute = require('./routes/auth')

const app = express()

//middlewares
app.use(express.json())
app.use( session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false},
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/auth', AuthRoute)

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('database is connected')).catch(err => console.log(err))

app.listen(PORT, () => {
  console.log(`express server is connected to ${PORT}`);
})