
import React,{useState,useContext} from 'react'
import roleContext from '../context/roleContext'
import InfoMessage from '../components/InfoMessage';

const AddRole = () => {
    const context=useContext(roleContext);
    const {addRole}=context;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const [name, setName] = useState('');
    const [permissions, setPermissions] = useState('');

    const handleNameChange = (e) => {
    setName(e.target.value); // <-- Get input value here
  };
  const handlePermissionsChange = (e) => {
    setPermissions(e.target.value);
};

  const addRoles=(e)=>{
          e.preventDefault();
          const success=addRole(name,permissions)
          if(success)
          {
            setShowToast(true);
            setMsg("Role added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }

  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addRoles}>

    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="name" className="form-label">Enter Name:</label>
        <input type="text" className="form-control" id="name" value={name} name="name" onChange={handleNameChange} />
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      <label htmlFor="permissions" className="form-label">Enter Permissions:</label>
      <input type="text" className="form-control" id="permissions" value={permissions} name="permissions" onChange={handlePermissionsChange} />
      {/* <select id="mySelect" className="form-control " value={selectedStatusValue} onChange={handleStatusChange}>
        <option value="On Schedule">On Schedule</option>
        <option value="Delayed">Delayed</option>
        <option value="Arrived at [Intermediate Stop]">Arrived at [Intermediate Stop]</option>
        <option value="Arrived at Final Destination">Arrived at Final Destination</option>
        <option value="Departed from [Origin]">Departed from [Origin]</option>
        <option value="Canceled">Canceled</option>
        <option value="Boarding">Boarding</option>
        <option value="Boarding Closed">Boarding Closed</option>

      </select> */}
    </div>
     <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
      </div>
      <button disabled={name.length<1 || permissions.length<1} type="submit" className="btn btn-primary" >Add Role</button>
      </form>
    </div>
  )
}

export default AddRole
