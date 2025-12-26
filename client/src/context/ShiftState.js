import ShiftContext from "./shiftContext";
import { useState, useEffect  } from "react";

const ShiftState=(props)=>{
  const host="http://localhost:5000"
  const shiftsInitial=[]

    const [shifts,setShifts]=useState(shiftsInitial)

    const getShifts=async ()=>{
      const response=await fetch(`${host}/api/shift/fetchallshifts`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
            }
      })
      const json=await response.json();
      console.log(json);
      setShifts(json)
    }
    const addShift=async (name,startTime,endTime,breakMinutes)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/shift/addshift`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({name,startTime,endTime,breakMinutes})
      });
      const shift=await response.json();
      const normalizedData = Array.isArray(shift.savedShift) ? shift.savedShift : [shift.savedShift];
      //setBuses(buses.concat(bus.savedBus));
      setShifts(prevShifts => [...prevShifts, normalizedData])
      return shift.success;
    }
    const editShift=async(id,name,startTime,endTime,breakMinutes)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/shift/updateshift/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({name,startTime,endTime,breakMinutes})
      });
      const json=await response.json();
      let newShifts=JSON.parse(JSON.stringify(shifts));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newShifts.length; index++) {
        const element = newShifts[index];
        if(element._id===id)
        {
          newShifts[index].name=name;
          newShifts[index].startTime=startTime;
          newShifts[index].endTime=endTime;
          newShifts[index].breakMinutes=breakMinutes;
          break;
        }
      }

      let a=0
      setShifts(newShifts);
      return json;
    }
  const deleteShift= async(id)=>{
      const response=await fetch(`${host}/api/shift/deleteshift/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newShifts=shifts.filter((shift)=>{return shift._id!==id})
      setShifts(newShifts)
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <ShiftContext.Provider value={{shifts,getShifts,addShift,editShift,deleteShift}}>
            {props.children}
        </ShiftContext.Provider>
    )
}
export default ShiftState;