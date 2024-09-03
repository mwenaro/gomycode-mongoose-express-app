const { default: mongoose, model } = require("mongoose");

//create schema
const productSchema = new mongoose.Schema(
  {
    title:{type:String, required:true, unique:true},
    price:{type:Number, required:true},
    description:{type:String, required:true},
    category:{type:String, required:true},
    image:String,
    rating:{
      rate:Number,
      count:Number
    }
  },

  { timestamps: true }
);


//Productmodel
const ProductModel = model('Product', productSchema)

module.exports = {ProductModel}