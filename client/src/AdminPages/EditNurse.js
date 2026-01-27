
import React,{useState,useContext,useEffect} from 'react';
import Select from "react-select";
import { useLocation } from 'react-router-dom';
import nurseContext from '../context/nurseContext'
import staffContext from '../context/staffContext'
import wardContext from '../context/wardContext'

import InfoMessage from '../components/InfoMessage';

const EditNurse = () => {
     const context=useContext(nurseContext);
    const {editNurse}=context;
     const context2=useContext(staffContext);
    const {staffs,getStaffs}=context2;
      const context3=useContext(wardContext);
    const {wards,getWards}=context3;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const location = useLocation();
    const Nurse=location.state?.nurse || {};
    const Staffs=location.state?.staff || {};
    const Wards=location.state?.ward || {};
    const [licenseNumber, setLicenseNumber] = useState(Nurse.licenseNumber);
    const [qualification, setQualification] = useState(Nurse.qualification);
    const [selectedStaffValue, setSelectedStaffValue] = useState(Staffs._id);
    const [selectedAssignedWardValue, setSelectedAssignedWardValue] = useState(Wards._id);

  const handleLicenseNumberChange = (e) => {
    setLicenseNumber(e.target.value); // <-- Get input value here
  };
  const handleQualificationChange = (e) => {
    setQualification(e.target.value); // <-- Get input value here
  };
  const handleChangeStaff = (event) => {
    setSelectedStaffValue(event.target.value); 
  };
   const handleChange = (selectedOption) => {
        setSelectedStaffValue(selectedOption.value);
  };
  const handleChange2 = (selectedOption) => {
        setSelectedAssignedWardValue(selectedOption.value);
  };
const options = [
  { value: "", label: "Select Staff" }, // empty option
  ... staffs.map(sf => ({
    value: sf._id,
    label: `${sf.firstName}`
  }))
];
const options2 = [
  { value: "", label: "Select Assigned Ward" }, // empty option
  ... wards.map(wd => ({
    value: wd._id,
    label: `${wd.name}`
  }))
];
const defaultValue = options.find(d=>d.value==Staffs._id);
const defaultValue2 = options2.find(d=>d.value==Wards._id);

const filterOption = (option, inputValue) => {
  // Only filter based on the 'label' property, for example
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};
  const editNurses=async (e)=>{
          e.preventDefault();
          const success= await editNurse(Nurse._id,selectedStaffValue,qualification,licenseNumber,selectedAssignedWardValue)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Nurse updated successfully")
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
            const result2 = await getWards();
            //setMyData(result);                     // Set state in same file
          };
      
          fetchData();
          }, []); 
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={editNurses}>

    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="mySelect" className="form-label">Select Staff:</label>
        <Select id="staffId" options={options} filterOption={filterOption} defaultValue={defaultValue} onChange={handleChange} name="staffId" placeholder="Select Staff" />      
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="bedNumber" className="form-label">Enter Qualification:</label>
            <input type="text" className="form-control" id="bedNumber" value={qualification} name="bedNumber" onChange={handleQualificationChange} />
      </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="licenseNumber" className="form-label">Enter License Number:</label>
            <input type="text" className="form-control" id="licenseNumber" value={licenseNumber} name="licenseNumber" onChange={handleLicenseNumberChange} />
      </div>
         
      </div>
      <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="wardId" className="form-label">Select Assigned Ward:</label>
            <Select id="wardId" options={options2} filterOption={filterOption}  defaultValue={defaultValue2} onChange={handleChange2} name="wardId" placeholder="Select Assigned Ward" />      
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
      <button disabled={licenseNumber.length<1||qualification.length<1||selectedStaffValue==''||selectedAssignedWardValue==''} type="submit" className="btn btn-primary" >Update Nurse</button>
      </form>
    </div>
  )
}

export default EditNurse
