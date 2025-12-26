import ConsultationContext from "./consultationContext";
import { useState, useEffect  } from "react";

const ConsultationState=(props)=>{
  const host="http://localhost:5000"
  const consultationsInitial=[]

    const [consultations,setConsultations]=useState(consultationsInitial)

    const getConsultations=async ()=>{
      const response=await fetch(`${host}/api/consultation/fetchallconsultations`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setConsultations(json)
    }
    const addConsultation=async (patient,doctor,appointment,symptoms,diagnosis,notes,followUpDate,temperature,bloodPressure,pulse,oxygenLevel)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/consultation/addconsultation`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({patient,doctor,appointment,symptoms,diagnosis,notes,followUpDate,temperature,bloodPressure,pulse,oxygenLevel})
      });
      const consultation=await response.json();
      const normalizedData = Array.isArray(consultation.data) ? consultation.data : [consultation.data];
      //setBuses(buses.concat(bus.savedBus));
      setConsultations(prevConsultations => [...prevConsultations, normalizedData])
      // return consultation.success;
      return consultation;

    }
    const deleteConsultation= async(id)=>{
      const response=await fetch(`${host}/api/consultation/deleteconsultation/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newConsultations=consultations.filter((consultation)=>{return consultation._id!==id})
      setConsultations(newConsultations)
    }
    const editConsultation=async(id,patient,doctor,appointment,symptoms,diagnosis,notes,followUpDate,temperature,bloodPressure,pulse,oxygenLevel)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/consultation/updateconsultation/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({patient,doctor,appointment,symptoms,diagnosis,notes,followUpDate,temperature,bloodPressure,pulse,oxygenLevel})
      });
      const json=await response.json();
      let newConsultations=JSON.parse(JSON.stringify(consultations));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newConsultations.length; index++) {
        const element = newConsultations[index];
        if(element._id===id)
        {
          newConsultations[index].patient=patient;
          newConsultations[index].doctor=doctor;
          newConsultations[index].appointment=appointment;
          newConsultations[index].symptoms=symptoms;
          newConsultations[index].diagnosis=diagnosis;
          newConsultations[index].notes=notes;
          newConsultations[index].followUpDate=followUpDate;
          newConsultations[index].vitals.temperature=temperature;
          newConsultations[index].vitals.bloodPressure=bloodPressure;
          newConsultations[index].vitals.pulse=pulse;
          newConsultations[index].vitals.oxygenLevel=oxygenLevel;
          break;
        }
      }

      let a=0
      setConsultations(newConsultations);
      return json;
    }
    
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <ConsultationContext.Provider value={{consultations,addConsultation,deleteConsultation,editConsultation,getConsultations}}>
            {props.children}
        </ConsultationContext.Provider>
    )
}
export default ConsultationState;