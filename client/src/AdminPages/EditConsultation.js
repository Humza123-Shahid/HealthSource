
import React,{useState,useEffect,useContext} from 'react'
import { useLocation } from 'react-router-dom';
import Select from "react-select";

import appointmentContext from '../context/appointmentContext'
import patientContext from '../context/patientContext'
import doctorContext from '../context/doctorContext'
import staffContext from '../context/staffContext'
import consultationContext from '../context/consultationContext'

import InfoMessage from '../components/InfoMessage';

const EditConsultation = () => {
     const location = useLocation();
         const Consultation=location.state?.consultation || {};
        const Appointment=location.state?.appointmentId || null;
        const doctor=location.state?.doctorId || null;
        const patient=location.state?.patientId || null;
   const [showToast,setShowToast]=useState(false)
       const [msg,setMsg]=useState('')
       const [type,setType]=useState('')
        const formatDate = (date) => {
        return date.toISOString().split("T")[0]; // keeps only YYYY-MM-DD
    };
       const [roles,setRoles]=useState([]);
       console.log(Appointment)
     const [credentials,setCredentials] =useState({patientId:patient,doctorId:doctor,appointmentId:Appointment,symptoms:Consultation.symptoms,diagnosis:Consultation.diagnosis,notes:Consultation.notes,temperature:Consultation.vitals.temperature,bloodPressure:Consultation.vitals.bloodPressure,pulse:Consultation.vitals.pulse,oxygenLevel:Consultation.vitals.oxygenLevel})
         const [ followUpDate, setFollowUpDate] = useState(formatDate(new Date(Consultation.followUpDate)));
         const [ followUpDate2, setFollowUpDate2] = useState(formatDate(new Date(Consultation.followUpDate)));
     
     const context=useContext(appointmentContext);
         const {appointments,getAppointments}=context;
         const context2=useContext(patientContext);
         const {patients,getPatients}=context2;
          const context3=useContext(doctorContext);
         const {doctors,getDoctors}=context3;
         const context4=useContext(staffContext);
         const {staffs,getStaffs}=context4;
         const context5=useContext(consultationContext);
            const {editConsultation}=context5;
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
   const handleChange3 = (selectedOption) => {
        if(selectedOption=="" )
        {
            setCredentials({...credentials,'appointmentId':null})
        }
        else
        {
          setCredentials({...credentials,'appointmentId':selectedOption.value})
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
    value: staff._id,
    label: `${staff.firstName}`
}})
];
const options3 = [
  { value: "", label: "Select Appointment" }, // empty option
  ... appointments.map(at => {
     const formattedAppointmentDate = new Date(at.appointmentDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
           
          });
    return{
    value: at._id,
    label: `${formattedAppointmentDate}`
}})
];
const defaultValue = options.find(d=>d.value==patient);
const defaultValue2 = options2.find(d=>d.value==doctor);
const defaultValue3 = options3.find(d=>d.value==Appointment);

const filterOption = (option, inputValue) => {
  // Only filter based on the 'label' property, for example
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};


  const editConsultations=async (e)=>{
         e.preventDefault();
        const {patientId,doctorId,appointmentId,symptoms,diagnosis,notes,temperature,bloodPressure,pulse,oxygenLevel}=credentials
        console.log(patientId,doctorId,appointmentId,symptoms,diagnosis,notes,temperature,bloodPressure,pulse,oxygenLevel)
         console.log(appointmentId)
          const user=await editConsultation(Consultation._id,patientId,doctorId,appointmentId,symptoms,diagnosis,notes,followUpDate2,temperature,bloodPressure,pulse,oxygenLevel)
          console.log(user)
          if(user.success)
          {
        
            console.log("abc");
            setShowToast(true);
            setMsg("Consultation updated successfully")
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
    <form onSubmit={editConsultations}>
    <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="patient" className="form-label">Patient</label>
            {/* <select id="patientId" className="form-control " value={credentials.patientId} name="patientId" onChange={onChange}>
                <option value="">-Patient-</option>
                    {Array.isArray(patients) && patients.map((row) => (
                    <option value={row._id}>{row.firstName}</option>
                    ))}
            </select> */}
            <Select id="patientId" options={options} filterOption={filterOption} defaultValue={defaultValue} onChange={handleChange} name="patientId" placeholder="Select Patient" />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="doctorId" className="form-label">Doctor</label>
            {/* <select id="doctorId" className="form-control " value={credentials.doctorId} name="doctorId" onChange={onChange}>
                <option value="">-Doctor-</option>
                    {Array.isArray(doctors) && doctors.map((row) => {
                        const staff = getStaffById(row?.staff);
                        return(
                    <option value={staff._id}>{staff.firstName}</option>)
                })}
            </select> */}
             <Select id="doctorId" options={options2} filterOption={filterOption} defaultValue={defaultValue2} onChange={handleChange2} name="doctorId" placeholder="Select Doctor" />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="appointmentId" className="form-label">Appointment</label>
            {/* <select id="appointmentId" className="form-control " value={credentials.appointmentId} name="appointmentId" onChange={onChange}>
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
            </select> */}
             <Select id="appointmentId" options={options3} filterOption={filterOption} defaultValue={defaultValue3} onChange={handleChange3} name="appointmentId" placeholder="Select Appointment" />
        </div>
     
       
    </div>
      <div className='mx-0' style={{display:'flex'}}>

       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="symptoms" className="form-label">Enter Symptoms:</label>
            <textarea className="form-control" id="symptoms" value={credentials.symptoms} name="symptoms" onChange={onChange} />
      </div>
      
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="diagnosis" className="form-label">Enter Diagnosis:</label>
            <textarea className="form-control" id="diagnosis" value={credentials.diagnosis} name="diagnosis" onChange={onChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="notes" className="form-label">Enter Notes:</label>
            <textarea className="form-control" id="notes" name="notes" value={credentials.notes} onChange={onChange} />
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
        <input type="number" className="form-control" id="temperature" value={credentials.temperature} name="temperature" onChange={onChange} />
    </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="bloodPressure" className="form-label">Enter Blood Pressure:</label>
            <input type="text" className="form-control" id="bloodPressure" value={credentials.bloodPressure} name="bloodPressure" onChange={onChange} />
      </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="pulse" className="form-label">Enter Pulse:</label>
        <input type="number" className="form-control" id="pulse" value={credentials.pulse} name="pulse" onChange={onChange} />
    </div>
    </div>
    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="oxygenLevel" className="form-label">Enter Oxygen Level:</label>
        <input type="number" className="form-control" id="oxygenLevel" value={credentials.oxygenLevel} name="oxygenLevel" onChange={onChange} />
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
      <button disabled={followUpDate==undefined||credentials.symptoms==""||credentials.diagnosis==""||credentials.notes==""||credentials.bloodPressure==""} type="submit" className="btn btn-primary">Update Consultation</button>
      </form>
    </div>
  )
}

export default EditConsultation
