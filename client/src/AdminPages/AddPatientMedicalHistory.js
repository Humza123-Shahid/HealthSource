
import React,{useState,useEffect,useContext} from 'react'
import patientmedicalhistoryContext from '../context/patientmedicalhistoryContext'
import patientContext from '../context/patientContext'
import doctorContext from '../context/doctorContext'
import staffContext from '../context/staffContext'
import Select from "react-select";
import InfoMessage from '../components/InfoMessage';

const AddPatientMedicalHistory = () => {
   const [showToast,setShowToast]=useState(false)
       const [msg,setMsg]=useState('')
       const [type,setType]=useState('')
       const [roles,setRoles]=useState([]);
     const [credentials,setCredentials] =useState({patientId:null,doctorId:null,condition:"",treatment:"",status:"ongoing",notes:""})
     
     const context=useContext(patientmedicalhistoryContext);
         const {addPatientMedicalHistory}=context;
         const context2=useContext(patientContext);
         const {patients,getPatients}=context2;
          const context3=useContext(doctorContext);
         const {doctors,getDoctors}=context3;
         const context4=useContext(staffContext);
         const {staffs,getStaffs}=context4;

        
  
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
    value: staff._id,
    label: `${staff.firstName}`
}})
];
const filterOption = (option, inputValue) => {
  // Only filter based on the 'label' property, for example
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};
  const addPatientMedicalHistories=async (e)=>{
         e.preventDefault();
        const {patientId,doctorId,condition,treatment,status,notes}=credentials
        const patientobj= getPatientById(patientId);

         
          const user=await addPatientMedicalHistory(patientId,doctorId,condition,treatment,status,notes)
          console.log(user)
          if(user.success)
          {
        
            console.log("abc");
            setShowToast(true);
            setMsg("Patient Medical History added successfully")
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
    <form onSubmit={addPatientMedicalHistories}>
    <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="patient" className="form-label">Patient</label>
            {/* <select id="patientId" className="form-control " name="patientId" onChange={onChange}> */}
            <Select id="patientId" options={options} filterOption={filterOption} onChange={handleChange} name="patientId" placeholder="Select Patient" />
                {/* <option value="admin">Admin</option>
                <option value="organizer">Organizer</option> */}
                {/* <option value="">-Patient-</option>
                    {Array.isArray(patients) && patients.map((row) => (
                    <option value={row._id}>{row.firstName}</option>
                    ))} */}
            {/* </select> */}
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="doctorId" className="form-label">Doctor</label>
             <Select id="doctorId" options={options2} filterOption={filterOption} onChange={handleChange2} name="doctorId" placeholder="Select Doctor" />
            {/* <select id="doctorId" className="form-control " name="doctorId" onChange={onChange}> */}
                {/* <option value="admin">Admin</option>
                <option value="organizer">Organizer</option> */}
                {/* <option value="">-Doctor-</option> */}
                    {/* {Array.isArray(doctors) && doctors.map((row) => { */}
                        {/* const staff = getStaffById(row?.staff); */}
                        {/* return( */}
                     {/* <option value={staff._id}>{staff.firstName}</option>)
                 })} */}
            {/* </select> */}
        </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="status" className="form-label">Enter Status:</label>
            {/* <input type="text" className="form-control" id="status" name="status" onChange={onChange} /> */}
             <select id="status" className="form-control " name="status" onChange={onChange}>
                <option value="ongoing">Ongoing</option>
                <option value="resolved">Resolved</option>
            </select>
      </div>
    
   
       
    </div>
      <div className='mx-0' style={{display:'flex'}}>

        {/* <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="diagnosisDate" className="form-label">Diagnosis Date</label>
          <input type="date" className="form-control" id="diagnosisDate" name="diagnosisDate" value={diagnosisDate} onChange={handleDiagnosisDateChange}  aria-describedby="emailHelp"/>
        </div> */}
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="condition" className="form-label">Enter Condition:</label>
            <textarea className="form-control" id="condition"  name="condition" onChange={onChange} />
      </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="treatment" className="form-label">Enter Treatment:</label>
            <textarea className="form-control" id="treatment" name="treatment" onChange={onChange} />
      </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="notes" className="form-label">Enter Notes:</label>
            <textarea className="form-control" id="notes" name="notes" onChange={onChange} />
      </div>
       
    </div>
        
    
      <button disabled={credentials.condition==""||credentials.treatment==""||credentials.status==""||credentials.notes==""} type="submit" className="btn btn-primary">Add Patient Medical History</button>
      </form>
    </div>
  )
}

export default AddPatientMedicalHistory
