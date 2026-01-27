const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const StaffAttendance = require('../../models/StaffAttendance');
const StaffDuty = require('../../models/StaffDuty');

const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallstaffattendances',fetchuser,async (req,res)=>{
    try {
    
    const staffattendances=await StaffAttendance.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(staffattendances)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addstaffattendance',fetchuser,async (req,res)=>{
    try {
        let success = false;
        // const {dutyIds,staffIds,typeValues,statusValues,date,checkIn,checkOut,status}=req.body;
        const {dutyIds,attendanceStatusValues}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        dutyIds.forEach(async function(dutyId,index) {
            await StaffAttendance.create(
                // { duty:dutyId,date,checkIn,checkOut,status})
                { duty:dutyId,status:attendanceStatusValues[index]})

            // const newStaffDuty={};
            // if(staffIds[index]){newStaffDuty.staff=staffIds[index]};
            // // newStaffDuty.shift=null;
            // // newStaffDuty.dutyDate="2026-01-15";
            // if(typeValues[index]){newStaffDuty.duty_type=typeValues[index]};
            // if(statusValues[index]){newStaffDuty.status=statusValues[index]};
            // const staffduty =await StaffDuty.findByIdAndUpdate(dutyId,{$set:newStaffDuty},{new:true})

                        
        });
       
       
        // const staffattendance=new StaffAttendance({
        //     staff,duty,date,checkIn,checkOut,status
        // })
        // const savedStaffAttendance=await staffattendance.save();

        success=true;
         res.json({success})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatestaffattendance/:id',fetchuser,async (req,res)=>{
    // const {duty,date,checkIn,checkOut,status}=req.body;
    const {duty,status}=req.body;

    const newStaffAttendance={};
    // if(staff){newStaffAttendance.staff=staff};
    if(duty){newStaffAttendance.duty=duty};
    // if(date){newStaffAttendance.date=date};
    // if(checkIn){newStaffAttendance.checkIn=checkIn};
    // if(checkOut){newStaffAttendance.checkOut=checkOut};
    // if(shift){newStaffAttendance.shift=shift};
    if(status){newStaffAttendance.status=status};

    
    let staffattendance=await StaffAttendance.findById(req.params.id);
    if(!staffattendance){return res.status(404).send("Not Found")}


    staffattendance =await StaffAttendance.findByIdAndUpdate(req.params.id,{$set:newStaffAttendance},{new:true})
    res.json({success: true, data:staffattendance});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletestaffattendance/:id',fetchuser,async (req,res)=>{

    let staffattendance=await StaffAttendance.findById(req.params.id);
    if(!staffattendance){return res.status(404).send("Not Found")}

    

    staffattendance =await StaffAttendance.findByIdAndDelete(req.params.id)
    res.json({"Success":"StaffAttendance has been deleted.",staffattendance:staffattendance});
})
module.exports = router