const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Room = require('../../models/Room');
const { body, validationResult } = require('express-validator');

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