import React,{useState,useContext,useEffect} from 'react'
import patientContext from '../context/patientContext'
import {
  useLocation,
  useNavigate
} from "react-router-dom";
import InfoMessage from '../components/InfoMessage';

const AddPatient = () => {
    
    const context=useContext(patientContext);
      const {addPatient}=context;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
        

    const [status, setStatus] = useState("active");
    const [ firstName, setFirstName] = useState('');
    const [ lastName, setLastName] = useState('');
    const [ fatherName, setFatherName] = useState('');
    const [ gender, setGender] = useState('male');
    const [ birthDate, setBirthDate] = useState('');
    const [ birthDate2, setBirthDate2] = useState('');

    const [ age, setAge] = useState('');
    const [ nationalId, setNationalId] = useState('');
    const [ contact, setContact] = useState('');
    const [ address, setAddress] = useState('');
    const [ maritalStatus, setMaritalStatus] = useState('single');
    const [ bloodGroup, setBloodGroup] = useState("b+");
    const [ disabilities, setDisabilities] = useState('');
    const [ chronicConditions, setChronicConditions] = useState('');
    const [ regDate, setRegDate] = useState(undefined);
    const [ regDate2, setRegDate2] = useState(undefined);
    const [ photoUrl, setPhotoUrl] = useState('');
    const [file, setFile] = useState(null);

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
    const newTime = `${e.target.value}T05:00:00`
    setBirthDate2(newTime);
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
    const newTime = `${e.target.value}T05:00:00`
    setRegDate2(newTime);
  };
  const handlePhotoUrlChange = (e) => {
    setPhotoUrl(e.target.value); // <-- Get input value here
  };

  const addPatients=async (e)=>{
          e.preventDefault();
          //photo url not empty
          //move file to the server
          //keep the name of the file and create a variable : photoUrl = '/public/patients/profile_photo/'<name of the file>
          
          const success= await addPatient(firstName,lastName,fatherName,gender,birthDate2,age,nationalId,contact,address,maritalStatus,bloodGroup,disabilities,chronicConditions,regDate2,file,status)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Patient added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
  //     const location = useLocation();
  // const navigate= useNavigate();

//  useEffect(() => {
//     if (location.pathname !== "/patient/addpatient") {
//       navigate("patient/addpatient");
//       // window.location.reload();
//     }
//   }, [location.pathname]);
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addPatients}>
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
            {/* <input type="text" className="form-control" id="gender" value={gender} name="gender" onChange={handleGenderChange} /> */}
            <select id="mySelect" className="form-control "  value={gender} onChange={handleGenderChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
            </select>
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
                <textarea className="form-control" id="address" value={address} name="address" onChange={handleAddressChange} />
        </div>
        </div>
        <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="mstatus" className="form-label">Enter Marital Status:</label>
                {/* <input type="text" className="form-control" id="mstatus" value={maritalStatus} name="mstatus" onChange={handleMaritalStatusChange} /> */}
                 <select id="mySelect" className="form-control "  value={maritalStatus} onChange={handleMaritalStatusChange}>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="other">Other</option>
                 </select>
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="bgroup" className="form-label">Enter Blood Group:</label>
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
                {/* <input type="text" className="form-control" id="bgroup" value={bloodGroup} name="bgroup" onChange={handleBloodGroupChange} /> */}
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="disabilities" className="form-label">Enter Disabilities:</label>
                <textarea className="form-control" id="disabilities" value={disabilities} name="disabilities" onChange={handleDisabilitiesChange} />
        </div>
        </div>
         <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="conditions" className="form-label">Enter Chronic Conditions:</label>
            <textarea className="form-control" id="conditions" value={chronicConditions} name="conditions" onChange={handleChronicConditionsChange} />
      </div>
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
              onChange={(e) => setFile(e.target.files[0])}
            />
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
      <button disabled={firstName==''||fatherName==''||birthDate.length<1||nationalId.length<1||contact.length<1||address.length<1||bloodGroup.length<1||disabilities.length<1||chronicConditions.length<1} type="submit" className="btn btn-primary" >Add Patient</button>
      {/* <button disabled={firstName==''||fatherName==''||birthDate.length<1||nationalId.length<1||contact.length<1||address.length<1||bloodGroup.length<1||disabilities.length<1||chronicConditions.length<1} type="button" onClick={addPatients} className="btn btn-primary" >Add Patient</button> */}
    </form>
    </div>
  )
}

export default AddPatient
