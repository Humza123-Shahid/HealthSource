const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Role = require('../../models/Role');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallroles',async (req,res)=>{
    try {
    
    const roles=await Role.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(roles)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.post('/addrole',[
    body('name').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {name,permissions}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
         permissions.forEach(async function(permission,index) {
                    // console.log(stf,shift[index],duty_type[index])
                    await Role.create(
                        { name:name,permissions:permission})
                                
                                
                });
        // const role=new Role({
        //     name,permissions
        // })
        // const savedRole=await role.save();
        success=true;
        // res.json({success,data:savedRole})
        res.json({success})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.put('/updaterole/:id',fetchuser,async (req,res)=>{
    const {name,permissions}=req.body;
    const newRole={};
    if(name){newRole.name=name};
    if(permissions){newRole.permissions=permissions};

    let role=await Role.findById(req.params.id);
    if(!role){return res.status(404).send("Not Found")}


    role =await Role.findByIdAndUpdate(req.params.id,{$set:newRole},{new:true})
    res.json({success: true, data:role});
})
router.delete('/deleterole/:id',fetchuser,async (req,res)=>{

    let role=await Role.findById(req.params.id);
    if(!role){return res.status(404).send("Not Found")}

    

    role =await Role.findByIdAndDelete(req.params.id)
    res.json({"Success":"Role has been deleted.",role:role});
})
module.exports = router