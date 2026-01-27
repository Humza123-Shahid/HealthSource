import LabRequestContext from "./labrequestContext";
import { useState, useEffect  } from "react";

const LabRequestState=(props)=>{
  const host="http://localhost:5000"
  const labrequestsInitial=[]

    const [labrequests,setLabRequests]=useState(labrequestsInitial)

    const getLabRequests=async ()=>{
      const response=await fetch(`${host}/api/labrequest/fetchalllabrequests`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setLabRequests(json)
    }
    const addLabRequest=async (patient,doctor,test,requestDate,priority,status,notes)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/labrequest/addlabrequest`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({patient,doctor,test,requestDate,priority,status,notes})
      });
      const labrequest=await response.json();
      const normalizedData = Array.isArray(labrequest.data) ? labrequest.data : [labrequest.data];
      //setBuses(buses.concat(bus.savedBus));
      setLabRequests(prevLabRequests => [...prevLabRequests, normalizedData])
      // return labrequest.success;
      return labrequest;

    }
    const deleteLabRequest= async(id)=>{
      const response=await fetch(`${host}/api/labrequest/deletelabrequest/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newLabRequests=labrequests.filter((labrequest)=>{return labrequest._id!==id})
      setLabRequests(newLabRequests)
    }
    const editLabRequest=async(id,patient,doctor,test,requestDate,priority,status,notes)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/labrequest/updatelabrequest/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({patient,doctor,test,requestDate,priority,status,notes})
      });
      const json=await response.json();
      let newLabRequests=JSON.parse(JSON.stringify(labrequests));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newLabRequests.length; index++) {
        const element = newLabRequests[index];
        if(element._id===id)
        {
          newLabRequests[index].patient=patient;
          newLabRequests[index].doctor=doctor;
          newLabRequests[index].test=test;
          newLabRequests[index].requestDate=requestDate;
          newLabRequests[index].priority=priority;
          newLabRequests[index].status=status;
          newLabRequests[index].notes=notes;
          break;
        }
      }

      let a=0
      setLabRequests(newLabRequests);
      return json;
    }
    
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <LabRequestContext.Provider value={{labrequests,addLabRequest,deleteLabRequest,editLabRequest,getLabRequests}}>
            {props.children}
        </LabRequestContext.Provider>
    )
}
export default LabRequestState;