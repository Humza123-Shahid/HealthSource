const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const LabTest = require('../../models/LabTest');
const { body, validationResult } = require('express-validator');

router.post('/addbulklabtest',async (req,res)=>{
  try {
    let success = false;

    const categories = [
      "Hematology",
      "Biochemistry",
      "Microbiology",
      "Immunology",
      "Pathology",
      "Radiology"
    ];

    const testNames = [
      "Complete Blood Count",
      "Blood Sugar",
      "Lipid Profile",
      "Liver Function Test",
      "Kidney Function Test",
      "Thyroid Profile",
      "Urine Analysis",
      "Electrolyte Test",
      "COVID PCR",
      "X-Ray Chest"
    ];

    const labTests = [];

    for (let i = 1; i <= 1000; i++) {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      const randomTest =
        testNames[Math.floor(Math.random() * testNames.length)];

      labTests.push({
        name: `${randomTest} ${i}`, // keep unique
        category: randomCategory,
        normalRange: `${Math.floor(Math.random() * 50)}-${Math.floor(Math.random() * 150)}`,
        price: Math.floor(Math.random() * 4000) + 200,
        code: `LT-${1000 + i}`
      });
    }

    await LabTest.insertMany(labTests);

    console.log("1000 Lab Test records inserted successfully");
    success=true;
    res.json({success})

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
})
// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchalllabtests',fetchuser,async (req,res)=>{
    try {
    
    const labtest=await LabTest.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(labtest)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addlabtest',fetchuser,[
    body('name').isLength({ min: 1 }),
    body('category').isLength({ min: 3 }),
    body('normalRange').isLength({ min: 3 }),
    body('code').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {name,category,normalRange,price,code}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const labtest=new LabTest({
           name,category,normalRange,price,code
        })
        const savedLabTest=await labtest.save();
        success=true;
        res.json({success,data:savedLabTest})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatelabtest/:id',fetchuser,async (req,res)=>{
    const {name,category,normalRange,price,code}=req.body;
    const newLabTest={};
    if(name){newLabTest.name=name};
    if(category){newLabTest.category=category};
    if(normalRange){newLabTest.normalRange=normalRange};
    if(price){newLabTest.price=price};
    if(code){newLabTest.code=code};


    let labtest=await LabTest.findById(req.params.id);
    if(!labtest){return res.status(404).send("Not Found")}


    labtest =await LabTest.findByIdAndUpdate(req.params.id,{$set:newLabTest},{new:true})
    res.json({success: true, data:labtest});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletelabtest/:id',fetchuser,async (req,res)=>{

    let labtest=await LabTest.findById(req.params.id);
    if(!labtest){return res.status(404).send("Not Found")}

    

    labtest =await LabTest.findByIdAndDelete(req.params.id)
    res.json({"Success":"Lab Test has been deleted.",labtest:labtest});
})
module.exports = router