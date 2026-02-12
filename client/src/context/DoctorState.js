import DoctorContext from "./doctorContext";
import { useState, useEffect  } from "react";

const DoctorState=(props)=>{
  const host="http://localhost:5000"
  const doctorsInitial=[]

    const [doctors,setDoctors]=useState(doctorsInitial)

    const getDoctors=async ()=>{
      const response=await fetch(`${host}/api/doctor/fetchalldoctors`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            // 'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setDoctors(json)
    }
    const addDoctor=async (staff,specializations,licenseNumber,experienceYears,consultationFee,onCall,file,file2)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
       const formData = new FormData();
      formData.append("staff", staff);
      formData.append("specializations", specializations);
      formData.append("licenseNumber", licenseNumber);
      formData.append("experienceYears", experienceYears);
      formData.append("consultationFee", consultationFee);
      formData.append("onCall", onCall);
       if (file) {
        formData.append('signature', file); // Field name must match backend
      }
      if (file2) {
      formData.append("photo", file2);
      
      }
      const response=await fetch(`${host}/api/doctor/adddoctor`,{
        method:'POST',
        headers:{
            'auth-token':localStorage.getItem('token')
        },
        // body:JSON.stringify({staff,specializations,licenseNumber,experienceYears,consultationFee,onCall,signatureUrl})
           body:formData
      });
      const doctors=await response.json();
      const normalizedData = Array.isArray(doctors.savedDoctor ) ? doctors.savedDoctor : [doctors.savedDoctor];
      //setBuses(buses.concat(bus.savedBus));
      setDoctors(prevDoctors => [...prevDoctors, normalizedData])
      return doctors.success;
    } 
    const deleteDoctor= async(id)=>{
      const response=await fetch(`${host}/api/doctor/deletedoctor/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newDoctors=doctors.filter((doc)=>{return doc._id!==id})
      setDoctors(newDoctors)
    }
    const editDoctor=async(id,staff,specializations,licenseNumber,experienceYears,consultationFee,onCall,file,file2)=>{
      console.log(localStorage.getItem('token'));
       const formData = new FormData();
      formData.append("staff", staff);
      formData.append("specializations", specializations);
      formData.append("licenseNumber", licenseNumber);
      formData.append("experienceYears", experienceYears);
      formData.append("consultationFee", consultationFee);
      formData.append("onCall", onCall);
      if (file) {
        formData.append('signature', file); // Field name must match backend
      }
      if (file2) {
        console.log("here in file2")
      formData.append("photo", file2);

      }
            console.log(file2);

      const response=await fetch(`${host}/api/doctor/updatedoctor/${id}`,{
        method:'PUT',
        headers:{
            'auth-token':localStorage.getItem('token')
          },
        // body:JSON.stringify({staff,specializations,licenseNumber,experienceYears,consultationFee,onCall,signatureUrl})
        body:formData

      });
      const json=await response.json();
      let newDoctors=JSON.parse(JSON.stringify(doctors));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newDoctors.length; index++) {
        const element = newDoctors[index];
        if(element._id===id)
        {
          newDoctors[index].staff=staff;
          newDoctors[index].specializations=specializations;
          newDoctors[index].licenseNumber=licenseNumber;
          newDoctors[index].experienceYears=experienceYears;
          newDoctors[index].consultationFee=consultationFee;
          newDoctors[index].onCall=onCall;
          newDoctors[index].file=file;
          newDoctors[index].file2=file2;
          break;
        }
      }

      let a=0
      setDoctors(newDoctors);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <DoctorContext.Provider value={{doctors,addDoctor,deleteDoctor,editDoctor,getDoctors}}>
            {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorState;