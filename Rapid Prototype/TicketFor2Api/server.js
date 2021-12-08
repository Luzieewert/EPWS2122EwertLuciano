require('dotenv').config()
const express = require('express')
const app = express()
const session = require("express-session")
const MongoStore = require("connect-mongo");
const mongoose = require('mongoose')

const passport = require("./passport/setup");


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true},() => {})

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(
    session({
        secret: "secret this is",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({mongoUrl:process.env.DATABASE_URL })
    })
);

app.use(passport.initialize());
app.use(passport.session());

const ticketFor2Router = require('./routes/ticketFor2')
app.use('/ticketFor2', ticketFor2Router)

const PORT = 8001

app.listen(PORT, () => console.log("Server Started" + " at Port: " + PORT ))

