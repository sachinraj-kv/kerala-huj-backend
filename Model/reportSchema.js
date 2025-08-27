const { application } = require("express");
const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  record_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "huj_User",
    required: true,
  },
  payment_slip: {
    type: Boolean,
    default: true,
  },
  medical_certificate: {
    type: Boolean,
    default: true,
  },
  application: {
    type: Boolean,
    default: true,
  },
  declaration: {
    type: Boolean,
    default: true,
  },
  remarks: {
    type: String,
    default: "",
  },

});

  const coverSchema = new mongoose.Schema({
  cover_id: { type: String, required: true },
  recererId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "register"
  },
  date : {
    type : Date,
    default : Date.now()
  },
  reciptNo : {
    type : Number,
    require : true
  },
  records: [recordSchema] ,
  completed : {
    type : Number ,
    default :0
  } 
  
  
});


const Cover = mongoose.model("Cover", coverSchema);

module.exports = Cover;
