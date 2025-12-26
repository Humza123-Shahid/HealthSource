import LabTestContext from "./labtestContext";
import { useState, useEffect  } from "react";

const LabTestState=(props)=>{
  const host="http://localhost:5000"
  const labtestsInitial=[]

    const [labtests,setLabTests]=useState(labtestsInitial)

    const getLabTests=async ()=>{
      const response=await fetch(`${host}/api/labtest/fetchalllabtests`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setLabTests(json)
    }
    const addLabTest=async (name,category,normalRange,price,code)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/labtest/addlabtest`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({name,category,normalRange,price,code})
      });
      const labtests=await response.json();
      const normalizedData = Array.isArray(labtests.data ) ? labtests.data : [labtests.data];
      //setBuses(buses.concat(bus.savedBus));
      setLabTests(prevLabTests => [...prevLabTests, normalizedData])
      return labtests.success;
    } 
    const deleteLabTest= async(id)=>{
      const response=await fetch(`${host}/api/labtest/deletelabtest/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newLabTests=labtests.filter((labtest)=>{return labtest._id!==id})
      setLabTests(newLabTests)
    }
    const editLabTest=async(id,name,category,normalRange,price,code)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/labtest/updatelabtest/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({name,category,normalRange,price,code})
      });
      const json=await response.json();
      let newLabTests=JSON.parse(JSON.stringify(labtests));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newLabTests.length; index++) {
        const element = newLabTests[index];
        if(element._id===id)
        {
          newLabTests[index].name=name;
          newLabTests[index].category=category;
          newLabTests[index].normalRange=normalRange;
          newLabTests[index].price=price;
          newLabTests[index].code=code;
          break;
        }
      }

      let a=0
      setLabTests(newLabTests);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <LabTestContext.Provider value={{labtests,addLabTest,deleteLabTest,editLabTest,getLabTests}}>
            {props.children}
        </LabTestContext.Provider>
    )
}
export default LabTestState;