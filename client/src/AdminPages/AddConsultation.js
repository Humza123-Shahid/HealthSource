
import React,{useState,useEffect,useContext} from 'react'
import appointmentContext from '../context/appointmentContext'
import patientContext from '../context/patientContext'
import doctorContext from '../context/doctorContext'
import staffContext from '../context/staffContext'
import consultationContext from '../context/consultationContext'

import InfoMessage from '../components/InfoMessage';

const AddConsultation = () => {
   const [showToast,setShowToast]=useState(false)
       const [msg,setMsg]=useState('')
       const [type,setType]=useState('')
       const [roles,setRoles]=useState([]);
     const [credentials,setCredentials] =useState({patientId:null,doctorId:null,appointmentId:null,symptoms:"",diagnosis:"",notes:"",temperature:0,bloodPressure:"",pulse:0,oxygenLevel:0})
         const [ followUpDate, setFollowUpDate] = useState(undefined);
         const [ followUpDate2, setFollowUpDate2] = useState(undefined);
     
     const context=useContext(appointmentContext);
         const {appointments,getAppointments}=context;
         const context2=useContext(patientContext);
         const {patients,getPatients}=context2;
          const context3=useContext(doctorContext);
         const {doctors,getDoctors}=context3;
         const context4=useContext(staffContext);
         const {staffs,getStaffs}=context4;
         const context5=useContext(consultationContext);
            const {addConsultation}=context5;
          const handleFollowUpDateChange = (e) => {
    if(e.target.value=="")
    {
        setFollowUpDate(undefined)
        setFollowUpDate2(undefined)
    }
    else{
            setFollowUpDate(e.target.value); // <-- Get input value here
    const newTime = `${e.target.value}T05:00:00`
    setFollowUpDate2(newTime);
    }

  };

  
     const onChange=(e)=>{
        if(e.target.value=="" && (e.target.name=="patientId"||e.target.name=="doctorId"||e.target.name=="appointmentId"))
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


  const addConsultations=async (e)=>{
         e.preventDefault();
        const {patientId,doctorId,appointmentId,symptoms,diagnosis,notes,temperature,bloodPressure,pulse,oxygenLevel}=credentials

         
          const user=await addConsultation(patientId,doctorId,appointmentId,symptoms,diagnosis,notes,followUpDate2,temperature,bloodPressure,pulse,oxygenLevel)
          console.log(user)
          if(user.success)
          {
        
            console.log("abc");
            setShowToast(true);
            setMsg("Consultation added successfully")
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
        const result6 = await getAppointments();

          };
          fetchData();
          }, []); 
          useEffect(() => {
               console.log(followUpDate);

          }, [followUpDate]); 
  
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addConsultations}>
    <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="patient" className="form-label">Patient</label>
            <select id="patientId" className="form-control " name="patientId" onChange={onChange}>
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
            <select id="doctorId" className="form-control " name="doctorId" onChange={onChange}>
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
            <label htmlFor="appointmentId" className="form-label">Appointment</label>
            <select id="appointmentId" className="form-control " name="appointmentId" onChange={onChange}>
                {/* <option value="admin">Admin</option>
                <option value="organizer">Organizer</option> */}
                <option value="">-Appointment-</option>
                    {Array.isArray(appointments) && appointments.map((row) => {
              const formattedAppointmentDate = new Date(row?.appointmentDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
           
          });
            return(
                    <option value={row._id}>{formattedAppointmentDate}</option>)
                    })}
            </select>
        </div>
     
       
    </div>
      <div className='mx-0' style={{display:'flex'}}>

       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="symptoms" className="form-label">Enter Symptoms:</label>
            <input type="text" className="form-control" id="symptoms" name="symptoms" onChange={onChange} />
      </div>
      
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="diagnosis" className="form-label">Enter Diagnosis:</label>
            <input type="text" className="form-control" id="diagnosis" name="diagnosis" onChange={onChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="notes" className="form-label">Enter Notes:</label>
            <input type="text" className="form-control" id="notes" name="notes" onChange={onChange} />
      </div>
    </div>
        
     <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="followUpDate" className="form-label">FollowUp Date</label>
          <input type="date" className="form-control" id="followUpDate" name="followUpDate" value={followUpDate} onChange={handleFollowUpDateChange}  aria-describedby="emailHelp"/>
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
     <hr />

      <h4>Vitals Section</h4>
      <div className='mx-0' style={{display:'flex'}}>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="temperature" className="form-label">Enter Temperature:</label>
        <input type="number" className="form-control" id="temperature" name="temperature" onChange={onChange} />
    </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="bloodPressure" className="form-label">Enter Blood Pressure:</label>
            <input type="text" className="form-control" id="bloodPressure" name="bloodPressure" onChange={onChange} />
      </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="pulse" className="form-label">Enter Pulse:</label>
        <input type="number" className="form-control" id="pulse" name="pulse" onChange={onChange} />
    </div>
    </div>
    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="oxygenLevel" className="form-label">Enter Oxygen Level:</label>
        <input type="number" className="form-control" id="oxygenLevel" name="oxygenLevel" onChange={onChange} />
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
      <button disabled={followUpDate==undefined||credentials.symptoms==""||credentials.diagnosis==""||credentials.notes==""||credentials.bloodPressure==""} type="submit" className="btn btn-primary">Add Consultation</button>
      </form>
    </div>
  )
}

export default AddConsultation
