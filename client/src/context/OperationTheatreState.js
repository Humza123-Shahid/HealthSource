import OperationTheatreContext from "./operationtheatreContext";
import { useState, useEffect  } from "react";

const OperationTheatreState=(props)=>{
  const host="http://localhost:5000"
  const operationtheatresInitial=[]

    const [operationtheatres,setOperationTheatres]=useState(operationtheatresInitial)

    const getOperationTheatres=async ()=>{
      const response=await fetch(`${host}/api/operationtheatre/fetchalloperationtheatres`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      setOperationTheatres(json)
    }
    const addOperationTheatre=async (name,equipment,status)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/operationtheatre/addoperationtheatre`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({name,equipment,status})
      });
      const operationtheatre=await response.json();
      const normalizedData = Array.isArray(operationtheatre.data) ? operationtheatre.data : [operationtheatre.data];
      //setBuses(operationtheatre.concat(bus.savedBus));
      setOperationTheatres(prevOperationTheatres => [...prevOperationTheatres, normalizedData])
      console.log(operationtheatre)
      return operationtheatre.success;
    }
    const deleteOperationTheatre= async(id)=>{
      const response=await fetch(`${host}/api/operationtheatre/deleteoperationtheatre/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newOperationTheatres=operationtheatres.filter((operationtheatre)=>{return operationtheatre._id!==id})
      setOperationTheatres(newOperationTheatres)
    }
    const editOperationTheatre=async(id,name,equipment,status)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/operationtheatre/updateoperationtheatre/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({name,equipment,status})
      });
      const json=await response.json();
      let newOperationTheatres=JSON.parse(JSON.stringify(operationtheatres));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newOperationTheatres.length; index++) {
        const element = newOperationTheatres[index];
        if(element._id===id)
        {
          newOperationTheatres[index].name=name;
          newOperationTheatres[index].equipment=equipment;
          newOperationTheatres[index].status=status;
          break;
        }
      }

      let a=0
      setOperationTheatres(newOperationTheatres);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <OperationTheatreContext.Provider value={{operationtheatres,addOperationTheatre,deleteOperationTheatre,editOperationTheatre,getOperationTheatres}}>
            {props.children}
        </OperationTheatreContext.Provider>
    )
}
export default OperationTheatreState;