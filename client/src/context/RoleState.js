import RoleContext from "./roleContext";
import { useState, useEffect  } from "react";

const RoleState=(props)=>{
  const host="http://localhost:5000"
  const rolesInitial=[]

    const [roles,setRoles]=useState(rolesInitial)

    const getRoles=async ()=>{
      const response=await fetch(`${host}/api/role/fetchallroles`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
            }
      })
      const json=await response.json();
      console.log(json);
      setRoles(json)
    }
    const addRole=async (name,permissions)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/role/addrole`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({name,permissions})
      });
      const role=await response.json();
      const normalizedData = Array.isArray(role.savedRole) ? role.savedRole : [role.savedRole];
      //setBuses(buses.concat(bus.savedBus));
      setRoles(prevRoles => [...prevRoles, normalizedData])
      return role.success;
    }
    const editRole=async(id,name,permissions)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/role/updaterole/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({name,permissions})
      });
      const json=await response.json();
      let newRoles=JSON.parse(JSON.stringify(roles));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newRoles.length; index++) {
        const element = newRoles[index];
        if(element._id===id)
        {
          newRoles[index].name=name;
          newRoles[index].permissions=permissions;
          break;
        }
      }

      let a=0
      setRoles(newRoles);
      return json;
    }
  const deleteRole= async(id)=>{
      const response=await fetch(`${host}/api/role/deleterole/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newRoles=roles.filter((role)=>{return role._id!==id})
      setRoles(newRoles)
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <RoleContext.Provider value={{roles,addRole,getRoles,editRole,deleteRole}}>
            {props.children}
        </RoleContext.Provider>
    )
}
export default RoleState;