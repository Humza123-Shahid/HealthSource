import SurgeryContext from "./surgeryContext";
import { useState, useEffect  } from "react";

const SurgeryState=(props)=>{
  const host="http://localhost:5000"
  const surgeriesInitial=[]

    const [surgeries,setSurgeries]=useState(surgeriesInitial)

    const getSurgeries=async ()=>{
      const response=await fetch(`${host}/api/surgery/fetchallsurgeries`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
            }
      })
      const json=await response.json();
      console.log(json);
      setSurgeries(json)
      return json;
    }
    const addSurgery=async (patient,primarySurgeon,type,scheduledDate,startTime,endTime,operationTheatre,notes)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/surgery/addsurgery`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({patient,primarySurgeon,type,scheduledDate,startTime,endTime,operationTheatre,notes})
      });
      const surgery=await response.json();
      const normalizedData = Array.isArray(surgery.data) ? surgery.data : [surgery.data];
      //setBuses(surgerys.concat(bus.savedBus));
      console.log(surgery)
      setSurgeries(prevSurgeries => [...prevSurgeries, normalizedData])
      return surgery.success;
    }
    const deleteSurgery= async(id)=>{
      const response=await fetch(`${host}/api/surgery/deletesurgery/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newSurgeries=surgeries.filter((surgery)=>{return surgery._id!==id})
      setSurgeries(newSurgeries)
    }
    const editSurgery=async(id,patient,primarySurgeon,type,scheduledDate,startTime,endTime,operationTheatre,notes)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/surgery/updatesurgery/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({patient,primarySurgeon,type,scheduledDate,startTime,endTime,operationTheatre,notes})
      });
      const json=await response.json();
      let newSurgeries=JSON.parse(JSON.stringify(surgeries));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newSurgeries.length; index++) {
        const element = newSurgeries[index];
        if(element._id===id)
        {
          newSurgeries[index].patient=patient;
          newSurgeries[index].primarySurgeon=primarySurgeon;
          newSurgeries[index].type=type;
          newSurgeries[index].scheduledDate=scheduledDate;
          newSurgeries[index].startTime=startTime;
          newSurgeries[index].endTime=endTime;
          newSurgeries[index].operationTheatre=operationTheatre;
          newSurgeries[index].notes=notes;
          break;
        }
      }

      let a=0
      setSurgeries(newSurgeries);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <SurgeryContext.Provider value={{surgeries,addSurgery,deleteSurgery,editSurgery,getSurgeries}}>
            {props.children}
        </SurgeryContext.Provider>
    )
}
export default SurgeryState;