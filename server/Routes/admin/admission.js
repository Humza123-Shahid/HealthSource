const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const bcrypt =require('bcryptjs');
const Admission = require('../../models/Admission');
const Patient = require("../../models/Patient");
const Doctor = require("../../models/Doctor");
const Ward = require("../../models/Ward");
const Room = require("../../models/Room");
const Bed = require("../../models/Bed");
const { body, validationResult } = require('express-validator');

router.post('/addbulkadmission',async (req,res)=>{
  try {
    let success = false;
    // Fetch required referenced data
    const patients = await Patient.find().select("_id");
    const doctors = await Doctor.find().select("_id");
    const wards = await Ward.find().select("_id");
    const rooms = await Room.find().select("_id");
    const beds = await Bed.find().select("_id");

    if (
      patients.length === 0 ||
      doctors.length === 0 ||
      wards.length === 0 ||
      rooms.length === 0 ||
      beds.length === 0
    ) {
      console.log("Required referenced data missing. Insert base tables first.");
      return;
    }

    const statusList = ["admitted", "discharged", "transferred"];
    const reasons = [
      "Fever",
      "Accident Injury",
      "Routine Checkup",
      "Surgery",
      "Chest Pain",
      "Infection",
      "Observation"
    ];

    const conditions = ["Stable", "Critical", "Serious", "Under Observation"];

    const admissions = [];

    for (let i = 0; i < 1000; i++) {
      const randomPatient =
        patients[Math.floor(Math.random() * patients.length)];

      const randomDoctor =
        doctors[Math.floor(Math.random() * doctors.length)];

      const randomWard =
        wards[Math.floor(Math.random() * wards.length)];

      const randomRoom =
        rooms[Math.floor(Math.random() * rooms.length)];

      const randomBed =
        beds[Math.floor(Math.random() * beds.length)];

      const randomStatus =
        statusList[Math.floor(Math.random() * statusList.length)];

      const randomReason =
        reasons[Math.floor(Math.random() * reasons.length)];

      const randomCondition =
        conditions[Math.floor(Math.random() * conditions.length)];

      // Random admission date (last 30 days)
      const admissionDate = new Date();
      admissionDate.setDate(admissionDate.getDate() - Math.floor(Math.random() * 30));

      // Random discharge date (only if discharged)
      let dischargeDate = null;
      if (randomStatus === "discharged") {
        dischargeDate = new Date(admissionDate);
        dischargeDate.setDate(
          dischargeDate.getDate() + Math.floor(Math.random() * 10) + 1
        );
      }

      admissions.push({
        patient: randomPatient._id,
        admittingDoctor: randomDoctor._id,
        ward: randomWard._id,
        room: randomRoom._id,
        bed: randomBed._id,
        admissionDate,
        dischargeDate,
        reason: randomReason,
        conditionOnAdmission: randomCondition,
        status: randomStatus
      });
    }

    await Admission.insertMany(admissions);

    console.log("1000 Admission records inserted successfully");
    success=true;
    res.json({success})
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
})

// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchalladmissions',fetchuser,async (req,res)=>{
    try {
    
    const admissions=await Admission.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(admissions)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addadmission',fetchuser,[
    body('reason').isLength({ min: 1 })||
    body('conditionOnAdmission').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {patient,admittingDoctor,ward,room,bed,admissionDate,dischargeDate,reason,conditionOnAdmission,status}=req.body;
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const admission=new Admission({
            patient,admittingDoctor,ward,room,bed,admissionDate,dischargeDate,reason,conditionOnAdmission,status
        })
        const savedAdmission=await admission.save();
        success=true;
        res.json({success,data:savedAdmission})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updateadmission/:id',fetchuser,async (req,res)=>{
    const {patient,admittingDoctor,ward,room,bed,admissionDate,dischargeDate,reason,conditionOnAdmission,status}=req.body;
    const newAdmission={};
    if(patient){newAdmission.patient=patient};
    if(admittingDoctor){newAdmission.admittingDoctor=admittingDoctor};
    if(ward){newAdmission.ward=ward};
    if(room){newAdmission.room=room};
    if(bed){newAdmission.bed=bed};
    if(admissionDate){newAdmission.admissionDate=admissionDate};
    if(dischargeDate){newAdmission.dischargeDate=dischargeDate};
    if(reason){newAdmission.reason=reason};
    if(conditionOnAdmission){newAdmission.conditionOnAdmission=conditionOnAdmission};
    if(status){newAdmission.status=status};

    let admission=await Admission.findById(req.params.id);
    if(!admission){return res.status(404).send("Not Found")}


    admission =await Admission.findByIdAndUpdate(req.params.id,{$set:newAdmission},{new:true})
    res.json({success: true, data:admission});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deleteadmission/:id',fetchuser,async (req,res)=>{

    let admission=await Admission.findById(req.params.id);
    if(!admission){return res.status(404).send("Not Found")}

    

    admission =await Admission.findByIdAndDelete(req.params.id)
    res.json({"Success":"Admission has been deleted.",admission:admission});
})
module.exports = router