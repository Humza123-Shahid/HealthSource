import React,{useState,useContext,useEffect} from 'react'
import patientContext from '../context/patientContext'
import { useLocation } from 'react-router-dom';

import InfoMessage from '../components/InfoMessage';

const EditPatient = () => {
    
    const context=useContext(patientContext);
      const {editPatient}=context;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const location = useLocation();
    const formatDate = (date) => {
        return date.toISOString().split("T")[0]; // keeps only YYYY-MM-DD
    };
    const Patient=location.state?.patient || {};


    const [status, setStatus] = useState(Patient.status);
    const [ firstName, setFirstName] = useState(Patient.firstName);
    const [ lastName, setLastName] = useState(Patient.lastName);
    const [ fatherName, setFatherName] = useState(Patient.fatherName);
    const [ gender, setGender] = useState(Patient.gender);
    const [ birthDate, setBirthDate] = useState(formatDate(new Date(Patient.dateOfBirth)));
    const [ age, setAge] = useState(Patient.age);
    const [ nationalId, setNationalId] = useState(Patient.nationalId);
    const [ contact, setContact] = useState(Patient.contact);
    const [ address, setAddress] = useState(Patient.address);
    const [ maritalStatus, setMaritalStatus] = useState(Patient.maritalStatus);
    const [ bloodGroup, setBloodGroup] = useState(Patient.bloodGroup);
    const [ disabilities, setDisabilities] = useState(Patient.disabilities);
    const [ chronicConditions, setChronicConditions] = useState(Patient.chronicConditions);
    const [ regDate, setRegDate] = useState(formatDate(new Date(Patient.registrationDate)));
    const [ photoUrl, setPhotoUrl] = useState(Patient.photoUrl);

  const handleStatusChange = (e) => {
    setStatus(e.target.value); // <-- Get input value here
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value); // <-- Get input value here
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value); // <-- Get input value here
  };
  const handleFatherNameChange = (e) => {
    setFatherName(e.target.value); // <-- Get input value here
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value); // <-- Get input value here
  };
  const handleBirthDateChange = (e) => {
    setBirthDate(e.target.value); // <-- Get input value here

  };
  const handleAgeChange = (e) => {
    setAge(e.target.value); // <-- Get input value here
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
  const handleMaritalStatusChange = (e) => {
    setMaritalStatus(e.target.value); // <-- Get input value here
  };
  const handleBloodGroupChange = (e) => {
    setBloodGroup(e.target.value); // <-- Get input value here
  };
  const handleDisabilitiesChange = (e) => {
    setDisabilities(e.target.value); // <-- Get input value here
  };
  const handleChronicConditionsChange = (e) => {
    setChronicConditions(e.target.value); // <-- Get input value here
  };
  const handleRegistrationDateChange = (e) => {
    setRegDate(e.target.value); // <-- Get input value here
   
  };
  const handlePhotoUrlChange = (e) => {
    setPhotoUrl(e.target.value); // <-- Get input value here
  };

  const editPatients=async (e)=>{
          e.preventDefault();
          const success= await editPatient(Patient._id,firstName,lastName,fatherName,gender,birthDate,age,nationalId,contact,address,maritalStatus,bloodGroup,disabilities,chronicConditions,regDate,photoUrl,status)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Patient updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }

  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={editPatients}>

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
            <label htmlFor="fathername" className="form-label">Enter Father Name:</label>
            <input type="text" className="form-control" id="fathername" value={fatherName} name="fathername" onChange={handleFatherNameChange} />
      </div>
    </div>
        <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="gender" className="form-label">Enter Gender:</label>
            <input type="text" className="form-control" id="gender" value={gender} name="gender" onChange={handleGenderChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="bdate" className="form-label">Select Date of Birth:</label>
            <input type="date" className="form-control" id="bdate" value={birthDate} name="bdate" onChange={handleBirthDateChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="age" className="form-label">Enter Age:</label>
            <input type="number" className="form-control" id="age" value={age} name="age" onChange={handleAgeChange} />
      </div>
      </div>
      <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="nid" className="form-label">Enter National Id:</label>
                <input type="text" className="form-control" id="nid" value={nationalId} name="nid" onChange={handleNationalIdChange} />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="contact" className="form-label">Enter Contact:</label>
                <input type="text" className="form-control" id="contact" value={contact} name="contact" onChange={handleContactChange} />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="address" className="form-label">Enter Address:</label>
                <input type="text" className="form-control" id="address" value={address} name="address" onChange={handleAddressChange} />
        </div>
        </div>
        <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="mstatus" className="form-label">Enter Marital Status:</label>
                <input type="text" className="form-control" id="mstatus" value={maritalStatus} name="mstatus" onChange={handleMaritalStatusChange} />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="bgroup" className="form-label">Enter Blood Group:</label>
                <input type="text" className="form-control" id="bgroup" value={bloodGroup} name="bgroup" onChange={handleBloodGroupChange} />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="disabilities" className="form-label">Enter Disabilities:</label>
                <input type="text" className="form-control" id="disabilities" value={disabilities} name="disabilities" onChange={handleDisabilitiesChange} />
        </div>
        </div>
         <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="conditions" className="form-label">Enter Chronic Conditions:</label>
            <input type="text" className="form-control" id="conditions" value={chronicConditions} name="conditions" onChange={handleChronicConditionsChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="regDate" className="form-label">Select Registration Date:</label>
            <input type="date" className="form-control" id="regDate" value={regDate} name="regDate" onChange={handleRegistrationDateChange} />
      </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="photoUrl" className="form-label">Enter Photo Url:</label>
            <input type="text" className="form-control" id="photoUrl" value={photoUrl} name="photoUrl" onChange={handlePhotoUrlChange} />
      </div>
      </div>
      
    <div className='mx-0' style={{display:'flex'}}>

      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="status" className="form-label">Enter Status:</label>
            <input type="text" className="form-control" id="status" value={status} name="status" onChange={handleStatusChange} />
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
      <button disabled={firstName==''||fatherName==''||birthDate.length<1||nationalId.length<1||contact.length<1||address.length<1||bloodGroup.length<1||disabilities.length<1||chronicConditions.length<1} type="submit" className="btn btn-primary" >Edit Patient</button>
      </form>
    </div>
  )
}

export default EditPatient
