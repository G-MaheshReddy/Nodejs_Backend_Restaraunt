const Firm = require("../models/Firm");

const Product = require("../models/Product");

const multer = require("multer");
const path=require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //destination folder where the uploaded images will be stored
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // generating a unique file name
  },
});
const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
  try {
    const { productName, price, category, bestSeller, description } = req.body;

    const image = req.file ? req.file.filename : undefined;

    const firmId = req.params.firmId;

    const firm = await Firm.findById(firmId);

    if (!firm) {
      return res.status(404).json({ msg: "No firm found" });
    }

    const product = new Product({
      productName,
      price,
      category,
      bestSeller,
      description,
      firm: firm._id,
    });

    const savedProduct = await product.save();

    firm.products.push(savedProduct);
    await firm.save();
    res.status(200).json({ savedProduct });
  } catch (error) {
    console.log(error);
    res.status(200).json("internal server error");
  }
};

const getProductsByFirm = async (req, res) => {
  try {
    const firmId = req.params.firmId;

    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(404).json({ msg: "No firm found" });
    }
    const restarauntName=firm.firmname
    const products=await Product.find({firm:firmId})  //pushing products to firm
    res.status(200).json({restarauntName,products });
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
};

const deleteProductById=async(req,res)=>{


    try {

        const productId=req.params.productId
        const deletedProduct=await Product.findByIdAndDelete(productId)
        if(!deletedProduct){
            return res.status(404).json({msg:'No Product Found'})
        }

        res.status(200).json({ message: "Product deleted successfully" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json("internal server error");
        
    }

}

module.exports = { addProduct: [upload.single("image"), addProduct] ,getProductsByFirm,deleteProductById};
