const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const uploadlabresult = require("../../middleware/uploadlabresult");

const bcrypt =require('bcryptjs');
const LabResult = require('../../models/LabResult');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchalllabresults',fetchuser,async (req,res)=>{
    try {
    
    const labresults=await LabResult.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(labresults)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addlabresult',fetchuser,uploadlabresult.single("file"),[
    body('resultValue').isLength({ min: 1 })||
    body('units').isLength({ min: 1 })||
    body('remarks').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {labRequest,test,resultValue,units,remarks,resultDate}=req.body;
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const labresult=new LabResult({
            labRequest,test,resultValue,units,remarks,filePath: req.file?.path,resultDate
        })
        const savedLabResult=await labresult.save();
        success=true;
        res.json({success,data:savedLabResult})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatelabresult/:id',fetchuser,uploadlabresult.single('file'),async (req,res)=>{
    const {labRequest,test,resultValue,units,remarks,resultDate}=req.body;
    const newLabResult={};
    if(labRequest){newLabResult.labRequest=labRequest};
    if(test){newLabResult.test=test};
    if(resultValue){newLabResult.resultValue=resultValue};
    if(units){newLabResult.units=units};
    if(remarks){newLabResult.remarks=remarks};
    if (req.file) {
        newLabResult.filePath = req.file.path; // overwrite only if new file
    }    
    if(resultDate){newLabResult.resultDate=resultDate};

    let labresult=await LabResult.findById(req.params.id);
    if(!labresult){return res.status(404).send("Not Found")}


    labresult =await LabResult.findByIdAndUpdate(req.params.id,{$set:newLabResult},{new:true})
    res.json({success: true, data:labresult});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletelabresult/:id',fetchuser,async (req,res)=>{

    let labresult=await LabResult.findById(req.params.id);
    if(!labresult){return res.status(404).send("Not Found")}

    

    labresult =await LabResult.findByIdAndDelete(req.params.id)
    res.json({"Success":"Lab Result has been deleted.",labresult:labresult});
})
module.exports = router