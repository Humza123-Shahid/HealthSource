
import React,{useState,useEffect,useContext} from 'react'
import Select from "react-select";
import '../styles/addstaff.css';
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
  
    const [role, setRole] = useState('surgeon');
    const [staff, setStaff] = useState([]);
    const [allStaffValue, setAllStaffValue] = useState([]);
    const [allNewStaffValue, setAllNewStaffValue] = useState([]);
    const [allNewRoleValue, setAllNewRoleValue] = useState([]);
    const [allRoleValue, setAllRoleValue] = useState([]);

    
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
  const handleChange3 = (selectedOption, index) => {
    // const index = options2.findIndex(option => option.value === selectedOption.value);
    // console.log(index);
    // if(selectedOption.value=="")
    // {
    //   setAllNewStaffValue(prev =>
    //   prev.map((item, i) => (i === index-1 ? null : item))
    // )
    // }
    // else{
    //     setAllNewStaffValue(prev =>
    //   prev.map((item, i) => (i === index-1 ? selectedOption.value : item))
    // )

    // }
     const newSelections = [...allNewStaffValue];
    // Update the element at the specific index with the new selected value
    newSelections[index] = selectedOption;
    // Update the state
    setAllNewStaffValue(newSelections);
  };
  const handleChangeRole = (index, newValue) => {
    setAllRoleValue(prev =>
      prev.map((item, i) => (i === index ? newValue : item))
    );
    setAllNewRoleValue(prev =>
      prev.map((item, i) => (i === index ? newValue : item))
    );
    
  };
  const addSurgeryTeams=async (e)=>{
         e.preventDefault();
        //  const utcArrTime = new Date(arrivalTime2.getTime() - arrivalTime2.getTimezoneOffset() * 60000)
        //  const utcDepTime = new Date(departureTime2.getTime() - departureTime2.getTimezoneOffset() * 60000)

        //  setDepartureTime("1970-09-03T"+departureTime);
        //  setArrivalTime("1970-09-03T"+arrivalTime);
        console.log(allNewStaffValue);
        console.log(allNewRoleValue);
          const success=await addSurgeryTeam(selectedSurgeryValue,allNewStaffValue,allNewRoleValue)
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
    const filterOption = (option, inputValue) => {
      // Only filter based on the 'label' property, for example
      return option.label.toLowerCase().includes(inputValue.toLowerCase());
    };
    const addOption = (e) => {
               e.preventDefault();
console.log("abc")
      // const selectElement = document.getElementById('mySelect3');
      // const selectedIndex = selectElement.selectedIndex;
      //   const selectedOption = selectElement.options[selectedIndex];
      const staffName=getStaffById(selectedStaffValue);
      setStaff(prev => [...prev, staffName?.firstName]);
      setAllRoleValue(prev => [...prev,role]);
      setAllNewRoleValue(prev => [...prev,'surgeon']);
      setAllStaffValue(prev => [...prev, selectedStaffValue]);
      setAllNewStaffValue(prev => [...prev, null]);

        // if(selectedStaffValue=="")
        // {
        //   //setStaff(prev => [...prev, ""]);
        //   return; 
        // }
        // else{
        //   console.log("setabc");
        //   const check=staff.includes(staffName.firstName);
        //   const check2=allStaffValue.includes(selectedStaffValue);

        //   if(!check || !check2)
        //   {
        //     setStaff(prev => [...prev, staffName.firstName]);
        //     setAllRoleValue(prev => [...prev,role]);
        //   }
        // }
        // console.log(selectedStaffValue)
        // const check3=allStaffValue.includes(selectedStaffValue);
        //  if(!check3)
        //   {
        //     setAllStaffValue(prev => [...prev, selectedStaffValue]);
        //   }
        // setSelectedStaffValue('');
        
    }
    const handleClose = (e,indexToRemove) => {
  e.preventDefault();
  console.log(indexToRemove);

  setStaff(prev => prev.filter((_, index) => index !== indexToRemove));
  setAllStaffValue(prev => prev.filter((_, index) => index !== indexToRemove));
  setAllNewStaffValue(prev => prev.filter((_, index) => index !== indexToRemove));
  setAllRoleValue(prev => prev.filter((_, index) => index !== indexToRemove));
  setAllNewRoleValue(prev => prev.filter((_, index) => index !== indexToRemove));
   //setSelected('');
   
    
   
}
 useEffect(() => {
      console.log(allNewStaffValue);
      
          }, [allNewStaffValue]); 
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
    {/* <form onSubmit={addSurgeryTeams}> */}
    <form>
    <div className='mx-0' style={{display:'flex'}}>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Surgery:</label>
      {/* <select id="mySelect" className="form-control "  value={selectedSurgeryValue} onChange={handleChangeSurgery}>
        <option value="">-Surgery-</option>
        {surgeries.map((row) => (
        <option value={row._id}>{row.type}</option>
        ))}
      </select> */}
      <Select id="surgeryId" options={options} filterOption={filterOption} onChange={handleChange} name="surgeryId" placeholder="Select Surgery" />

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
    <div className='mx-0' style={{display:'flex'}}>

    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="staffId" className="form-label">Select Staff:</label>
            {/* <select id="staffId" className="form-control " value={selectedStaffValue} onChange={handleChangeStaff}>
                <option value="">-Staff-</option>
                  {staffs.map((row) => (
                    <option value={row._id}>{row.firstName}</option>
                ))}
        </select> */}
      <Select id="mySelect3" options={options2} filterOption={filterOption} onChange={handleChange2} name="staffId" placeholder="Select Staff" />
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
           <Select id="mySelect5" options={options2} filterOption={filterOption} value={stf} onChange={(selectedOption) => handleChange3(selectedOption, index)} name="staffId2" placeholder="Select Staff" />
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
      {/* </div> */}
      <button disabled={selectedSurgeryValue==''||allStaffValue.length<1} onClick={addSurgeryTeams} type="submit" className="btn btn-primary">Add Surgery Team</button>
      </form>
    </div> 
  )
}

export default AddSurgeryTeam
