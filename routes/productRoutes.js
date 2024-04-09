const express=require('express')

const {addProduct,getProductsByFirm, deleteProductById}=require('../controllers/productController')

const router=express.Router()

router.post('/add-product/:firmId',addProduct)

router.get('/:firmId/products',getProductsByFirm)

router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName
    res.headersSent('Content-Type',"image/jpeg")
    res.sendFile(path.join(__dirname,"..","uploads",imageName))
 })

 router.delete('/:productId',deleteProductById)

module.exports=router
