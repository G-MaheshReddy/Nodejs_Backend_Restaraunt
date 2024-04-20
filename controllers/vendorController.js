const Vendor = require("../models/Vendor");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv=require('dotenv').config()


const MySecretKey=process.env.SecretKey;

const vendorRegister = async (req, res) => {
  //username,email,password all three coming from input fields.so req.body

  const { username, email, password } = req.body;
  try {
    const vendorEmail = await Vendor.findOne({ email }); //checking email from vendor
    if (vendorEmail) {
      //email already in database
      return res.status(401).json("Email alreay used");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //create an instance to store the input values that are coming from req.body in database

    const newVendor = new Vendor({
      username,
      email,
      password: hashedPassword,
    });

    await newVendor.save();
    res.status(201).json({ message: "vendor registered succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const vendorLogin = async (req,res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor || !(await bcrypt.compare(password, vendor.password))){  //password that is coming from database.
        return res.status(401).json({ error: "Invalid username or password" });
    } 
    //generate token
    const token=jwt.sign({vendorId:vendor._id},MySecretKey,{expiresIn:'6d'})
    const vendorId = vendor._id;
    res.status(200).json({success:'Login Successful',token,email,vendorId})
    console.log(email,password,'jwt token is',token)
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};


const getAllVendors=async(req,res)=>{
  try {

    const vendors=await Vendor.find().populate('firm')
    res.json({vendors})
    
  } catch (error) {
    console.log(error);
    res.status(500).json('internal server error')
    
  }
}


const getVendorById=async(req,res)=>{
  const vendorId=req.params.id;
  try {

    const vendor=await Vendor.findById(vendorId).populate('firm')
    if(!vendor){
      return res.status(404).json({msg:"vendor not found"})
    }
    const vendorRestId=vendor.firm[0].id;
    res.status(200).json({vendor,vendorRestId,vendorId})
    
  } catch (error) {
    console.log(error);
    res.status(500).json('internal server error')
    
  }
}

module.exports = { vendorRegister, vendorLogin,getAllVendors,getVendorById };