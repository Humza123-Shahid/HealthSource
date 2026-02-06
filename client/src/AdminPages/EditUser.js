
import React,{useState,useEffect,useContext} from 'react'
import Select from "react-select";

import { useLocation } from 'react-router-dom';
import userContext from '../context/userContext'
import staffContext from '../context/staffContext'
import patientContext from '../context/patientContext'
import roleContext from '../context/roleContext'

import InfoMessage from '../components/InfoMessage';

const EditUser = () => {
    const location = useLocation();
   const [showToast,setShowToast]=useState(false)
       const [msg,setMsg]=useState('')
       const [type,setType]=useState('')
      //  const [roles,setRoles]=useState([]);
       const staff=location.state?.staffId || "";
    const patient=location.state?.patientId || "";
        const role=location.state?.roleId || "";

    console.log(role);
     const [credentials,setCredentials] =useState({staffId:location.state?.staffId|| null,patientId:location.state?.patientId|| null,name:location.state?.name|| {},password:location.state?.password|| {},cpassword:location.state?.password|| {},roleId:location.state?.roleId|| null})
     const context=useContext(userContext);
    const {editUser}=context;
     const context2=useContext(staffContext);
    const {staffs,getStaffs}=context2;
    const context3=useContext(patientContext);
    const {patients,getPatients}=context3;
    const context4=useContext(roleContext);
    const {roles,getRoles}=context4;
console.log(credentials);
     const onChange=(e)=>{
        if(e.target.value=="")
        {
            setCredentials({...credentials,[e.target.name]:null})
        }
        else{
            setCredentials({...credentials,[e.target.name]:e.target.value})
        }
      
      
    }
    const handleChange = (selectedOption) => {
      console.log(selectedOption);
        if(selectedOption=="" )
        {
            setCredentials({...credentials,'staffId':null})
        }
        else
        {
          setCredentials({...credentials,'staffId':selectedOption.value})
        }
  };
    const handleChange2 = (selectedOption) => {
        if(selectedOption=="" )
        {
            setCredentials({...credentials,'patientId':null})
        }
        else
        {
          setCredentials({...credentials,'patientId':selectedOption.value})
        }
  };
 
   const handleChange3 = (selectedOption) => {
        if(selectedOption.value=="" )
        {
            setCredentials({...credentials,'roleId':null})
        }
        else
        {
          setCredentials({...credentials,'roleId':selectedOption.value})
        }
  };
     const getRoleById = (id) => roles?.find(d => d._id === id);
     const getStaffById = (id) => staffs?.find(d => d._id === id);
     const getPatientById = (id) => patients?.find(d => d._id === id);
const options = [
  { value: "", label: "Select Staff" }, // empty option
  ... staffs.map(st => ({
    value: st._id,
    label: `${st.firstName}`
}))
];
const options2 = [
  { value: "", label: "Select Patient" }, // empty option
  ... patients.map(pt => ({
    value: pt._id,
    label: `${pt.firstName}`
  }))
];
function removeDuplicatesByProperty(arr, prop) {
  const seen = new Set();
  return arr.filter(obj => {
    // If the property value hasn't been seen before:
    if (!seen.has(obj[prop])) {
      seen.add(obj[prop]); // Add it to the set
      return true;         // Keep the object in the filtered array
    }
    return false;          // Otherwise, filter it out
  });
}

const uniqueArray = removeDuplicatesByProperty(roles, 'name');
const options3 = [
  { value: "", label: "Select Role" }, // empty option
  ... uniqueArray.map(uA => ({
    value: uA._id,
    label: `${uA.name}`
}))
];
const defaultValue = options.find(d=>d.value==staff);
const defaultValue2 = options2.find(d=>d.value==patient);
const defaultValue3 = options3.find(d=>d.value==role);
console.log(defaultValue2);
console.log(defaultValue3);

const filterOption = (option, inputValue) => {
  // Only filter based on the 'label' property, for example
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};
  const editUsers=async (e)=>{
         e.preventDefault();
        const {staffId,patientId,name,password,cpassword,roleId}=credentials
        const roleobj= getRoleById(roleId);
        const staffobj= getStaffById(staffId);
        const patientobj= getPatientById(patientId);

        if(password!=cpassword)
        {
        setShowToast(true);
            setMsg("Passwords do not match")
            setType("error")
            setTimeout(()=>{
            setShowToast(false)
            },1500)
        //props.showAlert("Passwords do not match","danger")
        return;
        }
         const id=location.state?.userId||{};
         console.log(staffId,patientId,roleId)
          const user=await editUser(id,staffId,patientId,name,password,roleId)
          console.log(user)
          if(user.success)
          {
        
            console.log("abc");
            setShowToast(true);
            setMsg("User updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }

useEffect(() => {
           const fetchData = async () => {
            // const response=await fetch("http://localhost:5000/api/role/fetchallroles",{
            //         method:'GET',
            //         headers:{
            //             'Content-Type':'application/json'
            //         },
            //       });
            //       const json=await response.json()
            //       console.log(json);
            //       setRoles(json)

            const result=await getStaffs()
            const result2=await getPatients()
            const result3=await getRoles()


          };
          fetchData();
          }, []); 
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={editUsers}>
    <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="staff" className="form-label">Staff</label>
            {/* <select id="staffId" className="form-control " value={credentials.staffId} name="staffId" onChange={onChange}>
               
                <option value="">-Staff-</option>
                    {Array.isArray(staffs) && staffs.map((row) => (
                    <option value={row._id}>{row.firstName}</option>
                    ))}
            </select> */}
             <Select id="staffId" options={options} filterOption={filterOption} defaultValue={defaultValue} onChange={handleChange} name="staffId" placeholder="Select Staff" />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="patient" className="form-label">Patient</label>
            {/* <select id="patientId" className="form-control " value={credentials.patientId} name="patientId" onChange={onChange}>
               
                <option value="">-Patient-</option>
                    {Array.isArray(patients) && patients.map((row) => (
                    <option value={row._id}>{row.firstName}</option>
                    ))}
            </select> */}
            <Select id="patientId" options={options2} filterOption={filterOption} defaultValue={defaultValue2} onChange={handleChange2} name="patientId" placeholder="Select Patient" />

        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="name" className="form-label">User Name</label>
          <input type="text" className="form-control" id="name" value={credentials.name} name="name" onChange={onChange}  aria-describedby="emailHelp"/>
        </div>
    
       
    </div>
      <div className='mx-0' style={{display:'flex'}}>

       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="password" className="form-label">Password</label>
          <input type="text" className="form-control" id="password" value={credentials.password} name="password" onChange={onChange} minLength={3} required/>
        </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="text" className="form-control" id="cpassword" value={credentials.cpassword} name="cpassword" onChange={onChange} minLength={3} required/>
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="role" className="form-label">Role</label>
            {/* <select id="roleId" className="form-control " value={credentials.roleId} name="roleId" onChange={onChange}>
                
              <option value="">-Role-</option>
                  {Array.isArray(roles) && roles.map((row) => (
                  <option value={row._id}>{row.name}</option>
                  ))}
            </select> */}
          <Select id="roleId" options={options3} filterOption={filterOption} defaultValue={defaultValue3} onChange={handleChange3} name="roleId" placeholder="Select Role" />

        </div>
         
    </div>
        
    
    
    
      <button disabled={credentials.name.length<1||credentials.password.length<1||credentials.cpassword.length<1} type="submit" className="btn btn-primary">Update User</button>
      </form>
    </div>
  )
}

export default EditUser
