const mongoose = require('mongoose')

const  env = require('dotenv')


env.config({path : '\.env'})

const mongodb = process.env.MONGOdb_URL 

console.log("mongodb",mongodb);


const mongoDB_Connect = ()=>{
    mongoose.connect(process.env.MONGOdb_URL)

    .then((data)=>{
        console.log(`database connected successfully to ${data.connection.host}`);
        
    })
    .catch ((error)=>{
        console.log(error.message);
        
    })
}

module.exports = mongoDB_Connect;
