const express = require("express");
const { UserModel } = require("../models/userModel");
const userRouter = express.Router();

//GET /users
userRouter.get("/users", async (req, res) => {
  const users = await UserModel.find({});
  res.send(users);
});

//GET /users/:id
userRouter.get("/users/:id", async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    // const user = await UserModel.findOne({ _id: id });
    const fetchedUser = await UserModel.findById(id);

    if(!fetchedUser) return res.status(404).send({ message: "User not found" });

    res.send(fetchedUser);
  } catch (error) {
    res.status(404).send({ message: "Error " + error.message });
  }
});

//POST /users
userRouter.post("/users", async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    const savedUser = await newUser.save();

    if (!savedUser) res.status(400).send({ message: " Invalid input" });

    res.status(201).send(savedUser);
  } catch (error) {
    res.status(500).send({ message: "Error " + error.message });
  }
});

//POST /users/:id
userRouter.put("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(id, data);

    if (!updatedUser) res.status(400).send({ message: "invalid data past" });

    res.status(201).send(updatedUser);
  } catch (error) {
    res.status(500).send({ message: "Error " + error.message });
  }
});

//Delete /users/:id
userRouter.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) res.status(404).send({ message: "User not found" });

    res.send(deletedUser);
  } catch (error) {
    res.status(500).send({ message: "Error " + error.message });
  }
});

module.exports = { userRouter };
