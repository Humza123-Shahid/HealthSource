
import React,{useState,useEffect,useContext} from 'react'
import { useLocation } from 'react-router-dom';
import medicineContext from '../context/medicineContext'

import InfoMessage from '../components/InfoMessage';

const EditMedicine = () => {
   const [showToast,setShowToast]=useState(false)
       const [msg,setMsg]=useState('')
       const [type,setType]=useState('')
       const [roles,setRoles]=useState([]);
        const formatDate = (date) => {
        return date.toISOString().split("T")[0]; // keeps only YYYY-MM-DD
    };
          const location = useLocation();
           const Medicine=location.state?.medicine || {};
     const [credentials,setCredentials] =useState({name:Medicine.name,category:Medicine.category,manufacturer:Medicine.manufacturer,form:Medicine.form,unitPrice:Medicine.unitPrice,stock:Medicine.stock,batchNumber:Medicine.batchNumber,upc:Medicine.upc})
         const [ expiryDate, setExpiryDate] = useState(formatDate(new Date(Medicine.expiryDate)));
         const [ expiryDate2, setExpiryDate2] = useState(formatDate(new Date(Medicine.expiryDate)));
     
     const context=useContext(medicineContext);
         const {editMedicine}=context;

          const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value); // <-- Get input value here
    const newTime = `${e.target.value}T05:00:00`
    setExpiryDate2(newTime);
  };
  
     const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
     
  const editMedicines=async (e)=>{
         e.preventDefault();
        const {name,category,manufacturer,form,unitPrice,stock,batchNumber,upc}=credentials
         
          const user=await editMedicine(Medicine._id,name,category,manufacturer,form,unitPrice,stock,expiryDate2,batchNumber,upc)
          console.log(user)
          if(user.success)
          {
        
            console.log("abc");
            setShowToast(true);
            setMsg("Medicine updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }

  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={editMedicines}>
    <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="name" className="form-label">Enter Name:</label>
            <input type="text" className="form-control" id="name" value={credentials.name} name="name" onChange={onChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="category" className="form-label">Enter Category:</label>
            <input type="text" className="form-control" id="category" value={credentials.category} name="category" onChange={onChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="manufacturer" className="form-label">Enter Manufacturer:</label>
            <input type="text" className="form-control" id="manufacturer" value={credentials.manufacturer} name="manufacturer" onChange={onChange} />
      </div>
       
    </div>
      <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="form" className="form-label">Enter Form:</label>
            {/* <input type="text" className="form-control" id="form" value={credentials.form} name="form" onChange={onChange} /> */}
             <select id="mySelect" className="form-control " value={credentials.form} name="form" onChange={onChange}>
              <option value="tablet">Tablet</option>
              <option value="syrup">Syrup</option>
              <option value="injection">Injection</option>
              <option value="ointment">Ointment</option>
              <option value="other">Other</option>
            </select>
      </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="unitPrice" className="form-label">Enter Unit Price:</label>
        <input type="number" className="form-control" id="unitPrice" value={credentials.unitPrice} name="unitPrice" onChange={onChange} />
    </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="stock" className="form-label">Enter Stock:</label>
        <input type="number" className="form-control" id="stock" name="stock" value={credentials.stock} onChange={onChange} />
    </div>
    </div>
        
     <div className='mx-0' style={{display:'flex'}}>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="expiryDate" className="form-label">Select Expiry Date</label>
          <input type="date" className="form-control" id="expiryDate" name="expiryDate" value={expiryDate} onChange={handleExpiryDateChange}  aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="batchNumber" className="form-label">Enter Batch Number:</label>
            <input type="text" className="form-control" id="batchNumber" value={credentials.batchNumber} name="batchNumber" onChange={onChange} />
      </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="upc" className="form-label">Enter Upc:</label>
            <input type="text" className="form-control" id="upc" name="upc" value={credentials.upc} onChange={onChange} />
      </div>
      </div>
    
    
      <button disabled={credentials.name==""||credentials.category==""||credentials.manufacturer==""||credentials.form==""||credentials.batchNumber==""||credentials.upc==""} type="submit" className="btn btn-primary">Update Medicine</button>
      </form>
    </div>
  )
}

export default EditMedicine
