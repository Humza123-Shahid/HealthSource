
import React,{useState,useEffect,useContext} from 'react'
import surgeryteamContext from '../context/surgeryteamContext'
import surgeryContext from '../context/surgeryContext'
import staffContext from '../context/staffContext'
import InfoMessage from '../components/InfoMessage';

const AddSurgeryTeam = () => {
    const context=useContext(surgeryteamContext);
    const {addSurgeryTeam}=context;
    const context2=useContext(surgeryContext);
    const {surgeries,getSurgeries}=context2;
    const context3=useContext(staffContext);
    const {staffs,getStaffs}=context3;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const [selectedSurgeryValue, setSelectedSurgeryValue] = useState('');
    const [selectedStaffValue, setSelectedStaffValue] = useState('');
  
    const [role, setRole] = useState('');


    
  const handleChangeSurgery = (event) => {
    setSelectedSurgeryValue(event.target.value);
     
  };
  const handleChangeStaff = (event) => {
    setSelectedStaffValue(event.target.value);
     
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value); 
  };
   
  const addSurgeryTeams=async (e)=>{
         e.preventDefault();
        //  const utcArrTime = new Date(arrivalTime2.getTime() - arrivalTime2.getTimezoneOffset() * 60000)
        //  const utcDepTime = new Date(departureTime2.getTime() - departureTime2.getTimezoneOffset() * 60000)

        //  setDepartureTime("1970-09-03T"+departureTime);
        //  setArrivalTime("1970-09-03T"+arrivalTime);
          const success=await addSurgeryTeam(selectedSurgeryValue,selectedStaffValue,role)
          console.log(success)
          if(success)
          {
            console.log("abc");
            setShowToast(true);
            setMsg("Surgery Team added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
    const getSurgeryById = (id) => surgeries.find(d => d._id === id);
    const getStaffById = (id) => staffs.find(d => d._id === id);
    useEffect(() => {
            const fetchData = async () => {
            //const result = await getQuizzes(); // Call context function
          const result = await getSurgeries();
          const result2 = await getStaffs();

            //setMyData(result);                     // Set state in same file
          };
      
          fetchData();
          }, []); 
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addSurgeryTeams}>
    <div className='mx-0' style={{display:'flex'}}>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Surgery:</label>
      <select id="mySelect" className="form-control "  value={selectedSurgeryValue} onChange={handleChangeSurgery}>
        <option value="">-Surgery-</option>
        {surgeries.map((row) => (
        <option value={row._id}>{row.type}</option>
        ))}
      </select>
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="staffId" className="form-label">Select Staff:</label>
            <select id="staffId" className="form-control " value={selectedStaffValue} onChange={handleChangeStaff}>
                {/* <option value="admin">Admin</option>
                <option value="organizer">Organizer</option> */}
                <option value="">-Staff-</option>
                  {staffs.map((row) => (
                    <option value={row._id}>{row.firstName}</option>
                ))}
        </select>
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="role" className="form-label">Enter Role:</label>
            <input type="text" className="form-control" id="type" value={role} name="role" onChange={handleRoleChange} />
      </div>
    
    </div>
      
      <button disabled={selectedSurgeryValue==''||selectedStaffValue==''||role==''} type="submit" className="btn btn-primary">Add Surgery Team</button>
      </form>
    </div> 
  )
}

export default AddSurgeryTeam
