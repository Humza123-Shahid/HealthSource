import MedicineContext from "./medicineContext";
import { useState, useEffect  } from "react";

const MedicineState=(props)=>{
  const host="http://localhost:5000"
  const medicinesInitial=[]

    const [medicines,setMedicines]=useState(medicinesInitial)

    const getMedicines=async ()=>{
      const response=await fetch(`${host}/api/medicine/fetchallmedicines`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setMedicines(json)
    }
    const addMedicine=async (name,category,manufacturer,form,unitPrice,stock,expiryDate,batchNumber,upc)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/medicine/addmedicine`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({name,category,manufacturer,form,unitPrice,stock,expiryDate,batchNumber,upc})
      });
      const medicine=await response.json();
      const normalizedData = Array.isArray(medicine.data) ? medicine.data : [medicine.data];
      //setBuses(buses.concat(bus.savedBus));
      setMedicines(prevMedicines => [...prevMedicines, normalizedData])
      // return medicine.success;
      return medicine;

    }
    const deleteMedicine= async(id)=>{
      const response=await fetch(`${host}/api/medicine/deletemedicine/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newMedicines=medicines.filter((medicine)=>{return medicine._id!==id})
      setMedicines(newMedicines)
    }
    const editMedicine=async(id,name,category,manufacturer,form,unitPrice,stock,expiryDate,batchNumber,upc)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/medicine/updatemedicine/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({name,category,manufacturer,form,unitPrice,stock,expiryDate,batchNumber,upc})
      });
      const json=await response.json();
      let newMedicines=JSON.parse(JSON.stringify(medicines));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newMedicines.length; index++) {
        const element = newMedicines[index];
        if(element._id===id)
        {
          newMedicines[index].name=name;
          newMedicines[index].category=category;
          newMedicines[index].manufacturer=manufacturer;
          newMedicines[index].form=form;
          newMedicines[index].unitPrice=unitPrice;
          newMedicines[index].expiryDate=expiryDate;
          newMedicines[index].batchNumber=batchNumber;
          newMedicines[index].upc=upc;
          break;
        }
      }

      let a=0
      setMedicines(newMedicines);
      return json;
    }
    
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <MedicineContext.Provider value={{medicines,addMedicine,deleteMedicine,editMedicine,getMedicines}}>
            {props.children}
        </MedicineContext.Provider>
    )
}
export default MedicineState;