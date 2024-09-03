const mongoose = require("mongoose");

const dbCon = async () => {
  try {
    //connect mongodb here
    const url = process.env.MONGODB_URI;
    await mongoose.connect(url);

    console.log('Mongo gb connected Sucessfully!')
  } catch (error) {
    console.log('An error has occured! : '+ error.message)
  }
};



module.exports = {dbCon}