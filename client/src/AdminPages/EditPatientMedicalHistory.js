
import React,{useState,useEffect,useContext} from 'react'
import { useLocation } from 'react-router-dom';
import Select from "react-select";
import patientmedicalhistoryContext from '../context/patientmedicalhistoryContext'
import patientContext from '../context/patientContext'
import doctorContext from '../context/doctorContext'
import staffContext from '../context/staffContext'

import InfoMessage from '../components/InfoMessage';

const EditPatientMedicalHistory = () => {
   const [showToast,setShowToast]=useState(false)
       const [msg,setMsg]=useState('')
       const [type,setType]=useState('')
    const location = useLocation();
    const PatientMedicalHistory=location.state?.patientmedicalhistory || {};
    const doctor=location.state?.doctorId || null;
    const patient=location.state?.patientId || null;
     const formatDate = (date) => {
        return date.toISOString().split("T")[0]; // keeps only YYYY-MM-DD
    };
     const [credentials,setCredentials] =useState({patientId:patient,doctorId:doctor,condition:PatientMedicalHistory.condition,treatment:PatientMedicalHistory.treatment,status:PatientMedicalHistory.status,notes:PatientMedicalHistory.notes})
         
     
     const context=useContext(patientmedicalhistoryContext);
         const {editPatientMedicalHistory}=context;
         const context2=useContext(patientContext);
         const {patients,getPatients}=context2;
          const context3=useContext(doctorContext);
         const {doctors,getDoctors}=context3;
         const context4=useContext(staffContext);
         const {staffs,getStaffs}=context4;

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
const defaultValue = options.find(d=>d.value==patient);
const defaultValue2 = options2.find(d=>d.value==doctor);

const filterOption = (option, inputValue) => {
  // Only filter based on the 'label' property, for example
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};
  const editPatientMedicalHistories=async (e)=>{
         e.preventDefault();
        const {patientId,doctorId,condition,treatment,status,notes}=credentials
        const patientobj= getPatientById(patientId);

         
          const user=await editPatientMedicalHistory(PatientMedicalHistory._id,patientId,doctorId,condition,treatment,status,notes)
          console.log(user)
          if(user.success)
          {
        
            console.log("abc");
            setShowToast(true);
            setMsg("Patient Medical History updated successfully")
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
    <form onSubmit={editPatientMedicalHistories}>
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
            <label htmlFor="status" className="form-label">Enter Status:</label>
            {/* <input type="text" className="form-control" id="status" value={credentials.status} name="status" onChange={onChange} /> */}
             <select id="status" className="form-control " value={credentials.status} name="status" onChange={onChange}>
                <option value="ongoing">Ongoing</option>
                <option value="resolved">Resolved</option>
            </select>
      </div>
    
   
       
    </div>
      <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="condition" className="form-label">Enter Condition:</label>
            <textarea className="form-control" id="condition"  value={credentials.condition} name="condition" onChange={onChange} />
      </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="treatment" className="form-label">Enter Treatment:</label>
            <textarea className="form-control" id="treatment" value={credentials.treatment} name="treatment" onChange={onChange} />
      </div>
      
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="notes" className="form-label">Enter Notes:</label>
            <textarea className="form-control" id="notes" value={credentials.notes} name="notes" onChange={onChange} />
      </div>
    </div>
        
    
    
      <button disabled={credentials.condition==""||credentials.treatment==""||credentials.status==""||credentials.notes==""} type="submit" className="btn btn-primary">Update Patient Medical History</button>
      </form>
    </div>
  )
}

export default EditPatientMedicalHistory
