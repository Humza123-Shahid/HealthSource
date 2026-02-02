
import React,{useState,useContext} from 'react'
import socialContext from '../context/socialContext'
import InfoMessage from '../components/InfoMessage';

const AddSocial = () => {
    const context=useContext(socialContext);
    const {addSocial}=context;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const [platformName, setPlatformName] = useState('');
    const [url, setUrl] = useState('');

    const handleNameChange = (e) => {
    setPlatformName(e.target.value); // <-- Get input value here
  };
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
};

  const addSocials=(e)=>{
          e.preventDefault();
          const success=addSocial(platformName,url)
          if(success)
          {
            setShowToast(true);
            setMsg("Social Data added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }

  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addSocials}>

    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="pname" className="form-label">Enter Platform Name:</label>
        <input type="text" className="form-control" id="pname" value={platformName} name="pname" onChange={handleNameChange} />
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      <label htmlFor="url" className="form-label">Enter Url:</label>
      <input type="text" className="form-control" id="url" value={url} name="url" onChange={handleUrlChange} />
      {/* <select id="mySelect" className="form-control " value={selectedStatusValue} onChange={handleStatusChange}>
        <option value="On Schedule">On Schedule</option>
        <option value="Delayed">Delayed</option>
        <option value="Arrived at [Intermediate Stop]">Arrived at [Intermediate Stop]</option>
        <option value="Arrived at Final Destination">Arrived at Final Destination</option>
        <option value="Departed from [Origin]">Departed from [Origin]</option>
        <option value="Canceled">Canceled</option>
        <option value="Boarding">Boarding</option>
        <option value="Boarding Closed">Boarding Closed</option>

      </select> */}
    </div>
     <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
      </div>
      <button disabled={platformName.length<1 || url.length<1} type="submit" className="btn btn-primary" >Add Social</button>
      </form>
    </div>
  )
}

export default AddSocial
