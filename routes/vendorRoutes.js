const {vendorRegister,vendorLogin,getAllVendors,getVendorById}=require('../controllers/vendorController')

const express=require('express')

const router=express.Router()


router.post('/register',vendorRegister)    // /register=endpoint

router.post('/login',vendorLogin) 
router.get('/all-vendors',getAllVendors) 
router.get('/single-vendor/:id',getVendorById) 

module.exports=router