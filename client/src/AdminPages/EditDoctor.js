
import React,{useState,useContext,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import Select from "react-select";

import doctorContext from '../context/doctorContext'
import staffContext from '../context/staffContext'

import InfoMessage from '../components/InfoMessage';

const EditDoctor = () => {
    const context=useContext(doctorContext);
    const {editDoctor}=context;
    const context2=useContext(staffContext);
      const {staffs,getStaffs}=context2;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
  const location = useLocation();
    const Doctor=location.state?.doctor || {};
        const [consultationFee, setConsultationFee] = useState(Doctor.consultationFee);
    const [licenseNumber, setLicenseNumber] = useState(Doctor.licenseNumber);
    const [specializations, setSpecializations] = useState(Doctor.specializations);
    const [experienceYears, setExperienceYears] = useState(Doctor.experienceYears);
    const [selectedStaffValue, setSelectedStaffValue] = useState(Doctor.staff);
    // const [signatureUrl, setSignatureUrl] = useState(Doctor.signatureUrl);
    const [selectedonCallValue, setSelectedOnCallValue] = useState(Doctor.onCall);
    const [file, setFile] = useState(null);
        const [preview, setPreview] = useState(null);
        const parts = Doctor.signaturePath?.split('\\')
        const remainingParts = parts?.slice(1);
        const newPath = remainingParts?.join('/');
        console.log(newPath);
        const [existingImage, setExistingImage] = useState(`http://localhost:5000/${newPath}`); // from DB
  //   const handleSignatureUrlChange = (e) => {
  //   setSignatureUrl(e.target.value); // <-- Get input value here
  // };
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
  const handleChange = (selectedOption) => {
    if(selectedOption=="" )
    {
        setSelectedStaffValue(null)
    }
    else
    {
      setSelectedStaffValue(selectedOption.value)
    }
  }
   const options = [
  { value: "", label: "Select Staff" }, // empty option
  ... staffs.map(st => ({
    value: st._id,
    label: `${st.firstName}`
  }))
];
const defaultValue = options.find(d=>d.value==Doctor.staff);

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
  const editDoctors=async (e)=>{
          e.preventDefault();
          const success= await editDoctor(Doctor._id,selectedStaffValue,specializations,licenseNumber,experienceYears,consultationFee,selectedonCallValue,file)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Doctor updated successfully")
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
    <form onSubmit={editDoctors}>

    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="mySelect" className="form-label">Select Staff Name:</label>
        {/* <select id="mySelect" className="form-control "  value={selectedStaffValue} onChange={handleChangeStaff}>
            <option value="">-Select-</option>
            {staffs.map((row) => (
            <option value={row._id}>{row.firstName}</option>
            ))}
        </select>         */}
        <Select id="staffId" options={options} filterOption={filterOption} defaultValue={defaultValue} onChange={handleChange} name="staffId" placeholder="Select Staff" />

            </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="specializations" className="form-label">Enter Specializations:</label>
            <textarea className="form-control" id="specializations" value={specializations} name="specializations" onChange={handleSpecializationsChange} />
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
            <label htmlFor="signatureUrl" className="form-label">Select Signature:</label>
            {/* <input type="text" className="form-control" id="signatureUrl" value={signatureUrl} name="signatureUrl" onChange={handleSignatureUrlChange} /> */}
            <input
              type="file"
              onChange={handleFileChange}
            />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <div>
          <label className="form-label">Signature Preview:</label>
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
    <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
     {/* <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div> */}
      </div>
      <button disabled={specializations.length<1||licenseNumber.length<1||experienceYears.length<1||consultationFee.length<1||selectedStaffValue==''} type="submit" className="btn btn-primary" >Update Doctor</button>
      </form>
    </div>
  )
}

export default EditDoctor
