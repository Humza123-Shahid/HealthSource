
import React,{useState,useEffect,useContext} from 'react'
import wardContext from '../context/wardContext'
//import driverContext from '../context/driverContext'
import InfoMessage from '../components/InfoMessage';

const AddWard = () => {
    const context=useContext(wardContext);
    const {addWard}=context;
    // const context2=useContext(driverContext);
    // const {drivers,getDrivers}=context2;
    const [showToast,setShowToast]=useState(false)
    const [msg,setMsg]=useState('')
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [wardType, setWardType] = useState('general');

    const [totalRooms, setTotalRooms] = useState(0);


    const handleNameChange = (e) => {
    setName(e.target.value); // <-- Get input value here
  };
  const handleWardTypeChange = (e) => {
    setWardType(e.target.value); // <-- Get input value here
  };
  
    const handleTotalRoomsChange = (e) => {
    setTotalRooms(e.target.value); // <-- Get input value here
  };
  
  const addWards=(e)=>{
         e.preventDefault();
          const success=addWard(name,wardType,totalRooms)
          console.log(success)
          if(success)
          {
            console.log("abc");
            setShowToast(true);
            setMsg("Ward added successfully")
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
    <form onSubmit={addWards}>
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
      <button disabled={name==''||wardType==''} type="submit" className="btn btn-primary">Add Ward</button>
      </form>
    </div>
  )
}

export default AddWard
