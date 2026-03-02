const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Bed = require('../../models/Bed');
const Room = require('../../models/Room');

const { body, validationResult } = require('express-validator');

router.post('/addbulkbed',async (req,res)=>{
  try {
let success = false;
    // Fetch all rooms
    const rooms = await Room.find().select("_id");

    if (rooms.length === 0) {
      console.log("No rooms found. Insert rooms first.");
      return;
    }

    const statusList = ['occupied', 'available', 'cleaning'];

    const beds = [];

    for (let i = 1; i <= 1000; i++) {
      const randomRoom =
        rooms[Math.floor(Math.random() * rooms.length)];

      const randomStatus =
        statusList[Math.floor(Math.random() * statusList.length)];

      beds.push({
        room: randomRoom._id,
        bedNumber: `BED-${1000 + i}`,
        status: randomStatus
      });
    }

    await Bed.insertMany(beds);

    console.log("1000 Bed records inserted successfully");
    success=true;
    res.json({success})
    res.status(500).send("Internal Server Error");
  } catch (error) {
    console.error(error);
  }
})
// ROUTE 1: Get All the Beds using :GET "/api/beds/fetchallbeds".Login required
router.get('/fetchallbeds',fetchuser,async (req,res)=>{
    try {
    
    const beds=await Bed.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(beds)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Bed using :POST "/api/beds/addbeds".Login required
router.post('/addbed',fetchuser,[
    body('bedNumber').isLength({ min: 1 }),
    body('status').isLength({ min: 1 }),

],async (req,res)=>{
    try {
        
        let success = false;
        const {room,bedNumber,status}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const bed=new Bed({
            room,bedNumber,status
        })
        const savedBed=await bed.save();
        success=true;
        res.json({success,data:savedBed})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Bed using :PUT "/api/beds/updatebeds".Login required
router.put('/updatebed/:id',fetchuser,async (req,res)=>{
    const {room,bedNumber,status}=req.body;
    const newBed={};
    if(room){newBed.room=room};
    if(bedNumber){newBed.bedNumber=bedNumber};
    if(status){newBed.status=status};
    
    let bed=await Bed.findById(req.params.id);
    if(!bed){return res.status(404).send("Not Found")}


    bed =await Bed.findByIdAndUpdate(req.params.id,{$set:newBed},{new:true})
    res.json({success: true, data:bed});
})
// ROUTE 4: Delete an existing Bed using :DELETE "/api/beds/deletebeds".Login required
router.delete('/deletebed/:id',fetchuser,async (req,res)=>{

    let bed=await Bed.findById(req.params.id);
    if(!bed){return res.status(404).send("Not Found")}

    

    bed =await Bed.findByIdAndDelete(req.params.id)
    res.json({"Success":"Bed has been deleted.",bed:bed});
})
module.exports = router