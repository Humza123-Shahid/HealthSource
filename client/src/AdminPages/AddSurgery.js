
import React,{useState,useEffect,useContext,useRef} from 'react'
import Select from "react-select";
import '../styles/addstaff.css';

  import surgeryContext from '../context/surgeryContext'
  import patientContext from '../context/patientContext'
  import doctorContext from '../context/doctorContext'
  import operationtheatreContext from '../context/operationtheatreContext'
  import staffContext from '../context/staffContext'

import InfoMessage from '../components/InfoMessage';

const AddSurgery = () => {
    const context=useContext(surgeryContext);
    const {addSurgery}=context;
    const context2=useContext(patientContext);
    const {patients,getPatients}=context2;
    const context3=useContext(doctorContext);
    const {doctors,getDoctors}=context3;
    const context4=useContext(operationtheatreContext);
    const {operationtheatres,getOperationTheatres}=context4;
    const context5=useContext(staffContext);
    const {staffs,getStaffs}=context5;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [startTime2, setStartTime2] = useState("");
    const [endTime2, setEndTime2] = useState("");
    const [scheduledDate, setScheduledDate] = useState("");
    const [scheduledDate2, setScheduledDate2] = useState("");
    // const [selectedPatientValue, setSelectedPatientValue] = useState('');
    const [selectedStaffValue, setSelectedStaffValue] = useState('');
    const [role, setRole] = useState('surgeon');
    const [staff, setStaff] = useState([]);
    const [allStaffValue, setAllStaffValue] = useState([]);
    const [allNewStaffValue, setAllNewStaffValue] = useState([]);
    const [allNewRoleValue, setAllNewRoleValue] = useState([]);
    const [allRoleValue, setAllRoleValue] = useState([]);
    const [ name, setName] = useState('');
    const [ gender, setGender] = useState('male');
    const [ contact, setContact] = useState('');
    const [selectedNationalIdValue, setSelectedNationalIdValue] = useState('');
    const [selectedSurgeonValue, setSelectedSurgeonValue] = useState('');
    const [selectedTheatreValue, setSelectedTheatreValue] = useState(null);
    const [fareAmount, setFareAmount] = useState(0);
    const [surgeryType, setSurgeryType] = useState('');
    const [notes, setNotes] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""});
    const ref=useRef(null)
    const refClose=useRef(null)

    const handleStartChange = (e) => {
    setStartTime(e.target.value); // <-- Get input value here
    const newTime =`1970-01-01T${e.target.value}:00`
    setStartTime2(newTime);
  };
  const handleEndChange = (e) => {
    setEndTime(e.target.value); // <-- Get input value here
    const newTime = `1970-01-01T${e.target.value}:00`
    setEndTime2(newTime);
  };
  const handleDateChange = (event) => {
    setScheduledDate(event.target.value);
    const newTime = `${event.target.value}T05:00:00`
    setScheduledDate2(newTime);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
     
  };
   const handleGenderChange = (e) => {
    setGender(e.target.value); // <-- Get input value here
  };
  const handleContactChange = (e) => {
    setContact(e.target.value); // <-- Get input value here
  };
  const handleChangeSurgeon = (event) => {
    setSelectedSurgeonValue(event.target.value);
     
  };
  const handleChangeTheatre = (event) => {
    if(event.target.value=="")
    {
        setSelectedTheatreValue(null)
    }
    else
    {
        setSelectedTheatreValue(event.target.value);

    }
     
  };
  const handleTypeChange = (event) => {
    setSurgeryType(event.target.value); 
  };
    const handleNotesChange = (event) => {
    setNotes(event.target.value); 
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value); 
  };
   const handleChange = (selectedOption) => {
        if(selectedOption=="" )
        {
            setSelectedSurgeonValue("")
        }
        else
        {
          setSelectedSurgeonValue(selectedOption.value)
        }
  };
  const handleChange2 = (selectedOption) => {
        if(selectedOption=="" )
        {
            setSelectedTheatreValue(null)
        }
        else
        {
          setSelectedTheatreValue(selectedOption.value)
        }
  };
  const handleChange3 = (selectedOption) => {
        if(selectedOption=="" )
        {
            setSelectedNationalIdValue(null)
        }
        else
        {
          setSelectedNationalIdValue(selectedOption.value)
        }
  };
  const handleChange4 = (selectedOption) => {
    setSelectedStaffValue(selectedOption.value)

  };
  const handleChange5 = (selectedOption, index) => {
     const newSelections = [...allNewStaffValue];
    newSelections[index] = selectedOption;
    setAllNewStaffValue(newSelections);
  };
const getStaffById = (id) => staffs.find(d => d._id === id);

const options= [
  { value: "", label: "Select Primary Surgeon" }, // empty option
  ... doctors.map(dt => {
    const staff = getStaffById(dt?.staff);
    return{
    value: staff._id,
    label: `${staff.firstName}`
}})
];
const options2 = [
  { value: "", label: "Select Operation Theatre" }, // empty option
  ... operationtheatres.map(ot => ({
    value: ot._id,
    label: `${ot.name}`
  }))
];
const options3 = [
  { value: "", label: "Select Patient NationalId/Name" }, // empty option
  ... patients.map(pt => ({
    value: pt._id,
    label: `${pt.nationalId}-${pt.firstName}`
  }))
];
 const options4 = [
      { value: "", label: "Select Staff" }, // empty option
      ... staffs.map(st => ({
        value: st._id,
        label: `${st.firstName}`
      }))
    ];
const filterOption = (option, inputValue) => {
  // Only filter based on the 'label' property, for example
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};
const updateNote=()=>{
    ref.current.click();
    
  }
  const handleChangeRole = (index, newValue) => {
    setAllRoleValue(prev =>
      prev.map((item, i) => (i === index ? newValue : item))
    );
    setAllNewRoleValue(prev =>
      prev.map((item, i) => (i === index ? newValue : item))
    );
    
  };
  const addSurgeries=async (e)=>{
         e.preventDefault();
        //  const utcArrTime = new Date(arrivalTime2.getTime() - arrivalTime2.getTimezoneOffset() * 60000)
        //  const utcDepTime = new Date(departureTime2.getTime() - departureTime2.getTimezoneOffset() * 60000)

        //  setDepartureTime("1970-09-03T"+departureTime);
        //  setArrivalTime("1970-09-03T"+arrivalTime);
          const success=await addSurgery(selectedNationalIdValue,selectedSurgeonValue,surgeryType,scheduledDate2,startTime2,endTime2,selectedTheatreValue,notes,allNewStaffValue,allNewRoleValue)
          console.log(success)
          if(success)
          {
            console.log("abc");
            setShowToast(true);
            setMsg("Surgery added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
    const addOption = (e) => {
               e.preventDefault();
console.log("abc")
      const staffName=getStaffById(selectedStaffValue);
      setStaff(prev => [...prev, staffName?.firstName]);
      setAllRoleValue(prev => [...prev,role]);
      setAllNewRoleValue(prev => [...prev,'surgeon']);
      setAllStaffValue(prev => [...prev, selectedStaffValue]);
      setAllNewStaffValue(prev => [...prev, null]); 
    }
    const handleClose = (e,indexToRemove) => {
  e.preventDefault();
  console.log(indexToRemove);

  setStaff(prev => prev.filter((_, index) => index !== indexToRemove));
  setAllStaffValue(prev => prev.filter((_, index) => index !== indexToRemove));
  setAllNewStaffValue(prev => prev.filter((_, index) => index !== indexToRemove));
  setAllRoleValue(prev => prev.filter((_, index) => index !== indexToRemove));
  setAllNewRoleValue(prev => prev.filter((_, index) => index !== indexToRemove));
   
}
useEffect(() => {
            const fetchData = async () => {
            //const result = await getQuizzes(); // Call context function
            const result2 = await getPatients();
          const result3 = await getDoctors();
          const result4 = await getStaffs();
          const result5= await getOperationTheatres();

            //setMyData(result);                     // Set state in same file
          };
      
          fetchData();
          }, []);
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addSurgeries}>
    {/* <div className='mx-0' style={{display:'flex'}}> */}
      {/* <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Patient:</label>
      <select id="mySelect" className="form-control "  value={selectedPatientValue} onChange={handleChangePatient}>
        <option value="">-Select-</option>
        {patients.map((row) => (
        <option value={row._id}>{row.firstName}</option>
        ))}
      </select>
    </div> */}
     {/* <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="name" className="form-label">Enter Patient Name:</label>
            <input type="text" className="form-control" id="name" value={name} name="name" onChange={handleNameChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="gender" className="form-label">Enter Patient Gender:</label>
            <select id="mySelect" className="form-control "  value={gender} onChange={handleGenderChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
            </select>
      </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="contact" className="form-label">Enter Patient Contact:</label>
                <input type="text" className="form-control" id="contact" value={contact} name="contact" onChange={handleContactChange} />
        </div> */}
    
    
    
    {/* </div> */}
      <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="nationalId" className="form-label">Select Patient NationalId/Name:</label>
            {/* <select id="surgeonId" className="form-control " value={selectedSurgeonValue} onChange={handleChangeSurgeon}>
                <option value="">-Doctor-</option>
                    {Array.isArray(doctors) && doctors.map((row) => {
                        const staff = getStaffById(row?.staff);
                        return(
                    <option value={staff?._id}>{staff?.firstName}</option>)
                })}
        </select> */}
        <Select id="nationalId" options={options3} filterOption={filterOption} onChange={handleChange3} name="nationalId" placeholder="Select Patient NationalId/Name" />
    </div>
    
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="surgeonId" className="form-label">Select Primary Surgeon:</label>
            {/* <select id="surgeonId" className="form-control " value={selectedSurgeonValue} onChange={handleChangeSurgeon}>
                <option value="">-Doctor-</option>
                    {Array.isArray(doctors) && doctors.map((row) => {
                        const staff = getStaffById(row?.staff);
                        return(
                    <option value={staff?._id}>{staff?.firstName}</option>)
                })}
        </select> */}
        <Select id="surgeonId" options={options} filterOption={filterOption} onChange={handleChange} name="surgeonId" placeholder="Select Primary Surgeon" />
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="type" className="form-label">Enter Type:</label>
            <input type="text" className="form-control" id="type" value={surgeryType} name="type" onChange={handleTypeChange} />
      </div>
     
    
      
    </div>
    <div className='mx-0' style={{display:'flex'}}>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      <label htmlFor="scheduledDate" className="form-label">Scheduled Date:</label>
      <input type="date" className="form-control" id="scheduledDate" value={scheduledDate} name="scheduledDate" onChange={handleDateChange} />

      </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="startTime" className="form-label">Select Start Time:</label>
            <input type="time" className="form-control" id="startTime" value={startTime} name="startTime" onChange={handleStartChange} />
      </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="endTime" className="form-label">Select End Time:</label>
            <input type="time" className="form-control" id="endTime" value={endTime} name="endTime" onChange={handleEndChange} />
      </div>
      
     
    </div>
        <div className='mx-0' style={{display:'flex'}}>
          <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="mySelect" className="form-label">Select Operation Theatre:</label>
        {/* <select id="mySelect" className="form-control "  value={selectedTheatreValue} onChange={handleChangeTheatre}>
            <option value="">-Select-</option>
            
            {Array.isArray(operationtheatres) && operationtheatres.map((row) => (
            <option value={row?._id}>{row?.name}</option>
            ))}
        </select> */}
        <Select id="theatreId" options={options2} filterOption={filterOption} onChange={handleChange2} name="theatreId" placeholder="Select Operation Theatre" />

      </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="notes" className="form-label">Enter Notes:</label>
            <textarea className="form-control" id="notes" value={notes} name="notes" onChange={handleNotesChange} />
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
    <hr />

      <h4>Surgery Team</h4>
      <div className='mx-0' style={{display:'flex'}}>

    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="staffId" className="form-label">Select Staff:</label>
            {/* <select id="staffId" className="form-control " value={selectedStaffValue} onChange={handleChangeStaff}>
                <option value="">-Staff-</option>
                  {staffs.map((row) => (
                    <option value={row._id}>{row.firstName}</option>
                ))}
        </select> */}
      <Select id="mySelect3" options={options4} filterOption={filterOption} onChange={handleChange4} name="staffId" placeholder="Select Staff" />
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="role" className="form-label">Enter Role:</label>
            {/* <input type="text" className="form-control" id="type" value={role} name="role" onChange={handleRoleChange} /> */}
            <select id="role" className="form-control " name="role" onChange={handleRoleChange}>
                <option value="surgeon">Surgeon</option>
                <option value="assistant-surgeon">Assistant Surgeon</option>
                <option value="anesthetist">Anesthetist</option>
                <option value="scrub-nurse">Scrub Nurse</option>
                <option value="circulating-nurse">Circulating Nurse</option>
            </select>
      </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%',display: 'flex',alignItems: 'center',height: '100px'}}>
            <button class="add-option-btn" onClick={addOption} style={{width:'20%',marginLeft:'5px'}}>Add Staff</button>
      </div>
    </div>
    {/* <div style={{display:'flex'}}> */}
      <div style={{ marginTop: '20px'}}>
        {allNewStaffValue.map((stf, index) => (
          <>
          <div className='d-flex my-3'>
            {/* <input type='text' className='form-control me-3' value={stf} style={{width:"32.2%"}} id='option1' name='option1' readonly/>
            <input type='text' className='form-control' value={allRoleValue[index]} style={{width:"32.2%"}} id='option2' onChange={(e) => handleChangeRole(index, e.target.value)} name='option2'/> */}
           <div style={{width:"32.2%"}} className='me-3'>
           <Select id="mySelect5" options={options4} filterOption={filterOption} value={stf} onChange={(selectedOption) => handleChange5(selectedOption, index)} name="staffId2" placeholder="Select Staff" />
           </div>
           <select id="role" className="form-control mb-3" style={{width:"32.2%"}} name="role" value={allNewRoleValue[index]}  onChange={(e) => handleChangeRole(index, e.target.value)}>
                <option value="surgeon">Surgeon</option>
                <option value="assistantsurgeon">Assistant Surgeon</option>
                <option value="anesthetist">Anesthetist</option>
                <option value="scrubnurse">Scrub Nurse</option>
                <option value="circulatingnurse">Circulating Nurse</option>
            </select>
            <button 
               onClick={(e) => handleClose(e,index)}
              style={{
                background: 'none',
                backgroundColor:'red',
                color:'white',
                marginLeft:'20px',
                marginBottom:'20px',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>
            </div>
        </>
        ))}
      </div>
      <button disabled={startTime.length<1||endTime.length<1||scheduledDate.length<1||selectedSurgeonValue==''||surgeryType==''} type="submit" className="btn btn-primary">Add Surgery</button>
      </form>
    </div> 
  )
}

export default AddSurgery
