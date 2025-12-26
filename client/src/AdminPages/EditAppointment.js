
import React,{useState,useEffect,useContext} from 'react'
import { useLocation } from 'react-router-dom';

import appointmentContext from '../context/appointmentContext'
import patientContext from '../context/patientContext'
import doctorContext from '../context/doctorContext'
import staffContext from '../context/staffContext'

import InfoMessage from '../components/InfoMessage';

const EditAppointment = () => {
     const location = useLocation();
        const Appointment=location.state?.appointment || {};
        const doctor=location.state?.doctorId || null;
        const patient=location.state?.patientId || null;
        const formatDate = (date) => {
        return date.toISOString().split("T")[0]; // keeps only YYYY-MM-DD
    };
   const [showToast,setShowToast]=useState(false)
       const [msg,setMsg]=useState('')
       const [type,setType]=useState('')
       const [roles,setRoles]=useState([]);
     const [credentials,setCredentials] =useState({patientId:patient,doctorId:doctor,appointmentTime:Appointment.appointmentTime,bookingType:Appointment.bookingType,status:Appointment.status,notes:Appointment.notes})
         const [ appointmentDate, setAppointmentDate] = useState(formatDate(new Date(Appointment?.appointmentDate)));
         const [ appointmentDate2, setAppointmentDate2] = useState(formatDate(new Date(Appointment?.appointmentDate)));
     
     const context=useContext(appointmentContext);
         const {editAppointment}=context;
         const context2=useContext(patientContext);
         const {patients,getPatients}=context2;
          const context3=useContext(doctorContext);
         const {doctors,getDoctors}=context3;
         const context4=useContext(staffContext);
         const {staffs,getStaffs}=context4;

          const handleAppointmentDateChange = (e) => {
    setAppointmentDate(e.target.value); // <-- Get input value here
    const newTime = `${e.target.value}T05:00:00`
    setAppointmentDate2(newTime);
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
     
const getDoctorById = (id) => doctors.find(d => d._id === id);
const getPatientById = (id) => patients.find(d => d._id === id);
const getStaffById = (id) => staffs.find(d => d._id === id);


  const editAppointments=async (e)=>{
         e.preventDefault();
        const {patientId,doctorId,appointmentTime,bookingType,status,notes}=credentials
        const patientobj= getPatientById(patientId);

         
          const user=await editAppointment(Appointment._id,patientId,doctorId,appointmentDate2,appointmentTime,bookingType,status,notes)
          console.log(user)
          if(user.success)
          {
        
            console.log("abc");
            setShowToast(true);
            setMsg("Appointment updated successfully")
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
    <form onSubmit={editAppointments}>
    <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="patient" className="form-label">Patient</label>
            <select id="patientId" className="form-control " value={credentials.patientId} name="patientId" onChange={onChange}>
                {/* <option value="admin">Admin</option>
                <option value="organizer">Organizer</option> */}
                <option value="">-Patient-</option>
                    {Array.isArray(patients) && patients.map((row) => (
                    <option value={row._id}>{row.firstName}</option>
                    ))}
            </select>
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="doctorId" className="form-label">Doctor</label>
            <select id="doctorId" className="form-control " value={credentials.doctorId} name="doctorId" onChange={onChange}>
                {/* <option value="admin">Admin</option>
                <option value="organizer">Organizer</option> */}
                <option value="">-Doctor-</option>
                    {Array.isArray(doctors) && doctors.map((row) => {
                        const staff = getStaffById(row?.staff);
                        return(
                    <option value={staff._id}>{staff.firstName}</option>)
                })}
            </select>
        </div>
        
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="appointmentDate" className="form-label">Appointment Date</label>
          <input type="date" className="form-control" id="appointmentDate" name="appointmentDate" value={appointmentDate} onChange={handleAppointmentDateChange}/>
        </div>
       
    </div>
      <div className='mx-0' style={{display:'flex'}}>

       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="appointmentTime" className="form-label">Enter Appointment Time:</label>
            <input type="text" className="form-control" id="appointmentTime" value={credentials.appointmentTime} name="appointmentTime" onChange={onChange} />
      </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="bookingType" className="form-label">Enter Booking Type:</label>
            <input type="text" className="form-control" id="bookingType" value={credentials.bookingType} name="bookingType" onChange={onChange} />
      </div>
      
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="status" className="form-label">Enter Status:</label>
            <input type="text" className="form-control" id="status" name="status" value={credentials.status} onChange={onChange} />
      </div>
    </div>
        
     <div className='mx-0' style={{display:'flex'}}>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="notes" className="form-label">Enter Notes:</label>
            <input type="text" className="form-control" id="notes" name="notes" value={credentials.notes} onChange={onChange} />
      </div>
    <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
     <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
      </div>
    
    
      <button disabled={credentials.appointmentTime==""||credentials.bookingType==""||credentials.status==""} type="submit" className="btn btn-primary">Edit Appointment</button>
      </form>
    </div>
  )
}

export default EditAppointment
