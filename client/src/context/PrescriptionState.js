import PrescriptionContext from "./prescriptionContext";
import { useState, useEffect  } from "react";

const PrescriptionState=(props)=>{
  const host="http://localhost:5000"
  const prescriptionsInitial=[]

    const [prescriptions,setPrescriptions]=useState(prescriptionsInitial)

    const getPrescriptions=async ()=>{
      const response=await fetch(`${host}/api/prescription/fetchallprescriptions`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setPrescriptions(json)
    }
    const addPrescription=async (consultation,doctor,patient,issuedDate,notes,medicine,dosage,frequency,duration,instructions)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/prescription/addprescription`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({consultation,doctor,patient,issuedDate,notes,medicine,dosage,frequency,duration,instructions})
      });
      const prescription=await response.json();
      const normalizedData = Array.isArray(prescription.data) ? prescription.data : [prescription.data];
      //setBuses(buses.concat(bus.savedBus));
      setPrescriptions(prevPrescriptions => [...prevPrescriptions, normalizedData])
      // return prescription.success;
      return prescription;

    }
    const deletePrescription= async(id)=>{
      const response=await fetch(`${host}/api/prescription/deleteprescription/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newPrescriptions=prescriptions.filter((prescription)=>{return prescription._id!==id})
      setPrescriptions(newPrescriptions)
    }
    const editPrescription=async(id,consultation,doctor,patient,issuedDate,notes,medicine,dosage,frequency,duration,instructions)=>{
      console.log(localStorage.getItem('token'));
      console.log(medicine);
      const response=await fetch(`${host}/api/prescription/updateprescription/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({consultation,doctor,patient,issuedDate,notes,medicine,dosage,frequency,duration,instructions})
      });
      const json=await response.json();
      let newPrescriptions=JSON.parse(JSON.stringify(prescriptions));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newPrescriptions.length; index++) {
        const element = newPrescriptions[index];
        if(element._id===id)
        {
          newPrescriptions[index].consultation=consultation;
          newPrescriptions[index].doctor=doctor;
          newPrescriptions[index].patient=patient;
          newPrescriptions[index].issuedDate=issuedDate;
          newPrescriptions[index].notes=notes;
          newPrescriptions[index].medicines.medicine=medicine;
          newPrescriptions[index].medicines.dosage=dosage;
          newPrescriptions[index].medicines.frequency=frequency;
          newPrescriptions[index].medicines.duration=duration;
          newPrescriptions[index].medicines.instructions=instructions;
          break;
        }
      }

      let a=0
      setPrescriptions(newPrescriptions);
      return json;
    }
    
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <PrescriptionContext.Provider value={{prescriptions,addPrescription,deletePrescription,editPrescription,getPrescriptions}}>
            {props.children}
        </PrescriptionContext.Provider>
    )
}
export default PrescriptionState;