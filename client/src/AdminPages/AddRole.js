
import React,{useState,useContext,useEffect} from 'react'
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
    const [checkedValue, setCheckedValue] = useState(0);
    
    const [allPermsssionsValue,setAllPermsssionsValue]=useState([])
    const handleNameChange = (e) => {
    setName(e.target.value); // <-- Get input value here
  };
  const handlePermissionsChange = (e) => {
    setPermissions(e.target.value);
};
const handleCheckboxChange=(index,event)=>{

    console.log("test2")
      const {checked}=event.target;
        console.log("tets")
        let myObject={};
    
      if(checked)
      {
        setCheckedValue(checkedValue+1)
        myObject = { ...myObject, ...allPermsssionsValue[index] };
        myObject.isChecked=true;
        
        console.log("cheecked")
        const newSelections = [...allPermsssionsValue];
      newSelections[index]=myObject;
        setAllPermsssionsValue(newSelections);
      }
      else{
        setCheckedValue(checkedValue-1)
        myObject = { ...myObject, ...allPermsssionsValue[index] };
        myObject.isChecked=false;
        const newSelections = [...allPermsssionsValue];
        newSelections[index]=myObject;
        setAllPermsssionsValue(newSelections);
      
      }
    }
  const addRoles=(e)=>{
          e.preventDefault();
          const permissionValues = allPermsssionsValue
          .filter(permission => permission.isChecked === true) // Step 1: Filter by 'admin' role
          .map(permission => permission.value); 
          console.log(permissionValues);
          const success=addRole(name,permissionValues)
          // const success=addRole(name,permissions)
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
useEffect(() => {
  const permissionsSelection=[...allPermsssionsValue];
  permissionsSelection[0]={value:'User',isChecked:false}
  permissionsSelection[1]={value:'Patient',isChecked:false}
  permissionsSelection[2]={value:'Patient Medical History',isChecked:false}
  permissionsSelection[3]={value:'Role',isChecked:false}
  permissionsSelection[4]={value:'Staff',isChecked:false}
  permissionsSelection[5]={value:'Shift',isChecked:false}
  permissionsSelection[6]={value:'Staff Duty',isChecked:false}
  permissionsSelection[7]={value:'Doctor',isChecked:false}
  permissionsSelection[8]={value:'Appointment',isChecked:false}
  permissionsSelection[9]={value:'Consultation',isChecked:false}
  permissionsSelection[10]={value:'Surgery',isChecked:false}
  permissionsSelection[11]={value:'Surgery Team',isChecked:false}
  permissionsSelection[12]={value:'Operation Theatre',isChecked:false}
  permissionsSelection[13]={value:'Medicine',isChecked:false}
  permissionsSelection[14]={value:'Prescription',isChecked:false}
  permissionsSelection[15]={value:'Lab Test',isChecked:false}
  permissionsSelection[16]={value:'Lab Request',isChecked:false}
  permissionsSelection[17]={value:'Lab Result',isChecked:false}
  permissionsSelection[18]={value:'Ward',isChecked:false}
  permissionsSelection[19]={value:'Room',isChecked:false}
  permissionsSelection[20]={value:'Bed',isChecked:false}
  permissionsSelection[21]={value:'Nurse',isChecked:false}
  permissionsSelection[22]={value:'Admission',isChecked:false}
  permissionsSelection[23]={value:'Staff Attendance',isChecked:false}
  permissionsSelection[24]={value:'Social',isChecked:false}
  permissionsSelection[25]={value:'Department',isChecked:false}

 setAllPermsssionsValue(permissionsSelection)
  }, []);
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addRoles}>

    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="name" className="form-label">Enter Name:</label>
        <input type="text" className="form-control" id="name" value={name} name="name" onChange={handleNameChange} />
    </div>
    {/* <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      <label htmlFor="permissions" className="form-label">Enter Permissions:</label>
      <input type="text" className="form-control" id="permissions" value={permissions} name="permissions" onChange={handlePermissionsChange} /> */}
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
    {/* </div> */}
     <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
    <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
      </div>
      <label htmlFor="name" className="form-label">Select Permissions:</label>
      <div style={{ display: 'flex', gap: '50px', alignItems: 'center',paddingLeft:'5px' }}>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(0,event)} style={{ transform: "scale(1.5)" }}/> User</label>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(1,event)} style={{ transform: "scale(1.5)" }} /> Patient</label>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(2,event)} style={{ transform: "scale(1.5)" }}/> Patient Medical History</label>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(3,event)} style={{ transform: "scale(1.5)" }} /> Role</label>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(4,event)} style={{ transform: "scale(1.5)" }}/> Staff</label>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(5,event)}style={{ transform: "scale(1.5)" }} /> Shift</label>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(6,event)} style={{ transform: "scale(1.5)" }}/> Staff Duty</label>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(7,event)} style={{ transform: "scale(1.5)" }} /> Doctor</label>
      </div>
      <br/>

      <div style={{ display: 'flex', gap: '50px', alignItems: 'center',paddingLeft:'5px' }}>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(8,event)} style={{ transform: "scale(1.5)" }}/> Appointment</label>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(9,event)} style={{ transform: "scale(1.5)" }} /> Consultation</label>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(10,event)} style={{ transform: "scale(1.5)" }}/> Surgery</label>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(11,event)} style={{ transform: "scale(1.5)" }} /> Surgery Team</label>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(12,event)} style={{ transform: "scale(1.5)" }}/> Operation Theatre</label>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(13,event)} style={{ transform: "scale(1.5)" }} /> Medicine</label>
       
      </div>
      <br/>
      <div style={{ display: 'flex', gap: '50px', alignItems: 'center',paddingLeft:'5px' }}>
         <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(14,event)} style={{ transform: "scale(1.5)" }}/> Prescription</label>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(15,event)} style={{ transform: "scale(1.5)" }} /> Lab Test</label>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(16,event)} style={{ transform: "scale(1.5)" }}/> Lab Request</label>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(17,event)} style={{ transform: "scale(1.5)" }} /> Lab Result</label>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(18,event)} style={{ transform: "scale(1.5)" }}/> Ward</label>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(19,event)} style={{ transform: "scale(1.5)" }} /> Room</label>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(20,event)} style={{ transform: "scale(1.5)" }}/> Bed</label>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(21,event)} style={{ transform: "scale(1.5)" }} /> Nurse</label>
        
      </div>
      <br/>
       <div style={{ display: 'flex', gap: '50px', alignItems: 'center',paddingLeft:'5px' }}>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(22,event)} style={{ transform: "scale(1.5)" }}/> Admission</label>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(23,event)} style={{ transform: "scale(1.5)" }} /> Staff Attendance</label>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(24,event)} style={{ transform: "scale(1.5)" }}/> Social</label>
        <label style={{ fontSize:'20px' }}><input type="checkbox" onChange={(event)=>handleCheckboxChange(25,event)} style={{ transform: "scale(1.5)" }}/> Department</label>

      </div>
      <br/>
      <button disabled={name.length<1} type="submit" className="btn btn-primary" >Add Role</button>
      {/* <button disabled={name.length<1 || permissions.length<1} type="submit" className="btn btn-primary" >Add Role</button> */}
      </form>
    </div>
  )
}

export default AddRole
