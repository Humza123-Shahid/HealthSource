
import React,{useState,useEffect,useContext} from 'react'
import Select from "react-select";
import '../styles/addstaffattendance.css';

import staffattendanceContext from '../context/staffattendanceContext'
import staffContext from '../context/staffContext'
import shiftContext from '../context/shiftContext'
import staffdutyContext from '../context/staffdutyContext'

import InfoMessage from '../components/InfoMessage';

const AddStaffAttendance = () => {
     const context=useContext(staffattendanceContext);
    const {staffattendances,getStaffAttendances,addStaffAttendance}=context;
    const context2=useContext(staffContext);
    const {staffs,getStaffs}=context2;
    const context3=useContext(shiftContext);
    const {shifts,getShifts}=context3;
    const context4=useContext(staffdutyContext);
    const {staffduties,getStaffDuties}=context4;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const [checkInTime, setCheckInTime] = useState("");
    const [checkOutTime, setCheckOutTime] = useState("");
    const [checkInTime2, setCheckInTime2] = useState("");
    const [checkOutTime2, setCheckOutTime2] = useState("");
    const [date, setDate] = useState("");
    const [date2, setDate2] = useState("");
    const [ dutyDate, setDutyDate] = useState(undefined);
    const [ dutyDate2, setDutyDate2] = useState(undefined);
    const [checkedValue, setCheckedValue] = useState(0);
    const [selectedStaffValue, setSelectedStaffValue] = useState('');
    const [selectedShiftValue, setSelectedShiftValue] = useState("");
    const [selectedDutyValue, setSelectedDutyValue] = useState('');
    const [status, setStatus] = useState('present');
    const [staffDuty, setStaffDuty] = useState([]);
    const [allTypeValue, setAllTypeValue] = useState([]);
    const [allStatusValue, setAllStatusValue] = useState([]);
    const [allNewStaffValue, setAllNewStaffValue] = useState([]);
    const [allNewShiftValue, setAllNewShiftValue] = useState([]);
    const [allNewStaffValue2, setAllNewStaffValue2] = useState([]);
    const [allNewShiftValue2, setAllNewShiftValue2] = useState([]);
    const [allAttendanceStatusValue, setAllAttendanceStatusValue] = useState([]);


  const onChangeType=(index,e)=>{
        const newSelections = [...allTypeValue];
        //  if(newSelections[index].isChecked==true)
        //  {
        //      newSelections[index]={value:e.target.value,isChecked:true};
        //  }
        //  else
        //  {
        //     newSelections[index]={value:e.target.value,isChecked:false};

        //  }
        newSelections[index]={value:e.target.value};
        setAllTypeValue(newSelections)
    }
    const onChangeStatus=(index,e)=>{
        const newSelections = [...allStatusValue];
        //  if(newSelections[index].isChecked==true)
        //  {
        //      newSelections[index]={value:e.target.value,isChecked:true};
        //  }
        //  else
        //  {
        //     newSelections[index]={value:e.target.value,isChecked:false};

        //  }
        newSelections[index]={value:e.target.value};

        setAllStatusValue(newSelections)
    }
    const onChangeAttendanceStatus=(index,e)=>{
        const newSelections = [...allAttendanceStatusValue];
        newSelections[index]={value:e.target.value};
        setAllAttendanceStatusValue(newSelections)
    }
//      const handleCheckboxChange=(index,idToRemove,idToRemove2,event)=>{

//     console.log("test2")
// const indexToRemove=index;
//       const {checked}=event.target;
//         console.log("tets")
//         let myObject={};
//         // let myObject2={};
//         let myObject3={};
//         let myObject4={};

//       if(checked)
//       {
//         setCheckedValue(checkedValue+1)
//         // myObject.appen
//         myObject = { ...myObject, ...allNewStaffValue2[index] };
//         myObject.isChecked=true;
//       //    myObject2 = { ...myObject2, ...allNewShiftValue2[index] };
//       //    if(Object.keys(myObject2).length === 0)
//       // {
//       //   console.log("inside2")
//       //   myObject2._id=null;
//       //   myObject2.name=""
//       // }
//       //   myObject2.isChecked=true;
//         myObject3 = { ...myObject3, ...allTypeValue[index] };
//         myObject3.isChecked=true;
//         myObject4 = { ...myObject4, ...allStatusValue[index] };
//         myObject4.isChecked=true;
//         console.log("cheecked")
        
//         const newSelections = [...selectedStaffValue];
        
//       newSelections[index]=myObject;
//         setSelectedStaffValue(newSelections);
//         //  const newSelections2 = [...selectedShiftValue];
//         // newSelections2[index]=myObject2;
//         // setSelectedShiftValue(newSelections2);
//         const newSelections3 = [...allTypeValue];
//         newSelections3[index]=myObject3;
//         setAllTypeValue(newSelections3);
//         const newSelections4 = [...allStatusValue];
//         newSelections4[index]=myObject4;
//         setAllStatusValue(newSelections4);
      
//       }
//       else{
//         setCheckedValue(checkedValue-1)
//         myObject = { ...myObject, ...allNewStaffValue2[index] };
//         myObject.isChecked=false;
//       //   allNewShiftValue2[index] = allNewShiftValue2[index] || {};
//       //   myObject2 = { ...myObject2, ...allNewShiftValue2[index] };
//       //   if(Object.keys(myObject2).length === 0)
//       // {
//       //   console.log("inside2")
//       //   myObject2._id=null;
//       //   myObject2.name=""
//       // }
//       //   myObject2.isChecked=false;
//          myObject3 = { ...myObject3, ...allTypeValue[index] };
//         myObject3.isChecked=false;
//          myObject4 = { ...myObject4, ...allStatusValue[index] };
//         myObject4.isChecked=false;
//         const newSelections = [...selectedStaffValue];
       
//         newSelections[index]=myObject;
//         setSelectedStaffValue(newSelections);
//         console.log(index)
//         //  const newSelections2 = [...selectedShiftValue];
//         // newSelections2[index]=myObject2;
//         // setSelectedShiftValue(newSelections2);
//         const newSelections3 = [...allTypeValue];
//         newSelections3[index]=myObject3;
//         setAllTypeValue(newSelections3);
//         const newSelections4 = [...allStatusValue];
//         newSelections4[index]=myObject4;
//         setAllStatusValue(newSelections4)
//       }
    // }
  const handleDutyDateChange = (event) => {
    setDutyDate(event.target.value);
    const newTime = `${event.target.value}T05:00:00`
    setDutyDate2(newTime);
  };
    const handleChange = (selectedOption,index) => {
        const newSelections = [...allNewStaffValue];
        newSelections[index] = selectedOption;
        setAllNewStaffValue(newSelections);
        const newSelections2 = [...allNewStaffValue2];
        newSelections2[index] = {...staffDuty[index],_id:selectedOption.value,firstName:selectedOption.label};
        setAllNewStaffValue2(newSelections2);


         const newSelections3 = [...selectedStaffValue];
         console.log(selectedStaffValue);
         console.log(selectedOption);
        //  if(newSelections3[index].isChecked==true)
        //  {
        //      newSelections3[index]={...staffDuty[index],staff:selectedOption.value,firstName:selectedOption.label,isChecked:true};
        //  }
        //  else
        //  {
        //     newSelections3[index]={...staffDuty[index],staff:selectedOption.value,firstName:selectedOption.label,isChecked:false};

        //  }
        newSelections3[index]={...staffDuty[index],staff:selectedOption.value,firstName:selectedOption.label};

        setSelectedStaffValue(newSelections3);
  };
  useEffect(() => {
      console.log(selectedStaffValue);
  }, [selectedStaffValue]);
  const handleChange2 = (selectedOption) => {
    
        setSelectedShiftValue(selectedOption.value)

  };
   const handleChange3 = (selectedOption) => {
        setSelectedDutyValue(selectedOption.value)
  };
    const handleCheckInChange = (e) => {
    setCheckInTime(e.target.value); // <-- Get input value here
    const newTime =`1970-01-01T${e.target.value}:00`
    setCheckInTime2(newTime);
  };
  const handleCheckOutChange = (e) => {
    setCheckOutTime(e.target.value); // <-- Get input value here
    const newTime = `1970-01-01T${e.target.value}:00`
    setCheckOutTime2(newTime);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
    const newTime = `${event.target.value}T05:00:00`
    setDate2(newTime);
  };
  const handleChangeStaff = (event) => {
    setSelectedStaffValue(event.target.value);
     
  };
  const handleChangeShift = (event) => {
    setSelectedShiftValue(event.target.value);
     
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value); 
  };
const getOption = async (e) => {
               e.preventDefault();  
    var element = document.getElementById("loader");
    element.classList.remove("hide-loader");
    // $('#loader').addClass("show-loader");
    const response=await fetch("http://localhost:5000/api/staffduty/fetchstaffdutybyinput",{
                      method:'GET',
                      headers:{
                          'Content-Type':'application/json',
                          'auth-token':localStorage.getItem('token'),
                          'shift_id':selectedShiftValue,
                          'dutydate':dutyDate2
                      },
                    });
                    const json=await response.json()
                    console.log(json)
        
        setStaffDuty(json);
           const result = await getStaffAttendances();

        const abc= document.getElementById("norecord")
        const abc2= document.getElementById("norecordbtn")

        element.classList.add("hide-loader");
        // $('#loader').addClass("hide-loader");
        if(json.length<1){
          console.log("abchere");
          abc.style.display="block"
          abc2.style.display="none"
        }
        else{
          abc.style.display="none"
          abc2.style.display="block"

        }
           
    }
  const getStaffById = (id) => staffs.find(d => d._id === id);

   const options = [
  { value: "", label: "Select Staff" }, // empty option
  ... staffs.map(st => ({
    value: st._id,
    label: `${st.firstName}`
  }))
];
const options2 = [
  { value: "", label: "Select Shift" }, // empty option
   ... shifts.map(sh => ({
    value: sh._id,
    label: `${sh.name}`
  }))
];
const options3 = [
  { value: "", label: "Select Duty" }, // empty option
    ... staffduties.map(sd => {
    const staff = getStaffById(sd?.staff);
    const formattedDutyDate = new Date(sd.dutyDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
           
          });
    return{
    value: sd._id,
    label: `${formattedDutyDate}-${staff.firstName}`
}})
];

const filterOption = (option, inputValue) => {
  // Only filter based on the 'label' property, for example
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};
  const addStaffAttendances=async (e)=>{
         e.preventDefault();
        //  const staffDutyIds = selectedStaffValue
        //   .filter(staff => staff.isChecked === true) 
        //   .map(staff => staff?._id); 
        //  const staffIds = selectedStaffValue
        //   .filter(staff => staff.isChecked === true)
        //   .map(staff => staff?.staff); 
        //    const typeValues = allTypeValue
        //   .filter(type => type.isChecked === true)
        //   .map(type => type.value); 
        //    const statusValues = allStatusValue
        //   .filter(status => status.isChecked === true)
        //   .map(status => status.value);
        const staffDutyIds = selectedStaffValue
          .map(staff => staff?._id); 
        //  const staffIds = selectedStaffValue
        //   .map(staff => staff?.staff); 
        //    const typeValues = allTypeValue
        //   .map(type => type.value); 
        //    const statusValues = allStatusValue
        //   .map(status => status.value);
          const attendanceStatusValues=allAttendanceStatusValue
          .map(attendance=>attendance.value)
          // console.log(staffIds,typeValues,statusValues,staffDutyIds,attendanceStatusValues);
        //  const utcArrTime = new Date(arrivalTime2.getTime() - arrivalTime2.getTimezoneOffset() * 60000)
        //  const utcDepTime = new Date(departureTime2.getTime() - departureTime2.getTimezoneOffset() * 60000)

        //  setDepartureTime("1970-09-03T"+departureTime);
        //  setArrivalTime("1970-09-03T"+arrivalTime);
        //  console.log(date2);
          // const success=await addStaffAttendance(selectedStaffValue,selectedDutyValue,date2,checkInTime2,checkOutTime2,selectedShiftValue,status)
          // const success=await addStaffAttendance(staffDutyIds,staffIds,typeValues,statusValues,attendanceStatusValues)
          const success=await addStaffAttendance(staffDutyIds,attendanceStatusValues)

          // const success2=await editStaffDuty()
          
          console.log(success)
          if(success)
          {
            console.log("abc");
            setShowToast(true);
            setMsg("Staff Attendance added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
useEffect(() => {
  const newSelections = [...allNewStaffValue];
  const newSelections2 = [...allTypeValue];
  const newSelections3 = [...allStatusValue];
  const newSelections4 = [...selectedStaffValue];
  const newSelections5 = [...allNewStaffValue2];
  const newSelections6 = [...allAttendanceStatusValue];

  staffDuty.forEach((value, index) => {
        const staff = getStaffById(value?.staff);
        console.log(value.duty_type);
      newSelections[index] = {value:value?.staff,label:staff.firstName};

      // newSelections2[index] = {value:value?.duty_type,isChecked:false};
      // newSelections3[index] = {value:value?.status,isChecked:false};
      newSelections2[index] = {value:value?.duty_type};
      newSelections3[index] = {value:value?.status};

      newSelections4[index] = value;
      // newSelections4[index].isChecked=false
      newSelections5[index]=value;
       newSelections6[index]={value:"present"};

  })
  setAllNewStaffValue(newSelections);
  setAllTypeValue(newSelections2);
  setAllStatusValue(newSelections3);
  setSelectedStaffValue(newSelections4);
  setAllNewStaffValue2(newSelections5);
  setAllAttendanceStatusValue(newSelections6);

  }, [staffDuty]); 
  
useEffect(() => {
            const fetchData = async () => {
            //const result = await getQuizzes(); // Call context function
           const result2 = await getStaffs();
          const result3 = await getShifts();
          const result4 = await getStaffDuties();
       
            //setMyData(result);                     // Set state in same file
          };
      
          fetchData();
          }, []); 
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addStaffAttendances}>
    {/* <div className='mx-0' style={{display:'flex'}}> */}
      {/* <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Staff:</label>
      <select id="mySelect" className="form-control "  value={selectedStaffValue} onChange={handleChangeStaff}>
        <option value="">-Select-</option>
        {staffs.map((row) => (
        <option value={row._id}>{row.firstName}</option>
        ))}
      </select>
      <Select id="staffId" options={options} filterOption={filterOption} onChange={handleChange} name="staffId" placeholder="Select Staff" />

    </div> */}
     {/* <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Duty:</label>
      <Select id="dutyId" options={options3} filterOption={filterOption} onChange={handleChange3} name="dutyId" placeholder="Select Duty" />

    </div> */}
    {/* <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      <label htmlFor="date" className="form-label">Date:</label>
      <input type="date" className="form-control" id="date" value={date} name="date" onChange={handleDateChange} />

      </div>
 <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="checkInTime" className="form-label">Check In Time:</label>
            <input type="time" className="form-control" id="checkInTime" value={checkInTime} name="checkInTime" onChange={handleCheckInChange} />
      </div>
      
      
    
    
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="checkOutTime" className="form-label">Check Out Time:</label>
            <input type="time" className="form-control" id="checkOutTime" value={checkOutTime} name="checkOutTime" onChange={handleCheckOutChange} />
      </div>
      </div>
      <div className='mx-0' style={{display:'flex'}}> */}
       
       
      {/* <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Shift:</label>
      <select id="mySelect" className="form-control "  value={selectedShiftValue} onChange={handleChangeShift}>
        <option value="">-Select-</option>
        {shifts.map((row) => (
        <option value={row._id}>{row.name}</option>
        ))}
      </select>
      <Select id="shiftId" options={options2} filterOption={filterOption} onChange={handleChange2} name="shiftId" placeholder="Select Shift" />
    </div> */}
     {/* <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="status" className="form-label">Status:</label>
            {/* <input type="number" className="form-control" id="status" value={status} name="status" onChange={handleStatusChange} /> */}
            {/* <select id="mySelect" className="form-control " value={status} onChange={handleStatusChange}>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="leave">Leave</option>
            </select>
      </div>
      <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
        </div>
       <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
        </div>
    </div> */} 
      <div className='mx-0' style={{display:'flex'}}>
      
            
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="dutyDate" className="form-label">StaffDuty Date</label>
        <input type="date" className="form-control" id="dutyDate" name="dutyDate" value={dutyDate} onChange={handleDutyDateChange}  aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
          <label htmlFor="mySelect" className="form-label">Select Shift:</label>
          <Select id="shiftId" options={options2} filterOption={filterOption} onChange={handleChange2} name="shiftId" placeholder="Select Shift" />
        </div>
          <div className="mb-3 my-3 me-3" style={{width:'100%',display: 'flex',alignItems: 'center',height: '100px'}}>
                  <button disabled={selectedShiftValue==""||dutyDate.length<1} className="btn add-option-btn" onClick={getOption} style={{width:'35%',marginLeft:'5px'}}>Get Duty Staff</button>
            </div>
          </div>
          <div class="parent-loader">
          <div class="loader hide-loader" id="loader">
            </div>
          </div>  
        <p id="norecord" style={{display:"none"}}>No record found.</p>
        
          {staffDuty.map((stf, index) => {  
      // if(allNewShiftValue[index]?.value==undefined) 
      //   {
      //     setAllNewShiftValue[index]({label:'Select Staff',value:null});
      //   }  
      return(
      <div className='mx-0' style={{display:'flex'}}>
        
        {/* <div className="mb-3 my-3 me-3" style={{width:'2%'}}>
          <br/>
          <input className='ms-1 mt-3' style={{height:'30%',transform:'scale(1.5)'}} type='checkbox' onChange={(event)=>handleCheckboxChange(index,stf._id,shifts[index]?._id,event)} />
        </div> */}
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="staff" className="form-label">Staff</label>
            <Select id="staffId" options={options} filterOption={filterOption} value={allNewStaffValue[index]} onChange={(selectedOption) =>handleChange(selectedOption, index)} name="staffId" placeholder="Select Staff" isDisabled={true} />
            {/* <Select id="staffId" options={options} filterOption={filterOption} value={{'value':stf._id,'label':stf.firstName}} onChange={(selectedOption) =>handleChange(selectedOption, index)} name="staffId" placeholder="Select Staff" /> */}
        </div>
        {/* <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="shiftId" className="form-label">Shift</label>
             <Select id="shiftId" options={options2} filterOption={filterOption} value={allNewShiftValue[index]} onChange={(selectedOption) =>handleChange2(selectedOption, index)} name="shiftId" placeholder="Select Shift" />
        </div> */}
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="bookingType" className="form-label">Enter Duty Type:</label>
            {/* <input type="text" className="form-control" id="bookingType" name="bookingType" onChange={onChange} /> */}
            <select id="mySelect" className="form-control " name="dutyType" value={allTypeValue[index]?.value} onChange={(event)=>onChangeType(index,event)} disabled>
                <option value="ward-round">Ward-Round</option>
                <option value="OPD">OPD</option>
                <option value="ICU">ICU</option>
                <option value="OT">OT</option>
                <option value="reception">Reception</option>
                <option value="emergency">Emergency</option>
            </select>
      </div>
      
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="status" className="form-label">Enter Status:</label>
            {/* <input type="text" className="form-control" id="status" name="status" onChange={onChange} /> */}
            <select id="mySelect" className="form-control " name="status" value={allStatusValue[index]?.value} onChange={(event)=>onChangeStatus(index,event)} disabled>
            {/* <select id="mySelect" className="form-control " name="status" onChange={(event)=>onChangeStatus(index,event)}>   */}
                <option value="assigned">Assigned</option>
                <option value="in-progress">In-Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled'">Cancelled'</option>
            </select>
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="status" className="form-label">Attendance Status:</label>
            {/* <input type="number" className="form-control" id="status" value={status} name="status" onChange={handleStatusChange} /> */}
            <select id="mySelect" className="form-control " value={allAttendanceStatusValue[index]?.value} onChange={(event)=>onChangeAttendanceStatus(index,event)}>
                <option value="present">Present</option>
                <option value="absent">Absent</option>\
                <option value="leave">Leave</option>
            </select>
      </div>
    </div>)
})}
      <button id="norecordbtn" disabled={staffDuty.length<1} type="submit" className="btn btn-primary staff-attendance-btn">Add Staff Attendance</button>
      {/* <button disabled={checkInTime.length<1||checkOutTime.length<1||date.length<1||selectedStaffValue==''||selectedShiftValue==''||selectedDutyValue==''} type="submit" className="btn btn-primary">Add Staff Attendance</button> */}
      </form>
    </div>
  )
}

export default AddStaffAttendance
