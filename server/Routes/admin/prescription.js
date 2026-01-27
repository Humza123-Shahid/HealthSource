const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const bcrypt =require('bcryptjs');
const Prescription = require('../../models/Prescription');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallprescriptions',fetchuser,async (req,res)=>{
    try {
    
    const prescriptions=await Prescription.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(prescriptions)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addprescription',fetchuser,[
    body('dosage').isLength({ min: 1 }),
    body('frequency').isLength({ min: 1 }),
    body('duration').isLength({ min: 1 }),
    body('instructions').isLength({ min: 1 }),
    body('notes').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {consultation,doctor,patient,issuedDate,notes,medicine,dosage,frequency,duration,instructions}=req.body;
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const prescription=new Prescription({
            consultation,doctor,patient,issuedDate,notes,medicines: {
        medicine: medicine,
        dosage: dosage,
        frequency: frequency,
        duration:duration,
        instructions:instructions
      },

        })
        const savedPrescription=await prescription.save();
        success=true;
        res.json({success,data:savedPrescription})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updateprescription/:id',fetchuser,async (req,res)=>{
    const {consultation,doctor,patient,issuedDate,notes,medicine,dosage,frequency,duration,instructions}=req.body;
    console.log(medicine)
    const newPrescription={};
    newPrescription.medicines={};
    if(consultation){newPrescription.consultation=consultation};
    if(doctor){newPrescription.doctor=doctor};
    if(patient){newPrescription.patient=patient};
    if(issuedDate){newPrescription.issuedDate=issuedDate};
    if(notes){newPrescription.notes=notes};
    if(medicine){newPrescription.medicines.medicine=medicine};
    if(dosage){newPrescription.medicines.dosage=dosage};
    if(frequency){newPrescription.medicines.frequency=frequency};
    if(duration){newPrescription.medicines.duration=duration};
    if(instructions){newPrescription.medicines.instructions=instructions};


    let prescription=await Prescription.findById(req.params.id);
    if(!prescription){return res.status(404).send("Not Found")}


    prescription =await Prescription.findByIdAndUpdate(req.params.id,{$set:newPrescription},{new:true})
    res.json({success: true, data:prescription});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deleteprescription/:id',fetchuser,async (req,res)=>{

    let prescription=await Prescription.findById(req.params.id);
    if(!prescription){return res.status(404).send("Not Found")}

    

    prescription =await Prescription.findByIdAndDelete(req.params.id)
    res.json({"Success":"Prescription has been deleted.",prescription:prescription});
})
module.exports = router