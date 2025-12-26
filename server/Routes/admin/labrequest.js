const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const bcrypt =require('bcryptjs');
const LabRequest = require('../../models/LabRequest');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchalllabrequests',fetchuser,async (req,res)=>{
    try {
    
    const labrequests=await LabRequest.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(labrequests)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addlabrequest',fetchuser,[
    body('notes').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {patient,doctor,test,requestDate,priority,status,notes}=req.body;
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const labrequest=new LabRequest({
            patient,doctor,test,requestDate,priority,status,notes
        })
        const savedLabRequest=await labrequest.save();
        success=true;
        res.json({success,data:savedLabRequest})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatelabrequest/:id',fetchuser,async (req,res)=>{
    const {patient,doctor,test,requestDate,priority,status,notes}=req.body;
    const newLabRequest={};
    if(patient){newLabRequest.patient=patient};
    if(doctor){newLabRequest.doctor=doctor};
    if(test){newLabRequest.test=test};
    if(requestDate){newLabRequest.requestDate=requestDate};
    if(priority){newLabRequest.priority=priority};
    if(status){newLabRequest.status=status};
    if(notes){newLabRequest.notes=notes};

    let labrequest=await LabRequest.findById(req.params.id);
    if(!labrequest){return res.status(404).send("Not Found")}


    labrequest =await LabRequest.findByIdAndUpdate(req.params.id,{$set:newLabRequest},{new:true})
    res.json({success: true, data:labrequest});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletelabrequest/:id',fetchuser,async (req,res)=>{

    let labrequest=await LabRequest.findById(req.params.id);
    if(!labrequest){return res.status(404).send("Not Found")}

    

    labrequest =await LabRequest.findByIdAndDelete(req.params.id)
    res.json({"Success":"Lab Request has been deleted.",labrequest:labrequest});
})
module.exports = router