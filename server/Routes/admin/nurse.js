const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Nurse = require('../../models/Nurse');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Nurses using :GET "/api/nurses/fetchallnurses".Login required
router.get('/fetchallnurses',fetchuser,async (req,res)=>{
    try {
    
    const nurses=await Nurse.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(nurses)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Nurse using :POST "/api/nurses/addnurses".Login required
router.post('/addnurse',fetchuser,[
    body('qualification').isLength({ min: 1 }),
    body('licenseNumber').isLength({ min: 1 }),

],async (req,res)=>{
    try {
        
        let success = false;
        const {staff,qualification,licenseNumber,assignedWard}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const nurse=new Nurse({
            staff,qualification,licenseNumber,assignedWard
        })
        const savedNurse=await nurse.save();
        success=true;
        res.json({success,data:savedNurse})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Nurse using :PUT "/api/nurses/updatenurses".Login required
router.put('/updatenurse/:id',fetchuser,async (req,res)=>{
    const {staff,qualification,licenseNumber,assignedWard}=req.body;
    const newNurse={};
    if(staff){newNurse.staff=staff};
    if(qualification){newNurse.qualification=qualification};
    if(licenseNumber){newNurse.licenseNumber=licenseNumber};
    if(assignedWard){newNurse.assignedWard=assignedWard};

    let nurse=await Nurse.findById(req.params.id);
    if(!nurse){return res.status(404).send("Not Found")}


    nurse =await Nurse.findByIdAndUpdate(req.params.id,{$set:newNurse},{new:true})
    res.json({success: true, data:nurse});
})
// ROUTE 4: Delete an existing Nurse using :DELETE "/api/nurses/deletenurses".Login required
router.delete('/deletenurse/:id',fetchuser,async (req,res)=>{

    let nurse=await Nurse.findById(req.params.id);
    if(!nurse){return res.status(404).send("Not Found")}

    

    nurse =await Nurse.findByIdAndDelete(req.params.id)
    res.json({"Success":"Nurse has been deleted.",nurse:nurse});
})
module.exports = router