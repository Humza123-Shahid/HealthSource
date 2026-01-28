const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const uploadstaff = require("../../middleware/uploadstaff");
const Staff = require('../../models/Staff');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallstaffs',async (req,res)=>{
    try {
    
    const staffs=await Staff.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(staffs)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addstaff',fetchuser,uploadstaff.single("file"),[
    body('firstName').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {firstName,lastName,designation,nationalId,gender,dob,address,contact,qualification,joiningDate,employmentType,salary,shift,status}=req.body;
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const staff=new Staff({
           firstName,lastName,designation,nationalId,gender,dob,address,contact,qualification,joiningDate,employmentType,salary,shift,photoPath: req.file?.path,status
        })
        const savedStaff=await staff.save();
        success=true;
        res.json({success,data:savedStaff})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatestaff/:id',fetchuser,uploadstaff.single("file"),async (req,res)=>{
    const {firstName,lastName,designation,nationalId,gender,dob,address,contact,qualification,joiningDate,employmentType,salary,shift,status}=req.body;
    const newStaff={};
    if(firstName){newStaff.firstName=firstName};
    if(lastName){newStaff.lastName=lastName};
    if(designation){newStaff.designation=designation};
    if(nationalId){newStaff.nationalId=nationalId};
    if(gender){newStaff.gender=gender};
    if(dob){newStaff.dob=dob};
    if(address){newStaff.address=address};
    if(contact){newStaff.contact=contact};
    if(qualification){newStaff.qualification=qualification};
    if(joiningDate){newStaff.joiningDate=joiningDate};
    if(employmentType){newStaff.employmentType=employmentType};
    if(salary){newStaff.salary=salary};
    if(shift){newStaff.shift=shift};
    // if(photoUrl){newStaff.photoUrl=photoUrl};
    if (req.file) {
    newStaff.photoPath = req.file.path; // overwrite only if new file
  }
    if(status){newStaff.status=status};

    let staff=await Staff.findById(req.params.id);
    if(!staff){return res.status(404).send("Not Found")}


    staff =await Staff.findByIdAndUpdate(req.params.id,{$set:newStaff},{new:true})
    res.json({success: true, data:staff});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletestaff/:id',fetchuser,async (req,res)=>{

    let staff=await Staff.findById(req.params.id);
    if(!staff){return res.status(404).send("Not Found")}

    

    staff =await Staff.findByIdAndDelete(req.params.id)
    res.json({"Success":"Staff has been deleted.",staff:staff});
})
module.exports = router