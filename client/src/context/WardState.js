import WardContext from "./wardContext";
import { useState, useEffect  } from "react";

const WardState=(props)=>{
  const host="http://localhost:5000"
  const wardsInitial=[]

    const [wards,setWards]=useState(wardsInitial)

    const getWards=async ()=>{
      const response=await fetch(`${host}/api/ward/fetchallwards`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
            }
      })
      const json=await response.json();
      console.log(json);
      setWards(json)
    }
    const addWard=async (name,type,totalRooms)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/ward/addward`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

        },
        body:JSON.stringify({name,type,totalRooms})
      });
      const ward=await response.json();
      const normalizedData = Array.isArray(ward.savedWard) ? ward.savedWard : [ward.savedWard];
      
      setWards(prevWards => [...prevWards, normalizedData])
      return ward.success;
    }
    const deleteWard= async(id)=>{
      const response=await fetch(`${host}/api/ward/deleteward/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newWards=wards.filter((ward)=>{return ward._id!==id})
      setWards(newWards)
    }
    const editWard=async(id,name,type,totalRooms)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/ward/updateward/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({name,type,totalRooms})
      });
      const json=response.json();
      let newWards=JSON.parse(JSON.stringify(wards));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newWards.length; index++) {
        const element = newWards[index];
        if(element._id===id)
        {
          newWards[index].name=name;
          newWards[index].type=type;
          newWards[index].totalRooms=totalRooms;
          break;
        }
      }

      let a=0
      setWards(newWards);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <WardContext.Provider value={{wards,addWard,deleteWard,editWard,getWards}}>
            {props.children}
        </WardContext.Provider>
    )
}
export default WardState;