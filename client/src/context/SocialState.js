import SocialContext from "./socialContext";
import { useState, useEffect  } from "react";

const SocialState=(props)=>{
  const host="http://localhost:5000"
  const socialsInitial=[]

    const [socials,setSocials]=useState(socialsInitial)

    const getSocials=async ()=>{
      const response=await fetch(`${host}/api/social/fetchallsocials`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
            }
      })
      const json=await response.json();
      console.log(json);
      setSocials(json)
    }
    const addSocial=async (platformName,url)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/social/addsocial`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({platformName,url})
      });
      const social=await response.json();
      const normalizedData = Array.isArray(social.savedSocial) ? social.savedSocial : [social.savedSocial];
      //setBuses(buses.concat(bus.savedBus));
      setSocials(prevSocials => [...prevSocials, normalizedData])
      return social.success;
    }
    const editSocial=async(id,platformName,url)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/social/updatesocial/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({platformName,url})
      });
      const json=await response.json();
      let newSocials=JSON.parse(JSON.stringify(socials));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newSocials.length; index++) {
        const element = newSocials[index];
        if(element._id===id)
        {
          newSocials[index].platformName=platformName;
          newSocials[index].url=url;
          break;
        }
      }

      let a=0
      setSocials(newSocials);
      return json;
    }
  const deleteSocial= async(id)=>{
      const response=await fetch(`${host}/api/social/deletesocial/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newSocials=socials.filter((social)=>{return social._id!==id})
      setSocials(newSocials)
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <SocialContext.Provider value={{socials,addSocial,getSocials,editSocial,deleteSocial}}>
            {props.children}
        </SocialContext.Provider>
    )
}
export default SocialState;