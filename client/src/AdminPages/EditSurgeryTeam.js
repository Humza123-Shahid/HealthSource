
import React,{useState,useEffect,useContext} from 'react'
import Select from "react-select";

import surgeryteamContext from '../context/surgeryteamContext'
import surgeryContext from '../context/surgeryContext'
import staffContext from '../context/staffContext'
import { useLocation } from 'react-router-dom';
import InfoMessage from '../components/InfoMessage';

const EditSurgeryTeam = () => {
    const context=useContext(surgeryteamContext);
    const {editSurgeryTeam}=context;
    const context2=useContext(surgeryContext);
    const {surgeries,getSurgeries}=context2;
    const context3=useContext(staffContext);
    const {staffs,getStaffs}=context3;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const location = useLocation();
    const SurgeryTeam=location.state?.surgeryteam || {};
    const surgery_id=location.state?.surgeryId || "";
    const staff_id=location.state?.staffId || "";
    const [selectedSurgeryValue, setSelectedSurgeryValue] = useState(surgery_id);
    const [selectedStaffValue, setSelectedStaffValue] = useState(staff_id);
  
    const [role, setRole] = useState(SurgeryTeam?.role);


    
  const handleChangeSurgery = (event) => {
    setSelectedSurgeryValue(event.target.value);
     
  };
  const handleChangeStaff = (event) => {
    setSelectedStaffValue(event.target.value);
     
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value); 
  };
   const handleChange = (selectedOption) => {
        setSelectedSurgeryValue(selectedOption.value)
        
  };
  const handleChange2 = (selectedOption) => {
    setSelectedStaffValue(selectedOption.value)

  };
  const editSurgeryTeams=async (e)=>{
         e.preventDefault();
        //  const utcArrTime = new Date(arrivalTime2.getTime() - arrivalTime2.getTimezoneOffset() * 60000)
        //  const utcDepTime = new Date(departureTime2.getTime() - departureTime2.getTimezoneOffset() * 60000)

        //  setDepartureTime("1970-09-03T"+departureTime);
        //  setArrivalTime("1970-09-03T"+arrivalTime);
          const success=await editSurgeryTeam(SurgeryTeam._id,selectedSurgeryValue,selectedStaffValue,role)
          console.log(success)
          if(success)
          {
            console.log("abc");
            setShowToast(true);
            setMsg("Surgery Team updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
    const getSurgeryById = (id) => surgeries.find(d => d._id === id);
    const getStaffById = (id) => staffs.find(d => d._id === id);
     const options = [
      { value: "", label: "Select Surgery" }, // empty option
      ... surgeries.map(sg => ({
        value: sg._id,
        label: `${sg.type}`
      }))
    ];
    const options2 = [
      { value: "", label: "Select Staff" }, // empty option
      ... staffs.map(st => ({
        value: st._id,
        label: `${st.firstName}`
      }))
    ];
    const defaultValue = options.find(d=>d.value==surgery_id);
    const defaultValue2 = options2.find(d=>d.value==staff_id);

    const filterOption = (option, inputValue) => {
      // Only filter based on the 'label' property, for example
      return option.label.toLowerCase().includes(inputValue.toLowerCase());
    };
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
    <form onSubmit={editSurgeryTeams}>
    <div className='mx-0' style={{display:'flex'}}>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Surgery:</label>
      {/* <select id="mySelect" className="form-control "  value={selectedSurgeryValue} onChange={handleChangeSurgery}>
        <option value="">-Surgery-</option>
        {surgeries.map((row) => (
        <option value={row._id}>{row.type}</option>
        ))}
      </select> */}
      <Select id="surgeryId" options={options} filterOption={filterOption} defaultValue={defaultValue} onChange={handleChange} name="surgeryId" placeholder="Select Surgery" />

    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="staffId" className="form-label">Select Staff:</label>
            {/* <select id="staffId" className="form-control " value={selectedStaffValue} onChange={handleChangeStaff}>
                <option value="">-Staff-</option>
                  {staffs.map((row) => (
                    <option value={row._id}>{row.firstName}</option>
                ))}
        </select> */}
      <Select id="staffId" options={options2} filterOption={filterOption} defaultValue={defaultValue2} onChange={handleChange2} name="staffId" placeholder="Select Staff" />
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="role" className="form-label">Enter Role:</label>
            <input type="text" className="form-control" id="type" value={role} name="role" onChange={handleRoleChange} />
      </div>
    
    </div>
      
      <button disabled={selectedSurgeryValue==''||selectedStaffValue==''||role==''} type="submit" className="btn btn-primary">Update Surgery Team</button>
      </form>
    </div> 
  )
}

export default EditSurgeryTeam
