const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

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
const url = "mongodb://localhost:27017/e-store";
let db;
MongoClient.connect(url)
  .then((client) => {
    db = client.db("e-store");
    console.log("Mongodb conncted successfully");
  })
  .catch((error) => {
    console.log("An error has ocuured " + error.message);
  });

//routes
app.get("/", async (_, res) => {
  const data = await db.collection("products").find({}).toArray();
  res.send(data);
  console.log({ data });

  res.send({ message: "Hell from server" });
});

app.all("*", (req, res) => res.status(404).send({ error: "Route Not Found" }));

//start
app.listen(PORT, () => console.log(`App running on port  ${PORT}`));
