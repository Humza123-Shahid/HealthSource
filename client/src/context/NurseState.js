import NurseContext from "./nurseContext";
import { useState, useEffect  } from "react";

const NurseState=(props)=>{
  const host="http://localhost:5000"
  const nursesInitial=[]

    const [nurses,setNurses]=useState(nursesInitial)

    const getNurses=async ()=>{
      const response=await fetch(`${host}/api/nurse/fetchallnurses`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setNurses(json)
    }
    const addNurse=async (staff,qualification,licenseNumber,assignedWard)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/nurse/addnurse`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({staff,qualification,licenseNumber,assignedWard})
      });
      const nurses=await response.json();
      const normalizedData = Array.isArray(nurses.savedNurse ) ? nurses.savedNurse : [nurses.savedNurse];
      //setBuses(buses.concat(bus.savedBus));
      setNurses(prevNurses => [...prevNurses, normalizedData])
      return nurses.success;
    } 
    const deleteNurse= async(id)=>{
      const response=await fetch(`${host}/api/nurse/deletenurse/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newNurses=nurses.filter((nurse)=>{return nurse._id!==id})
      setNurses(newNurses)
    }
    const editNurse=async(id,staff,qualification,licenseNumber,assignedWard)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/nurse/updatenurse/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({staff,qualification,licenseNumber,assignedWard})
      });
      const json=await response.json();
      let newNurses=JSON.parse(JSON.stringify(nurses));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newNurses.length; index++) {
        const element = newNurses[index];
        if(element._id===id)
        {
          newNurses[index].staff=staff;
          newNurses[index].qualification=qualification;
          newNurses[index].licenseNumber=licenseNumber;
          newNurses[index].assignedWard=assignedWard;
          break;
        }
      }

      let a=0
      setNurses(newNurses);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <NurseContext.Provider value={{nurses,addNurse,deleteNurse,editNurse,getNurses}}>
            {props.children}
        </NurseContext.Provider>
    )
}
export default NurseState;