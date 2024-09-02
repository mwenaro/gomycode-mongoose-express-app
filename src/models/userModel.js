const mongoose = require('mongoose')

//schema
const UserSchema = new mongoose.Schema({
    name: {type:String, required:true, unique:true},
    age: {type:Number, required:true},
    isAdmin: {type:Boolean, default:false},
  });
  
  //user Model
  const UserModel = mongoose.model("User", UserSchema);


  module.exports = {UserModel}
  