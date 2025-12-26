
import React,{useState,useEffect,useContext} from 'react'
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
    const {operationTheatres,getOperationTheatres}=context4;
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
    const [selectedPatientValue, setSelectedPatientValue] = useState('');
    const [selectedSurgeonValue, setSelectedSurgeonValue] = useState('');
    const [selectedTheatreValue, setSelectedTheatreValue] = useState(null);
    const [fareAmount, setFareAmount] = useState(0);
    const [surgeryType, setSurgeryType] = useState('');
    const [notes, setNotes] = useState('');


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
  const handleChangePatient = (event) => {
    setSelectedPatientValue(event.target.value);
     
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
   
  const addSurgeries=async (e)=>{
         e.preventDefault();
        //  const utcArrTime = new Date(arrivalTime2.getTime() - arrivalTime2.getTimezoneOffset() * 60000)
        //  const utcDepTime = new Date(departureTime2.getTime() - departureTime2.getTimezoneOffset() * 60000)

        //  setDepartureTime("1970-09-03T"+departureTime);
        //  setArrivalTime("1970-09-03T"+arrivalTime);
          const success=await addSurgery(selectedPatientValue,selectedSurgeonValue,surgeryType,scheduledDate2,startTime2,endTime2,selectedTheatreValue,notes)
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
const getStaffById = (id) => staffs.find(d => d._id === id);
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
    <div className='mx-0' style={{display:'flex'}}>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Patient:</label>
      <select id="mySelect" className="form-control "  value={selectedPatientValue} onChange={handleChangePatient}>
        <option value="">-Select-</option>
        {patients.map((row) => (
        <option value={row._id}>{row.firstName}</option>
        ))}
      </select>
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="surgeonId" className="form-label">Select Primary Surgeon:</label>
            <select id="surgeonId" className="form-control " value={selectedSurgeonValue} onChange={handleChangeSurgeon}>
                {/* <option value="admin">Admin</option>
                <option value="organizer">Organizer</option> */}
                <option value="">-Doctor-</option>
                    {Array.isArray(doctors) && doctors.map((row) => {
                        const staff = getStaffById(row?.staff);
                        return(
                    <option value={staff?._id}>{staff?.firstName}</option>)
                })}
        </select>
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
        <select id="mySelect" className="form-control "  value={selectedTheatreValue} onChange={handleChangeTheatre}>
            <option value="">-Select-</option>
            
            {Array.isArray(operationTheatres) && operationTheatres.map((row) => (
            <option value={row?._id}>{row?.name}</option>
            ))}
        </select>
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="notes" className="form-label">Enter Notes:</label>
            <input type="text" className="form-control" id="notes" value={notes} name="notes" onChange={handleNotesChange} />
      </div>
      <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
    </div>
      
      <button disabled={startTime.length<1||endTime.length<1||scheduledDate.length<1||selectedPatientValue==''||selectedSurgeonValue==''||surgeryType==''} type="submit" className="btn btn-primary">Add Surgery</button>
      </form>
    </div> 
  )
}

export default AddSurgery
