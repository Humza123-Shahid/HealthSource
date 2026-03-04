const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Nurse = require('../../models/Nurse');
const Staff = require("../../models/Staff");
const Ward = require("../../models/Ward");
const { body, validationResult } = require('express-validator');
const qualifications = ['BSc Nursing', 'Diploma in Nursing', 'MSc Nursing', 'Certificate in Midwifery'];

const randomLicense = () => 'LN' + Math.floor(Math.random() * 1000000);
router.post("/addbulknurse", async (req, res) => {
  try {
    let success = false;

  const staffIds = await Staff.find().select("_id");;
  const wardIds = await Ward.find().select("_id");

  if (staffIds.length === 0 || wardIds.length === 0) {
    console.log('No staff or ward records found. Please add them first.');
    
    return;
  }

  let nurses = [];

  for (let i = 0; i < 1000; i++) {
    const nurse = {
      staff: staffIds[Math.floor(Math.random() * staffIds.length)],
      qualification: qualifications[Math.floor(Math.random() * qualifications.length)],
      licenseNumber: randomLicense(),
      assignedWard: wardIds[Math.floor(Math.random() * wardIds.length)]
    };

    nurses.push(nurse);
  }

  await Nurse.insertMany(nurses);
  console.log('1000 nurse records inserted');
  success=true;
    res.json({success})
  }catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
    //process.exit(1);
  }
})
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