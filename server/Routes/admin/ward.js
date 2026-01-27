const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Ward = require('../../models/Ward');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallwards',fetchuser,async (req,res)=>{
    try {
    
    const wards=await Ward.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(wards)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addward',fetchuser,[
    body('name').isLength({ min: 1 }),
    body('type').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {name,type,totalRooms}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const ward=new Ward({
            name,type,totalRooms
        })
        const savedWard=await ward.save();
        success=true;
        res.json({success,data:savedWard})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updateward/:id',fetchuser,async (req,res)=>{
    const {name,type,totalRooms}=req.body;
    const newWard={};
    if(name){newWard.name=name};
    if(type){newWard.type=type};
    if(totalRooms){newWard.totalRooms=totalRooms};

    let ward=await Ward.findById(req.params.id);
    if(!ward){return res.status(404).send("Not Found")}


    ward =await Ward.findByIdAndUpdate(req.params.id,{$set:newWard},{new:true})
    res.json({success: true, data:ward});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deleteward/:id',fetchuser,async (req,res)=>{

    let ward=await Ward.findById(req.params.id);
    if(!ward){return res.status(404).send("Not Found")}

    

    ward =await Ward.findByIdAndDelete(req.params.id)
    res.json({"Success":"Ward has been deleted.",ward:ward});
})
module.exports = router