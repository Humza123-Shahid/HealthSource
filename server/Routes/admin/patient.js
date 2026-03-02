// import { Resend } from 'resend';
const express=require('express');
const router= express.Router();
// const { Resend } = require("resend");
const nodemailer = require('nodemailer');
var fetchuser=require('../../middleware/fetchuser');
const uploadpatient = require("../../middleware/uploadpatient");
const Patient = require('../../models/Patient');
const User = require('../../models/User');
const bcrypt = require("bcryptjs");

var jwt = require('jsonwebtoken');

const { body, validationResult } = require('express-validator');

const JWT_SECRET="Harryisagoodboy";
const welcomeTemplate = (userName) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #0056b3; padding: 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0;">HealthSource</h1>
    </div>
    <div style="padding: 30px; line-height: 1.6; color: #333333;">
      <h2 style="color: #0056b3;">Welcome to the Hospital, ${userName}!</h2>
      <p>Thank you for registering with our medical portal. We are committed to providing you with the best digital healthcare experience.</p>
      <p><strong>Next Steps:</strong></p>
      <ul>
        <li>Check your medical history profile.</li>
        <li>Book your first appointment online.</li>
        <li>Securely message your primary physician.</li>
      </ul>
      <div style="text-align: center; margin-top: 30px;">
        <a href="http://localhost:3000/login" style="background-color: #28a745; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Access Your Patient Portal</a>
      </div>
    </div>
    <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #777777;">
      <p>This is an automated message. Please do not reply directly to this email.</p>
      <p>Confidentiality Notice: This email is intended solely for the recipient.</p>
    </div>
  </div>
`;
// const resend = new Resend('re_PkjWpM7Z_8KwhZak8yBrochjoZPWbsUCU');
// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
const firstNames = ["Ali","Ahmed","Usman","Hassan","Bilal","Zain","Umar","Hamza"];
const lastNames = ["Khan","Ahmed","Malik","Sheikh","Raza","Iqbal","Shah","Butt"];
const genders = ["male","female","other"];
const maritalStatusArr = ["single","married","other"];
const bloodGroups = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// async function seedPatients() {
router.post('/addbulkpatient',async (req,res)=>{
  try {
    const patients = [];
let success = false;
    for (let i = 0; i < 1000; i++) {
      const firstName = getRandom(firstNames);
      const lastName = getRandom(lastNames);

      const hashedPassword = await bcrypt.hash("123456", 10);

      patients.push({
        firstName,
        lastName,
        email: `patient${i}@mail.com`, // unique email
        password: hashedPassword,
        fatherName: getRandom(firstNames) + " " + getRandom(lastNames),
        gender: getRandom(genders),
        dateOfBirth: getRandomDate(new Date(1960, 0, 1), new Date(2015, 0, 1)),
        age: Math.floor(Math.random() * 80) + 1,
        nationalId: Math.floor(1000000000000 + Math.random() * 9000000000000).toString(),
        contact: "03" + Math.floor(100000000 + Math.random() * 900000000),
        address: "Sample Address " + i,
        maritalStatus: getRandom(maritalStatusArr),
        bloodGroup: getRandom(bloodGroups),
        disabilities: "",
        chronicConditions: "",
        status: "active",
      });
    }

    await Patient.insertMany(patients);

    console.log("1000 Patients Inserted Successfully");
    success=true;
    res.json({success})
    // process.exit();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
    // process.exit(1);
  }
})
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
        success=true;
        userTypeId= patient._id;
        res.json({success,authtoken,data:savedPatient,userTypeId})

        // res.json({success,authtoken,data:savedPatient,data2:dataEmail,message: 'User created and email sent!',userTypeId})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.post('/addpatientonsignup',uploadpatient.single("file"),[
    body('email').isEmail(),
    body('firstName').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        
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
            html:welcomeTemplate(firstName)
            };
// `<strong>Hey ${firstName},</strong><br>Thanks for signing up!`
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