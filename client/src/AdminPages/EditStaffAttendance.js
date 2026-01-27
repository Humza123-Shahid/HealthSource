
import React,{useState,useEffect,useContext} from 'react'
import Select from "react-select";
import { useLocation } from 'react-router-dom';
import staffattendanceContext from '../context/staffattendanceContext'
import staffContext from '../context/staffContext'
import shiftContext from '../context/shiftContext'
import staffdutyContext from '../context/staffdutyContext'
import InfoMessage from '../components/InfoMessage';

const EditStaffAttendance = () => {
     const context=useContext(staffattendanceContext);
    const {editStaffAttendance}=context;
    const context2=useContext(staffContext);
    const {staffs,getStaffs}=context2;
    const context3=useContext(shiftContext);
    const {shifts,getShifts}=context3;
    const context4=useContext(staffdutyContext);
    const {staffduties,getStaffDuties}=context4;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const location = useLocation();
    const StaffAttendance=location.state?.staffattendance || {};
    // const Staff=location.state?.staff || {};
    // const Shift=location.state?.shift || {};
    const dutyId=location.state?.duty || {};
    // const hours =new Date( StaffAttendance.checkIn).getHours();
    // const minutes = new Date(StaffAttendance.checkIn).getMinutes();
    // const hours2 = new Date(StaffAttendance.checkOut).getHours();
    // const minutes2 = new Date(StaffAttendance.checkOut).getMinutes();
    // const formattedCheckInTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    // const formattedCheckOutTime = `${hours2.toString().padStart(2, '0')}:${minutes2.toString().padStart(2, '0')}`;
    // const [checkInTime, setCheckInTime] = useState(formattedCheckInTime);
    // const [checkOutTime, setCheckOutTime] = useState(formattedCheckOutTime);
    // const [checkInTime2, setCheckInTime2] = useState("");
    // const [checkOutTime2, setCheckOutTime2] = useState("");
     const formatDate = (date) => {
        return date.toISOString().split("T")[0]; // keeps only YYYY-MM-DD
    };
    // const [date, setDate] = useState(formatDate(new Date(StaffAttendance.date)));
    // const [selectedStaffValue, setSelectedStaffValue] = useState(Staff._id);
    // const [selectedShiftValue, setSelectedShiftValue] = useState(Shift._id);
    const [selectedDutyValue, setSelectedDutyValue] = useState(dutyId);
    
    const [status, setStatus] = useState(StaffAttendance.status);

  //    const handleChange = (selectedOption) => {
  //       setSelectedStaffValue(selectedOption.value)
  // };
  // const handleChange2 = (selectedOption) => {
  //       setSelectedShiftValue(selectedOption.value)
  // };
   const handleChange3 = (selectedOption) => {
        setSelectedDutyValue(selectedOption.value)
  };
  //   const handleCheckInChange = (e) => {
  //   setCheckInTime(e.target.value); // <-- Get input value here
  //   const newTime =`1970-01-01T${e.target.value}:00`
  //   setCheckInTime2(newTime);
  // };
  // const handleCheckOutChange = (e) => {
  //   setCheckOutTime(e.target.value); // <-- Get input value here
  //   const newTime = `1970-01-01T${e.target.value}:00`
  //   setCheckOutTime2(newTime);
  // };
  // const handleDateChange = (event) => {
  //   setDate(event.target.value);
  // };
  // const handleChangeStaff = (event) => {
  //   setSelectedStaffValue(event.target.value);
     
  // };
  // const handleChangeShift = (event) => {
  //   setSelectedShiftValue(event.target.value);
     
  // };
  const handleStatusChange = (event) => {
    setStatus(event.target.value); 
  };
    const getStaffById = (id) => staffs.find(d => d._id === id);

   const options = [
  { value: "", label: "Select Staff" }, // empty option
  ... staffs.map(st => ({
    value: st._id,
    label: `${st.firstName}`
  }))
];
const options2 = [
  { value: "", label: "Select Shift" }, // empty option
   ... shifts.map(sh => ({
    value: sh._id,
    label: `${sh.name}`
  }))
];
const options3 = [
  { value: "", label: "Select Duty" }, // empty option
    ... staffduties.map(sd => {
    const staff = getStaffById(sd?.staff);
    const formattedDutyDate = new Date(sd.dutyDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
           
          });
    return{
    value: sd._id,
    label: `${formattedDutyDate}-${staff.firstName}`
}})
];
// const defaultValue = options.find(d=>d.value==Staff._id);
// const defaultValue2 = options2.find(d=>d.value==Shift._id);
const defaultValue3 = options3.find(d=>d.value==dutyId);

const filterOption = (option, inputValue) => {
  // Only filter based on the 'label' property, for example
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};
  const editStaffAttendances=async (e)=>{
         e.preventDefault();
        //  const utcArrTime = new Date(arrivalTime2.getTime() - arrivalTime2.getTimezoneOffset() * 60000)
        //  const utcDepTime = new Date(departureTime2.getTime() - departureTime2.getTimezoneOffset() * 60000)

        //  setDepartureTime("1970-09-03T"+departureTime);
        //  setArrivalTime("1970-09-03T"+arrivalTime);
          // const success=await editStaffAttendance(StaffAttendance._id,selectedDutyValue,date,checkInTime2,checkOutTime2,status)
          const success=await editStaffAttendance(StaffAttendance._id,selectedDutyValue,status)

          console.log(success)
          if(success)
          {
            console.log("abc");
            setShowToast(true);
            setMsg("Staff Attendance updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
useEffect(() => {
            const fetchData = async () => {
            //const result = await getQuizzes(); // Call context function
           const result2 = await getStaffs();
          const result3 = await getShifts();
          const result4 = await getStaffDuties();

            //setMyData(result);                     // Set state in same file
          };
      
          fetchData();
          }, []); 
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={editStaffAttendances}>
    <div className='mx-0' style={{display:'flex'}}>
      {/* <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Staff:</label>
      <select id="mySelect" className="form-control "  value={selectedStaffValue} onChange={handleChangeStaff}>
        <option value="">-Select-</option>
        {staffs.map((row) => (
        <option value={row._id}>{row.firstName}</option>
        ))}
      </select>
      <Select id="staffId" options={options} filterOption={filterOption} defaultValue={defaultValue} onChange={handleChange} name="staffId" placeholder="Select Staff" />
    </div> */}
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          
          <label htmlFor="mySelect" className="form-label">Select Duty:</label>
          <Select id="dutyId" options={options3} filterOption={filterOption} defaultValue={defaultValue3} onChange={handleChange3} name="dutyId" placeholder="Select Duty" />
    
        </div>
    {/* <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      <label htmlFor="date" className="form-label">Date:</label>
      <input type="date" className="form-control" id="date" value={date} name="date" onChange={handleDateChange} />

      </div>
      
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="checkInTime" className="form-label">Check In Time:</label>
            <input type="time" className="form-control" id="checkInTime" value={checkInTime} name="checkInTime" onChange={handleCheckInChange} />
      </div>
    
    </div>
      <div className='mx-0' style={{display:'flex'}}>
        
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="checkOutTime" className="form-label">Check Out Time:</label>
            <input type="time" className="form-control" id="checkOutTime" value={checkOutTime} name="checkOutTime" onChange={handleCheckOutChange} />
      </div> */}
      {/* <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Shift:</label>
      <select id="mySelect" className="form-control "  value={selectedShiftValue} onChange={handleChangeShift}>
        <option value="">-Select-</option>
        {shifts.map((row) => (
        <option value={row._id}>{row.name}</option>
        ))}
      </select>
      <Select id="shiftId" options={options2} filterOption={filterOption} defaultValue={defaultValue2} onChange={handleChange2} name="shiftId" placeholder="Select Shift" />
    </div>
     */}
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="status" className="form-label">Status:</label>
            {/* <input type="number" className="form-control" id="status" value={status} name="status" onChange={handleStatusChange} /> */}
            <select id="mySelect" className="form-control " value={status} onChange={handleStatusChange}>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="leave">Leave</option>
            </select>
      </div>
      <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
        </div>
    </div>
    
      {/* <button disabled={checkInTime.length<1||checkOutTime.length<1||date.length<1} type="submit" className="btn btn-primary">Update Staff Attendance</button> */}
      <button type="submit" className="btn btn-primary">Update Staff Attendance</button>
      
      </form>
    </div>
  )
}

export default EditStaffAttendance
