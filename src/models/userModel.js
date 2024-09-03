const { default: mongoose, model } = require("mongoose");

//create schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false },
  },
  
  { timestamps: true }
);


//usermodel
const UserModel = model('User', userSchema)

module.exports = {UserModel}