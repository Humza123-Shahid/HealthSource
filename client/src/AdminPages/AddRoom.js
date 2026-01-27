
import React,{useState,useContext,useEffect} from 'react';
import Select from "react-select";

import roomContext from '../context/roomContext'
import wardContext from '../context/wardContext'


import InfoMessage from '../components/InfoMessage';

const AddRoom = () => {
    const context=useContext(roomContext);
    const {addRoom}=context;
    const context2=useContext(wardContext);
    const {wards,getWards}=context2;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')

        const [chargesPerDay, setChargesPerDay] = useState(0);
    const [roomType, setRoomType] = useState('single');
    const [roomNumber, setRoomNumber] = useState('');
    const [selectedWardValue, setSelectedWardValue] = useState('');

  const handleChargesPerDayChange = (e) => {
    setChargesPerDay(e.target.value); // <-- Get input value here
  };
  const handleRoomTypeChange = (e) => {
    setRoomType(e.target.value); // <-- Get input value here
  };
  const handleRoomNumberChange = (e) => {
    setRoomNumber(e.target.value); // <-- Get input value here
  };
  const handleChangeEvent = (event) => {
    setSelectedWardValue(event.target.value); 
  };
   const handleChange = (selectedOption) => {
        setSelectedWardValue(selectedOption.value);
  };
const options = [
  { value: "", label: "Select Ward" }, // empty option
  ... wards.map(wd => ({
    value: wd._id,
    label: `${wd.name}`
  }))
];
const filterOption = (option, inputValue) => {
  // Only filter based on the 'label' property, for example
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};
  const addRooms=async (e)=>{
          e.preventDefault();
          const success= await addRoom(selectedWardValue,roomNumber,roomType,chargesPerDay)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Room added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
useEffect(() => {
            const fetchData = async () => {
            //const result = await getQuizzes(); // Call context function
            const result = await getWards();
            //setMyData(result);                     // Set state in same file
          };
      
          fetchData();
          }, []); 
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addRooms}>

    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="mySelect" className="form-label">Select Ward:</label>
        <Select id="wardId" options={options} filterOption={filterOption} onChange={handleChange} name="wardId" placeholder="Select Ward" />      
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="roomNumber" className="form-label">Enter Room Number:</label>
            <input type="text" className="form-control" id="roomNumber" value={roomNumber} name="roomNumber" onChange={handleRoomNumberChange} />
      </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="roomType" className="form-label">Enter Room Type:</label>
            {/* <input type="text" className="form-control" id="roomType" value={roomType} name="roomType" onChange={handleRoomTypeChange} /> */}
            <select id="roomType" className="form-control " name="roomType" onChange={handleRoomTypeChange}>
                <option value="single">Single</option>
                <option value="shared">Shared</option>
                <option value="ICU">ICU</option>
            </select>
      </div>
         
      </div>
      <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="chargesPerDay" className="form-label">Enter Charges Per Day:</label>
        <input type="number" className="form-control" id="chargesPerDay" value={chargesPerDay} name="chargesPerDay" onChange={handleChargesPerDayChange} />
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
      <button disabled={roomNumber.length<1||roomType.length<1||selectedWardValue==''} type="submit" className="btn btn-primary" >Add Room</button>
      </form>
    </div>
  )
}

export default AddRoom
