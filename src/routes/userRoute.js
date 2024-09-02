const express = require("express");
const { UserModel } = require("../models/userModel");
const userRouter = express.Router();

userRouter.get("/users", async (req, res) => {
  const users = await UserModel.find({});
  res.send(users);
});

//user route
userRouter.post("/users", async (req, res) => {
  const newUser = new UserModel(req.body);
  const savedUser = await newUser.save();

  if (!savedUser) res.status(400).send({ message: " Invalid in put" });

  res.status(201).send(savedUser);
});

module.exports = { userRouter };
