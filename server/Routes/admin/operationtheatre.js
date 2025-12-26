const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const OperationTheatre = require('../../models/OperationTheatre');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchalloperationtheatres',fetchuser,async (req,res)=>{
    try {
    
    const operationtheatres=await OperationTheatre.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(operationtheatres)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addoperationtheatre',fetchuser,[
    body('name').isLength({ min: 1 }),
    body('equipment').isLength({ min: 3 }),
    body('status').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {name,equipment,status}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const operationtheatre=new OperationTheatre({
            name,equipment,status
        })
        const savedOperationTheatre=await operationtheatre.save();
        success=true;
        res.json({success,data:savedOperationTheatre})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updateoperationtheatre/:id',fetchuser,async (req,res)=>{
    
    const {name,equipment,status}=req.body;
    const newOperationTheatre={};
    if(name){newOperationTheatre.name=name};
    if(equipment){newOperationTheatre.equipment=equipment};
    if(status){newOperationTheatre.status=status};
    
    let operationtheatre=await OperationTheatre.findById(req.params.id);
    if(!operationtheatre){return res.status(404).send("Not Found")}


    operationtheatre =await OperationTheatre.findByIdAndUpdate(req.params.id,{$set:newOperationTheatre},{new:true})
    res.json({success: true, data:operationtheatre});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deleteoperationtheatre/:id',fetchuser,async (req,res)=>{

    let operationtheatre=await OperationTheatre.findById(req.params.id);
    if(!operationtheatre){return res.status(404).send("Not Found")}

    

    operationtheatre =await OperationTheatre.findByIdAndDelete(req.params.id)
    res.json({"Success":"Operation Theatre has been deleted.",operationtheatre:operationtheatre});
})
module.exports = router