const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Patient = require('../../models/Patient');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallpatients',fetchuser,async (req,res)=>{
    try {
    
    const patients=await Patient.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(patients)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addpatient',fetchuser,[
    body('firstName').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {firstName,lastName,fatherName,gender,dateOfBirth,age,nationalId,contact,address,maritalStatus,bloodGroup,disabilities,chronicConditions,registrationDate,photoUrl,status}=req.body;
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const patient=new Patient({
           firstName,lastName,fatherName,gender,dateOfBirth,age,nationalId,contact,address,maritalStatus,bloodGroup,disabilities,chronicConditions,registrationDate,photoUrl,status
        })
        const savedPatient=await patient.save();
        success=true;
        res.json({success,data:savedPatient})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatepatient/:id',fetchuser,async (req,res)=>{
    const {firstName,lastName,fatherName,gender,dateOfBirth,age,nationalId,contact,address,maritalStatus,bloodGroup,disabilities,chronicConditions,registrationDate,photoUrl,status}=req.body;
    const newPatient={};
    if(firstName){newPatient.firstName=firstName};
    if(lastName){newPatient.lastName=lastName};
    if(fatherName){newPatient.fatherName=fatherName};
    if(gender){newPatient.gender=gender};
    if(dateOfBirth){newPatient.dateOfBirth=dateOfBirth};
    if(age){newPatient.age=age};
    if(nationalId){newPatient.nationalId=nationalId};
    if(contact){newPatient.contact=contact};
    if(address){newPatient.address=address};
    
    if(maritalStatus){newPatient.maritalStatus=maritalStatus};
    if(bloodGroup){newPatient.bloodGroup=bloodGroup};
    if(disabilities){newPatient.disabilities=disabilities};
    if(chronicConditions){newPatient.chronicConditions=chronicConditions};
    if(registrationDate){newPatient.registrationDate=registrationDate};
    if(photoUrl){newPatient.photoUrl=photoUrl};
    if(status){newPatient.status=status};

    let patient=await Patient.findById(req.params.id);
    if(!patient){return res.status(404).send("Not Found")}


    patient =await Patient.findByIdAndUpdate(req.params.id,{$set:newPatient},{new:true})
    res.json({success: true, data:patient});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletepatient/:id',fetchuser,async (req,res)=>{

    let patient=await Patient.findById(req.params.id);
    if(!patient){return res.status(404).send("Not Found")}

    

    patient =await Patient.findByIdAndDelete(req.params.id)
    res.json({"Success":"Patient has been deleted.",patient:patient});
})
module.exports = router