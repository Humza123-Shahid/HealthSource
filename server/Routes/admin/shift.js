const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const StaffShift = require('../../models/StaffShift');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallshifts',fetchuser,async (req,res)=>{
    try {
    
    const shifts=await StaffShift.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(shifts)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.post('/addshift',fetchuser,[
    body('name').isLength({ min: 1 }),
    body('startTime').isISO8601(),
    body('endTime').isISO8601()
],async (req,res)=>{
    try {
        let success = false;
        const {name,startTime,endTime,breakMinutes}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const shift=new StaffShift({
            name,startTime,endTime,breakMinutes
        })
        const savedShift=await shift.save();
        success=true;
        res.json({success,data:savedShift})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updateshift/:id',fetchuser,async (req,res)=>{
    const {name,startTime,endTime,breakMinutes}=req.body;
    const newShift={};
    if(name){newShift.name=name};
    if(startTime){newShift.startTime=startTime};
    if(endTime){newShift.endTime=endTime};
    if(breakMinutes){newShift.breakMinutes=breakMinutes};

    
    let shift=await StaffShift.findById(req.params.id);
    if(!shift){return res.status(404).send("Not Found")}


    shift =await StaffShift.findByIdAndUpdate(req.params.id,{$set:newShift},{new:true})
    res.json({success: true, data:shift});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deleteshift/:id',fetchuser,async (req,res)=>{

    let shift=await StaffShift.findById(req.params.id);
    if(!shift){return res.status(404).send("Not Found")}

    

    shift =await StaffShift.findByIdAndDelete(req.params.id)
    res.json({"Success":"Shift has been deleted.",shift:shift});
})
module.exports = router