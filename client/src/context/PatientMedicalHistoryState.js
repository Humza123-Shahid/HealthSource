import PatientMedicalHistoryContext from "./patientmedicalhistoryContext";
import { useState, useEffect  } from "react";

const PatientMedicalHistoryState=(props)=>{
  const host="http://localhost:5000"
  const patientmedicalhistoriesInitial=[]

    const [patientmedicalhistories,setPatientMedicalHistories]=useState(patientmedicalhistoriesInitial)

    const getPatientMedicalHistories=async ()=>{
      const response=await fetch(`${host}/api/patientmedicalhistory/fetchallpatientmedicalhistories`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setPatientMedicalHistories(json)
    }
    const addPatientMedicalHistory=async (patient,doctor,condition,treatment,status,notes)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/patientmedicalhistory/addpatientmedicalhistory`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({patient,doctor,condition,treatment,status,notes})
      });
      const patientmedicalhistory=await response.json();
      const normalizedData = Array.isArray(patientmedicalhistory.data) ? patientmedicalhistory.data : [patientmedicalhistory.data];
      //setBuses(buses.concat(bus.savedBus));
      setPatientMedicalHistories(prevPatientMedicalHistories => [...prevPatientMedicalHistories, normalizedData])
      // return patientmedicalhistory.success;
      return patientmedicalhistory;

    }
    const deletePatientMedicalHistory= async(id)=>{
      const response=await fetch(`${host}/api/patientmedicalhistory/deletepatientmedicalhistory/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newPatientMedicalHistories=patientmedicalhistories.filter((patientmedicalhistory)=>{return patientmedicalhistory._id!==id})
      setPatientMedicalHistories(newPatientMedicalHistories)
    }
    const editPatientMedicalHistory=async(id,patient,doctor,condition,treatment,status,notes)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/patientmedicalhistory/updatepatientmedicalhistory/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({patient,doctor,condition,treatment,status,notes})
      });
      const json=await response.json();
      let newPatientMedicalHistories=JSON.parse(JSON.stringify(patientmedicalhistories));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newPatientMedicalHistories.length; index++) {
        const element = newPatientMedicalHistories[index];
        if(element._id===id)
        {
          newPatientMedicalHistories[index].patient=patient;
          newPatientMedicalHistories[index].doctor=doctor;
          newPatientMedicalHistories[index].condition=condition;
          newPatientMedicalHistories[index].treatment=treatment;
          newPatientMedicalHistories[index].status=status;
          newPatientMedicalHistories[index].notes=notes;
          break;
        }
      }

      let a=0
      setPatientMedicalHistories(newPatientMedicalHistories);
      return json;
    }
    
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <PatientMedicalHistoryContext.Provider value={{patientmedicalhistories,addPatientMedicalHistory,deletePatientMedicalHistory,editPatientMedicalHistory,getPatientMedicalHistories}}>
            {props.children}
        </PatientMedicalHistoryContext.Provider>
    )
}
export default PatientMedicalHistoryState;