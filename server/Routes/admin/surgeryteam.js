const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const SurgeryTeam = require('../../models/SurgeryTeam');
const Surgery = require('../../models/Surgery');
const Staff = require('../../models/Staff');
const { body, validationResult } = require('express-validator');

const roles = ['surgeon', 'anesthetist', 'scrub-nurse', 'circulating-nurse', 'assistant-surgeon'];

// Helper to get random element from array
const randomChoice = arr => arr[Math.floor(Math.random() * arr.length)];

router.post('/addbulksurgeryteam',async (req,res)=>{
  try {
    let success = false;
     const surgeryIds =await Surgery.find().select("_id")
  const staffIds = await Staff.find().select("_id")

  if (!surgeryIds.length || !staffIds.length) {
    console.log('Please add Surgery and Staff records first.');
    return;
  }

  let surgeryTeams = [];

  for (let i = 0; i < 1000; i++) {
    const teamMember = {
      surgery: randomChoice(surgeryIds),
      staff: randomChoice(staffIds),
      role: randomChoice(roles)
    };
    surgeryTeams.push(teamMember);
  }

  await SurgeryTeam.insertMany(surgeryTeams);
  console.log('1000 SurgeryTeam records inserted');
 success=true;
    res.json({success})
  }catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
    //process.exit(1);
  }
})
// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallsurgeryteams',fetchuser,async (req,res)=>{
    try {
    
    const surgeryteams=await SurgeryTeam.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(surgeryteams)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addsurgeryteam',fetchuser,async (req,res)=>{
    try {
        let success = false;
        const {surgery,staffs,roles}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
         staffs.forEach(async function(staff,index) {
                await SurgeryTeam.create(
                    { surgery:surgery,staff:staff.value,role:roles[index]})
                
                
            });
        // const surgeryteam=new SurgeryTeam({
        //     surgery,staff,role
        // })
        // const savedSurgeryTeam=await surgeryteam.save();
        success=true;
        res.json({success})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatesurgeryteam/:id',fetchuser,async (req,res)=>{
    const {surgery,staff,role}=req.body;
    const newSurgeryTeam={};
    if(surgery){newSurgeryTeam.surgery=surgery};
    if(staff){newSurgeryTeam.staff=staff};
    if(role){newSurgeryTeam.role=role};
    
    let surgeryteam=await SurgeryTeam.findById(req.params.id);
    if(!surgeryteam){return res.status(404).send("Not Found")}


    surgeryteam =await SurgeryTeam.findByIdAndUpdate(req.params.id,{$set:newSurgeryTeam},{new:true})
    res.json({success: true, data:surgeryteam});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletesurgeryteam/:id',fetchuser,async (req,res)=>{

    let surgeryteam=await SurgeryTeam.findById(req.params.id);
    if(!surgeryteam){return res.status(404).send("Not Found")}

    

    surgeryteam =await SurgeryTeam.findByIdAndDelete(req.params.id)
    res.json({"Success":"Surgery Team has been deleted.",surgeryteam:surgeryteam});
})
module.exports = router