
import React,{useState,useEffect,useContext} from 'react'
import Select from "react-select";

import appointmentContext from '../context/appointmentContext'
import patientContext from '../context/patientContext'
import doctorContext from '../context/doctorContext'
import staffContext from '../context/staffContext'

import InfoMessage from '../components/InfoMessage';

const AddAppointment = () => {
   const [showToast,setShowToast]=useState(false)
       const [msg,setMsg]=useState('')
       const [type,setType]=useState('')
       const [roles,setRoles]=useState([]);
     const [credentials,setCredentials] =useState({patientId:null,doctorId:null,bookingType:"online",status:"booked",notes:""})
         const [ appointmentDate, setAppointmentDate] = useState(undefined);
        //  const [ appointmentDate2, setAppointmentDate2] = useState(undefined);
     
     const context=useContext(appointmentContext);
         const {addAppointment}=context;
         const context2=useContext(patientContext);
         const {patients,getPatients}=context2;
          const context3=useContext(doctorContext);
         const {doctors,getDoctors}=context3;
         const context4=useContext(staffContext);
         const {staffs,getStaffs}=context4;

          const handleAppointmentDateChange = (e) => {
    setAppointmentDate(e.target.value); // <-- Get input value here
  };
  
     const onChange=(e)=>{
        if(e.target.value=="" && (e.target.name=="patientId"||e.target.name=="doctorId"))
        {
            setCredentials({...credentials,[e.target.name]:null})
        }
        else{
            setCredentials({...credentials,[e.target.name]:e.target.value})
        }
      
      
    }
      const handleChange = (selectedOption) => {
        if(selectedOption=="" )
        {
            setCredentials({...credentials,'patientId':null})
        }
        else
        {
          setCredentials({...credentials,'patientId':selectedOption.value})
        }
  };
  const handleChange2 = (selectedOption) => {
        if(selectedOption=="" )
        {
            setCredentials({...credentials,'doctorId':null})
        }
        else
        {
          setCredentials({...credentials,'doctorId':selectedOption.value})
        }
  };
const getDoctorById = (id) => doctors.find(d => d._id === id);
const getPatientById = (id) => patients.find(d => d._id === id);
const getStaffById = (id) => staffs.find(d => d._id === id);
const options = [
  { value: "", label: "Select Patient" }, // empty option
  ... patients.map(pt => ({
    value: pt._id,
    label: `${pt.firstName}`
  }))
];
const options2 = [
  { value: "", label: "Select Doctor" }, // empty option
  ... doctors.map(dt => {
    const staff = getStaffById(dt?.staff);
    return{
    value: dt._id,
    label: `${staff.firstName}`
}})
];
const filterOption = (option, inputValue) => {
  // Only filter based on the 'label' property, for example
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};

  const addAppointments=async (e)=>{
         e.preventDefault();
        const {patientId,doctorId,bookingType,status,notes}=credentials
        const patientobj= getPatientById(patientId);

         console.log(bookingType);
          const user=await addAppointment(patientId.value,doctorId.value,appointmentDate,bookingType,status,notes)
          console.log(user)
          if(user.success)
          {
        
            console.log("abc");
            setShowToast(true);
            setMsg("Appointment added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }

useEffect(() => {
           const fetchData = async () => {
        const result3 = await getDoctors();
        const result4 = await getPatients();
        const result5 = await getStaffs();

          };
          fetchData();
          }, []); 
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addAppointments}>
    <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="patient" className="form-label">Patient</label>
            {/* <select id="patientId" className="form-control " name="patientId" onChange={onChange}>
                <option value="">-Patient-</option>
                    {Array.isArray(patients) && patients.map((row) => (
                    <option value={row._id}>{row.firstName}</option>
                    ))}
            </select> */}
            <Select id="patientId" options={options} filterOption={filterOption} onChange={handleChange} name="patientId" placeholder="Select Patient" />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="doctorId" className="form-label">Doctor</label>
            {/* <select id="doctorId" className="form-control " name="doctorId" onChange={onChange}>
                <option value="">-Doctor-</option>
                    {Array.isArray(doctors) && doctors.map((row) => {
                        const staff = getStaffById(row?.staff);
                        return(
                    <option value={staff._id}>{staff.firstName}</option>)
                })}
            </select> */}
             <Select id="doctorId" options={options2} filterOption={filterOption} onChange={handleChange2} name="doctorId" placeholder="Select Doctor" />
        </div>
        
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="appointmentDate" className="form-label">Appointment Date</label>
          <input type="datetime-local" className="form-control" id="appointmentDate" name="appointmentDate" value={appointmentDate} onChange={handleAppointmentDateChange}  aria-describedby="emailHelp"/>
        </div>
       
    </div>
      <div className='mx-0' style={{display:'flex'}}>

       {/* <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="appointmentTime" className="form-label">Enter Appointment Time:</label>
            <input type="text" className="form-control" id="appointmentTime"  name="appointmentTime" onChange={onChange} />
      </div> */}
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="bookingType" className="form-label">Enter Booking Type:</label>
            {/* <input type="text" className="form-control" id="bookingType" name="bookingType" onChange={onChange} /> */}
            <select id="mySelect" className="form-control " name="bookingType" onChange={onChange}>
                <option value="online">Online</option>
                <option value="walk-in">Walk-In</option>
            </select>
      </div>
      
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="status" className="form-label">Enter Status:</label>
            {/* <input type="text" className="form-control" id="status" name="status" onChange={onChange} /> */}
            <select id="mySelect" className="form-control " name="status" onChange={onChange}>
                <option value="booked">Booked</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
                <option value="no-show'">No-Show'</option>
            </select>
      </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="notes" className="form-label">Enter Notes:</label>
            <textarea className="form-control" id="notes" name="notes" onChange={onChange} />
      </div>
    </div>
    
    
      <button disabled={credentials.bookingType==""||credentials.status==""} type="submit" className="btn btn-primary">Add Appointment</button>
      </form>
    </div>
  )
}

export default AddAppointment
