
import React,{useState,useEffect,useContext} from 'react'
import Select from "react-select";

  import surgeryContext from '../context/surgeryContext'
  import patientContext from '../context/patientContext'
  import doctorContext from '../context/doctorContext'
  import operationtheatreContext from '../context/operationtheatreContext'
  import staffContext from '../context/staffContext'
import { useLocation } from 'react-router-dom';
import InfoMessage from '../components/InfoMessage';

const EditSurgery = () => {
    const location = useLocation();
    const Surgery=location.state?.surgery || {};
    // const patient=location.state?.patientId || "";
    const doctor=location.state?.doctorId || "";
    const operation=location.state?.operationId || "";
    const context=useContext(surgeryContext);
    const {editSurgery}=context;
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
        const hours =new Date(Surgery.startTime).getHours();
    const minutes = new Date(Surgery.startTime).getMinutes();
    const hours2 = new Date(Surgery.endTime).getHours();
    const minutes2 = new Date(Surgery.endTime).getMinutes();
     const formattedStartTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    const formattedEndTime = `${hours2.toString().padStart(2, '0')}:${minutes2.toString().padStart(2, '0')}`;
    const [startTime, setStartTime] = useState(formattedStartTime);
    const [endTime, setEndTime] = useState(formattedEndTime);
    const [startTime2, setStartTime2] = useState(Surgery.startTime);
    const [endTime2, setEndTime2] = useState(Surgery.endTime);
    //     const [startTime2, setStartTime2] = useState(formattedStartTime);
    // const [endTime2, setEndTime2] = useState(formattedEndTime);

    const formatDate = (date) => {
        return date.toISOString().split("T")[0]; // keeps only YYYY-MM-DD
    };
    const [scheduledDate, setScheduledDate] = useState(formatDate(new Date(Surgery.scheduledDate)));
    const [scheduledDate2, setScheduledDate2] = useState(formatDate(new Date(Surgery.scheduledDate)));
    // const [selectedPatientValue, setSelectedPatientValue] = useState(patient);
    const [ name, setName] = useState(Surgery.name);
    const [ gender, setGender] = useState(Surgery.gender);
    const [ contact, setContact] = useState(Surgery.contact);
    const [selectedNationalIdValue, setSelectedNationalIdValue] = useState('');
    
    const [selectedSurgeonValue, setSelectedSurgeonValue] = useState(doctor);
    const [selectedTheatreValue, setSelectedTheatreValue] = useState(operation);
    const [surgeryType, setSurgeryType] = useState(Surgery.type);
    const [notes, setNotes] = useState(Surgery.notes);


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
  // const handleChangePatient = (event) => {
  //   setSelectedPatientValue(event.target.value);
     
  // };
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
const defaultValue = options.find(d=>d.value==doctor);
const defaultValue2 = options2.find(d=>d.value==operation);
const defaultValue3 = options3.find(d=>d.value==Surgery.patient);

const filterOption = (option, inputValue) => {
  // Only filter based on the 'label' property, for example
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};
  const editSurgeries=async (e)=>{
         e.preventDefault();
        //  const utcArrTime = new Date(arrivalTime2.getTime() - arrivalTime2.getTimezoneOffset() * 60000)
        //  const utcDepTime = new Date(departureTime2.getTime() - departureTime2.getTimezoneOffset() * 60000)

        //  setDepartureTime("1970-09-03T"+departureTime);
        //  setArrivalTime("1970-09-03T"+arrivalTime);
          const success=await editSurgery(Surgery._id,name,gender,contact,selectedSurgeonValue,surgeryType,scheduledDate2,startTime2,endTime2,selectedTheatreValue,notes)
          console.log(success)
          if(success)
          {
            console.log("abc");
            setShowToast(true);
            setMsg("Surgery updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
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
    <form onSubmit={editSurgeries}>
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
        <Select id="nationalId" options={options3} filterOption={filterOption} defaultValue={defaultValue3} onChange={handleChange3} name="nationalId" placeholder="Select Patient NationalId/Name" />
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
        <Select id="surgeonId" options={options} filterOption={filterOption} defaultValue={defaultValue} onChange={handleChange} name="surgeonId" placeholder="Select Primary Surgeon" />
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
        <Select id="theatreId" options={options2} filterOption={filterOption} defaultValue={defaultValue2} onChange={handleChange2} name="theatreId" placeholder="Select Operation Theatre" />

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
      
      <button disabled={startTime.length<1||endTime.length<1||scheduledDate.length<1||name==''||contact==''||selectedSurgeonValue==''||surgeryType==''} type="submit" className="btn btn-primary">Update Surgery</button>
      </form>
    </div> 
  )
}

export default EditSurgery
