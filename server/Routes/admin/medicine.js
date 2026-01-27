const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const bcrypt =require('bcryptjs');
const Medicine = require('../../models/Medicine');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallmedicines',fetchuser,async (req,res)=>{
    try {
    
    const medicines=await Medicine.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(medicines)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addmedicine',fetchuser,[
    body('name').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {name,category,manufacturer,form,unitPrice,stock,expiryDate,batchNumber,upc}=req.body;
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const medicine=new Medicine({
            name,category,manufacturer,form,unitPrice,stock,expiryDate,batchNumber,upc
        })
        const savedMedicine=await medicine.save();
        success=true;
        res.json({success,data:savedMedicine})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatemedicine/:id',fetchuser,async (req,res)=>{
    const {name,category,manufacturer,form,unitPrice,stock,expiryDate,batchNumber,upc}=req.body;
   
    const newMedicine={};
    if(name){newMedicine.name=name};
    if(category){newMedicine.category=category};
    if(manufacturer){newMedicine.manufacturer=manufacturer};
    if(form){newMedicine.form=form};
    if(unitPrice){newMedicine.unitPrice=unitPrice};
    if(stock){newMedicine.stock=stock};
    if(expiryDate){newMedicine.expiryDate=expiryDate};
    if(batchNumber){newMedicine.batchNumber=batchNumber};
    if(upc){newMedicine.upc=upc};

    let medicine=await Medicine.findById(req.params.id);
    if(!medicine){return res.status(404).send("Not Found")}


    medicine =await Medicine.findByIdAndUpdate(req.params.id,{$set:newMedicine},{new:true})
    res.json({success: true, data:medicine});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletemedicine/:id',fetchuser,async (req,res)=>{

    let medicine=await Medicine.findById(req.params.id);
    if(!medicine){return res.status(404).send("Not Found")}

    

    medicine =await Medicine.findByIdAndDelete(req.params.id)
    res.json({"Success":"Medicine has been deleted.",medicine:medicine});
})
module.exports = router