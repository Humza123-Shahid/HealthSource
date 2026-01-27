const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const bcrypt =require('bcryptjs');
const PatientMedicalHistory = require('../../models/PatientMedicalHistory');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallpatientmedicalhistories',fetchuser,async (req,res)=>{
    try {
    
    const patientmedicalhistories=await PatientMedicalHistory.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(patientmedicalhistories)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addpatientmedicalhistory',fetchuser,[
    body('condition').isLength({ min: 1 })||
    body('treatment').isLength({ min: 1 })||
    body('status').isLength({ min: 1 })||
    body('notes').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {patient,doctor,condition,treatment,status,notes}=req.body;
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const patientmedicalhistory=new PatientMedicalHistory({
            patient,doctor,condition,treatment,status,notes
        })
        const savedPatientMedicalHistory=await patientmedicalhistory.save();
        success=true;
        res.json({success,data:savedPatientMedicalHistory})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatepatientmedicalhistory/:id',fetchuser,async (req,res)=>{
    const {patient,doctor,condition,treatment,status,notes}=req.body;
   
    const newPatientMedicalHistory={};
    if(patient){newPatientMedicalHistory.patient=patient};
    if(doctor){newPatientMedicalHistory.doctor=doctor};
    if(condition){newPatientMedicalHistory.condition=condition};
    if(treatment){newPatientMedicalHistory.treatment=treatment};
    if(status){newPatientMedicalHistory.status=status};
    if(notes){newPatientMedicalHistory.notes=notes};

    let patientmedicalhistory=await PatientMedicalHistory.findById(req.params.id);
    if(!patientmedicalhistory){return res.status(404).send("Not Found")}


    patientmedicalhistory =await PatientMedicalHistory.findByIdAndUpdate(req.params.id,{$set:newPatientMedicalHistory},{new:true})
    res.json({success: true, data:patientmedicalhistory});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletepatientmedicalhistory/:id',fetchuser,async (req,res)=>{

    let patientmedicalhistory=await PatientMedicalHistory.findById(req.params.id);
    if(!patientmedicalhistory){return res.status(404).send("Not Found")}

    

    patientmedicalhistory =await PatientMedicalHistory.findByIdAndDelete(req.params.id)
    res.json({"Success":"Patient Medical History has been deleted.",patientmedicalhistory:patientmedicalhistory});
})
module.exports = router