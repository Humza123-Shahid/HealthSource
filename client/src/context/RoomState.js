import RoomContext from "./roomContext";
import { useState, useEffect  } from "react";

const RoomState=(props)=>{
  const host="http://localhost:5000"
  const roomsInitial=[]

    const [rooms,setRooms]=useState(roomsInitial)

    const getRooms=async ()=>{
      const response=await fetch(`${host}/api/room/fetchallrooms`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setRooms(json)
    }
    const addRoom=async (ward,roomNumber,type,chargesPerDay)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/room/addroom`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({ward,roomNumber,type,chargesPerDay})
      });
      const rooms=await response.json();
      const normalizedData = Array.isArray(rooms.savedRoom ) ? rooms.savedRoom : [rooms.savedRoom];
      //setBuses(buses.concat(bus.savedBus));
      setRooms(prevRooms => [...prevRooms, normalizedData])
      return rooms.success;
    } 
    const deleteRoom= async(id)=>{
      const response=await fetch(`${host}/api/room/deleteroom/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newRooms=rooms.filter((room)=>{return room._id!==id})
      setRooms(newRooms)
    }
    const editRoom=async(id,ward,roomNumber,type,chargesPerDay)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/room/updateroom/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({ward,roomNumber,type,chargesPerDay})
      });
      const json=await response.json();
      let newRooms=JSON.parse(JSON.stringify(rooms));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newRooms.length; index++) {
        const element = newRooms[index];
        if(element._id===id)
        {
          newRooms[index].ward=ward;
          newRooms[index].roomNumber=roomNumber;
          newRooms[index].type=type;
          newRooms[index].chargesPerDay=chargesPerDay;
          break;
        }
      }

      let a=0
      setRooms(newRooms);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <RoomContext.Provider value={{rooms,addRoom,deleteRoom,editRoom,getRooms}}>
            {props.children}
        </RoomContext.Provider>
    )
}
export default RoomState;