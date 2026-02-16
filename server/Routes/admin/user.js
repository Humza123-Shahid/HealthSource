const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const bcrypt =require('bcryptjs');
const User = require('../../models/User');
const Patient = require('../../models/Patient');

const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallusers',fetchuser,async (req,res)=>{
    try {
    
    const users=await User.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(users)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/adduser',fetchuser,[
    body('email').isLength({ min: 1 }),
     body('username').isLength({ min: 1 }),
    body('password').isLength({ min: 3 })
],async (req,res)=>{
    try {
        let success = false;
        const {staff,email,username,password,role}=req.body;
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        let userone=await User.findOne({email:email})
        let userpatient=await Patient.findOne({email:email})
            if(userone||userpatient){
                return res.status(400).json({success,error:"Sorry a user with this email already exists"})
            }
        const user=new User({
            staff,email,username,password,role
        })
        const savedUser=await user.save();
        success=true;
        res.json({success,data:savedUser})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updateuser/:id',fetchuser,async (req,res)=>{
    const {staff,email,username,password,role}=req.body;
   console.log(role)
    const newUser={};
    if(staff){newUser.staff=staff};
    // if(patient){newUser.patient=patient};
    if(email){newUser.email=email};

    if(username){newUser.username=username};
    if(password){newUser.password=password};
    newUser.role=role;

    let user=await User.findById(req.params.id);
    if(!user){return res.status(404).send("Not Found")}
    let userone=await User.findOne({email:email})
    let userpatient=await Patient.findOne({email:email})
        if(userone||userpatient){
            return res.status(400).json({success,error:"Sorry a user with this email already exists"})
        }

    user =await User.findByIdAndUpdate(req.params.id,{$set:newUser},{new:true})
    res.json({success: true, data:user});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deleteuser/:id',fetchuser,async (req,res)=>{

    let user=await User.findById(req.params.id);
    if(!user){return res.status(404).send("Not Found")}

    

    user =await User.findByIdAndDelete(req.params.id)
    res.json({"Success":"User has been deleted.",user:user});
})
module.exports = router