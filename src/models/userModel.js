const mongoose = require('mongoose')

//schema
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    isAdmin: Boolean,
  });
  
  //user Model
  const UserModel = mongoose.model("User", UserSchema);


  module.exports = {UserModel}
  