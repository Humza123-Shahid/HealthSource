
import React,{useState,useEffect,useContext} from 'react'
import { useLocation } from 'react-router-dom';
import Select from "react-select";

import staffdutyContext from '../context/staffdutyContext'
import staffContext from '../context/staffContext'
import shiftContext from '../context/shiftContext'

import InfoMessage from '../components/InfoMessage';

const EditStaffDuty = () => {
     const location = useLocation();
        const StaffDuty=location.state?.staffduty || {};
        const staff=location.state?.staffId || null;
        const shift=location.state?.shiftId || null;
         const formatForInput = (isoString) => {
      if (!isoString) return ''; // Handle cases where the string might be empty or null
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
   const [showToast,setShowToast]=useState(false)
       const [msg,setMsg]=useState('')
       const [type,setType]=useState('')
       const [roles,setRoles]=useState([]);
     const [credentials,setCredentials] =useState({staffId:staff,shiftId:shift,dutyType:StaffDuty.duty_type,status:StaffDuty.status})
         const [ dutyDate, setDutyDate] = useState((formatForInput(StaffDuty?.dutyDate)|| {}));
        //  const [ appointmentDate2, setStaffDutyDate2] = useState(formatDate(new Date(StaffDuty?.appointmentDate)));
     
     const context=useContext(staffdutyContext);
         const {editStaffDuty}=context;
         
         const context2=useContext(staffContext);
         const {staffs,getStaffs}=context2;
        const context3=useContext(shiftContext);
         const {shifts,getShifts}=context3;

          const handleDutyDateChange = (e) => {
    setDutyDate(e.target.value); // <-- Get input value here
   
  };

  const handleChange = (selectedOption) => {
        if(selectedOption=="" )
        {
            setCredentials({...credentials,'staffId':null})
        }
        else
        {
          setCredentials({...credentials,'staffId':selectedOption.value})
        }
  };
  const handleChange2 = (selectedOption) => {
        if(selectedOption=="" )
        {
            setCredentials({...credentials,'shiftId':null})
        }
        else
        {
          setCredentials({...credentials,'shiftId':selectedOption.value})
        }
  };
     const onChange=(e)=>{
        if(e.target.value=="" && (e.target.name=="staffId"||e.target.name=="shiftId"))
        {
            setCredentials({...credentials,[e.target.name]:null})
        }
        else{
            setCredentials({...credentials,[e.target.name]:e.target.value})
        }
      
      
    }
     
// const getDoctorById = (id) => doctors.find(d => d._id === id);
// const getPatientById = (id) => patients.find(d => d._id === id);
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
const defaultValue = options.find(d=>d.value==staff);
const defaultValue2 = options2.find(d=>d.value==shift);

const filterOption = (option, inputValue) => {
  // Only filter based on the 'label' property, for example
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};
  const editStaffDuties=async (e)=>{
         e.preventDefault();
        const {staffId,shiftId,dutyType,status}=credentials
        // const patientobj= getPatientById(patientId);

         
          const user=await editStaffDuty(StaffDuty._id,staffId,shiftId,dutyDate,dutyType,status)
          console.log(user)
          if(user.success)
          {
        
            console.log("abc");
            setShowToast(true);
            setMsg("Staff Duty updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }

useEffect(() => {
           const fetchData = async () => {
        const result = await getStaffs();
        const result2 = await getShifts();

          };
          fetchData();
          }, []); 
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={editStaffDuties}>
    <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                    <label htmlFor="staff" className="form-label">Staff</label>
                    <Select id="staffId" options={options} filterOption={filterOption} defaultValue={defaultValue} onChange={handleChange} name="staffId" placeholder="Select Staff" />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="shiftId" className="form-label">Shift</label>
             <Select id="shiftId" options={options2} filterOption={filterOption} defaultValue={defaultValue2} onChange={handleChange2} name="shiftId" placeholder="Select Shift" />
        </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="dutyDate" className="form-label">StaffDuty Date</label>
          <input type="date" className="form-control" id="dutyDate" name="dutyDate" value={dutyDate} onChange={handleDutyDateChange}  aria-describedby="emailHelp"/>
        </div>
    </div>
      <div className='mx-0' style={{display:'flex'}}>


        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="bookingType" className="form-label">Enter Duty Type:</label>
            {/* <input type="text" className="form-control" id="bookingType" name="bookingType" onChange={onChange} /> */}
            <select id="mySelect" className="form-control " value={credentials.dutyType} name="dutyType" onChange={onChange}>
                <option value="ward-round">Ward-Round</option>
                <option value="OPD">OPD</option>
                <option value="ICU">ICU</option>
                <option value="OT">OT</option>
                <option value="reception">Reception</option>
                <option value="emergency">Emergency</option>
            </select>
      </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="status" className="form-label">Enter Status:</label>
            {/* <input type="text" className="form-control" id="status" name="status" onChange={onChange} /> */}
            <select id="mySelect" className="form-control " value={credentials.status} name="status" onChange={onChange}>
                <option value="assigned">Assigned</option>
                <option value="in-progress">In-Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled'">Cancelled'</option>
            </select>
      </div>
        <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
        </div>
    </div>
        
    
    
      <button disabled={credentials.bookingType==""||credentials.status==""} type="submit" className="btn btn-primary">Update Staff Duty</button>
      </form>
    </div>
  )
}

export default EditStaffDuty
