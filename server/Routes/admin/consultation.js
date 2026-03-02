const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const bcrypt =require('bcryptjs');
const Consultation = require('../../models/Consultation');
const Patient = require("../../models/Patient");           // adjust path
const Doctor = require("../../models/Doctor");             // adjust path
const Appointment = require("../../models/Appointment");
const { body, validationResult } = require('express-validator');

router.post('/addbulkconsultation',async (req,res)=>{
  try {
    let success = false;
    // Fetch reference data
    const patients = await Patient.find().select("_id");
    const doctors = await Doctor.find().select("_id");
    const appointments = await Appointment.find().select("_id");

    if (patients.length === 0 || doctors.length === 0) {
      console.log("Patient or Doctor records missing.");
      return;
    }

    const symptomsList = [
      "Fever and cough",
      "Headache",
      "Chest pain",
      "Back pain",
      "Shortness of breath",
      "Stomach ache",
      "General weakness"
    ];

    const diagnosisList = [
      "Viral Infection",
      "Hypertension",
      "Migraine",
      "Gastritis",
      "Asthma",
      "Flu",
      "Muscle Strain"
    ];

    const consultations = [];

    for (let i = 0; i < 1000; i++) {
      const randomPatient =
        patients[Math.floor(Math.random() * patients.length)];

      const randomDoctor =
        doctors[Math.floor(Math.random() * doctors.length)];

      const randomAppointment =
        appointments.length > 0
          ? appointments[Math.floor(Math.random() * appointments.length)]
          : null;

      const randomSymptoms =
        symptomsList[Math.floor(Math.random() * symptomsList.length)];

      const randomDiagnosis =
        diagnosisList[Math.floor(Math.random() * diagnosisList.length)];

      // Random follow-up date (within next 30 days)
      const followUp = new Date();
      followUp.setDate(followUp.getDate() + Math.floor(Math.random() * 30));

      consultations.push({
        patient: randomPatient._id,
        doctor: randomDoctor._id,
        appointment: randomAppointment ? randomAppointment._id : null,
        symptoms: randomSymptoms,
        diagnosis: randomDiagnosis,
        notes: "Auto generated consultation record",
        followUpDate: followUp,
        vitals: {
          temperature: (Math.random() * 2 + 97).toFixed(1), // 97–99 F
          bloodPressure: `${110 + Math.floor(Math.random()*30)}/${70 + Math.floor(Math.random()*20)}`,
          pulse: Math.floor(Math.random() * 40) + 60, // 60–100
          oxygenLevel: Math.floor(Math.random() * 5) + 95 // 95–99
        }
      });
    }

    await Consultation.insertMany(consultations);

    console.log("1000 Consultation records inserted successfully");
    success=true;
    res.json({success})

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
})
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