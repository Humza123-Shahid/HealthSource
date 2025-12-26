
import React,{useState,useContext,useEffect} from 'react'
import doctorContext from '../context/doctorContext'
import staffContext from '../context/staffContext'

import InfoMessage from '../components/InfoMessage';

const AddDoctor = () => {
    const context=useContext(doctorContext);
    const {addDoctor}=context;
    const context2=useContext(staffContext);
      const {staffs,getStaffs}=context2;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')

        const [consultationFee, setConsultationFee] = useState(0);
    const [licenseNumber, setLicenseNumber] = useState('');
    const [specializations, setSpecializations] = useState('');
    const [experienceYears, setExperienceYears] = useState(0);
    const [selectedStaffValue, setSelectedStaffValue] = useState('');
    const [signatureUrl, setSignatureUrl] = useState('');
    const [selectedonCallValue, setSelectedOnCallValue] = useState(false);
    const handleSignatureUrlChange = (e) => {
    setSignatureUrl(e.target.value); // <-- Get input value here
  };
  const handleConsultationFeeChange = (e) => {
    setConsultationFee(e.target.value); // <-- Get input value here
  };
  const handleSpecializationsChange = (e) => {
    setSpecializations(e.target.value); // <-- Get input value here
  };
  const handleLicenseNumberChange = (e) => {
    setLicenseNumber(e.target.value); // <-- Get input value here
  };
  const handleExperienceYearsChange = (e) => {
    setExperienceYears(e.target.value); // <-- Get input value here
  };
  const handleChangeStaff = (event) => {
    setSelectedStaffValue(event.target.value); 
  };
  const handleOnCallChange = (e) => {
    setSelectedOnCallValue(e.target.value === 'true'); // <-- Get input value here
  };
  const addDoctors=async (e)=>{
          e.preventDefault();
          const success= await addDoctor(selectedStaffValue,specializations,licenseNumber,experienceYears,consultationFee,selectedonCallValue,signatureUrl)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Doctor added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
useEffect(() => {
            const fetchData = async () => {
            //const result = await getQuizzes(); // Call context function
            const result = await getStaffs();
            //setMyData(result);                     // Set state in same file
          };
      
          fetchData();
          }, []); 
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addDoctors}>

    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="mySelect" className="form-label">Select Staff Name:</label>
        <select id="mySelect" className="form-control "  value={selectedStaffValue} onChange={handleChangeStaff}>
            <option value="">-Select-</option>
            {staffs.map((row) => (
            <option value={row._id}>{row.firstName}</option>
            ))}
        </select>        
            </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="specializations" className="form-label">Enter Specializations:</label>
            <input type="text" className="form-control" id="specializations" value={specializations} name="specializations" onChange={handleSpecializationsChange} />
      </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="lNumber" className="form-label">Enter License Number:</label>
            <input type="text" className="form-control" id="lNumber" value={licenseNumber} name="lNumber" onChange={handleLicenseNumberChange} />
      </div>
    
        
      </div>
      <div className='mx-0' style={{display:'flex'}}>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="eYears" className="form-label">Experience Years:</label>
        <input type="number" className="form-control" id="eYears" value={experienceYears} name="eYears" onChange={handleExperienceYearsChange} />
    </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="cFee" className="form-label">Consultation Fee:</label>
        <input type="number" className="form-control" id="cFee" value={consultationFee} name="cFee" onChange={handleConsultationFeeChange} />
    </div>
         <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select On Call :</label>
      <select id="mySelect" className="form-control " value={selectedonCallValue} onChange={handleOnCallChange}>
        <option value="true">Available</option>
        <option value="false">UnAvailable</option>

      </select>
    </div>
      </div>
       <div className='mx-0' style={{display:'flex'}}>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="signatureUrl" className="form-label">Enter Signature Url:</label>
            <input type="text" className="form-control" id="signatureUrl" value={signatureUrl} name="signatureUrl" onChange={handleSignatureUrlChange} />
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
      <button disabled={specializations.length<1||licenseNumber.length<1||experienceYears.length<1||consultationFee.length<1||signatureUrl.length<1||selectedStaffValue==''} type="submit" className="btn btn-primary" >Add Doctor</button>
      </form>
    </div>
  )
}

export default AddDoctor
