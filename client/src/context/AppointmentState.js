import AppointmentContext from "./appointmentContext";
import { useState, useEffect  } from "react";

const AppointmentState=(props)=>{
  const host="http://localhost:5000"
  const appointmentsInitial=[]

    const [appointments,setAppointments]=useState(appointmentsInitial)

    const getAppointments=async ()=>{
      const response=await fetch(`${host}/api/appointment/fetchallappointments`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setAppointments(json)
    }
    const addAppointment=async (patient,doctor,appointmentDate,appointmentTime,bookingType,status,notes)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/appointment/addappointment`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({patient,doctor,appointmentDate,appointmentTime,bookingType,status,notes})
      });
      const appointment=await response.json();
      const normalizedData = Array.isArray(appointment.data) ? appointment.data : [appointment.data];
      //setBuses(buses.concat(bus.savedBus));
      setAppointments(prevAppointments => [...prevAppointments, normalizedData])
      // return appointment.success;
      return appointment;

    }
    const deleteAppointment= async(id)=>{
      const response=await fetch(`${host}/api/appointment/deleteappointment/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newAppointments=appointments.filter((appointment)=>{return appointment._id!==id})
      setAppointments(newAppointments)
    }
    const editAppointment=async(id,patient,doctor,appointmentDate,appointmentTime,bookingType,status,notes)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/appointment/updateappointment/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({patient,doctor,appointmentDate,appointmentTime,bookingType,status,notes})
      });
      const json=await response.json();
      let newAppointments=JSON.parse(JSON.stringify(appointments));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newAppointments.length; index++) {
        const element = newAppointments[index];
        if(element._id===id)
        {
          newAppointments[index].patient=patient;
          newAppointments[index].doctor=doctor;
          newAppointments[index].appointmentDate=appointmentDate;
          newAppointments[index].appointmentTime=appointmentTime;
          newAppointments[index].bookingType=bookingType;
          newAppointments[index].status=status;
          newAppointments[index].notes=notes;
          break;
        }
      }

      let a=0
      setAppointments(newAppointments);
      return json;
    }
    
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <AppointmentContext.Provider value={{appointments,addAppointment,deleteAppointment,editAppointment,getAppointments}}>
            {props.children}
        </AppointmentContext.Provider>
    )
}
export default AppointmentState;