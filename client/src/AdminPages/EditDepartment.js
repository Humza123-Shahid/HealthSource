
import React,{useState,useContext,useEffect} from 'react';
import Select from "react-select";
import { useLocation } from 'react-router-dom';

import departmentContext from '../context/departmentContext'
import staffContext from '../context/staffContext'


import InfoMessage from '../components/InfoMessage';

const EditDepartment = () => {
     const context=useContext(departmentContext);
    const {editDepartment}=context;
     const context2=useContext(staffContext);
    const {staffs,getStaffs}=context2;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const location = useLocation();
    const Department=location.state?.department || {};
    const Staffs=location.state?.staff || {};
    const [name, setName] = useState(Department.name);
    const [code, setCode] = useState(Department.code);
    const [description, setDescription] = useState(Department.description);
    const [selectedHODValue, setSelectedHODValue] = useState(Staffs._id);

  const handleNameChange = (e) => {
    setName(e.target.value); // <-- Get input value here
  };
  const handleCodeChange = (e) => {
    setCode(e.target.value); // <-- Get input value here
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); 
  };
   const handleChange = (selectedOption) => {
        setSelectedHODValue(selectedOption.value);
  };
const options = [
  { value: "", label: "Select Head Of Department" }, // empty option
  ... staffs.map(stf => ({
    value: stf._id,
    label: `${stf.firstName}`
  }))
];
const defaultValue = options.find(d=>d.value==Staffs._id);

const filterOption = (option, inputValue) => {
  // Only filter based on the 'label' property, for example
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};
  const editDepartments=async (e)=>{
          e.preventDefault();
          const success= await editDepartment(Department._id,name,code,description,selectedHODValue)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Department updated successfully")
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
    <form onSubmit={editDepartments}>

    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="mySelect" className="form-label">Select Head Of Department:</label>
        <Select id="headId" options={options} filterOption={filterOption} defaultValue={defaultValue} onChange={handleChange} name="headId" placeholder="Select Room" />      
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="dName" className="form-label">Enter Name:</label>
            <input type="text" className="form-control" id="dName" value={name} name="dName" onChange={handleNameChange} />
      </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="dcode" className="form-label">Select Code:</label>
            {/* <input type="text" className="form-control" id="roomType" value={roomType} name="roomType" onChange={handleRoomTypeChange} /> */}
            <input type="text" className="form-control" id="dcode" value={code} name="dcode" onChange={handleCodeChange} />

      </div>
         
      </div>
      <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="description" className="form-label">Enter Description:</label>
        <input type="text" className="form-control" id="description" value={description} name="description" onChange={handleDescriptionChange} />
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
      <button disabled={name.length<1||selectedHODValue==''||code==''||description==''} type="submit" className="btn btn-primary" >Update Department</button>
      </form>
    </div>
  )
}

export default EditDepartment
