const express = require("express");
const router = express.Router();
var fetchuser = require("../../middleware/fetchuser");
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");
const Appointment = require("../../models/Appointment");
const { body, validationResult } = require("express-validator");

const appointmentEmail = (data) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #edf2f7; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
    <div style="background-color: #004a99; padding: 25px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Appointment Confirmed</h1>
    </div>
    
    <div style="padding: 30px; background-color: #ffffff;">
      <p style="font-size: 16px; color: #4a5568;">Dear <strong>${data.patientName}</strong>,</p>
      <p style="color: #4a5568;">Your appointment has been successfully scheduled. Here are the details:</p>
      
      <div style="background-color: #f7fafc; border-left: 4px solid #004a99; padding: 20px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Doctor:</strong> ${data.doctorName}</p>
        
        <p style="margin: 5px 0;"><strong>Date:</strong> ${data.date}</p>
        <p style="margin: 5px 0;"><strong>Type:</strong> ${data.type}</p>
      </div>

      <p style="font-size: 14px; color: #718096; line-height: 1.5;">
        <strong>Important Instructions:</strong><br>
        • Please arrive 15 minutes before your scheduled time.<br>
        • Bring a valid ID and your insurance card.<br>
        • If you need to cancel, please do so 24 hours in advance.
      </p>

    </div>

    <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #edf2f7;">
      <p style="font-size: 12px; color: #a0aec0; margin: 0;">&copy; 2026 HealthCare Medical Center. All rights reserved.</p>
      <p style="font-size: 11px; color: #cbd5e0; margin-top: 10px;">This is a confidential medical communication.</p>
    </div>
  </div>
`;
// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get("/fetchallappointments", fetchuser, async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    //const questions=await Questions.find({user:req.user.id});
    res.json(appointments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post("/addappointment", fetchuser, async (req, res) => {
  try {
    let success = false;
    const { patient, doctor,appointmentDate, bookingType, status, notes } =
      req.body;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const appointment = new Appointment({
      patient,
      doctor,
      appointmentDate,
      bookingType,
      status,
      notes,
    });
    const savedAppointment = await appointment.save();
    
    success = true;
    res.json({ success, data: savedAppointment });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
router.post("/addappointmentbypatient", fetchuser, async (req, res) => {
  try {
    let success = false;
    const {patientEmail, patient, doctor, patientName,doctorName,appointmentDate, bookingType, status, notes } =
      req.body;
      console.log(patientEmail);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const appointment = new Appointment({
      patient,
      doctor,
      appointmentDate,
      bookingType,
      status,
      notes,
    });
    const savedAppointment = await appointment.save();
    const emailData = {
      patientName: patientName,
      doctorName: doctorName,
      date: appointmentDate,
      // time: req.body.time,
      type: bookingType,
      // portalUrl: 'https://yourmedicalsite.com/dashboard'
    };
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "humzashahid2068@gmail.com",
        pass: "waqc dkqq kvrq rbxe", // NOT your regular password
      },
    });

    const mailOptions = {
      from: '"Humza Shahid" <humzashahid2068@gmail.com>',
      to: [patientEmail],
      subject: "Appointment Booked Successfully!",
      html: appointmentEmail(emailData),
    };
    // `<strong>Hey ${firstName},</strong><br>Thanks for signing up!`
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) // {console.log(error);
      {
        console.log(error)
        return res.status(400).json({ error });
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    success = true;
    res.json({ success, data: savedAppointment });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put("/updateappointment/:id", fetchuser, async (req, res) => {
  const { patient, doctor, appointmentDate, bookingType, status, notes } =
    req.body;

  const newAppointment = {};
  if (patient) {
    newAppointment.patient = patient;
  }
  if (doctor) {
    newAppointment.doctor = doctor;
  }
  if (appointmentDate) {
    newAppointment.appointmentDate = appointmentDate;
  }
  if (bookingType) {
    newAppointment.bookingType = bookingType;
  }
  if (status) {
    newAppointment.status = status;
  }
  if (notes) {
    newAppointment.notes = notes;
  }

  let appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return res.status(404).send("Not Found");
  }

  appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { $set: newAppointment },
    { new: true },
  );
  res.json({ success: true, data: appointment });
});
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete("/deleteappointment/:id", fetchuser, async (req, res) => {
  let appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return res.status(404).send("Not Found");
  }

  appointment = await Appointment.findByIdAndDelete(req.params.id);
  res.json({
    Success: "Appointment has been deleted.",
    appointment: appointment,
  });
});
module.exports = router;
