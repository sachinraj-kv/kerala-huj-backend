const express = require('express')
const app = require('./app/app');
const mongoDB_Connect = require('./connect/mongoConnect');

mongoDB_Connect()
app.listen("3000",()=>{
    console.log("server running on 3000");
    
})

