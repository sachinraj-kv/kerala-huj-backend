const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    state: {
        type: Number,
        required: true
    },
    coverId: {
        type: String,
        required: true,
    },
    ch: {
        type: String
    },
    applicantName: {
        type: String,
        required: true
    },
    mobileNo: {
        type: Number,
        required: true
    },
    dateOfBirth: {
        type: Date
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'] 
    },
    presentAddress: {
        type: String
    },
    pincode: {
        type: Number
    },
    district: {
        type: String
    },
    submit : {
        type : Number ,
        enum: [0, 1],
        default : 0
    }
})

   const huj_User = mongoose.model('huj_user', userSchema, 'huj_user');

    module.exports = huj_User;