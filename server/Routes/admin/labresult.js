const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const uploadlabresult = require("../../middleware/uploadlabresult");

const bcrypt =require('bcryptjs');
const LabResult = require('../../models/LabResult');
const LabRequest = require("../../models/LabRequest"); // adjust path
const LabTest = require("../../models/LabTest");  
const { body, validationResult } = require('express-validator');

router.post('/addbulklabresult',async (req,res)=>{
  try {
     let success = false;

    // Fetch required references
    const labRequests = await LabRequest.find().select("_id");
    const labTests = await LabTest.find().select("_id");

    if (labRequests.length === 0) {
      console.log("No LabRequest records found. Insert them first.");
      return;
    }

    if (labTests.length === 0) {
      console.log("No LabTest records found. Insert them first.");
      return;
    }

    const unitsList = ["mg/dL", "g/dL", "IU/L", "mmol/L", "cells/mcL"];
    const remarksList = [
      "Normal",
      "Slightly elevated",
      "High",
      "Low",
      "Critical",
      "Within range"
    ];

    const labResults = [];

    for (let i = 1; i <= 1000; i++) {
      const randomRequest =
        labRequests[Math.floor(Math.random() * labRequests.length)];

      const randomTest =
        labTests[Math.floor(Math.random() * labTests.length)];

      const randomUnits =
        unitsList[Math.floor(Math.random() * unitsList.length)];

      const randomRemarks =
        remarksList[Math.floor(Math.random() * remarksList.length)];

      // Random date within last 30 days
      const randomDate = new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
      );

      labResults.push({
        labRequest: randomRequest._id,
        test: randomTest._id,
        resultValue: (Math.random() * 100).toFixed(2),
        units: randomUnits,
        remarks: randomRemarks,
        filePath: `/uploads/labresults/result_${i}.pdf`,
        resultDate: randomDate
      });
    }

    await LabResult.insertMany(labResults);

    console.log("1000 LabResult records inserted successfully");
    success=true;
    res.json({success})

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
})
// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchalllabresults',fetchuser,async (req,res)=>{
    try {
    
    const labresults=await LabResult.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(labresults)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addlabresult',fetchuser,uploadlabresult.single("file"),[
    body('resultValue').isLength({ min: 1 })||
    body('units').isLength({ min: 1 })||
    body('remarks').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {labRequest,test,resultValue,units,remarks,resultDate}=req.body;
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const labresult=new LabResult({
            labRequest,test,resultValue,units,remarks,filePath: req.file?.path,resultDate
        })
        const savedLabResult=await labresult.save();
        success=true;
        res.json({success,data:savedLabResult})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatelabresult/:id',fetchuser,uploadlabresult.single('file'),async (req,res)=>{
    const {labRequest,test,resultValue,units,remarks,resultDate}=req.body;
    const newLabResult={};
    if(labRequest){newLabResult.labRequest=labRequest};
    if(test){newLabResult.test=test};
    if(resultValue){newLabResult.resultValue=resultValue};
    if(units){newLabResult.units=units};
    if(remarks){newLabResult.remarks=remarks};
    if (req.file) {
        newLabResult.filePath = req.file.path; // overwrite only if new file
    }    
    if(resultDate){newLabResult.resultDate=resultDate};

    let labresult=await LabResult.findById(req.params.id);
    if(!labresult){return res.status(404).send("Not Found")}


    labresult =await LabResult.findByIdAndUpdate(req.params.id,{$set:newLabResult},{new:true})
    res.json({success: true, data:labresult});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletelabresult/:id',fetchuser,async (req,res)=>{

    let labresult=await LabResult.findById(req.params.id);
    if(!labresult){return res.status(404).send("Not Found")}

    

    labresult =await LabResult.findByIdAndDelete(req.params.id)
    res.json({"Success":"Lab Result has been deleted.",labresult:labresult});
})
module.exports = router