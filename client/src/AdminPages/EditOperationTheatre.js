
import React,{useState,useContext} from 'react'
import { useLocation } from 'react-router-dom';
import operationtheatreContext from '../context/operationtheatreContext'
import InfoMessage from '../components/InfoMessage';

const EditOperationTheatre = () => {
    const context=useContext(operationtheatreContext);
    const {editOperationTheatre}=context;
    const [showToast,setShowToast]=useState(false)
    const [msg,setMsg]=useState('')
    const [type,setType]=useState('')
    const location = useLocation();
    const OperationTheatre=location.state?.operationtheatre || {};
    const [name, setName] = useState(OperationTheatre.name);
    const [equipment, setEquipment] = useState(OperationTheatre.equipment);
    const [status, setStatus] = useState(OperationTheatre.status);

    const handleNameChange = (e) => {
    setName(e.target.value); // <-- Get input value here
  };
  const handleEquipmentChange = (e) => {
    setEquipment(e.target.value); // <-- Get input value here
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value); // <-- Get input value here
  };

  const editOperationTheatres=async (e)=>{
          e.preventDefault();
          const success= await editOperationTheatre(OperationTheatre._id,name,equipment,status)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Operation Theatre updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }

  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={editOperationTheatres}>

    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="name" className="form-label">Enter Name:</label>
        <input type="text" className="form-control" id="name" value={name} name="name" onChange={handleNameChange} />
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="equipment" className="form-label">Equipment:</label>
        <input type="text" className="form-control" id="equipment" value={equipment} name="equipment" onChange={handleEquipmentChange} />
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="status" className="form-label">Status:</label>
        <input type="text" className="form-control" id="status" value={status} name="status" onChange={handleStatusChange} />
    </div>
      </div>
      <button disabled={name.length<1||equipment.length<1||status.length<1} type="submit" className="btn btn-primary" >Edit Operation Theatre</button>
      </form>
    </div>
  )
}

export default EditOperationTheatre
