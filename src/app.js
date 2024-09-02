const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { UserModel } = require("./models/userModel");
const {dbCon}  = require('./db/connection')
//load env variables
dotenv.config();

//create app
const app = express();
const PORT = process.env.PORT || 5000;
//add middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// //cors


// db con here
dbCon()

//import route handlers
//users
const { userRouter } = require("./routes/userRoute");

//use the routes
app.use(userRouter);

//routes
app.get("/", async (_, res) => {
   console.log({ data: "" });

  res.send({ message: "Hell from server" });
});

app.all("*", (req, res) => res.status(404).send({ error: "Route Not Found" }));

//start
app.listen(PORT, () => console.log(`App running on port  ${PORT}`));
