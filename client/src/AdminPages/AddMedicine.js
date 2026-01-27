
import React,{useState,useEffect,useContext} from 'react'
import medicineContext from '../context/medicineContext'

import InfoMessage from '../components/InfoMessage';

const AddMedicine = () => {
   const [showToast,setShowToast]=useState(false)
       const [msg,setMsg]=useState('')
       const [type,setType]=useState('')
       const [roles,setRoles]=useState([]);
     const [credentials,setCredentials] =useState({name:"",category:"",manufacturer:"",form:"",unitPrice:0,stock:"",batchNumber:"",upc:""})
         const [ expiryDate, setExpiryDate] = useState(undefined);
         const [ expiryDate2, setExpiryDate2] = useState(undefined);
     
     const context=useContext(medicineContext);
         const {addMedicine}=context;

          const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value); // <-- Get input value here
    const newTime = `${e.target.value}T05:00:00`
    setExpiryDate2(newTime);
  };
  
     const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
     
  const addMedicines=async (e)=>{
         e.preventDefault();
        const {name,category,manufacturer,form,unitPrice,stock,batchNumber,upc}=credentials
         console.log(form);
          const user=await addMedicine(name,category,manufacturer,form,unitPrice,stock,expiryDate2,batchNumber,upc)
          console.log(user)
          if(user.success)
          {
        
            console.log("abc");
            setShowToast(true);
            setMsg("Medicine added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }

  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addMedicines}>
    <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="name" className="form-label">Enter Name:</label>
            <input type="text" className="form-control" id="name" name="name" onChange={onChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="category" className="form-label">Enter Category:</label>
            <input type="text" className="form-control" id="category" name="category" onChange={onChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="manufacturer" className="form-label">Enter Manufacturer:</label>
            <input type="text" className="form-control" id="manufacturer" name="manufacturer" onChange={onChange} />
      </div>
       
    </div>
      <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="form" className="form-label">Enter Form:</label>
            {/* <input type="text" className="form-control" id="form" name="form" onChange={onChange} /> */}
            <select id="mySelect" className="form-control " name="form" onChange={onChange}>
              <option value="tablet">Tablet</option>
              <option value="syrup">Syrup</option>
              <option value="injection">Injection</option>
              <option value="ointment">Ointment</option>
              <option value="other">Other</option>
            </select>
      </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="unitPrice" className="form-label">Enter Unit Price:</label>
        <input type="number" className="form-control" id="unitPrice" name="unitPrice" onChange={onChange} />
    </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="stock" className="form-label">Enter Stock:</label>
        <input type="number" className="form-control" id="stock" name="stock" onChange={onChange} />
    </div>
    </div>
        
     <div className='mx-0' style={{display:'flex'}}>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="expiryDate" className="form-label">Select Expiry Date</label>
          <input type="date" className="form-control" id="expiryDate" name="expiryDate" value={expiryDate} onChange={handleExpiryDateChange}  aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="batchNumber" className="form-label">Enter Batch Number:</label>
            <input type="text" className="form-control" id="batchNumber" name="batchNumber" onChange={onChange} />
      </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="upc" className="form-label">Enter Upc:</label>
            <input type="text" className="form-control" id="upc" name="upc" onChange={onChange} />
      </div>
      </div>
    
    
      <button disabled={credentials.name==""||credentials.category==""||credentials.manufacturer==""||credentials.form==""||credentials.batchNumber==""||credentials.upc==""} type="submit" className="btn btn-primary">Add Medicine</button>
      </form>
    </div>
  )
}

export default AddMedicine
