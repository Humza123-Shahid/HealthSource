const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const uploaddoctor = require("../../middleware/uploaddoctor");
const Doctor = require('../../models/Doctor');
const Staff = require("../../models/Staff");

const { body, validationResult } = require('express-validator');

router.post('/addbulkdoctor',async (req,res)=>{
  try {
     let success = false;
    // Get all staff ids
    const staffList = await Staff.find().select("_id");

    if (staffList.length === 0) {
      console.log("No staff records found. Please insert staff first.");
      return;
    }

    const specializations = [
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "Dermatology",
      "Pediatrics",
      "General Surgery",
      "Radiology",
      "ENT"
    ];

    const doctors = [];

    for (let i = 0; i < 1000; i++) {
      const randomStaff =
        staffList[Math.floor(Math.random() * staffList.length)];

      const randomSpec =
        specializations[Math.floor(Math.random() * specializations.length)];

      doctors.push({
        staff: randomStaff._id,
        specializations: randomSpec,
        licenseNumber: "LIC-" + Math.floor(100000 + Math.random() * 900000),
        experienceYears: Math.floor(Math.random() * 30) + 1,
        consultationFee: Math.floor(Math.random() * 4000) + 500,
        onCall: Math.random() > 0.5,
        signaturePath: `/uploads/signatures/sign_${i}.png`,
        photoPath: `/uploads/photos/photo_${i}.jpg`
      });
    }

    await Doctor.insertMany(doctors);

    console.log("1000 Doctor records inserted successfully");
    success=true;
    res.json({success})

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
})
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
// router.post('/adddoctor',fetchuser,uploaddoctor.single("file"),[
router.post('/adddoctor',fetchuser,uploaddoctor.fields([
  { name: 'signature', maxCount: 1 }, // Expects a single file from the 'profile' field
  { name: 'photo', maxCount: 1 }  // Expects up to 5 files from the 'gallery' field
]),[
    body('specializations').isLength({ min: 1 }),
    body('licenseNumber').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {staff,specializations,licenseNumber,experienceYears,consultationFee,onCall}=req.body;
        console.log(req.files[0]?.path)
        console.log(req.files[1]?.path)
        // const profileFile = req.files['profile'] ? req.files['profile'][0] : null;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const doctor=new Doctor({
            staff,specializations,licenseNumber,experienceYears,consultationFee,onCall,signaturePath:req.files['signature'][0]?.path,photoPath:req.files['photo'][0]?.path
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
router.put('/updatedoctor/:id',fetchuser,uploaddoctor.fields([
  { name: 'signature', maxCount: 1 }, // Expects a single file from the 'profile' field
  { name: 'photo', maxCount: 1 }  // Expects up to 5 files from the 'gallery' field
]),async (req,res)=>{
    const {staff,specializations,licenseNumber,experienceYears,consultationFee,onCall}=req.body;
    const newDoctor={};
    if(staff){newDoctor.staff=staff};
    if(specializations){newDoctor.specializations=specializations};
    if(licenseNumber){newDoctor.licenseNumber=licenseNumber};
    if(experienceYears){newDoctor.experienceYears=experienceYears};
    if(consultationFee){newDoctor.consultationFee=consultationFee};
    newDoctor.onCall=onCall;
    if (req.files['signature']) {
    newDoctor.signaturePath = req.files['signature'][0]?.path; // overwrite only if new file
  }
  if (req.files['photo']) {
    newDoctor.photoPath = req.files['photo'][0]?.path // overwrite only if new file
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