const express = require("express"); //import express

const app = express(); //assigning all express methods to app variable

const { default: mongoose } = require("mongoose");
const path=require('path')

const bodyParser = require("body-parser"); //the input values can be converted into json format using body-parser

const vendorRoutes = require("./routes/vendorRoutes");
const firmRoutes=require("./routes/firmRoutes")
const productRoutes=require("./routes/productRoutes")

const dotenv = require("dotenv").config(); //to access the .env files we have to import dotenv

const PORT =process.env.PORT || 4000;
// const port =4000

//To start a server

app.listen(PORT, () => {
  console.log(`server started and running at ${PORT}`); //   ``TO PASS A VARIABLE DYNAMICALLY
});

app.use(bodyParser.json());

app.use("/vendor", vendorRoutes); //   /vendor=path

app.use("/firm", firmRoutes);

app.use("/product", productRoutes);

app.use("/uploads", express.static('uploads'));  //images are stored in uploads folder

//CREATE A ROUTE

app.use('/',(req, res) => {
  res.send("<h1>Welcome Mahesh Reddy</h1>");
});

//db connection
mongoose
  .connect(process.env.MANGO_URL)
  .then(() => console.log("MongoDb connected successfully"))
  .catch((error) => console.log(error));
