import DepartmentContext from "./departmentContext";
import { useState, useEffect  } from "react";

const DepartmentState=(props)=>{
  const host="http://localhost:5000"
  const departmentsInitial=[]

    const [departments,setDepartments]=useState(departmentsInitial)

    const getDepartments=async ()=>{
      const response=await fetch(`${host}/api/department/fetchalldepartments`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            // 'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setDepartments(json)
    }
    const addDepartment=async (name,code,description,headOfDepartment)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/department/adddepartment`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({name,code,description,headOfDepartment})
      });
      const departments=await response.json();
      const normalizedData = Array.isArray(departments.savedDepartment ) ? departments.savedDepartment : [departments.savedDepartment];
      //setBuses(buses.concat(bus.savedBus));
      setDepartments(prevDepartments => [...prevDepartments, normalizedData])
      return departments.success;
    } 
    const deleteDepartment= async(id)=>{
      const response=await fetch(`${host}/api/department/deletedepartment/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newDepartments=departments.filter((department)=>{return department._id!==id})
      setDepartments(newDepartments)
    }
    const editDepartment=async(id,name,code,description,headOfDepartment)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/department/updatedepartment/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({name,code,description,headOfDepartment})
      });
      const json=await response.json();
      let newDepartments=JSON.parse(JSON.stringify(departments));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newDepartments.length; index++) {
        const element = newDepartments[index];
        if(element._id===id)
        {
          newDepartments[index].name=name;
          newDepartments[index].code=code;
          newDepartments[index].description=description;
          newDepartments[index].headOfDepartment=headOfDepartment;
          break;
        }
      }

      let a=0
      setDepartments(newDepartments);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <DepartmentContext.Provider value={{departments,addDepartment,deleteDepartment,editDepartment,getDepartments}}>
            {props.children}
        </DepartmentContext.Provider>
    )
}
export default DepartmentState;