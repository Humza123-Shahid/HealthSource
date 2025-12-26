
import React,{useState,useEffect,useContext} from 'react'
import { useLocation } from 'react-router-dom';
import userContext from '../context/userContext'
import staffContext from '../context/staffContext'
import patientContext from '../context/patientContext'

import InfoMessage from '../components/InfoMessage';

const EditUser = () => {
    const location = useLocation();
   const [showToast,setShowToast]=useState(false)
       const [msg,setMsg]=useState('')
       const [type,setType]=useState('')
       const [roles,setRoles]=useState([]);
     const [credentials,setCredentials] =useState({staffId:location.state?.staffId|| null,patientId:location.state?.patientId|| null,name:location.state?.name|| {},password:location.state?.password|| {},cpassword:location.state?.password|| {},roleId:location.state?.roleId|| null})
     const context=useContext(userContext);
    const {editUser}=context;
     const context2=useContext(staffContext);
    const {staffs,getStaffs}=context2;
    const context3=useContext(patientContext);
    const {patients,getPatients}=context3;
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
     const getRoleById = (id) => roles?.find(d => d._id === id);
     const getStaffById = (id) => staffs?.find(d => d._id === id);
     const getPatientById = (id) => patients?.find(d => d._id === id);

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
            const response=await fetch("http://localhost:5000/api/role/fetchallroles",{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'
                    },
                  });
                  const json=await response.json()
                  console.log(json);
                  setRoles(json)

            const result=await getStaffs()
            const result2=await getPatients()

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
            <select id="staffId" className="form-control " value={credentials.staffId} name="staffId" onChange={onChange}>
                {/* <option value="admin">Admin</option>
                <option value="organizer">Organizer</option> */}
                <option value="">-Staff-</option>
                    {Array.isArray(staffs) && staffs.map((row) => (
                    <option value={row._id}>{row.firstName}</option>
                    ))}
            </select>
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="patient" className="form-label">Patient</label>
            <select id="patientId" className="form-control " value={credentials.patientId} name="patientId" onChange={onChange}>
                {/* <option value="admin">Admin</option>
                <option value="organizer">Organizer</option> */}
                <option value="">-Patient-</option>
                    {Array.isArray(patients) && patients.map((row) => (
                    <option value={row._id}>{row.firstName}</option>
                    ))}
            </select>
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
            <select id="roleId" className="form-control " value={credentials.roleId} name="roleId" onChange={onChange}>
                {/* <option value="admin">Admin</option>
                <option value="organizer">Organizer</option> */}
              <option value="">-Role-</option>
                  {Array.isArray(roles) && roles.map((row) => (
                  <option value={row._id}>{row.name}</option>
                  ))}
            </select>
        </div>
    </div>
        
    
    
    
      <button disabled={credentials.name.length<1||credentials.password.length<1||credentials.cpassword.length<1} type="submit" className="btn btn-primary">Edit User</button>
      </form>
    </div>
  )
}

export default EditUser
