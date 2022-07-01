const express = require("express");
const app = express();
port = 3000;
var cors = require("cors");
const InclinePrep = require("./routes/InclinePrep");
const mongoose = require("mongoose");
require("dotenv").config();

const dbname = "Incline-Prep";
const password = process.env.DB_URI_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://Ben:${password}@cluster0.qtjn2.mongodb.net/${dbname}retryWrites=true&w=majority`
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/InclinePrep", InclinePrep);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
