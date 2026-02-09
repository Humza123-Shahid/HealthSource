const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Department = require('../../models/Department');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Departments using :GET "/api/departments/fetchalldepartments".Login required
router.get('/fetchalldepartments',fetchuser,async (req,res)=>{
    try {
    
    const departments=await Department.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(departments)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Department using :POST "/api/departments/adddepartments".Login required
router.post('/adddepartment',fetchuser,[
    body('name').isLength({ min: 1 }),
    body('code').isLength({ min: 1 }),
    body('description').isLength({ min: 3 })
],async (req,res)=>{
    try {
        
        let success = false;
        const {name,code,description,headOfDepartment}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const department=new Department({
            name,code,description,headOfDepartment
        })
        const savedDepartment=await department.save();
        success=true;
        res.json({success,data:savedDepartment})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Department using :PUT "/api/departments/updatedepartments".Login required
router.put('/updatedepartment/:id',fetchuser,async (req,res)=>{
    const {name,code,description,headOfDepartment}=req.body;
    const newDepartment={};
    if(name){newDepartment.name=name};
    if(code){newDepartment.code=code};
    if(description){newDepartment.description=description};
    if(headOfDepartment){newDepartment.headOfDepartment=headOfDepartment};

    let department=await Department.findById(req.params.id);
    if(!department){return res.status(404).send("Not Found")}


    department =await Department.findByIdAndUpdate(req.params.id,{$set:newDepartment},{new:true})
    res.json({success: true, data:department});
})
// ROUTE 4: Delete an existing Department using :DELETE "/api/departments/deletedepartments".Login required
router.delete('/deletedepartment/:id',fetchuser,async (req,res)=>{

    let department=await Department.findById(req.params.id);
    if(!department){return res.status(404).send("Not Found")}

    

    department =await Department.findByIdAndDelete(req.params.id)
    res.json({"Success":"Department has been deleted.",department:department});
})
module.exports = router