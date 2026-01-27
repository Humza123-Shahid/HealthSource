import BedContext from "./bedContext";
import { useState, useEffect  } from "react";

const BedState=(props)=>{
  const host="http://localhost:5000"
  const bedsInitial=[]

    const [beds,setBeds]=useState(bedsInitial)

    const getBeds=async ()=>{
      const response=await fetch(`${host}/api/bed/fetchallbeds`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setBeds(json)
    }
    const addBed=async (room,bedNumber,status)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/bed/addbed`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({room,bedNumber,status})
      });
      const beds=await response.json();
      const normalizedData = Array.isArray(beds.savedBed ) ? beds.savedBed : [beds.savedBed];
      //setBuses(buses.concat(bus.savedBus));
      setBeds(prevBeds => [...prevBeds, normalizedData])
      return beds.success;
    } 
    const deleteBed= async(id)=>{
      const response=await fetch(`${host}/api/bed/deletebed/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newBeds=beds.filter((bed)=>{return bed._id!==id})
      setBeds(newBeds)
    }
    const editBed=async(id,room,bedNumber,status)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/bed/updatebed/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({room,bedNumber,status})
      });
      const json=await response.json();
      let newBeds=JSON.parse(JSON.stringify(beds));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newBeds.length; index++) {
        const element = newBeds[index];
        if(element._id===id)
        {
          newBeds[index].room=room;
          newBeds[index].bedNumber=bedNumber;
          newBeds[index].status=status;
          break;
        }
      }

      let a=0
      setBeds(newBeds);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <BedContext.Provider value={{beds,addBed,deleteBed,editBed,getBeds}}>
            {props.children}
        </BedContext.Provider>
    )
}
export default BedState;