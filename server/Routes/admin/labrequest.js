const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const bcrypt =require('bcryptjs');
const LabRequest = require('../../models/LabRequest');
const Patient = require("../../models/Patient");
const Doctor = require("../../models/Doctor");
const LabTest = require("../../models/LabTest");
const { body, validationResult } = require('express-validator');

router.post('/addbulklabrequest',async (req,res)=>{
  try {
    let success = false;

    // Fetch required referenced data
    const patients = await Patient.find().select("_id");
    const doctors = await Doctor.find().select("_id");
    const tests = await LabTest.find().select("_id");

    if (patients.length === 0 || doctors.length === 0 || tests.length === 0) {
      console.log("Patient / Doctor / LabTest data missing. Insert them first.");
      return;
    }

    const priorityList = ['routine','urgent','stat'];
    const statusList = ['pending','processing','completed','cancelled'];

    const labRequests = [];

    for (let i = 0; i < 1000; i++) {

      const randomPatient =
        patients[Math.floor(Math.random() * patients.length)];

      const randomDoctor =
        doctors[Math.floor(Math.random() * doctors.length)];

      const randomTest =
        tests[Math.floor(Math.random() * tests.length)];

      const randomPriority =
        priorityList[Math.floor(Math.random() * priorityList.length)];

      const randomStatus =
        statusList[Math.floor(Math.random() * statusList.length)];

      // Random past date within last 30 days
      const randomDate = new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
      );

      labRequests.push({
        patient: randomPatient._id,
        doctor: randomDoctor._id,
        test: randomTest._id,
        requestDate: randomDate,
        priority: randomPriority,
        status: randomStatus,
        notes: `Auto generated lab request ${i + 1}`
      });
    }

    await LabRequest.insertMany(labRequests);

    console.log("1000 LabRequest records inserted successfully");
    success=true;
    res.json({success})

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
})
// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchalllabrequests',fetchuser,async (req,res)=>{
    try {
    
    const labrequests=await LabRequest.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(labrequests)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addlabrequest',fetchuser,[
    body('notes').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {patient,doctor,test,requestDate,priority,status,notes}=req.body;
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const labrequest=new LabRequest({
            patient,doctor,test,requestDate,priority,status,notes
        })
        const savedLabRequest=await labrequest.save();
        success=true;
        res.json({success,data:savedLabRequest})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatelabrequest/:id',fetchuser,async (req,res)=>{
    const {patient,doctor,test,requestDate,priority,status,notes}=req.body;
    const newLabRequest={};
    if(patient){newLabRequest.patient=patient};
    if(doctor){newLabRequest.doctor=doctor};
    if(test){newLabRequest.test=test};
    if(requestDate){newLabRequest.requestDate=requestDate};
    if(priority){newLabRequest.priority=priority};
    if(status){newLabRequest.status=status};
    if(notes){newLabRequest.notes=notes};

    let labrequest=await LabRequest.findById(req.params.id);
    if(!labrequest){return res.status(404).send("Not Found")}


    labrequest =await LabRequest.findByIdAndUpdate(req.params.id,{$set:newLabRequest},{new:true})
    res.json({success: true, data:labrequest});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletelabrequest/:id',fetchuser,async (req,res)=>{

    let labrequest=await LabRequest.findById(req.params.id);
    if(!labrequest){return res.status(404).send("Not Found")}

    

    labrequest =await LabRequest.findByIdAndDelete(req.params.id)
    res.json({"Success":"Lab Request has been deleted.",labrequest:labrequest});
})
module.exports = router