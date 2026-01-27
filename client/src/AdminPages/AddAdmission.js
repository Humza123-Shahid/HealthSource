
import React,{useState,useEffect,useContext} from 'react'
import Select from "react-select";
import admissionContext from '../context/admissionContext'
import patientContext from '../context/patientContext'
import doctorContext from '../context/doctorContext'
import staffContext from '../context/staffContext'
import wardContext from '../context/wardContext'
import roomContext from '../context/roomContext'
import bedContext from '../context/bedContext'


import InfoMessage from '../components/InfoMessage';

const AddAdmission = () => {
   const [showToast,setShowToast]=useState(false)
       const [msg,setMsg]=useState('')
       const [type,setType]=useState('')
       const [roles,setRoles]=useState([]);
     const [credentials,setCredentials] =useState({patientId:null,doctorId:null,wardId:null,roomId:null,bedId:null,reason:"",conditionOnAdmission:"",status:"admitted"})
         const [ admissionDate, setAdmissionDate] = useState(undefined);
         const [ admissionDate2, setAdmissionDate2] = useState(undefined);
            const [ dischargeDate, setDischargeDate] = useState(undefined);
         const [ dischargeDate2, setDischargeDate2] = useState(undefined);

    const context=useContext(admissionContext);
    const {addAdmission}=context;
    const context2=useContext(patientContext);
    const {patients,getPatients}=context2;
     const context3=useContext(doctorContext);
    const {doctors,getDoctors}=context3;
    const context4=useContext(staffContext);
    const {staffs,getStaffs}=context4;
    const context5=useContext(wardContext);
    const {wards,getWards}=context5;
    const context6=useContext(roomContext);
    const {rooms,getRooms}=context6;
    const context7=useContext(bedContext);
    const {beds,getBeds}=context7;

    const handleAdmissionDateChange = (e) => {
    if(e.target.value=="")
    {
        setAdmissionDate(undefined)
        setAdmissionDate2(undefined)
    }
    else{
            setAdmissionDate(e.target.value); // <-- Get input value here
    const newTime = `${e.target.value}T05:00:00`
    setAdmissionDate2(newTime);
    }

  };
  const handleDischargeDateChange = (e) => {
    if(e.target.value=="")
    {
        setDischargeDate(undefined)
        setDischargeDate2(undefined)
    }
    else{
            setDischargeDate(e.target.value); // <-- Get input value here
    const newTime = `${e.target.value}T05:00:00`
    setDischargeDate2(newTime);
    }

  };

  
     const onChange=(e)=>{
        if(e.target.value=="" && (e.target.name=="patientId"||e.target.name=="doctorId"||e.target.name=="wardId"||e.target.name=="roomId"||e.target.name=="bedId"))
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
            setCredentials({...credentials,'wardId':null})
        }
        else
        {
          setCredentials({...credentials,'wardId':selectedOption.value})
        }
  };
  const handleChange4 = (selectedOption) => {
        if(selectedOption=="" )
        {
            setCredentials({...credentials,'roomId':null})
        }
        else
        {
          setCredentials({...credentials,'roomId':selectedOption.value})
        }
  };
  const handleChange5 = (selectedOption) => {
        if(selectedOption=="" )
        {
            setCredentials({...credentials,'bedId':null})
        }
        else
        {
          setCredentials({...credentials,'bedId':selectedOption.value})
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
  { value: "", label: "Select Ward" }, // empty option
  ... wards.map(wd => ({
    value: wd._id,
    label: `${wd.name}`
  }))
];
const options4 = [
  { value: "", label: "Select Room" }, // empty option
  ... rooms.map(rm => ({
    value: rm._id,
    label: `${rm.roomNumber}`
  }))
];
const options5 = [
  { value: "", label: "Select Bed" }, // empty option
  ... beds.map(bd => ({
    value: bd._id,
    label: `${bd.bedNumber}`
  }))
];
const filterOption = (option, inputValue) => {
  // Only filter based on the 'label' property, for example
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};

  const addAdmissions=async (e)=>{
         e.preventDefault();
        const {patientId,doctorId,wardId,roomId,bedId,reason,conditionOnAdmission,status}=credentials

         
          const user=await addAdmission(patientId,doctorId,wardId,roomId,bedId,admissionDate2,dischargeDate2,reason,conditionOnAdmission,status)
          console.log(user)
          if(user.success)
          {
        
            console.log("abc");
            setShowToast(true);
            setMsg("Admission added successfully")
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
        const result6 = await getWards();
        const result7 = await getRooms();
        const result8 = await getBeds();

          };
          fetchData();
          }, []); 
  
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addAdmissions}>
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
            <label htmlFor="doctorId" className="form-label">Admitting Doctor</label>
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
            <label htmlFor="wardId" className="form-label">Ward</label>
            {/* <select id="wardId" className="form-control " name="wardId" onChange={onChange}>
                <option value="">-Lab Test-</option>
                    {Array.isArray(wards) && wards.map((row) => (
                    <option value={row._id}>{row?.name}</option>
                    ))}
            </select> */}
             <Select id="wardId" options={options3} filterOption={filterOption} onChange={handleChange3} name="wardId" placeholder="Select Ward" />
        </div>
     
       
    </div>
      <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="roomId" className="form-label">Room</label>
             <Select id="roomId" options={options4} filterOption={filterOption} onChange={handleChange4} name="roomId" placeholder="Select Room" />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="bedId" className="form-label">Bed</label>
             <Select id="bedId" options={options5} filterOption={filterOption} onChange={handleChange5} name="bedId" placeholder="Select Bed" />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="admissionDate" className="form-label">Admission Date</label>
          <input type="date" className="form-control" id="admissionDate" name="admissionDate" value={admissionDate} onChange={handleAdmissionDateChange}  aria-describedby="emailHelp"/>
        </div>
      
       
    
    </div>
        
     <div className='mx-0' style={{display:'flex'}}>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="dischargeDate" className="form-label">Discharge Date</label>
        <input type="date" className="form-control" id="dischargeDate" name="dischargeDate" value={dischargeDate} onChange={handleDischargeDateChange}  aria-describedby="emailHelp"/>
     </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="reason" className="form-label">Enter Reason:</label>
            <textarea className="form-control" id="reason" name="reason" onChange={onChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="conditionOnAdmission" className="form-label">Enter Condition On Admission:</label>
            <textarea className="form-control" id="conditionOnAdmission" name="conditionOnAdmission" onChange={onChange} />
      </div>
        </div>

     <div className='mx-0' style={{display:'flex'}}>
         <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="status" className="form-label">Select Status:</label>
            {/* <input type="text" className="form-control" id="status" name="status" onChange={onChange} /> */}
            <select id="mySelect" className="form-control " name="status" onChange={onChange}>
                <option value="admitted">Admitted</option>
                <option value="discharged">Discharged</option>
                <option value="transferred">Transferred</option>

            </select>
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

      
      <button disabled={dischargeDate==undefined||credentials.reason==""||credentials.status==""||credentials.conditionOnAdmission==""} type="submit" className="btn btn-primary">Add Admission</button>
      </form>
    </div>
  )
}

export default AddAdmission
