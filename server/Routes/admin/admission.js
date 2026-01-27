const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const bcrypt =require('bcryptjs');
const Admission = require('../../models/Admission');
const { body, validationResult } = require('express-validator');


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