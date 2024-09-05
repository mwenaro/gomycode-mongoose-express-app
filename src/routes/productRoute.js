const express = require("express");
const { ProductModel } = require("../models/productModel");
const productRouter = express.Router();

//GET /products
productRouter.get("/products", async (req, res) => {
  const products = await ProductModel.find({});
  res.send(products);
});

//GET /products/:id
productRouter.get("/products/:id", async (req, res) => {
  try {
    //req.params.id
    const {
      params: { id },
    } = req;
    const fetchedProduct = await ProductModel.findById(id);

    if(!fetchedProduct) return res.status(404).send({ message: "Product not found" });

    res.send(fetchedProduct);
  } catch (error) {
    res.status(500).send({ message: "Error " + error.message });
  }
});

//POST /products
productRouter.post("/products", async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body);
    const savedProduct = await newProduct.save();

    if (!savedProduct) res.status(400).send({ message: " Invalid input" });

    res.status(201).send(savedProduct);
  } catch (error) {
    res.status(500).send({ message: "Error " + error.message });
  }
});

//PUT /products/:id
productRouter.put("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, data);

    if (!updatedProduct) res.status(400).send({ message: "invalid data past" });

    res.status(201).send(updatedProduct);
  } catch (error) {
    res.status(500).send({ message: "Error " + error.message });
  }
});

//Delete /products/:id
productRouter.delete("/products/:id", async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct) res.status(404).send({ message: "Product not found" });

    res.send(deletedProduct);
  } catch (error) {
    res.status(500).send({ message: "Error " + error.message });
  }
});

module.exports = { productRouter };
