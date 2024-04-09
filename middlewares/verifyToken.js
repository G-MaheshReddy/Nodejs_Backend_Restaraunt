const Vendor = require("../models/Vendor");

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv").config();

const MySecretKey = process.env.SecretKey;

// create a middleware
const verifyToken = async (req, res, next) => {
  const token = req.headers.token; // sending token through headers
  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }
  try {
    const decoded = jwt.verify(token, MySecretKey);
    const vendor = await Vendor.findById(decoded.vendorId);
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    req.vendorId = vendor._id;
    next();
  } catch (error) {
    console.log(error)
    return res.status(500).json({error:'Invalid Token'})
  }
};

module.exports=verifyToken;
