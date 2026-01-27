import StaffAttendanceContext from "./staffattendanceContext";
import { useState, useEffect  } from "react";

const StaffAttendanceState=(props)=>{
  const host="http://localhost:5000"
  const staffattendancesInitial=[]

    const [staffattendances,setStaffAttendances]=useState(staffattendancesInitial)

    const getStaffAttendances=async ()=>{
      const response=await fetch(`${host}/api/staffattendance/fetchallstaffattendances`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
            }
      })
      const json=await response.json();
      console.log(json);
      setStaffAttendances(json)
      return json;
    }
    // const addStaffAttendance=async (dutyIds,staffIds,typeValues,statusValues,date,checkIn,checkOut,status)=>{
    const addStaffAttendance=async (dutyIds,attendanceStatusValues)=>{

      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/staffattendance/addstaffattendance`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({dutyIds,attendanceStatusValues})
      });
      const staffattendance=await response.json();
      const normalizedData = Array.isArray(staffattendance.savedStaffAttendance) ? staffattendance.savedStaffAttendance : [staffattendance.savedStaffAttendance];
      //setBuses(staffattendances.concat(bus.savedBus));
      console.log(staffattendance)
      setStaffAttendances(prevStaffAttendances => [...prevStaffAttendances, normalizedData])
      return staffattendance.success;
    }
    const deleteStaffAttendance= async(id)=>{
      const response=await fetch(`${host}/api/staffattendance/deletestaffattendance/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newStaffAttendances=staffattendances.filter((staffattendance)=>{return staffattendance._id!==id})
      setStaffAttendances(newStaffAttendances)
    }
    // const editStaffAttendance=async(id,duty,date,checkIn,checkOut,status)=>{
    const editStaffAttendance=async(id,duty,status)=>{      
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/staffattendance/updatestaffattendance/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({duty,status})
      });
      const json=await response.json();
      let newStaffAttendances=JSON.parse(JSON.stringify(staffattendances));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newStaffAttendances.length; index++) {
        const element = newStaffAttendances[index];
        if(element._id===id)
        {
          // newStaffAttendances[index].staff=staff;
          newStaffAttendances[index].duty=duty;
          // newStaffAttendances[index].date=date;
          // newStaffAttendances[index].checkIn=checkIn;
          // newStaffAttendances[index].checkOut=checkOut;
          // newStaffAttendances[index].shift=shift;
          newStaffAttendances[index].status=status;
          break;
        }
      }

      let a=0
      setStaffAttendances(newStaffAttendances);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <StaffAttendanceContext.Provider value={{staffattendances,addStaffAttendance,deleteStaffAttendance,editStaffAttendance,getStaffAttendances}}>
            {props.children}
        </StaffAttendanceContext.Provider>
    )
}
export default StaffAttendanceState;