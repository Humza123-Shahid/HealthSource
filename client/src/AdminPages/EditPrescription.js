
import React,{useState,useEffect,useContext} from 'react'
import { useLocation } from 'react-router-dom';
import Select from "react-select";

import prescriptionContext from '../context/prescriptionContext'
import patientContext from '../context/patientContext'
import doctorContext from '../context/doctorContext'
import staffContext from '../context/staffContext'
import consultationContext from '../context/consultationContext'
import medicineContext from '../context/medicineContext'

import InfoMessage from '../components/InfoMessage';

const EditPrescription = () => {
   const [showToast,setShowToast]=useState(false)
       const [msg,setMsg]=useState('')
       const [type,setType]=useState('')
       const [roles,setRoles]=useState([]);
        const formatDate = (date) => {
        return date.toISOString().split("T")[0]; // keeps only YYYY-MM-DD
    };
    const location = useLocation();
         const Prescription=location.state?.prescription || {};
        const medicine=location.state?.medicineId || null;
        const consultation=location.state?.consultationId || null;
        const doctor=location.state?.doctorId || null;
        const patient=location.state?.patientId || null;
     const [credentials,setCredentials] =useState({consultationId:consultation,doctorId:doctor,patientId:patient,notes:Prescription.notes,medicineId:medicine,dosage:Prescription.medicines.dosage,frequency:Prescription.medicines.frequency,duration:Prescription.medicines.duration,instructions:Prescription.medicines.instructions})
         const [ issuedDate, setIssuedDate] = useState(formatDate(new Date(Prescription.issuedDate)));
         const [ issuedDate2, setIssuedDate2] = useState(formatDate(new Date(Prescription.issuedDate)));
     
     const context=useContext(prescriptionContext);
         const {editPrescription}=context;
         const context2=useContext(patientContext);
         const {patients,getPatients}=context2;
          const context3=useContext(doctorContext);
         const {doctors,getDoctors}=context3;
         const context4=useContext(staffContext);
         const {staffs,getStaffs}=context4;
         const context5=useContext(consultationContext);
          const {consultations,getConsultations}=context5;
        const context6=useContext(medicineContext);
        const {medicines,getMedicines}=context6;
          const handleIssuedDateChange = (e) => {
    if(e.target.value=="")
    {
        setIssuedDate(undefined)
        setIssuedDate2(undefined)
    }
    else{
            setIssuedDate(e.target.value); // <-- Get input value here
    const newTime = `${e.target.value}T05:00:00`
    setIssuedDate2(newTime);
    }

  };
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
            setCredentials({...credentials,'consultationId':null})
        }
        else
        {
          setCredentials({...credentials,'consultationId':selectedOption.value})
        }
  };
  const handleChange4 = (selectedOption) => {
        if(selectedOption=="" )
        {
            setCredentials({...credentials,'medicineId':null})
        }
        else
        {
          setCredentials({...credentials,'medicineId':selectedOption.value})
        }
  };
  
     const onChange=(e)=>{
        if(e.target.value=="" && (e.target.name=="patientId"||e.target.name=="doctorId"||e.target.name=="consultationId"||e.target.name=="medicine"))
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
const options3 = [
  { value: "", label: "Select Consultation" }, // empty option
  ... consultations.map(ct => {
     const formattedConsultationDate = new Date(ct.followUpDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
           
          });
    return{
    value: ct._id,
    label: `${formattedConsultationDate}`
}})
];
const options4 = [
  { value: "", label: "Select Medicine" }, // empty option
  ... medicines.map(md => ({
    value: md._id,
    label: `${md.name}`
  }))
];
const defaultValue = options.find(d=>d.value==patient);
const defaultValue2 = options2.find(d=>d.value==doctor);
const defaultValue3 = options3.find(d=>d.value==consultation);
const defaultValue4 = options4.find(d=>d.value==medicine);

const filterOption = (option, inputValue) => {
  // Only filter based on the 'label' property, for example
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};
  const editPrescriptions=async (e)=>{
         e.preventDefault();
        const {consultationId,doctorId,patientId,notes,medicineId,dosage,frequency,duration,instructions}=credentials

         console.log(medicine);
          const user=await editPrescription(Prescription._id,consultationId,doctorId,patientId,issuedDate2,notes,medicineId,dosage,frequency,duration,instructions)
          console.log(user)
          if(user.success)
          {
        
            console.log("abc");
            setShowToast(true);
            setMsg("Prescription updated successfully")
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
        const result6 = await getConsultations();
        const result7 = await getMedicines();

          };
          fetchData();
          }, []); 
      
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={editPrescriptions}>
    <div className='mx-0' style={{display:'flex'}}>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="consultationId" className="form-label">Consultation</label>
            {/* <select id="consultationId" className="form-control " value={credentials.consultationId} name="consultationId" onChange={onChange}>
                
                <option value="">-Consultation-</option>
                    {Array.isArray(consultations) && consultations.map((row) => {
              const formattedFollowUpDate = new Date(row?.followUpDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
           
          });
            return(
                    <option value={row._id}>{formattedFollowUpDate}</option>)
                    })}
            </select> */}
             <Select id="consultationId" options={options3} filterOption={filterOption} defaultValue={defaultValue3} onChange={handleChange3} name="consultationId" placeholder="Select Consultation" />

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
            <label htmlFor="patient" className="form-label">Patient</label>
            {/* <select id="patientId" className="form-control " value={credentials.patientId} name="patientId" onChange={onChange}>
                
                <option value="">-Patient-</option>
                    {Array.isArray(patients) && patients.map((row) => (
                    <option value={row._id}>{row.firstName}</option>
                    ))}
            </select> */}
            <Select id="patientId" options={options} filterOption={filterOption} defaultValue={defaultValue} onChange={handleChange} name="patientId" placeholder="Select Patient" />

        </div>
       
        
       
    </div>      
     <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="issuedDate" className="form-label">Issued Date</label>
          <input type="date" className="form-control" id="issuedDate" name="issuedDate" value={issuedDate} onChange={handleIssuedDateChange}  aria-describedby="emailHelp"/>
        </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="notes" className="form-label">Enter Notes:</label>
            <textarea className="form-control" id="notes" value={credentials.notes} name="notes" onChange={onChange} />
      </div>
     <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
      </div>
     <hr />

      <h4>Medicines Section</h4>
      <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="medicineId" className="form-label">Medicine:</label>
            {/* <select id="medicineId" className="form-control " value={credentials.medicineId} name="medicineId" onChange={onChange}>
                <option value="">-Medicine-</option>
                    {Array.isArray(medicines) && medicines.map((row) => (
                    <option value={row._id}>{row.name}</option>
                    ))}
            </select> */}
            <Select id="medicineId" options={options4} filterOption={filterOption} defaultValue={defaultValue4} onChange={handleChange4} name="medicineId" placeholder="Select Medicine" />
        </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="dosage" className="form-label">Enter Dosage:</label>
            <input type="text" className="form-control" id="dosage" value={credentials.dosage} name="dosage" onChange={onChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="frequency" className="form-label">Enter Frequency:</label>
            <input type="text" className="form-control" id="frequency" value={credentials.frequency} name="frequency" onChange={onChange} />
      </div>
    
    </div>
    <div className='mx-0' style={{display:'flex'}}>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="duration" className="form-label">Enter Duration:</label>
            <input type="text" className="form-control" id="duration" value={credentials.duration} name="duration" onChange={onChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="instructions" className="form-label">Enter Instructions:</label>
            <textarea className="form-control" id="instructions" value={credentials.instructions} name="instructions" onChange={onChange} />
      </div>
     <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
      </div>
      <button disabled={issuedDate==undefined||credentials.dosage==""||credentials.frequency==""||credentials.notes==""||credentials.instructions==""||credentials.duration==""} type="submit" className="btn btn-primary">Update Prescription</button>
      </form>
    </div>
  )
}

export default EditPrescription
