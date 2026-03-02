const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const uploadstaff = require("../../middleware/uploadstaff");
const Staff = require('../../models/Staff');
const Department = require("../../models/Department");
const StaffShift = require("../../models/StaffShift");

const { body, validationResult } = require('express-validator');

const firstNames = ["Ali","Ahmed","Usman","Hassan","Bilal","Zain","Umar","Hamza"];
const lastNames = ["Khan","Ahmed","Malik","Sheikh","Raza","Iqbal","Shah","Butt"];
const designations = ["Doctor","Nurse","Receptionist","Admin","Technician"];
const genders = ["male","female","other"];
const employmentTypes = ["full-time","part-time","contract"];
const qualifications = ["MBBS","BSc Nursing","MBA","Diploma","Pharmacy"];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// async function seedStaff() {
router.post('/addbulkstaff',async (req,res)=>{
  try {
    let success = false;
    /* Fetch Departments & Shifts */
    const departments = await Department.find().select("_id");
    const shifts = await StaffShift.find().select("_id");

    const staffRecords = [];

    for (let i = 0; i < 1000; i++) {
      const randomDepartment =
        departments[Math.floor(Math.random() * departments.length)];

      const randomShift =
        shifts[Math.floor(Math.random() * shifts.length)];

      staffRecords.push({
        firstName: getRandom(firstNames),
        lastName: getRandom(lastNames),
        designation: getRandom(designations),
        nationalId: Math.floor(
          1000000000000 + Math.random() * 9000000000000
        ).toString(),
        gender: getRandom(genders),
        dob: getRandomDate(new Date(1970, 0, 1), new Date(2000, 0, 1)),
        address: "Sample Address " + i,
        contact: "03" + Math.floor(100000000 + Math.random() * 900000000),
        qualification: getRandom(qualifications),
        joiningDate: getRandomDate(new Date(2015, 0, 1), new Date()),
        employmentType: getRandom(employmentTypes),
        department: randomDepartment?._id || null,
        salary: Math.floor(Math.random() * 150000) + 30000,
        shift: randomShift?._id || null,
        photoPath: "",
        status: "active",
      });
    }

    await Staff.insertMany(staffRecords);

    console.log("1000 Staff records inserted successfully");
    success=true;
    res.json({success})
  } catch (error) {
    console.error(error);
    //process.exit(1);
    res.status(500).send("Internal Server Error");

  }
})
// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallstaffs',async (req,res)=>{
    try {
    
    const staffs=await Staff.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(staffs)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addstaff',fetchuser,uploadstaff.single("file"),[
    body('firstName').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        let {firstName,lastName,designation,nationalId,gender,dob,address,contact,qualification,joiningDate,employmentType,department,salary,shift,status}=req.body;
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        if(department=="null")
        {
            department=null;
        }
         if(shift=="null")
        {
            shift=null;
        }
        const staff=new Staff({
           firstName,lastName,designation,nationalId,gender,dob,address,contact,qualification,joiningDate,employmentType,department,salary,shift,photoPath: req.file?.path,status
        })
        const savedStaff=await staff.save();
        success=true;
        res.json({success,data:savedStaff})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatestaff/:id',fetchuser,uploadstaff.single("file"),async (req,res)=>{
    let {firstName,lastName,designation,nationalId,gender,dob,address,contact,qualification,joiningDate,employmentType,department,salary,shift,status}=req.body;
            console.log(department);

    
         
    const newStaff={};
    if(firstName){newStaff.firstName=firstName};
    if(lastName){newStaff.lastName=lastName};
    if(designation){newStaff.designation=designation};
    if(nationalId){newStaff.nationalId=nationalId};
    if(gender){newStaff.gender=gender};
    if(dob){newStaff.dob=dob};
    if(address){newStaff.address=address};
    if(contact){newStaff.contact=contact};
    if(qualification){newStaff.qualification=qualification};
    if(joiningDate){newStaff.joiningDate=joiningDate};
    if(employmentType){newStaff.employmentType=employmentType};
    if(department=="null")
        {
        console.log("department");

            newStaff.department=null;
        }
    else if(department){newStaff.department=department};

    if(salary){newStaff.salary=salary};
    if(shift=="null")
        {
            newStaff.shift=null;
        }
    else if(shift){newStaff.shift=shift};
    // if(photoUrl){newStaff.photoUrl=photoUrl};
    if (req.file) {
    newStaff.photoPath = req.file.path; // overwrite only if new file
  }
    if(status){newStaff.status=status};
    console.log(newStaff.department);
    let staff=await Staff.findById(req.params.id);
    if(!staff){return res.status(404).send("Not Found")}


    staff =await Staff.findByIdAndUpdate(req.params.id,{$set:newStaff},{new:true})
    res.json({success: true, data:staff});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletestaff/:id',fetchuser,async (req,res)=>{

    let staff=await Staff.findById(req.params.id);
    if(!staff){return res.status(404).send("Not Found")}

    

    staff =await Staff.findByIdAndDelete(req.params.id)
    res.json({"Success":"Staff has been deleted.",staff:staff});
})
module.exports = router