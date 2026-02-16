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
     const [ email, setEmail] = useState(Patient.email);
        const [ password, setPassword] = useState(Patient.password);
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
    const parts = Patient.photoPath?.split('\\')
console.log(parts)
// Remove the first part (which might be an empty string if the path starts with '/')
// and the second part (the first "word", e.g., "home")
const remainingParts = parts?.slice(1);
console.log(remainingParts);
// Join the remaining parts back together
const newPath = remainingParts?.join('/');
console.log(newPath);

    const [existingImage, setExistingImage] = useState(`http://localhost:5000/${newPath}`); // from DB
    console.log(existingImage);

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

  const handleStatusChange = (e) => {
    setStatus(e.target.value); // <-- Get input value here
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value); // <-- Get input value here
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // <-- Get input value here
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
  const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFile(file);

      if (file) {
        setPreview(URL.createObjectURL(file)); // preview new image
      }
    };
  const editPatients=async (e)=>{
          e.preventDefault();
          const json= await editPatient(Patient._id,firstName,lastName,email,password,fatherName,gender,birthDate,age,nationalId,contact,address,maritalStatus,bloodGroup,disabilities,chronicConditions,regDate,file,status)
          console.log(json.success);
          if(json.success)
          {
            setShowToast(true);
            setMsg("Patient updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
          else{
            setShowToast(true);
            setMsg(json.error)
            setType("error")
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
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={email} onChange={handleEmailChange} aria-describedby="emailHelp"/>
        </div>
         <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={password} onChange={handlePasswordChange} minLength={3} required/>
      </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="fname" className="form-label">Enter First Name:</label>
            <input type="text" className="form-control" id="fname" value={firstName} name="fname" onChange={handleFirstNameChange} />
      </div>
     
    </div>
        <div className='mx-0' style={{display:'flex'}}>
           <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="lname" className="form-label">Enter Last Name:</label>
            <input type="text" className="form-control" id="lname" value={lastName} name="lname" onChange={handleLastNameChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="fathername" className="form-label">Enter Father Name:</label>
            <input type="text" className="form-control" id="fathername" value={fatherName} name="fathername" onChange={handleFatherNameChange} />
      </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="gender" className="form-label">Enter Gender:</label>
            {/* <input type="text" className="form-control" id="gender" value={gender} name="gender" onChange={handleGenderChange} /> */}
            <select id="mySelect" className="form-control "  value={gender} onChange={handleGenderChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
            </select>
      </div>
     
      </div>
      <div className='mx-0' style={{display:'flex'}}>
         <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="bdate" className="form-label">Select Date of Birth:</label>
            <input type="date" className="form-control" id="bdate" value={birthDate} name="bdate" onChange={handleBirthDateChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="age" className="form-label">Enter Age:</label>
            <input type="number" className="form-control" id="age" value={age} name="age" onChange={handleAgeChange} />
      </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="nid" className="form-label">Enter National Id:</label>
                <input type="text" className="form-control" id="nid" value={nationalId} name="nid" onChange={handleNationalIdChange} />
        </div>
       
        </div>
        <div className='mx-0' style={{display:'flex'}}>
           <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="contact" className="form-label">Enter Contact:</label>
                <input type="text" className="form-control" id="contact" value={contact} name="contact" onChange={handleContactChange} />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="address" className="form-label">Enter Address:</label>
                <textarea className="form-control" id="address" value={address} name="address" onChange={handleAddressChange} />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="mstatus" className="form-label">Enter Marital Status:</label>
                {/* <input type="text" className="form-control" id="mstatus" value={maritalStatus} name="mstatus" onChange={handleMaritalStatusChange} /> */}
                 <select id="mySelect" className="form-control "  value={maritalStatus} onChange={handleMaritalStatusChange}>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="other">Other</option>
                 </select>
        </div>
        
        </div>
         <div className='mx-0' style={{display:'flex'}}>
          <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="bgroup" className="form-label">Enter Blood Group:</label>
                {/* <input type="text" className="form-control" id="bgroup" value={bloodGroup} name="bgroup" onChange={handleBloodGroupChange} /> */}
                 <select id="mySelect" className="form-control "  value={bloodGroup} onChange={handleBloodGroupChange}>
                  <option value="a+">A+</option>
                  <option value="a-">A-</option>
                  <option value="b+">B+</option>
                  <option value="b-">B-</option>
                  <option value="ab+">AB+</option>
                  <option value="ab-">AB-</option>
                  <option value="o+">O+</option>
                  <option value="0-">O-</option>
                </select>
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="disabilities" className="form-label">Enter Disabilities:</label>
                <textarea className="form-control" id="disabilities" value={disabilities} name="disabilities" onChange={handleDisabilitiesChange} />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="conditions" className="form-label">Enter Chronic Conditions:</label>
           <textarea className="form-control" id="conditions" value={chronicConditions} name="conditions" onChange={handleChronicConditionsChange} />
      </div>
      
      
       
    </div>
    <div className='mx-0' style={{display:'flex'}}>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="regDate" className="form-label">Select Registration Date:</label>
            <input type="date" className="form-control" id="regDate" value={regDate} name="regDate" onChange={handleRegistrationDateChange} />
      </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="photoUrl" className="form-label">Select Photo:</label>
            <br/>
            {/* <input type="text" className="form-control" id="photoUrl" value={photoUrl} name="photoUrl" onChange={handlePhotoUrlChange} /> */}
            <input
              type="file"
              onChange={handleFileChange}
            />
             
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <div>
              {/* {preview ? (
                <>
                  <p>New Image Preview:</p>
                  <img src={preview} width="200" />
                </>
              ) : existingImage ? (
                <>
                  <p>Current Image:</p>
                  <img src={existingImage} width="200" />
                </>
              ) : null} */}
          <label className="form-label">Image Preview:</label>
          <br/>
          <a
              href={preview ? preview : existingImage}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={preview ? preview : existingImage}
                width="200"
                style={{ cursor: 'zoom-in' }}
              />
            </a>
        </div>
      </div>
      </div>
      <div className='mx-0' style={{display:'flex'}}>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="status" className="form-label">Enter Status:</label>
            {/* <input type="text" className="form-control" id="status" value={status} name="status" onChange={handleStatusChange} /> */}
             <select id="mySelect" className="form-control " value={status} onChange={handleStatusChange}>
                <option value="active">Active</option>
                <option value="inactive">InActive</option>
                <option value="deceased">Deceased</option>
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
      
      <button disabled={email==''||password==''||firstName==''||fatherName==''||birthDate.length<1||nationalId.length<1||contact.length<1||address.length<1||bloodGroup.length<1||disabilities.length<1||chronicConditions.length<1} type="submit" className="btn btn-primary" >Update Patient</button>
      </form>
    </div>
  )
}

export default EditPatient
