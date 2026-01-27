
import React,{useState, useRef,useEffect,useContext} from 'react'
import Select from "react-select";

import staffdutyContext from '../context/staffdutyContext'
import staffContext from '../context/staffContext'
import shiftContext from '../context/shiftContext'

import InfoMessage from '../components/InfoMessage';

const AddStaffDuty = () => {
  const effectRan = useRef(false);
   const [showToast,setShowToast]=useState(false)
       const [msg,setMsg]=useState('')
       const [type,setType]=useState('')
       const [roles,setRoles]=useState([]);
     const [credentials,setCredentials] =useState({patientId:null,doctorId:null,bookingType:"online",status:"booked",notes:""})
         const [ dutyDate, setDutyDate] = useState(undefined);
         const [ dutyDate2, setDutyDate2] = useState(undefined);

        //  const [ appointmentDate2, setStaffDutyDate2] = useState(undefined);
     const [checkedValue, setCheckedValue] = useState(0);
    const [allShiftValue, setAllShiftValue] = useState([]);

         const [allTypeValue, setAllTypeValue] = useState([]);
         const [allStatusValue, setAllStatusValue] = useState([]);
    const context=useContext(staffdutyContext);
    const {addStaffDuty}=context;
    const context2=useContext(staffContext);
    const {staffs,getStaffs}=context2;
    const context3=useContext(shiftContext);
    const {shifts,getShifts}=context3;
    const [allNewStaffValue, setAllNewStaffValue] = useState([]);
    const [allNewShiftValue, setAllNewShiftValue] = useState([]);
    const [allNewStaffValue2, setAllNewStaffValue2] = useState([]);
    const [allNewShiftValue2, setAllNewShiftValue2] = useState([]);
    const [selectedStaffValue, setSelectedStaffValue] = useState([]);
    const [selectedShiftValue, setSelectedShiftValue] = useState([]);


          const handleDutyDateChange = (event) => {
    setDutyDate(event.target.value);
    const newTime = `${event.target.value}T05:00:00`
    setDutyDate2(newTime);
  };
  
     const onChange=(e)=>{
        if(e.target.value=="" && (e.target.name=="patientId"||e.target.name=="doctorId"))
        {
            setCredentials({...credentials,[e.target.name]:null})
        }
        else{
            setCredentials({...credentials,[e.target.name]:e.target.value})
        }
      
      
    }
    const onChangeType=(index,e)=>{
        const newSelections = [...allTypeValue];
         if(newSelections[index].isChecked==true)
         {
             newSelections[index]={value:e.target.value,isChecked:true};
         }
         else
         {
            newSelections[index]={value:e.target.value,isChecked:false};

         }
        setAllTypeValue(newSelections)
    }
    const onChangeStatus=(index,e)=>{
        const newSelections = [...allStatusValue];
         if(newSelections[index].isChecked==true)
         {
             newSelections[index]={value:e.target.value,isChecked:true};
         }
         else
         {
            newSelections[index]={value:e.target.value,isChecked:false};

         }
        setAllStatusValue(newSelections)
    }
    // const handleCheckboxChange=(index,event)=>{
    const handleCheckboxChange=(index,idToRemove,idToRemove2,event)=>{

    console.log("test2")
const indexToRemove=index;
      const {checked}=event.target;
        console.log("tets")
        let myObject={};
        let myObject2={};
        let myObject3={};
        let myObject4={};

      if(checked)
      {
        setCheckedValue(checkedValue+1)
        // myObject.appen
        myObject = { ...myObject, ...allNewStaffValue2[index] };
        myObject.isChecked=true;
         myObject2 = { ...myObject2, ...allNewShiftValue2[index] };
         if(Object.keys(myObject2).length === 0)
      {
        console.log("inside2")
        myObject2._id=null;
        myObject2.name=""
      }
        myObject2.isChecked=true;
        myObject3 = { ...myObject3, ...allTypeValue[index] };
        myObject3.isChecked=true;
        myObject4 = { ...myObject4, ...allStatusValue[index] };
        myObject4.isChecked=true;
        console.log("cheecked")
        // const newSelections = [...selectedStaffValue];
        // newSelections[index] = allNewStaffValue[index];
        // setSelectedStaffValue(newSelections);
        // const newSelections2 = [...selectedShiftValue];
        // newSelections2[index] = allNewShiftValue[index];
        // setSelectedShiftValue(newSelections2);
        const newSelections = [...selectedStaffValue];
        // newSelections.push(allNewStaffValue2[index]);
        // newSelections.push(myObject);
      newSelections[index]=myObject;
        setSelectedStaffValue(newSelections);
         const newSelections2 = [...selectedShiftValue];
        newSelections2[index]=myObject2;
        setSelectedShiftValue(newSelections2);
        const newSelections3 = [...allTypeValue];
        newSelections3[index]=myObject3;
        setAllTypeValue(newSelections3);
        const newSelections4 = [...allStatusValue];
        newSelections4[index]=myObject4;
        setAllStatusValue(newSelections4);
        // const newSelections2 = [...selectedShiftValue];
        // newSelections2.push(allNewShiftValue2[index]);
        // setSelectedShiftValue(newSelections2);
      }
      else{
        setCheckedValue(checkedValue-1)
        myObject = { ...myObject, ...allNewStaffValue2[index] };
        myObject.isChecked=false;
        allNewShiftValue2[index] = allNewShiftValue2[index] || {};
        myObject2 = { ...myObject2, ...allNewShiftValue2[index] };
        if(Object.keys(myObject2).length === 0)
      {
        console.log("inside2")
        myObject2._id=null;
        myObject2.name=""
      }
        myObject2.isChecked=false;
         myObject3 = { ...myObject3, ...allTypeValue[index] };
        myObject3.isChecked=false;
         myObject4 = { ...myObject4, ...allStatusValue[index] };
        myObject4.isChecked=false;
        const newSelections = [...selectedStaffValue];
        // newSelections.push(allNewStaffValue2[index]);
        // newSelections.push(myObject);
        newSelections[index]=myObject;
        setSelectedStaffValue(newSelections);
        console.log(index)
         const newSelections2 = [...selectedShiftValue];
        newSelections2[index]=myObject2;
        setSelectedShiftValue(newSelections2);
        const newSelections3 = [...allTypeValue];
        newSelections3[index]=myObject3;
        setAllTypeValue(newSelections3);
        const newSelections4 = [...allStatusValue];
        newSelections4[index]=myObject4;
        setAllStatusValue(newSelections4);
          // setSelectedStaffValue(prev => prev.filter(item => item?._id !== idToRemove));
          // setSelectedShiftValue(prev => prev.filter(item => item?._id !== idToRemove2));

          // setSelectedStaffValue(prev => prev.filter((_, index) => index !== indexToRemove));
          // setSelectedShiftValue(prev => prev.filter((_, index) => index !== indexToRemove));
      }
    }
      const handleChange = (selectedOption,index) => {
        // if(selectedOption=="" )
        // {
        //     setCredentials({...credentials,'patientId':null})
        // }
        // else
        // {
        //   setCredentials({...credentials,'patientId':selectedOption.value})
        // }
        const newSelections = [...allNewStaffValue];
        newSelections[index] = selectedOption;
        setAllNewStaffValue(newSelections);
        const newSelections2 = [...allNewStaffValue2];
        newSelections2[index] = {...staffs[index],_id:selectedOption.value,firstName:selectedOption.label};
        setAllNewStaffValue2(newSelections2);


         const newSelections3 = [...selectedStaffValue];
         console.log(selectedStaffValue);
         if(newSelections3[index].isChecked==true)
         {
             newSelections3[index]={...staffs[index],_id:selectedOption.value,firstName:selectedOption.label,isChecked:true};
         }
         else
         {
            newSelections3[index]={...staffs[index],_id:selectedOption.value,firstName:selectedOption.label,isChecked:false};

         }
        setSelectedStaffValue(newSelections3);
       
  };
  const handleChange2 = (selectedOption,index) => {
        // if(selectedOption=="" )
        // {
        //     setCredentials({...credentials,'doctorId':null})
        // }
        // else
        // {
        //   setCredentials({...credentials,'doctorId':selectedOption.value})
        // }
        const newSelections = [...allNewShiftValue];
        newSelections[index] = selectedOption;
        setAllNewShiftValue(newSelections);
         const newSelections2 = [...allNewShiftValue2];
        newSelections2[index] = {...shifts[index],_id:selectedOption.value,name:selectedOption.label};
        setAllNewShiftValue2(newSelections2);
        //  const newSelections4 = [...selectedShiftValue];
        // newSelections4[index]={...shifts[index],_id:selectedOption.value,name:selectedOption.label};
        // setSelectedShiftValue(newSelections4);
        const newSelections3 = [...selectedShiftValue];
         if(newSelections3[index].isChecked==true)
         {
             newSelections3[index]={...shifts[index],_id:selectedOption.value,name:selectedOption.label,isChecked:true};
         }
         else
         {
            newSelections3[index]={...shifts[index],_id:selectedOption.value,name:selectedOption.label,isChecked:false};

         }
        setSelectedShiftValue(newSelections3);
  };
const getStaffById = (id) => staffs.find(d => d._id === id);
const getShiftById = (id) => shifts.find(d => d._id === id);

const options = [
  { value: null, label: "Select Staff" }, // empty option
  ... staffs.map(st => ({
    value: st._id,
    label: `${st.firstName}`
  }))
];
const options2 = [
  { value: null, label: "Select Shift" }, // empty option
 ... shifts.map(sh => ({
    value: sh._id,
    label: `${sh.name}`
  }))
];
const filterOption = (option, inputValue) => {
  // Only filter based on the 'label' property, for example
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};

  const addStaffDuties=async (e)=>{
         e.preventDefault();
        //  console.log(dutyDate);
        //  console.log(selectedStaffValue)
        //  console.log(selectedShiftValue)
        //   console.log(allTypeValue)
        //  console.log(allStatusValue)
         const staffIds = selectedStaffValue
          .filter(staff => staff.isChecked === true) // Step 1: Filter by 'admin' role
          .map(staff => staff._id); 
          const shiftIds = selectedShiftValue
          .filter(shift => shift.isChecked === true) // Step 1: Filter by 'admin' role
          .map(shift => shift._id);
           const typeValues = allTypeValue
          .filter(type => type.isChecked === true) // Step 1: Filter by 'admin' role
          .map(type => type.value); 
           const statusValues = allStatusValue
          .filter(status => status.isChecked === true) // Step 1: Filter by 'admin' role
          .map(status => status.value); 
           
        // const {staffId,shiftId,bookingType,status,notes}=credentials
        // // const patientobj= getPatientById(patientId);

          console.log(typeValues);
            console.log(statusValues);

          const success=await addStaffDuty(staffIds,shiftIds,dutyDate2,typeValues,statusValues)
          // console.log(user)
          if(success)
          {
        
            console.log("abc");
            setShowToast(true);
            setMsg("Staff Duty added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }

useEffect(() => {
           const fetchData = async () => {
            const result2 = await getStaffs();
            const result3 = await getShifts();
          };
          fetchData();
          }, []); 
useEffect(() => {
   if (effectRan.current) return;
      const newItems = [];
      console.log("abc");
            const newItems2 = [];
        console.log(allNewStaffValue);
      const newSelections = [...allNewStaffValue];
      const newSelections2 = [...allNewShiftValue];
      const newSelections3 = [...allNewStaffValue2];
      const newSelections4 = [...allNewShiftValue2];
      const newSelections5 = [...selectedStaffValue];
      let newSelections6 = [...selectedShiftValue];
      let dutySelections=[...allTypeValue];
      let statusSelections=[...allStatusValue]

    // 2. Loop and modify the local variable
    staffs.forEach((value, index) => {
      dutySelections[index]={value:'ward-round',isChecked:false}
      statusSelections[index]={value:'assigned',isChecked:false}
      
      newSelections[index] = {value:value._id,label:value.firstName};
      newSelections3[index]=value;
      // newSelections3[index].isChecked=false
      newSelections5[index]=value

      newSelections5[index].isChecked=false
      console.log(newSelections);
      // newSelections2[index] = shifts[index];
      console.log(shifts[index]?._id)
      console.log(shifts[index]?.name)
      if(shifts[index]?._id==undefined)
      {
        newSelections2[index] = {value:null,label:"Select Shift"};
      }
      else
      {
        newSelections2[index] = {value:shifts[index]?._id,label:shifts[index]?.name};
      }
      newSelections4[index]=shifts[index];
      newSelections6[index]=shifts[index]
      console.log(newSelections6[index]);
      // newSelections6[index].isChecked=false
      // if(newSelections6[index]===undefined)
      // {
      //   newSelections6[index]=={};
      // }
      newSelections6[index] = newSelections6[index] || {};
      if(Object.keys(newSelections6[index]).length === 0)
      {
        console.log("inside")
        newSelections6[index]._id=null;
        newSelections6[index].name=""
      }
      newSelections6[index].isChecked=false

});
  console.log(newItems);
      setAllNewStaffValue(newSelections);
      setAllNewShiftValue(newSelections2);
      setAllNewStaffValue2(newSelections3);
      setAllNewShiftValue2(newSelections4);
      setSelectedStaffValue(newSelections5);
      setSelectedShiftValue(newSelections6);
      setAllTypeValue(dutySelections);
      setAllStatusValue(statusSelections);
    effectRan.current = true;

}, [staffs]);
useEffect(() => {
        console.log(selectedStaffValue);


    

}, [selectedStaffValue]);
useEffect(() => {
        console.log(selectedShiftValue);


    

}, [selectedShiftValue]);
useEffect(() => {
        console.log(allNewStaffValue);


    

}, [allNewStaffValue]);
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addStaffDuties}>
    <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="dutyDate" className="form-label">StaffDuty Date</label>
          <input type="date" className="form-control" id="dutyDate" name="dutyDate" value={dutyDate} onChange={handleDutyDateChange}  aria-describedby="emailHelp"/>
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
    {staffs.map((stf, index) => {  
      // if(allNewShiftValue[index]?.value==undefined) 
      //   {
      //     setAllNewShiftValue[index]({label:'Select Staff',value:null});
      //   }  
      return(
      <div className='mx-0' style={{display:'flex'}}>
        
        <div className="mb-3 my-3 me-3" style={{width:'2%'}}>
          <br/>
          <input className='ms-1 mt-3' style={{height:'30%',transform:'scale(1.5)'}} type='checkbox' onChange={(event)=>handleCheckboxChange(index,stf._id,shifts[index]?._id,event)} />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="staff" className="form-label">Staff</label>
            <Select id="staffId" options={options} filterOption={filterOption} value={allNewStaffValue[index]} onChange={(selectedOption) =>handleChange(selectedOption, index)} name="staffId" placeholder="Select Staff" />
            {/* <Select id="staffId" options={options} filterOption={filterOption} value={{'value':stf._id,'label':stf.firstName}} onChange={(selectedOption) =>handleChange(selectedOption, index)} name="staffId" placeholder="Select Staff" /> */}
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="shiftId" className="form-label">Shift</label>
             <Select id="shiftId" options={options2} filterOption={filterOption} value={allNewShiftValue[index]} onChange={(selectedOption) =>handleChange2(selectedOption, index)} name="shiftId" placeholder="Select Shift" />
        </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="bookingType" className="form-label">Enter Duty Type:</label>
            {/* <input type="text" className="form-control" id="bookingType" name="bookingType" onChange={onChange} /> */}
            <select id="mySelect" className="form-control " name="dutyType" onChange={(event)=>onChangeType(index,event)}>
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
            <select id="mySelect" className="form-control " name="status" onChange={(event)=>onChangeStatus(index,event)}>
                <option value="assigned">Assigned</option>
                <option value="in-progress">In-Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled'">Cancelled'</option>
            </select>
      </div>
    </div>)
})}
    
      <button disabled={checkedValue== 0||dutyDate==undefined||dutyDate==""} type="submit" className="btn btn-primary">Add Staff Duty</button>
      </form>
    </div>
  )
}

export default AddStaffDuty
