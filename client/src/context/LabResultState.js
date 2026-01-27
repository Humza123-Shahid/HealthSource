import LabResultContext from "./labresultContext";
import { useState, useEffect  } from "react";

const LabResultState=(props)=>{
  const host="http://localhost:5000"
  const labresultsInitial=[]

    const [labresults,setLabResults]=useState(labresultsInitial)

    const getLabResults=async ()=>{
      const response=await fetch(`${host}/api/labresult/fetchalllabresults`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setLabResults(json)
    }
    const addLabResult=async (labRequest,test,resultValue,units,remarks,file,resultDate)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const formData = new FormData();
      formData.append("labRequest", labRequest);
      formData.append("test", test);
      formData.append("resultValue", resultValue);
      formData.append("units", units);
      formData.append("remarks", remarks);
      formData.append("file", file);
      formData.append("resultDate", resultDate);
      const response=await fetch(`${host}/api/labresult/addlabresult`,{
        method:'POST',
        headers:{
            'auth-token':localStorage.getItem('token')
        },
        body:formData
      });
      const labresult=await response.json();
      const normalizedData = Array.isArray(labresult.data) ? labresult.data : [labresult.data];
      //setBuses(buses.concat(bus.savedBus));
      setLabResults(prevLabResults => [...prevLabResults, normalizedData])
      // return labresult.success;
      return labresult;

    }
    const deleteLabResult= async(id)=>{
      const response=await fetch(`${host}/api/labresult/deletelabresult/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newLabResults=labresults.filter((labresult)=>{return labresult._id!==id})
      setLabResults(newLabResults)
    }
    const editLabResult=async(id,labRequest,test,resultValue,units,remarks,file,resultDate)=>{
      const formData = new FormData();
      formData.append("labRequest", labRequest);
      formData.append("test", test);
      formData.append("resultValue", resultValue);
      formData.append("units", units);
      formData.append("remarks", remarks);
      if (file) {
        formData.append('file', file);
      }
      formData.append("resultDate", resultDate);
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/labresult/updatelabresult/${id}`,{
        method:'PUT',
        headers:{
            'auth-token':localStorage.getItem('token')
          },
        body:formData
      });
      const json=await response.json();
      let newLabResults=JSON.parse(JSON.stringify(labresults));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newLabResults.length; index++) {
        const element = newLabResults[index];
        if(element._id===id)
        {
          newLabResults[index].labRequest=labRequest;
          newLabResults[index].test=test;
          newLabResults[index].resultValue=resultValue;
          newLabResults[index].units=units;
          newLabResults[index].remarks=remarks;
          newLabResults[index].file=file;
          newLabResults[index].resultDate=resultDate;
          break;
        }
      }

      let a=0
      setLabResults(newLabResults);
      return json;
    }
    
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <LabResultContext.Provider value={{labresults,addLabResult,deleteLabResult,editLabResult,getLabResults}}>
            {props.children}
        </LabResultContext.Provider>
    )
}
export default LabResultState;