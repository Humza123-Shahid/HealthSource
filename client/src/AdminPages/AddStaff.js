import React,{useState,useContext,useEffect} from 'react'
import staffContext from '../context/staffContext'
import shiftContext from '../context/shiftContext'

import InfoMessage from '../components/InfoMessage';

const AddStaff = () => {
    
    const context=useContext(staffContext);
      const {addStaff}=context;
      const context2=useContext(shiftContext);
      const {shifts,getShifts}=context2;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
        
    const [shiftName, setShiftName] = useState(null);
    const [status, setStatus] = useState('');
    const [ firstName, setFirstName] = useState('');
    const [ lastName, setLastName] = useState('');
    const [ designation, setDesignation] = useState('');
    const [ gender, setGender] = useState('');
    const [ birthDate, setBirthDate] = useState('');
    const [ birthDate2, setBirthDate2] = useState('');

    const [ salary, setSalary] = useState('');
    const [ nationalId, setNationalId] = useState('');
    const [ contact, setContact] = useState('');
    const [ address, setAddress] = useState('');

    const [ employType, setEmployType] = useState('');
    const [ qualification, setQualification] = useState('');
    const [ joinDate, setjoinDate] = useState('');
    const [ joinDate2, setjoinDate2] = useState('');
    const [ photoUrl, setPhotoUrl] = useState('');

  const handleStatusChange = (e) => {
    setStatus(e.target.value); // <-- Get input value here
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value); // <-- Get input value here
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value); // <-- Get input value here
  };
  const handleDesignationChange = (e) => {
    setDesignation(e.target.value); // <-- Get input value here
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value); // <-- Get input value here
  };
  const handleBirthDateChange = (e) => {
    setBirthDate(e.target.value); // <-- Get input value here
    const newTime = `${e.target.value}T05:00:00`
    setBirthDate2(newTime);
  };
  const handleSalaryChange = (e) => {
    setSalary(e.target.value); // <-- Get input value here
  };
   const handleNationalIdChange = (e) => {
    setNationalId(e.target.value); // <-- Get input value here
  };
  const handleContactChange = (e) => {
    setContact(e.target.value); // <-- Get input value here
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value); // <-- Get input value here
  };
  const handleEmploymentTypeChange = (e) => {
    setEmployType(e.target.value); // <-- Get input value here
  };
  const handleQualificationChange = (e) => {
    setQualification(e.target.value); // <-- Get input value here
  };
  const handleJoiningDateChange = (e) => {
    setjoinDate(e.target.value); // <-- Get input value here
    const newTime = `${e.target.value}T05:00:00`
    setjoinDate2(newTime);
  };
  const handlePhotoUrlChange = (e) => {
    setPhotoUrl(e.target.value); // <-- Get input value here
  };
  const handleShiftChange = (e) => {
    setShiftName(e.target.value); // <-- Get input value here
  };

  const addStaffs=async (e)=>{
          e.preventDefault();
          const success= await addStaff(firstName,lastName,designation,nationalId,gender,birthDate2,address,contact,qualification,joinDate2,employType,salary,shiftName,photoUrl,status)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Staff added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
useEffect(() => {
           const fetchData = async () => {
    
            const result=await getShifts()
           

          };
          fetchData();
          }, []); 
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addStaffs}>

    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="fname" className="form-label">Enter First Name:</label>
            <input type="text" className="form-control" id="fname" value={firstName} name="fname" onChange={handleFirstNameChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="lname" className="form-label">Enter Last Name:</label>
            <input type="text" className="form-control" id="lname" value={lastName} name="lname" onChange={handleLastNameChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="designation" className="form-label">Enter Designation:</label>
            <input type="text" className="form-control" id="designation" value={designation} name="designation" onChange={handleDesignationChange} />
      </div>
    </div>
        <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="nid" className="form-label">Enter National Id:</label>
                <input type="text" className="form-control" id="nid" value={nationalId} name="nid" onChange={handleNationalIdChange} />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="gender" className="form-label">Enter Gender:</label>
            <input type="text" className="form-control" id="gender" value={gender} name="gender" onChange={handleGenderChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="bdate" className="form-label">Select Date of Birth:</label>
            <input type="date" className="form-control" id="bdate" value={birthDate} name="bdate" onChange={handleBirthDateChange} />
      </div>
      </div>
      <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="address" className="form-label">Enter Address:</label>
                <input type="text" className="form-control" id="address" value={address} name="address" onChange={handleAddressChange} />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="contact" className="form-label">Enter Contact:</label>
                <input type="text" className="form-control" id="contact" value={contact} name="contact" onChange={handleContactChange} />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="qualification" className="form-label">Enter Qualification:</label>
                <input type="text" className="form-control" id="qualification" value={qualification} name="qualification" onChange={handleQualificationChange} />
        </div>
        </div>
        <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="joinDate" className="form-label">Select Joining Date:</label>
            <input type="date" className="form-control" id="joinDate" value={joinDate} name="joinDate" onChange={handleJoiningDateChange} />
      </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="etype" className="form-label">Enter Employment Type:</label>
                <input type="text" className="form-control" id="etype" value={employType} name="etype" onChange={handleEmploymentTypeChange} />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="salary" className="form-label">Enter Salary:</label>
            <input type="number" className="form-control" id="salary" value={salary} name="salary" onChange={handleSalaryChange} />
      </div>
        </div>
         <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="shift" className="form-label">Select Shift</label>
            <select id="shfitId" className="form-control " value={shiftName} name="shiftId" onChange={handleShiftChange}>
                {/* <option value="admin">Admin</option>
                <option value="organizer">Organizer</option> */}
              <option value="">-Shift-</option>
                  {Array.isArray(shifts) && shifts.map((row) => (
                  <option value={row._id}>{row.name}</option>
                  ))}
            </select>
        </div>
      
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="photoUrl" className="form-label">Enter Photo Url:</label>
            <input type="text" className="form-control" id="photoUrl" value={photoUrl} name="photoUrl" onChange={handlePhotoUrlChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="status" className="form-label">Enter Status:</label>
            <input type="text" className="form-control" id="status" value={status} name="status" onChange={handleStatusChange} />
      </div>
      </div>
      
    
      <button disabled={firstName==''||designation==''||birthDate.length<1||nationalId.length<1||contact.length<1||address.length<1||status.length<1||qualification.length<1||employType.length<1} type="submit" className="btn btn-primary" >Add Patient</button>
      </form>
    </div>
  )
}

export default AddStaff
