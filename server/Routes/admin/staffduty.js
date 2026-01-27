const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const bcrypt =require('bcryptjs');
const StaffDuty = require('../../models/StaffDuty');
const { body, validationResult } = require('express-validator');

router.get('/fetchstaffdutybyinput',async (req,res)=>{
    try {
    // const {shift_id,dutydate}=req.body;
    
        //const routes=await Routes.find({});

    const staffduties=await StaffDuty.find({shift:req.header('shift_id'),dutyDate:req.header('dutydate')});
    //const questions=await Questions.find({user:req.user.id});
        res.json(staffduties)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallstaffduties',fetchuser,async (req,res)=>{
    try {
    
    const staffduties=await StaffDuty.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(staffduties)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addstaffduty',fetchuser,async (req,res)=>{
    try {
        let success = false;
        const {staff,shift,dutyDate,duty_type,status}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        console.log(status);
        staff.forEach(async function(stf,index) {
            // console.log(stf,shift[index],duty_type[index])
            await StaffDuty.create(
                { staff:stf,shift:shift[index],dutyDate:dutyDate,duty_type:duty_type[index],status:status[index]})
                        
                        
        });
        // const staffduty=new StaffDuty({
        //     staff,shift,dutyDate,duty_type,status
        // })
        // const savedStaffDuty=await staffduty.save();
        success=true;
        res.json({success})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatestaffduty/:id',fetchuser,async (req,res)=>{
    const {staff,shift,dutyDate,duty_type,status}=req.body;
   
    const newStaffDuty={};
    if(staff){newStaffDuty.staff=staff};
    if(shift){newStaffDuty.shift=shift};
    if(dutyDate){newStaffDuty.dutyDate=dutyDate};
    if(duty_type){newStaffDuty.duty_type=duty_type};
    if(status){newStaffDuty.status=status};

    let staffduty=await StaffDuty.findById(req.params.id);
    if(!staffduty){return res.status(404).send("Not Found")}


    staffduty =await StaffDuty.findByIdAndUpdate(req.params.id,{$set:newStaffDuty},{new:true})
    res.json({success: true, data:staffduty});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletestaffduty/:id',fetchuser,async (req,res)=>{

    let staffduty=await StaffDuty.findById(req.params.id);
    if(!staffduty){return res.status(404).send("Not Found")}

    

    staffduty =await StaffDuty.findByIdAndDelete(req.params.id)
    res.json({"Success":"Staff Duty has been deleted.",staffduty:staffduty});
})
module.exports = router