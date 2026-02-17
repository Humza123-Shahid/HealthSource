// import { Resend } from 'resend';
const express=require('express');
const router= express.Router();
// const { Resend } = require("resend");
const nodemailer = require('nodemailer');
var fetchuser=require('../../middleware/fetchuser');
const uploadpatient = require("../../middleware/uploadpatient");
const Patient = require('../../models/Patient');
const User = require('../../models/User');

var jwt = require('jsonwebtoken');

const { body, validationResult } = require('express-validator');

const JWT_SECRET="Harryisagoodboy";
// const resend = new Resend('re_PkjWpM7Z_8KwhZak8yBrochjoZPWbsUCU');
// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallpatients',async (req,res)=>{
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
router.post('/addpatient',uploadpatient.single("file"),[
    body('email').isEmail(),
    body('firstName').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        // const {firstName,lastName,fatherName,gender,dateOfBirth,age,nationalId,contact,address,maritalStatus,bloodGroup,disabilities,chronicConditions,registrationDate,photoUrl,status}=req.body;
        // const {firstName,lastName,fatherName,gender,dateOfBirth,age,nationalId,contact,address,maritalStatus,bloodGroup,disabilities,chronicConditions,registrationDate,status}=req.body;        
        // const errors = validationResult(req);
        // console.log(req.file?.path)
        // if (!errors.isEmpty()) {
        // return res.status(400).json({ success,errors: errors.array() });
        // }
        // const patient=new Patient({
        //    firstName,lastName,fatherName,gender,dateOfBirth,age,nationalId,contact,address,maritalStatus,bloodGroup,disabilities,chronicConditions,registrationDate,photoPath: req.file?.path,status
        // })
        const {firstName,lastName,email,password,fatherName,gender,dateOfBirth,age,nationalId,contact,address,maritalStatus,bloodGroup,disabilities,chronicConditions,registrationDate,status}=req.body;        
        const errors = validationResult(req);
        console.log(req.file?.path)
        const finalData = { firstName,lastName,email,password,fatherName,gender,dateOfBirth,age,nationalId,contact,address,maritalStatus,bloodGroup,disabilities,chronicConditions,registrationDate,photoPath: req.file?.path };
            if (status!="undefined") {
                finalData.status = status;
        }
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        let userone=await User.findOne({email:email})
        console.log(userone)
        let userpatient=await Patient.findOne({email:email})
        console.log(userpatient)
            if(userone||userpatient){
                return res.status(400).json({success,error:"Sorry a user with this email already exists"})
            }
        const patient=new Patient(finalData)
        const savedPatient=await patient.save();
         const data={
              user:{
                id:savedPatient.id
              }
            }
            const authtoken=jwt.sign(data,JWT_SECRET) 
            // const { dataEmail, error } = await resend.emails.send({
            // from: 'onboarding@resend.dev', // Use your verified domain in production
            // to: [email],
            // subject: 'Welcome to HealthSource!',
            // html: `<strong>Hey ${firstName},</strong><br>Thanks for signing up!`,
            // });

            // if (error) {
            //     console.log(error);
            // return res.status(400).json({ error });
            // }
            const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'humzashahid2068@gmail.com',
                pass: 'waqc dkqq kvrq rbxe' // NOT your regular password
            }
            });

            const mailOptions = {
            from: '"Humza Shahid" <humzashahid2068@gmail.com>',
            to: [email],
            subject: 'Welcome to HealthSource!',
            html:`<strong>Hey ${firstName},</strong><br>Thanks for signing up!`
            };

            transporter.sendMail(mailOptions, (error, info) => {
            if (error) 
            // {console.log(error);
        {
            return res.status(400).json({ error });

            }
            else{ console.log('Email sent: ' + info.response);
            }
            });
        success=true;
        userTypeId= patient._id;
        res.json({success,authtoken,data:savedPatient,userTypeId})

        // res.json({success,authtoken,data:savedPatient,data2:dataEmail,message: 'User created and email sent!',userTypeId})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatepatient/:id',fetchuser,uploadpatient.single('file'),async (req,res)=>{
    const {firstName,lastName,fatherName,email,password,gender,dateOfBirth,age,nationalId,contact,address,maritalStatus,bloodGroup,disabilities,chronicConditions,registrationDate,status}=req.body;
    const newPatient={};
    console.log(req.file)
    if(firstName){newPatient.firstName=firstName};
    if(lastName){newPatient.lastName=lastName};
    if(email){newPatient.email=email};
    if(password){newPatient.password=password};
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
    if (req.file) {
    newPatient.photoPath = req.file.path; // overwrite only if new file
  }
    // if(photoUrl){newPatient.photoUrl=photoUrl};
    if(status){newPatient.status=status};

    let patient=await Patient.findById(req.params.id);
    if(!patient){return res.status(404).send("Not Found")}
    let userone=await User.findOne({email:email})
    let userpatient=await Patient.findOne({email:email})
        if(userone||userpatient){
            return res.status(400).json({success,error:"Sorry a user with this email already exists"})
        }

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