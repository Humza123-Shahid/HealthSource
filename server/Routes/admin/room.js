const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Room = require('../../models/Room');
const Ward = require('../../models/Ward');
const { body, validationResult } = require('express-validator');

router.post('/addbulkroom',async (req,res)=>{
  try {
     let success = false;
    // Get all wards
    const wards = await Ward.find().select("_id");

    if (wards.length === 0) {
      console.log("No wards found. Insert wards first.");
      return;
    }

    const roomTypes = ['single', 'shared', 'ICU'];

    const rooms = [];

    for (let i = 1; i <= 1000; i++) {
      const randomWard =
        wards[Math.floor(Math.random() * wards.length)];

      const randomType =
        roomTypes[Math.floor(Math.random() * roomTypes.length)];

      let charges = 0;

      // Realistic pricing by type
      if (randomType === "single") {
        charges = Math.floor(Math.random() * 3000) + 2000;
      } else if (randomType === "shared") {
        charges = Math.floor(Math.random() * 1500) + 800;
      } else {
        charges = Math.floor(Math.random() * 7000) + 5000;
      }

      rooms.push({
        ward: randomWard._id,
        roomNumber: `RM-${1000 + i}`,
        type: randomType,
        chargesPerDay: charges
      });
    }

    await Room.insertMany(rooms);

    console.log("1000 Room records inserted successfully");
    success=true;
    res.json({success})

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
})
// ROUTE 1: Get All the Rooms using :GET "/api/rooms/fetchallrooms".Login required
router.get('/fetchallrooms',fetchuser,async (req,res)=>{
    try {
    
    const rooms=await Room.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(rooms)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Room using :POST "/api/rooms/addrooms".Login required
router.post('/addroom',fetchuser,[
    body('roomNumber').isLength({ min: 1 }),
    body('type').isLength({ min: 1 }),

],async (req,res)=>{
    try {
        
        let success = false;
        const {ward,roomNumber,type,chargesPerDay}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const room=new Room({
            ward,roomNumber,type,chargesPerDay
        })
        const savedRoom=await room.save();
        success=true;
        res.json({success,data:savedRoom})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Room using :PUT "/api/rooms/updaterooms".Login required
router.put('/updateroom/:id',fetchuser,async (req,res)=>{
    const {ward,roomNumber,type,chargesPerDay}=req.body;
    const newRoom={};
    if(ward){newRoom.ward=ward};
    if(roomNumber){newRoom.roomNumber=roomNumber};
    if(type){newRoom.type=type};
    if(chargesPerDay){newRoom.chargesPerDay=chargesPerDay};

    
    let room=await Room.findById(req.params.id);
    if(!room){return res.status(404).send("Not Found")}


    room =await Room.findByIdAndUpdate(req.params.id,{$set:newRoom},{new:true})
    res.json({success: true, data:room});
})
// ROUTE 4: Delete an existing Room using :DELETE "/api/rooms/deleterooms".Login required
router.delete('/deleteroom/:id',fetchuser,async (req,res)=>{

    let room=await Room.findById(req.params.id);
    if(!room){return res.status(404).send("Not Found")}

    

    room =await Room.findByIdAndDelete(req.params.id)
    res.json({"Success":"Room has been deleted.",room:room});
})
module.exports = router