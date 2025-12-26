import SurgeryTeamContext from "./surgeryteamContext";
import { useState, useEffect  } from "react";

const SurgeryTeamState=(props)=>{
  const host="http://localhost:5000"
  const surgeryteamsInitial=[]

    const [surgeryteams,setSurgeryTeams]=useState(surgeryteamsInitial)

    const getSurgeryTeams=async ()=>{
      const response=await fetch(`${host}/api/surgeryteam/fetchallsurgeryteams`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
            }
      })
      const json=await response.json();
      console.log(json);
      setSurgeryTeams(json)
      return json;
    }
    const addSurgeryTeam=async (surgery,staff,role)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/surgeryteam/addsurgeryteam`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({surgery,staff,role})
      });
      const surgeryteam=await response.json();
      const normalizedData = Array.isArray(surgeryteam.data) ? surgeryteam.data : [surgeryteam.data];
      //setBuses(surgeryteams.concat(bus.savedBus));
      console.log(surgeryteam)
      setSurgeryTeams(prevSurgeryTeams => [...prevSurgeryTeams, normalizedData])
      return surgeryteam.success;
    }
    const deleteSurgeryTeam= async(id)=>{
      const response=await fetch(`${host}/api/surgeryteam/deletesurgeryteam/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newSurgeryTeams=surgeryteams.filter((surgeryteam)=>{return surgeryteam._id!==id})
      setSurgeryTeams(newSurgeryTeams)
    }
    const editSurgeryTeam=async(id,surgery,staff,role)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/surgeryteam/updatesurgeryteam/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({surgery,staff,role})
      });
      const json=await response.json();
      let newSurgeryTeams=JSON.parse(JSON.stringify(surgeryteams));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newSurgeryTeams.length; index++) {
        const element = newSurgeryTeams[index];
        if(element._id===id)
        {
          newSurgeryTeams[index].surgery=surgery;
          newSurgeryTeams[index].staff=staff;
          newSurgeryTeams[index].role=role;
          break;
        }
      }

      let a=0
      setSurgeryTeams(newSurgeryTeams);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <SurgeryTeamContext.Provider value={{surgeryteams,addSurgeryTeam,deleteSurgeryTeam,editSurgeryTeam,getSurgeryTeams}}>
            {props.children}
        </SurgeryTeamContext.Provider>
    )
}
export default SurgeryTeamState;