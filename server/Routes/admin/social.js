const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Social = require('../../models/Social');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallsocials',async (req,res)=>{
    try {
    
    const socials=await Social.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(socials)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.post('/addsocial',[
    body('platformName').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {platformName,url}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const social=new Social({
            platformName,url
        })
        const savedSocial=await social.save();
        success=true;
        res.json({success,data:savedSocial})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.put('/updatesocial/:id',fetchuser,async (req,res)=>{
    const {platformName,url}=req.body;
    const newSocial={};
    if(platformName){newSocial.platformName=platformName};
    if(url){newSocial.url=url};

    let social=await Social.findById(req.params.id);
    if(!social){return res.status(404).send("Not Found")}


    social =await Social.findByIdAndUpdate(req.params.id,{$set:newSocial},{new:true})
    res.json({success: true, data:social});
})
router.delete('/deletesocial/:id',fetchuser,async (req,res)=>{

    let social=await Social.findById(req.params.id);
    if(!social){return res.status(404).send("Not Found")}

    

    social =await Social.findByIdAndDelete(req.params.id)
    res.json({"Success":"Social has been deleted.",social:social});
})
module.exports = router