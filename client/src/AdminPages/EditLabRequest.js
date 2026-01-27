
import React,{useState,useEffect,useContext} from 'react'
import { useLocation } from 'react-router-dom';
import Select from "react-select";
import labtestContext from '../context/labtestContext'
import patientContext from '../context/patientContext'
import doctorContext from '../context/doctorContext'
import staffContext from '../context/staffContext'
import labrequestContext from '../context/labrequestContext'

import InfoMessage from '../components/InfoMessage';

const EditLabRequest = () => {
   const [showToast,setShowToast]=useState(false)
       const [msg,setMsg]=useState('')
       const [type,setType]=useState('')
       const location = useLocation();
            const LabRequest=location.state?.labrequest || {};
           const labtest=location.state?.labtestId || {};
           const doctor=location.state?.doctorId || null;
           const patient=location.state?.patientId || null;
            const formatDate = (date) => {
        return date.toISOString().split("T")[0]; // keeps only YYYY-MM-DD
    };
         const [credentials,setCredentials] =useState({patientId:patient,doctorId:doctor,labtestId:labtest,priority:LabRequest.priority,status:LabRequest.status,notes:LabRequest.notes})
         const [ requestDate, setRequestDate] = useState(formatDate(new Date(LabRequest.requestDate)));
         const [ requestDate2, setRequestDate2] = useState(formatDate(new Date(LabRequest.requestDate)));
     
     const context=useContext(labtestContext);
         const {labtests,getLabTests}=context;
         const context2=useContext(patientContext);
         const {patients,getPatients}=context2;
          const context3=useContext(doctorContext);
         const {doctors,getDoctors}=context3;
         const context4=useContext(staffContext);
         const {staffs,getStaffs}=context4;
         const context5=useContext(labrequestContext);
            const {editLabRequest}=context5;
          const handleRequestDateChange = (e) => {
    if(e.target.value=="")
    {
        setRequestDate(undefined)
        setRequestDate2(undefined)
    }
    else{
            setRequestDate(e.target.value); // <-- Get input value here
    const newTime = `${e.target.value}T05:00:00`
    setRequestDate2(newTime);
    }

  };

  
     const onChange=(e)=>{
        if(e.target.value=="" && (e.target.name=="patientId"||e.target.name=="doctorId"||e.target.name=="labtestId"))
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
            setCredentials({...credentials,'labtestId':null})
        }
        else
        {
          setCredentials({...credentials,'labtestId':selectedOption.value})
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
  { value: "", label: "Select Lab Test" }, // empty option
  ... labtests.map(lt => ({
    value: lt._id,
    label: `${lt.name}`
  }))
];
const defaultValue = options.find(d=>d.value==patient);
const defaultValue2 = options2.find(d=>d.value==doctor);
const defaultValue3 = options3.find(d=>d.value==labtest);

const filterOption = (option, inputValue) => {
  // Only filter based on the 'label' property, for example
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};

  const editLabRequests=async (e)=>{
         e.preventDefault();
        const {patientId,doctorId,labtestId,priority,status,notes}=credentials

         
          const user=await editLabRequest(LabRequest._id,patientId,doctorId,labtestId,requestDate2,priority,status,notes)
          console.log(user)
          if(user.success)
          {
        
            console.log("abc");
            setShowToast(true);
            setMsg("Lab Request updated successfully")
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
        const result6 = await getLabTests();

          };
          fetchData();
          }, []); 
  
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={editLabRequests}>
    <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="patient" className="form-label">Patient</label>
            {/* <select id="patientId" className="form-control " name="patientId" onChange={onChange}>
                <option value="">-Patient-</option>
                    {Array.isArray(patients) && patients.map((row) => (
                    <option value={row._id}>{row.firstName}</option>
                    ))}
            </select> */}
            <Select id="patientId" options={options} filterOption={filterOption} defaultValue={defaultValue} onChange={handleChange} name="patientId" placeholder="Select Patient" />
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
             <Select id="doctorId" options={options2} filterOption={filterOption} defaultValue={defaultValue2} onChange={handleChange2} name="doctorId" placeholder="Select Doctor" />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="labtestId" className="form-label">Lab Test</label>
            {/* <select id="labtestId" className="form-control " name="labtestId" onChange={onChange}>
                <option value="">-Lab Test-</option>
                    {Array.isArray(labtests) && labtests.map((row) => (
                    <option value={row._id}>{row?.name}</option>
                    ))}
            </select> */}
             <Select id="labtestId" options={options3} filterOption={filterOption} defaultValue={defaultValue3} onChange={handleChange3} name="labtestId" placeholder="Select Lab Test" />
        </div>
       
    </div>
      <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="requestDate" className="form-label">Request Date</label>
          <input type="date" className="form-control" id="requestDate" name="requestDate" value={requestDate} onChange={handleRequestDateChange}  aria-describedby="emailHelp"/>
        </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="priority" className="form-label">Enter Priority:</label>
            {/* <input type="text" className="form-control" id="priority" value={credentials.priority} name="priority" onChange={onChange} /> */}
            <select id="mySelect" className="form-control " value={credentials.priority} name="status" onChange={onChange}>
              <option value="routine">Routine</option>
              <option value="urgent">Urgent</option>
              <option value="stat">Stat</option>
            </select>
      </div>
      
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="status" className="form-label">Enter Status:</label>
            {/* <input type="text" className="form-control" id="status" value={credentials.status} name="status" onChange={onChange} /> */}
            <select id="mySelect" className="form-control " value={credentials.status} name="status" onChange={onChange}>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>

            </select>
      </div>
    
    </div>
        
     <div className='mx-0' style={{display:'flex'}}>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="notes" className="form-label">Enter Notes:</label>
            <textarea className="form-control" id="notes" value={credentials.notes} name="notes" onChange={onChange} />
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

      
      <button disabled={requestDate==undefined||credentials.priority==""||credentials.status==""||credentials.notes==""} type="submit" className="btn btn-primary">Update Lab Request</button>
      </form>
    </div>
  )
}

export default EditLabRequest
