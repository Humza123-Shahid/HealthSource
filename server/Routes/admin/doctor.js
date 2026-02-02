const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const uploaddoctor = require("../../middleware/uploaddoctor");
const Doctor = require('../../models/Doctor');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchalldoctors',async (req,res)=>{
    try {
    
    const doctor=await Doctor.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(doctor)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/adddoctor',fetchuser,uploaddoctor.single("file"),[
    body('specializations').isLength({ min: 1 }),
    body('licenseNumber').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {staff,specializations,licenseNumber,experienceYears,consultationFee,onCall}=req.body;
        console.log(req.file?.path)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const doctor=new Doctor({
            staff,specializations,licenseNumber,experienceYears,consultationFee,onCall,signaturePath:req.file?.path
        })
        const savedDoctor=await doctor.save();
        console.log(savedDoctor);
        success=true;
        res.json({success,data:savedDoctor})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatedoctor/:id',fetchuser,uploaddoctor.single("file"),async (req,res)=>{
    const {staff,specializations,licenseNumber,experienceYears,consultationFee,onCall}=req.body;
    const newDoctor={};
    if(staff){newDoctor.staff=staff};
    if(specializations){newDoctor.specializations=specializations};
    if(licenseNumber){newDoctor.licenseNumber=licenseNumber};
    if(experienceYears){newDoctor.experienceYears=experienceYears};
    if(consultationFee){newDoctor.consultationFee=consultationFee};
    newDoctor.onCall=onCall;
    if (req.file) {
    newDoctor.signaturePath = req.file.path; // overwrite only if new file
  }
    // if(signatureUrl){newDoctor.signatureUrl=signatureUrl};

    let doctor=await Doctor.findById(req.params.id);
    if(!doctor){return res.status(404).send("Not Found")}


    doctor =await Doctor.findByIdAndUpdate(req.params.id,{$set:newDoctor},{new:true})
    res.json({success: true, data:doctor});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletdoctor/:id',fetchuser,async (req,res)=>{

    let doctor=await Doctor.findById(req.params.id);
    if(!doctor){return res.status(404).send("Not Found")}

    

    doctor =await Doctor.findByIdAndDelete(req.params.id)
    res.json({"Success":"Doctor has been deleted.",doctor:doctor});
})
module.exports = router