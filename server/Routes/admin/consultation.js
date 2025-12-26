const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const bcrypt =require('bcryptjs');
const Consultation = require('../../models/Consultation');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallconsultations',fetchuser,async (req,res)=>{
    try {
    
    const consultations=await Consultation.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(consultations)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addconsultation',fetchuser,[
    body('symptoms').isLength({ min: 1 }),
    body('diagnosis').isLength({ min: 1 }),
    body('notes').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {patient,doctor,appointment,symptoms,diagnosis,notes,followUpDate,temperature,bloodPressure,pulse,oxygenLevel}=req.body;
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const consultation=new Consultation({
            patient,doctor,appointment,symptoms,diagnosis,notes,followUpDate,vitals: {
        temperature: temperature,
        bloodPressure: bloodPressure,
        pulse: pulse,
        oxygenLevel:oxygenLevel
      },
        })
        const savedConsultation=await consultation.save();
        success=true;
        res.json({success,data:savedConsultation})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updateconsultation/:id',fetchuser,async (req,res)=>{
    const {patient,doctor,appointment,symptoms,diagnosis,notes,followUpDate,temperature,bloodPressure,pulse,oxygenLevel}=req.body;
   console.log(bloodPressure)
    const newConsultation={};
    if(patient){newConsultation.patient=patient};
    if(doctor){newConsultation.doctor=doctor};
    if(appointment){newConsultation.appointment=appointment};
    if(symptoms){newConsultation.symptoms=symptoms};
    if(diagnosis){newConsultation.diagnosis=diagnosis};
    if(notes){newConsultation.notes=notes};
    if(followUpDate){newConsultation.followUpDate=followUpDate};
    if(temperature){newConsultation.vitals.temperature=temperature};
    if(bloodPressure){newConsultation.vitals.bloodPressure=bloodPressure};
    if(pulse){newConsultation.vitals.pulse=pulse};
    if(oxygenLevel){newConsultation.vitals.oxygenLevel=oxygenLevel};

    let consultation=await Consultation.findById(req.params.id);
    if(!consultation){return res.status(404).send("Not Found")}


    consultation =await Consultation.findByIdAndUpdate(req.params.id,{$set:newConsultation},{new:true})
    res.json({success: true, data:consultation});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deleteconsultation/:id',fetchuser,async (req,res)=>{

    let consultation=await Consultation.findById(req.params.id);
    if(!consultation){return res.status(404).send("Not Found")}

    

    consultation =await Consultation.findByIdAndDelete(req.params.id)
    res.json({"Success":"Consultation has been deleted.",consultation:consultation});
})
module.exports = router