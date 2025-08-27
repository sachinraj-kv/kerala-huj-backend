const mongoose = require("mongoose")


const authSchema = new mongoose.Schema({
    name : {
        type : String ,
        require: true
    },
    password : {
        type : String ,
        require
    }
})

const register = mongoose.model("register",authSchema)

module.exports = register;
