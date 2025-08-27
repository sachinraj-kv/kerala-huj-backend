const express = require('express');
const userrouter = require('../Routes/userRoute');
const cors = require('cors');
const reportrouter = require('../Routes/reportRoute');
const authrouter = require('../Routes/authRoute');
const cookieparser = require('cookie-parser')

const app = express()
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(cookieparser())

app.use(cors({
  origin: "https://kerala-huj-frontend.onrender.com", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use('/data',userrouter)
app.use('/report',reportrouter)
app.use('/user',authrouter)


module.exports = app;



