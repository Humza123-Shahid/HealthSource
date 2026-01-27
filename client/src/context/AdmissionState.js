import AdmissionContext from "./admissionContext";
import { useState, useEffect  } from "react";

const AdmissionState=(props)=>{
  const host="http://localhost:5000"
  const admissionsInitial=[]

    const [admissions,setAdmissions]=useState(admissionsInitial)

    const getAdmissions=async ()=>{
      const response=await fetch(`${host}/api/admission/fetchalladmissions`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setAdmissions(json)
    }
    const addAdmission=async (patient,admittingDoctor,ward,room,bed,admissionDate,dischargeDate,reason,conditionOnAdmission,status)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/admission/addadmission`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({patient,admittingDoctor,ward,room,bed,admissionDate,dischargeDate,reason,conditionOnAdmission,status})
      });
      const admission=await response.json();
      const normalizedData = Array.isArray(admission.data) ? admission.data : [admission.data];
      //setBuses(buses.concat(bus.savedBus));
      setAdmissions(prevAdmissions => [...prevAdmissions, normalizedData])
      // return admission.success;
      return admission;

    }
    const deleteAdmission= async(id)=>{
      const response=await fetch(`${host}/api/admission/deleteadmission/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newAdmissions=admissions.filter((admission)=>{return admission._id!==id})
      setAdmissions(newAdmissions)
    }
    const editAdmission=async(id,patient,admittingDoctor,ward,room,bed,admissionDate,dischargeDate,reason,conditionOnAdmission,status)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/admission/updateadmission/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({patient,admittingDoctor,ward,room,bed,admissionDate,dischargeDate,reason,conditionOnAdmission,status})
      });
      const json=await response.json();
      let newAdmissions=JSON.parse(JSON.stringify(admissions));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newAdmissions.length; index++) {
        const element = newAdmissions[index];
        if(element._id===id)
        {
          newAdmissions[index].patient=patient;
          newAdmissions[index].admittingDoctor=admittingDoctor;
          newAdmissions[index].ward=ward;
          newAdmissions[index].room=room;
          newAdmissions[index].bed=bed;
          newAdmissions[index].admissionDate=admissionDate;
          newAdmissions[index].dischargeDate=dischargeDate;
          newAdmissions[index].reason=reason;
          newAdmissions[index].conditionOnAdmission=conditionOnAdmission;
          newAdmissions[index].status=status;
         
          break;
        }
      }

      let a=0
      setAdmissions(newAdmissions);
      return json;
    }
    
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <AdmissionContext.Provider value={{admissions,addAdmission,deleteAdmission,editAdmission,getAdmissions}}>
            {props.children}
        </AdmissionContext.Provider>
    )
}
export default AdmissionState;