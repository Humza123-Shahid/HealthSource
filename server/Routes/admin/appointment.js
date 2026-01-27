const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const bcrypt =require('bcryptjs');
const Appointment = require('../../models/Appointment');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallappointments',fetchuser,async (req,res)=>{
    try {
    
    const appointments=await Appointment.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(appointments)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addappointment',fetchuser,async (req,res)=>{
    try {
        let success = false;
        const {patient,doctor,appointmentDate,bookingType,status,notes}=req.body;
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const appointment=new Appointment({
            patient,doctor,appointmentDate,bookingType,status,notes
        })
        const savedAppointment=await appointment.save();
        success=true;
        res.json({success,data:savedAppointment})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updateappointment/:id',fetchuser,async (req,res)=>{
    const {patient,doctor,appointmentDate,bookingType,status,notes}=req.body;
   
    const newAppointment={};
    if(patient){newAppointment.patient=patient};
    if(doctor){newAppointment.doctor=doctor};
    if(appointmentDate){newAppointment.appointmentDate=appointmentDate};
    if(bookingType){newAppointment.bookingType=bookingType};
    if(status){newAppointment.status=status};
    if(notes){newAppointment.notes=notes};

    let appointment=await Appointment.findById(req.params.id);
    if(!appointment){return res.status(404).send("Not Found")}


    appointment =await Appointment.findByIdAndUpdate(req.params.id,{$set:newAppointment},{new:true})
    res.json({success: true, data:appointment});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deleteappointment/:id',fetchuser,async (req,res)=>{

    let appointment=await Appointment.findById(req.params.id);
    if(!appointment){return res.status(404).send("Not Found")}

    

    appointment =await Appointment.findByIdAndDelete(req.params.id)
    res.json({"Success":"Appointment has been deleted.",appointment:appointment});
})
module.exports = router