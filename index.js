const express = require("express");
const app = express();
let port = process.env.PORT || 3000;
var cors = require("cors");
const InclinePrep = require("./routes/InclinePrep");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");

const dbname = "inclinePrep";
const password = process.env.DB_URI_PASSWORD;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

mongoose
  .connect(
    process.env.MONGODB_URI ||
      `mongodb+srv://Ben:${password}@cluster0.qtjn2.mongodb.net/${dbname}?retryWrites=true&w=majority`
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/InclinePrep", InclinePrep);

const server = app.listen(process.env.PORT || 3001, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});
