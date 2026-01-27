const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Surgery = require('../../models/Surgery');
const SurgeryTeam = require('../../models/SurgeryTeam');

const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallsurgeries',fetchuser,async (req,res)=>{
    try {
    
    const surgeries=await Surgery.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(surgeries)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addsurgery',fetchuser,[
    body('type').isLength({ min: 1 }),
    body('startTime').isISO8601(),
    body('endTime').isISO8601(),
    body('scheduledDate').isISO8601()
],async (req,res)=>{
    try {
        let success = false;
        const {patient,primarySurgeon,type,scheduledDate,startTime,endTime,operationTheatre,notes,staffs,roles}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const surgery=new Surgery({
            patient,primarySurgeon,type,scheduledDate,startTime,endTime,operationTheatre,notes
        })
        const savedSurgery=await surgery.save();
        staffs.forEach(async function(staff,index) {
            await SurgeryTeam.create(
                { surgery:savedSurgery._id,staff:staff.value,role:roles[index]})
            
            
        });
        success=true;
        res.json({success,data:savedSurgery})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatesurgery/:id',fetchuser,async (req,res)=>{
    const {patient,primarySurgeon,type,scheduledDate,startTime,endTime,operationTheatre,notes}=req.body;
    const newSurgery={};
    if(patient){newSurgery.patient=patient};
    // if(gender){newSurgery.gender=gender};
    // if(contact){newSurgery.contact=contact};
    if(primarySurgeon){newSurgery.primarySurgeon=primarySurgeon};
    if(type){newSurgery.type=type};
    if(scheduledDate){newSurgery.scheduledDate=scheduledDate};
    if(startTime){newSurgery.startTime=startTime};
    if(endTime){newSurgery.endTime=endTime};
    if(operationTheatre){newSurgery.operationTheatre=operationTheatre};
    if(notes){newSurgery.notes=notes};
    
    let surgery=await Surgery.findById(req.params.id);
    if(!surgery){return res.status(404).send("Not Found")}


    surgery =await Surgery.findByIdAndUpdate(req.params.id,{$set:newSurgery},{new:true})
    res.json({success: true, data:surgery});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletesurgery/:id',fetchuser,async (req,res)=>{

    let surgery=await Surgery.findById(req.params.id);
    if(!surgery){return res.status(404).send("Not Found")}

    

    surgery =await Surgery.findByIdAndDelete(req.params.id)
    res.json({"Success":"Surgery has been deleted.",surgery:surgery});
})
module.exports = router