import PatientContext from "./patientContext";
import { useState, useEffect  } from "react";

const PatientState=(props)=>{
  const host="http://localhost:5000"
  const patientsInitial=[]

    const [patients,setPatients]=useState(patientsInitial)

    const getPatients=async ()=>{
      const response=await fetch(`${host}/api/patient/fetchallpatients`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setPatients(json)
    }
    const addPatient=async (firstName,lastName,fatherName,gender,dateOfBirth,age,nationalId,contact,address,maritalStatus,bloodGroup,disabilities,chronicConditions,registrationDate,photoUrl,status)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/patient/addpatient`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({firstName,lastName,fatherName,gender,dateOfBirth,age,nationalId,contact,address,maritalStatus,bloodGroup,disabilities,chronicConditions,registrationDate,photoUrl,status})
      });
      const patient=await response.json();
      const normalizedData = Array.isArray(patient.data) ? patient.data : [patient.data];
      //setBuses(buses.concat(bus.savedBus));
      setPatients(prevPatients => [...prevPatients, normalizedData])
      // return patient.success;
      return patient;

    }
    const deletePatient= async(id)=>{
      const response=await fetch(`${host}/api/patient/deletepatient/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newPatients=patients.filter((patient)=>{return patient._id!==id})
      setPatients(newPatients)
    }
    const editPatient=async(id,firstName,lastName,fatherName,gender,dateOfBirth,age,nationalId,contact,address,maritalStatus,bloodGroup,disabilities,chronicConditions,registrationDate,photoUrl,status)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/patient/updatepatient/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({firstName,lastName,fatherName,gender,dateOfBirth,age,nationalId,contact,address,maritalStatus,bloodGroup,disabilities,chronicConditions,registrationDate,photoUrl,status})
      });
      const json=await response.json();
      let newPatients=JSON.parse(JSON.stringify(patients));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newPatients.length; index++) {
        const element = newPatients[index];
        if(element._id===id)
        {
          newPatients[index].firstName=firstName;
          newPatients[index].lastName=lastName;
          newPatients[index].fatherName=fatherName;
          newPatients[index].gender=gender;
          newPatients[index].dateOfBirth=dateOfBirth;
          newPatients[index].age=age;
          newPatients[index].nationalId=nationalId;
          newPatients[index].contact=contact;
          newPatients[index].address=address;
          newPatients[index].maritalStatus=maritalStatus;
          newPatients[index].bloodGroup=bloodGroup;
          newPatients[index].disabilities=disabilities;
          newPatients[index].chronicConditions=chronicConditions;
          newPatients[index].registrationDate=registrationDate;
          newPatients[index].photoUrl=photoUrl;
          newPatients[index].status=status;
          break;
        }
      }

      let a=0
      setPatients(newPatients);
      return json;
    }
    
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <PatientContext.Provider value={{patients,addPatient,deletePatient,editPatient,getPatients}}>
            {props.children}
        </PatientContext.Provider>
    )
}
export default PatientState;