const express = require('express')
const app = require('./app/app');
const mongoDB_Connect = require('./connect/mongoConnect');

mongoDB_Connect()
app.listen(process.env.PORT,()=>{
    console.log(`server running on${process.env.PORT}`);
    
})


