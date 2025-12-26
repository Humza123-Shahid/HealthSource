
import React,{useState,useContext} from 'react'
import { useLocation } from 'react-router-dom';

import shiftContext from '../context/shiftContext'
import InfoMessage from '../components/InfoMessage';

const EditShift = () => {
    const context=useContext(shiftContext);
    const {editShift}=context;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const location = useLocation();
    const Shift=location.state?.shift || {};
    const hours =new Date( Shift.startTime).getHours();
    const minutes = new Date(Shift.startTime).getMinutes();
    const hours2 = new Date(Shift.endTime).getHours();
    const minutes2 = new Date(Shift.endTime).getMinutes();
    const formattedStartTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    const formattedEndTime = `${hours2.toString().padStart(2, '0')}:${minutes2.toString().padStart(2, '0')}`;
    const [name, setName] = useState(Shift.name)
    const [startTime, setStartTime] = useState(formattedStartTime);
    const [endTime, setEndTime] = useState(formattedEndTime);
    const [startTime2, setStartTime2] = useState(formattedStartTime);
    const [endTime2, setEndTime2] = useState(formattedEndTime);
    const [breakMinutes, setBreakMinutes] = useState(Shift.breakMinutes);

    const handleNameChange = (e) => {
    setName(e.target.value); // <-- Get input value here
  };
 const handleStartTimeChange = (e) => {
    setStartTime(e.target.value); // <-- Get input value here
    const newTime =`1970-01-01T${e.target.value}:00`
    setStartTime2(newTime);
  };
   const handleEndTimeChange = (e) => {
    setEndTime(e.target.value); // <-- Get input value here
    const newTime =`1970-01-01T${e.target.value}:00`
    setEndTime2(newTime);
  };
    const handleBreakMinutesChange = (event) => {
    setBreakMinutes(event.target.value); 
  };
  const editShifts=(e)=>{
          e.preventDefault();
          const success=editShift(Shift._id,name,startTime2,endTime2,breakMinutes)
          if(success)
          {
            setShowToast(true);
            setMsg("Shift updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }

  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={editShifts}>

    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="name" className="form-label">Enter Name:</label>
        <input type="text" className="form-control" id="name" value={name} name="name" onChange={handleNameChange} />
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="start" className="form-label">Select Start Time:</label>
        <input type="time" className="form-control" id="start" value={startTime} name="start" onChange={handleStartTimeChange} />
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="end" className="form-label">Select End Time:</label>
        <input type="time" className="form-control" id="end" value={endTime} name="end" onChange={handleEndTimeChange} />
    </div>
    </div>
    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="break" className="form-label">Break Minutes:</label>
            <input type="number" className="form-control" id="break" value={breakMinutes} name="break" onChange={handleBreakMinutesChange} />
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
      <button disabled={startTime.length<1||endTime.length<1||name.length<1} type="submit" className="btn btn-primary" >Edit Shift</button>
      </form>
    </div>
  )
}

export default EditShift
