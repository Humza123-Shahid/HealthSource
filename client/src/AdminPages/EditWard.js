
import React,{useState,useEffect,useContext} from 'react'
import { useLocation } from 'react-router-dom';
import wardContext from '../context/wardContext'
//import driverContext from '../context/driverContext'
import InfoMessage from '../components/InfoMessage';

const EditWard = () => {
    const context=useContext(wardContext);
    const {editWard}=context;
    const location = useLocation();
    const Ward=location.state?.ward || {};

    // const context2=useContext(driverContext);
    // const {drivers,getDrivers}=context2;
    const [showToast,setShowToast]=useState(false)
    const [msg,setMsg]=useState('')
    const [type, setType] = useState('');
    const [name, setName] = useState(Ward.name);
    const [wardType, setWardType] = useState(Ward.type);

    const [totalRooms, setTotalRooms] = useState(Ward.totalRooms);


    const handleNameChange = (e) => {
    setName(e.target.value); // <-- Get input value here
  };
  const handleWardTypeChange = (e) => {
    setWardType(e.target.value); // <-- Get input value here
  };
  
    const handleTotalRoomsChange = (e) => {
    setTotalRooms(e.target.value); // <-- Get input value here
  };
  
  const editWards=(e)=>{
         e.preventDefault();
          const success=editWard(Ward._id,name,wardType,totalRooms)
          console.log(success)
          if(success)
          {
            console.log("abc");
            setShowToast(true);
            setMsg("Ward updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
    // useEffect(() => {
    //         const fetchData = async () => {
    //         //const result = await getQuizzes(); // Call context function
    //         const result = await getDrivers();
    //         //setMyData(result);                     // Set state in same file
    //       };
      
    //       fetchData();
    //       }, []); 
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={editWards}>
    <div className='mx-0' style={{display:'flex'}}>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="name" className="form-label">Enter Name:</label>
            <input type="text" className="form-control" id="name" value={name} name="name" onChange={handleNameChange} />
      </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="wtype" className="form-label">Enter Type:</label>
            {/* <input type="text" className="form-control" id="wtype" value={wardType} name="wtype" onChange={handleWardTypeChange} /> */}
            <select id="mySelect" className="form-control "  value={wardType} onChange={handleWardTypeChange}>
                  <option value="general">General</option>
                  <option value="ICU">ICU</option>
                  <option value="NICU">NICU</option>
                  <option value="CCU">CCU</option>
                  <option value="maternity">Maternity</option>
                  <option value="VIP">VIP</option>
                  
            </select>
      </div>
    
         <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="trooms" className="form-label">Enter Total Rooms:</label>
            <input type="number" className="form-control" id="trooms" value={totalRooms} name="trooms" onChange={handleTotalRoomsChange} />
      </div>
      </div>
      <button disabled={name==''||wardType==''} type="submit" className="btn btn-primary">Update Ward</button>
      </form>
    </div>
  )
}

export default EditWard
