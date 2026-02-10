import React,{useState,useContext,useEffect} from 'react'
import Select from "react-select";
import { useLocation } from 'react-router-dom';
import staffContext from '../context/staffContext'
import shiftContext from '../context/shiftContext'
import departmentContext from '../context/departmentContext'

import InfoMessage from '../components/InfoMessage';

const EditStaff = () => {
    
    const context=useContext(staffContext);
      const {editStaff}=context;
      const context2=useContext(shiftContext);
      const {shifts,getShifts}=context2;
       const context3=useContext(departmentContext);
      const {departments,getDepartments}=context3;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
        const formatDate = (date) => {
        return date.toISOString().split("T")[0]; // keeps only YYYY-MM-DD
    };
     const location = useLocation(); 
      const Staff=location.state?.staff || {};
    const [shiftName, setShiftName] = useState(Staff.shift);
    const [departmentName, setDepartmentName] = useState(Staff.department);

    const [status, setStatus] = useState(Staff.status);
    const [ firstName, setFirstName] = useState(Staff.firstName);
    const [ lastName, setLastName] = useState(Staff.lastName);
    const [ designation, setDesignation] = useState(Staff.designation);
    const [ gender, setGender] = useState(Staff.gender);
    const [ birthDate, setBirthDate] = useState(formatDate(new Date(Staff.dob)));
    const [ salary, setSalary] = useState(Staff.salary);
    const [ nationalId, setNationalId] = useState(Staff.nationalId);
    const [ contact, setContact] = useState(Staff.contact);
    const [ address, setAddress] = useState(Staff.address);

    const [ employType, setEmployType] = useState(Staff.employmentType);
    const [ qualification, setQualification] = useState(Staff.qualification);
    const [ joinDate, setjoinDate] = useState(formatDate(new Date(Staff.joiningDate)));
    const [ photoUrl, setPhotoUrl] = useState(Staff.photoUrl);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const parts = Staff.photoPath?.split('\\')
    const remainingParts = parts?.slice(1);
    const newPath = remainingParts?.join('/');
    
    const [existingImage, setExistingImage] = useState(`http://localhost:5000/${newPath}`); // from DB
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
  };
  const handlePhotoUrlChange = (e) => {
    setPhotoUrl(e.target.value); // <-- Get input value here
  };
  const handleShiftChange = (e) => {
    setShiftName(e.target.value); // <-- Get input value here
  };
const handleChange = (selectedOption) => {
    if(selectedOption.value=="" )
    {
      console.log('here');
        setDepartmentName(null)
    }
    else
    {
      setDepartmentName(selectedOption.value)
    }
  }
  const handleChange2 = (selectedOption) => {
    if(selectedOption.value=="" )
    {
        setShiftName(null)
    }
    else
    {
      setShiftName(selectedOption.value)
    }
  }
  const options = [
  { value: "", label: "Select Department" }, // empty option
  ... departments.map(dpt => ({
    value: dpt._id,
    label: `${dpt.name}`
  }))
];
const options2 = [
  { value: "", label: "Select Shift" }, // empty option
  ... shifts.map(st => ({
    value: st._id,
    label: `${st.name}`
  }))
];
const defaultValue = options.find(d=>d.value==Staff.department);
const defaultValue2 = options2.find(d=>d.value==Staff.shift);

const filterOption = (option, inputValue) => {
  // Only filter based on the 'label' property, for example
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};
 const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFile(file);

      if (file) {
        setPreview(URL.createObjectURL(file)); // preview new image
      }
    };
  const editStaffs=async (e)=>{
          e.preventDefault();
          console.log(departmentName);
          const success= await editStaff(Staff._id,firstName,lastName,designation,nationalId,gender,birthDate,address,contact,qualification,joinDate,employType,departmentName,salary,shiftName,file,status)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Staff updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
useEffect(() => {
           const fetchData = async () => {
    
            const result=await getShifts()
             const result2=await getDepartments()
          

          };
          fetchData();
          }, []); 
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={editStaffs}>

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
      </div>
      <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="address" className="form-label">Enter Address:</label>
                <textarea className="form-control" id="address" value={address} name="address" onChange={handleAddressChange} />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="contact" className="form-label">Enter Contact:</label>
                <input type="text" className="form-control" id="contact" value={contact} name="contact" onChange={handleContactChange} />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="qualification" className="form-label">Enter Qualification:</label>
                <textarea className="form-control" id="qualification" value={qualification} name="qualification" onChange={handleQualificationChange} />
        </div>
        </div>
        <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="joinDate" className="form-label">Select Joining Date:</label>
            <input type="date" className="form-control" id="joinDate" value={joinDate} name="joinDate" onChange={handleJoiningDateChange} />
      </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="etype" className="form-label">Enter Employment Type:</label>
                {/* <input type="text" className="form-control" id="etype" value={employType} name="etype" onChange={handleEmploymentTypeChange} /> */}
              <select id="mySelect" className="form-control "  value={employType} onChange={handleEmploymentTypeChange}>
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="contract">Contract</option>
              </select>
        </div>
         <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="staff" className="form-label">Select Department</label>
            <Select id="departmentId" options={options} filterOption={filterOption} defaultValue={defaultValue} onChange={handleChange} name="departmentId" placeholder="Select Department" />
            {/* <Select id="staffId" options={options} filterOption={filterOption} value={{'value':stf._id,'label':stf.firstName}} onChange={(selectedOption) =>handleChange(selectedOption, index)} name="staffId" placeholder="Select Staff" /> */}
        </div>
       
        </div>
         <div className='mx-0' style={{display:'flex'}}>
           <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="salary" className="form-label">Enter Salary:</label>
            <input type="number" className="form-control" id="salary" value={salary} name="salary" onChange={handleSalaryChange} />
      </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="shift" className="form-label">Select Shift</label>
            {/* <select id="shfitId" className="form-control " value={shiftName} name="shiftId" onChange={handleShiftChange}>
              <option value="">-Shift-</option>
                  {Array.isArray(shifts) && shifts.map((row) => (
                  <option value={row._id}>{row.name}</option>
                  ))}
            </select> */}
            <Select id="shfitId" options={options2} filterOption={filterOption} defaultValue={defaultValue2} onChange={handleChange2} name="shfitId" placeholder="Select Shift" />
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
     
      
      </div>
       <div className='mx-0' style={{display:'flex'}}>
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
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="status" className="form-label">Enter Status:</label>
            {/* <input type="text" className="form-control" id="status" value={status} name="status" onChange={handleStatusChange} /> */}
            <select id="mySelect" className="form-control " value={status} onChange={handleStatusChange}>
                <option value="active">Active</option>
                <option value="on-leave">On-Leave</option>
                <option value="resigned">Resigned</option>
                <option value="terminated">Terminated</option>
            </select>
      </div>
      <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
        </div>
      
      </div>
    
      <button disabled={firstName==''||designation==''||birthDate.length<1||nationalId.length<1||contact.length<1||address.length<1||status.length<1||qualification.length<1||employType.length<1} type="submit" className="btn btn-primary" >Update Staff</button>
      </form>
    </div>
  )
}

export default EditStaff
