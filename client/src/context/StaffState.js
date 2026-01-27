import StaffContext from "./staffContext";
import { useState, useEffect  } from "react";

const StaffState=(props)=>{
  const host="http://localhost:5000"
  const staffsInitial=[]

    const [staffs,setStaffs]=useState(staffsInitial)

    const getStaffs=async ()=>{
      const response=await fetch(`${host}/api/staff/fetchallstaffs`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setStaffs(json)
    }
    const addStaff=async (firstName,lastName,designation,nationalId,gender,dob,address,contact,qualification,joiningDate,employmentType,salary,shift,file,status)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("designation", designation);
      formData.append("nationalId", nationalId);

      formData.append("gender", gender);
      formData.append("dob", dob);
      formData.append("address", address);
      formData.append("contact", contact);
      formData.append("qualification", qualification);
      formData.append("joiningDate", joiningDate);
      formData.append("employmentType", employmentType);
      formData.append("salary", salary);
      formData.append("shift", shift);
      formData.append("file", file);
      formData.append("status", status);

      const response=await fetch(`${host}/api/staff/addstaff`,{
        method:'POST',
        headers:{
            'auth-token':localStorage.getItem('token')
        },
        // body:JSON.stringify({firstName,lastName,designation,nationalId,gender,dob,address,contact,qualification,joiningDate,employmentType,salary,shift,photoUrl,status})
        body:formData
      });
      const staff=await response.json();
      const normalizedData = Array.isArray(staff.data) ? staff.data : [staff.data];
      //setBuses(buses.concat(bus.savedBus));
      setStaffs(prevStaffs => [...prevStaffs, normalizedData])
      // return staff.success;
      return staff;

    }
    const deleteStaff= async(id)=>{
      const response=await fetch(`${host}/api/staff/deletestaff/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newStaffs=staffs.filter((staff)=>{return staff._id!==id})
      setStaffs(newStaffs)
    }
    const editStaff=async(id,firstName,lastName,designation,nationalId,gender,dob,address,contact,qualification,joiningDate,employmentType,salary,shift,file,status)=>{
      console.log(localStorage.getItem('token'));
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("designation", designation);
      formData.append("nationalId", nationalId);

      formData.append("gender", gender);
      formData.append("dob", dob);
      formData.append("address", address);
      formData.append("contact", contact);
      formData.append("qualification", qualification);
      formData.append("joiningDate", joiningDate);
      formData.append("employmentType", employmentType);
      formData.append("salary", salary);
      formData.append("shift", shift);
      formData.append("file", file);
      formData.append("status", status);

      const response=await fetch(`${host}/api/staff/updatestaff/${id}`,{
        method:'PUT',
        headers:{
            'auth-token':localStorage.getItem('token')
          },
        // body:JSON.stringify({firstName,lastName,designation,nationalId,gender,dob,address,contact,qualification,joiningDate,employmentType,salary,shift,file,status})
        body:formData
      });
      const json=await response.json();
      let newStaffs=JSON.parse(JSON.stringify(staffs));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newStaffs.length; index++) {
        const element = newStaffs[index];
        if(element._id===id)
        {
          newStaffs[index].firstName=firstName;
          newStaffs[index].lastName=lastName;
          newStaffs[index].designation=designation;
          newStaffs[index].nationalId=nationalId;
          newStaffs[index].gender=gender;
          newStaffs[index].dob=dob;
          newStaffs[index].address=address;
          newStaffs[index].contact=contact;
          newStaffs[index].qualification=qualification;
          newStaffs[index].joiningDate=joiningDate;
          newStaffs[index].employmentType=employmentType;
          newStaffs[index].salary=salary;
          newStaffs[index].shift=shift;
          newStaffs[index].file=file;
          newStaffs[index].status=status;
          break;
        }
      }

      let a=0
      setStaffs(newStaffs);
      return json;
    }
    
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <StaffContext.Provider value={{staffs,addStaff,deleteStaff,editStaff,getStaffs}}>
            {props.children}
        </StaffContext.Provider>
    )
}
export default StaffState;