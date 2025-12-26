import UserContext from "./userContext";
import { useState, useEffect  } from "react";

const UserState=(props)=>{
  const host="http://localhost:5000"
  const usersInitial=[]

    const [users,setUsers]=useState(usersInitial)

    const getUsers=async ()=>{
      const response=await fetch(`${host}/api/user/fetchallusers`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setUsers(json)
    }
    const addUser=async (staff,patient,username,password,role)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/user/adduser`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({staff,patient,username,password,role})
      });
      const user=await response.json();
      const normalizedData = Array.isArray(user.data) ? user.data : [user.data];
      //setBuses(buses.concat(bus.savedBus));
      setUsers(prevUsers => [...prevUsers, normalizedData])
      // return user.success;
      return user;

    }
    const deleteUser= async(id)=>{
      const response=await fetch(`${host}/api/user/deleteuser/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newUsers=users.filter((user)=>{return user._id!==id})
      setUsers(newUsers)
    }
    const editUser=async(id,staff,patient,username,password,role)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/user/updateuser/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({staff,patient,username,password,role})
      });
      const json=await response.json();
      let newUsers=JSON.parse(JSON.stringify(users));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newUsers.length; index++) {
        const element = newUsers[index];
        if(element._id===id)
        {
          newUsers[index].staff=staff;
          newUsers[index].patient=patient;
          newUsers[index].username=username;
          newUsers[index].password=password;
          newUsers[index].role=role;
          break;
        }
      }

      let a=0
      setUsers(newUsers);
      return json;
    }
    
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <UserContext.Provider value={{users,addUser,deleteUser,editUser,getUsers}}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserState;