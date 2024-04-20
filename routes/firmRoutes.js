const express=require('express')

const{addFirm, deleteFirmById}=require('../controllers/firmController')

const verifyToken=require('../middlewares/verifyToken')

const router=express.Router()

router.post('/add-firm',verifyToken,addFirm)

// router.get('/uploads/:imageName',(req,res)=>{
//    const imageName=req.params.imageName
//    res.headersSent('Content-Type',"image/jpeg")
//    res.sendFile(path.join(__dirname,"..","uploads",imageName))
// })

router.get('/uploads/:imageName', (req, res) => {
   const imageName = req.params.imageName;
   res.header('Content-Type', 'image/jpeg');
   res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/:firmId',deleteFirmById)

module.exports=router;