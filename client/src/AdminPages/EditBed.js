
import React,{useState,useContext,useEffect} from 'react';
import Select from "react-select";
import { useLocation } from 'react-router-dom';

import bedContext from '../context/bedContext'
import roomContext from '../context/roomContext'


import InfoMessage from '../components/InfoMessage';

const EditBed = () => {
     const context=useContext(bedContext);
    const {editBed}=context;
     const context2=useContext(roomContext);
    const {rooms,getRooms}=context2;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const location = useLocation();
    const Bed=location.state?.bed || {};
    const Rooms=location.state?.room || {};
    const [status, setStatus] = useState(Bed.status);
    const [bedNumber, setBedNumber] = useState(Bed.bedNumber);
    const [selectedRoomValue, setSelectedRoomValue] = useState(Rooms._id);

  const handleStatusChange = (e) => {
    setStatus(e.target.value); // <-- Get input value here
  };
  const handleBedNumberChange = (e) => {
    setBedNumber(e.target.value); // <-- Get input value here
  };
  const handleChangeEvent = (event) => {
    setSelectedRoomValue(event.target.value); 
  };
   const handleChange = (selectedOption) => {
        setSelectedRoomValue(selectedOption.value);
  };
const options = [
  { value: "", label: "Select Room" }, // empty option
  ... rooms.map(rm => ({
    value: rm._id,
    label: `${rm.roomNumber}`
  }))
];
const defaultValue = options.find(d=>d.value==Rooms._id);

const filterOption = (option, inputValue) => {
  // Only filter based on the 'label' property, for example
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};
  const editBeds=async (e)=>{
          e.preventDefault();
          const success= await editBed(Bed._id,selectedRoomValue,bedNumber,status)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Bed updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
useEffect(() => {
            const fetchData = async () => {
            //const result = await getQuizzes(); // Call context function
            const result = await getRooms();
            //setMyData(result);                     // Set state in same file
          };
      
          fetchData();
          }, []); 
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={editBeds}>

    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="mySelect" className="form-label">Select Room:</label>
        <Select id="roomId" options={options} filterOption={filterOption} defaultValue={defaultValue} onChange={handleChange} name="roomId" placeholder="Select Room" />      
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="bedNumber" className="form-label">Enter Bed Number:</label>
            <input type="text" className="form-control" id="bedNumber" value={bedNumber} name="bedNumber" onChange={handleBedNumberChange} />
      </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="status" className="form-label">Select Status:</label>
            {/* <input type="text" className="form-control" id="roomType" value={roomType} name="roomType" onChange={handleRoomTypeChange} /> */}
            <select id="status" className="form-control " value={status} name="status" onChange={handleStatusChange}>
                <option value="occupied">Occupied</option>
                <option value="available">Available</option>
                <option value="cleaning">Cleaning</option>
            </select>
      </div>
         
      </div>
      <button disabled={bedNumber.length<1||selectedRoomValue==''} type="submit" className="btn btn-primary" >Update Bed</button>
      </form>
    </div>
  )
}

export default EditBed
