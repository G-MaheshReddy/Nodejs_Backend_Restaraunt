const Firm = require("../models/Firm");
const Vendor = require("../models/Vendor");
const multer = require("multer");
const path=require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //destination folder where the uploaded images will be stored
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname (file.originalname)); // generating a unique file name
  },
});
const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
  try {
    const { firmname, area, category, region, offer } = req.body;

    const image = req.file ? req.file.filename : undefined; //path for adding images

    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "vendor not found" });
    }

    if (vendor.firm.length > 0) { // it checks if the vendor has a firm (restaurant) associated with it.
      return res.status(400).json({ message: "Vendor can have only one Restaraunt" });
  }

    const firm = new Firm({
      firmname,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id,
    });

    const savedFirm=await firm.save();
    // the records should populate to vendor and pushed to vendor
    vendor.firm.push(savedFirm);
    await vendor.save()  //to save records in database

    const firmId = savedFirm._id
    const vendorFirmName = savedFirm.firmname

    return res.status(200).json({message:'Firm added successfully',firmId,vendorFirmName})
  } catch (error) {
    console.error(error)
    return res.status(500).json('Internal server error')
  }
};

const deleteFirmById=async(req,res)=>{
  try {
    const firmId=req.params.firmId

    const deleteFirm=await Firm.findByIdAndDelete(firmId)
    if(!deleteFirm){
      return res.status(404).json({msg:'No firm Found'})
    }
    res.status(200).json({msg:'Firm deleted successfully'})
    
  } catch (error) {
    console.error(error)
    return res.status(500).json('Internal server error')
    
  }
}

module.exports={addFirm:[upload.single('image'),addFirm],deleteFirmById}
