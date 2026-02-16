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

module.exports =router