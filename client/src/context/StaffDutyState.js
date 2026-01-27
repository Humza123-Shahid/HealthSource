import StaffDutyContext from "./staffdutyContext";
import { useState, useEffect  } from "react";

const StaffDutyState=(props)=>{
  const host="http://localhost:5000"
  const staffdutiesInitial=[]

    const [staffduties,setStaffDuties]=useState(staffdutiesInitial)

    const getStaffDuties=async ()=>{
      const response=await fetch(`${host}/api/staffduty/fetchallstaffduties`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setStaffDuties(json)
    }
    const addStaffDuty=async (staff,shift,dutyDate,duty_type,status)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      console.log(duty_type,status);
      const response=await fetch(`${host}/api/staffduty/addstaffduty`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({staff,shift,dutyDate,duty_type,status})
      });
      const staffduty=await response.json();
      // const normalizedData = Array.isArray(staffduty.data) ? staffduty.data : [staffduty.data];
      // //setBuses(buses.concat(bus.savedBus));
      // setStaffDuties(prevStaffDuties => [...prevStaffDuties, normalizedData])
      // return staffduty.success;
      return staffduty.success;

    }
    const deleteStaffDuty= async(id)=>{
      const response=await fetch(`${host}/api/staffduty/deletestaffduty/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newStaffDuties=staffduties.filter((staffduty)=>{return staffduty._id!==id})
      setStaffDuties(newStaffDuties)
    }
    const editStaffDuty=async(id,staff,shift,dutyDate,duty_type,status)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/staffduty/updatestaffduty/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({staff,shift,dutyDate,duty_type,status})
      });
      const json=await response.json();
      let newStaffDuties=JSON.parse(JSON.stringify(staffduties));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newStaffDuties.length; index++) {
        const element = newStaffDuties[index];
        if(element._id===id)
        {
          newStaffDuties[index].staff=staff;
          newStaffDuties[index].shift=shift;
          newStaffDuties[index].dutyDate=dutyDate;
          newStaffDuties[index].duty_type=duty_type;
          newStaffDuties[index].status=status;
          break;
        }
      }

      let a=0
      setStaffDuties(newStaffDuties);
      return json;
    }
    
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <StaffDutyContext.Provider value={{staffduties,addStaffDuty,deleteStaffDuty,editStaffDuty,getStaffDuties}}>
            {props.children}
        </StaffDutyContext.Provider>
    )
}
export default StaffDutyState;