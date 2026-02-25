const express=require('express');
const User =require('../../models/User')
const Patient =require('../../models/Patient')

const Role =require('../../models/Role')
const router= express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt =require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser=require('../../middleware/fetchuser');

const JWT_SECRET="Harryisagoodboy";

// ROUTE 1: Create a User using:POST "/api/auth/createuser".No login required
router.post('/registeruser',[
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 3 })
],async (req,res)=>{
  console.log("function connected");
   let success=false;
    //If there are errors,return Bad request and the errors
 const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    //Check whether the user with this email exists already
    try{

    let user=await User.findOne({username:req.body.name})
    if(user){
        return res.status(400).json({success,error:"Sorry a user with this user name alreaddy exists"})
    }
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    user=await User.create({
      staff:req.body.staffId,
      patient:req.body.patientId,
      username: req.body.name,
      password: secPass,
      role:req.body.roleId
    })
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET)   
    success=true;  
    const userRole=await Role.findById(user.role)
    const userType=userRole.name;
    let userTypeId;
    if(userType=='Patient')
      {
        userTypeId= req.body.patientId

      } 
    else if(userType=='Doctor'||userType=='Nurse')
    {
        userTypeId= req.body.staffId

    }
    //res.json(user) 
    res.json({success,authtoken,userType,userTypeId}) 
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }   
});
// ROUTE 2: Authenticate a User using:POST "/api/auth/login".No login required
router.post('/login',[ 
    body('password').exists()
],async (req,res)=>{
 let success=false;
  //If there are errors,return Bad request and the errors
 const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    const {email,password}=req.body
    try{
        // let user=await User.findOne({username});
        let user=await User.findOne({email});
        let patient=await Patient.findOne({email});
        console.log(user)
                console.log(patient)

        if(!user && !patient)
        {
          return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }
        if(user)
        {
          console.log("in user staff")
           //const passwordCompare= await bcrypt.compare(String(password),String(user.password));
           console.log(password)
            console.log(user.password)
        // const passwordCompare= password==user.password
        if(user.password!=password)
        {
          return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }  
        const data={
        user:{
            id:user.id
          }
        }
        const authtoken=jwt.sign(data,JWT_SECRET)  
        success=true;
        const userRole=await Role.findById(user.role)
        const userType=userRole.name; 
        let userTypeId;
        userTypeId= user.staff;
        // if(userType=='patient')
        //   {

        //     userTypeId= user.patient;

        //   } 
        // else if(userType=='doctor'||userType=='nurse')
        // {
            

        //}   
        res.json({success,authtoken,userType,userTypeId}) 
        }
        else{
           console.log("in patient staff")
          // const passwordCompare=await bcrypt.compare(password,patient.password);
          if(patient.password!=password)
          {
            return res.status(400).json({success,error:"Please try to login with correct credentials"});
          }  
           const data={
           patient:{
              id:patient._id
                }
              }
              const authtoken=jwt.sign(data,JWT_SECRET)  
              success=true;
              //const userRole=await Role.findById(user.role)
              const userType="patient"; 
              let userTypeId;
              userTypeId= patient._id;
              res.json({success,authtoken,userType,userTypeId}) 

        }
       

    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})
router.post('/forgot-password',async (req,res)=>{
 try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    const patient = await Patient.findOne({ email });

    if (!user && !patient) {
      return res.status(404).json({ message: "User not found" });
    }
    let resetToken =null;
    let resetEmail=null;
    if(user)
    {
      resetToken  = jwt.sign({ userId: user._id }, JWT_SECRET, {expiresIn: "10m",});
      resetEmail=user.email;
    }
    else if(patient)
    {
      resetToken  = jwt.sign({ patientId: patient._id }, JWT_SECRET, {expiresIn: "10m",});
      resetEmail=patient.email;
    }
    // Reset URL (React route)
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    // Email Transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "humzashahid2068@gmail.com",
        pass: "waqc dkqq kvrq rbxe",
      },
    });

    await transporter.sendMail({
      to: resetEmail,
      subject: "Password Reset",
      html: `
        <h3>Password Reset Request</h3>
        <p>Click link below to reset password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
      `,
    });

    res.json({ message: "Reset link sent to email" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
router.post('/reset-password/:token',async (req,res)=>{
 try {
    const { token } = req.params;
    const { password } = req.body;

    // Hash incoming token
    const decodedToken = jwt.verify(
      token,
      JWT_SECRET
    );
    if (!decodedToken) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // find the user with the id from the token
    const user = await User.findOne({ _id: decodedToken.userId });
    const patient = await Patient.findOne({ _id: decodedToken.patientId });

    if (!user && !patient) {
      return res.status(400).json({ message: "no user found" });
    }

    

    // Hash password
    if(user)
    {
   user.password =password;
    await user.save();
    }
 else if(patient)
    {
      patient.password =password;
    await patient.save();
    }
    res.json({ message: "Password reset successful" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
module.exports =router