const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//load env variables
dotenv.config();

//create app
const app = express();
const PORT = process.env.PORT || 5000;
//add middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// //cors
// app.use(cors({
//     methods:['POST']
// }));

//connect mongodb here
const url = process.env.MONGODB_URI;
mongoose
  .connect(url)
  .then((client) => {
    console.log("Mongodb conncted successfully");
  })
  .catch((error) => {
    console.log("An error has ocuured " + error.message);
  });

//schema
const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  isAdmin: Boolean,
});

//user Model
const UserModel = mongoose.model("User", UserSchema);

//routes
app.get("/", async (_, res) => {
  //   const data = await db.collection("products").find({}).toArray();
  //   res.send(data);
  console.log({ data: "" });

  res.send({ message: "Hell from server" });
});

//user route
app.get("/users", async (req, res) => {
  const users = await UserModel.find({});
  res.send(users);
});
//user route
app.post("/users", async (req, res) => {
  const newUser = new UserModel(req.body);
  const savedUser = await newUser.save();

  if (!savedUser) res.status(400).send({ message: " Invalid in put" });

  res.status(201).send(savedUser);
});

app.all("*", (req, res) => res.status(404).send({ error: "Route Not Found" }));

//start
app.listen(PORT, () => console.log(`App running on port  ${PORT}`));
