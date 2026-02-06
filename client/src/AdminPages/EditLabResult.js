import React,{useState,useEffect,useContext} from 'react'
import { useLocation } from 'react-router-dom';
import Select from "react-select";
import labtestContext from '../context/labtestContext'
import labresultContext from '../context/labresultContext'
import labrequestContext from '../context/labrequestContext'

import InfoMessage from '../components/InfoMessage';

const EditLabResult = () => {
   const [showToast,setShowToast]=useState(false)
       const [msg,setMsg]=useState('')
       const [type,setType]=useState('')
        const location = useLocation();
        const LabResult=location.state?.labresult || {};
        const labrequest=location.state?.labrequestId || {};
        const labtest=location.state?.labtestId || {};
         const formatDate = (date) => {
        return date.toISOString().split("T")[0]; // keeps only YYYY-MM-DD
    };
     const [credentials,setCredentials] =useState({labrequestId:labrequest,labtestId:labtest,resultValue:LabResult.resultValue,units:LabResult.units,remarks:LabResult.remarks,uploadedFileUrl:LabResult.uploadedFileUrl})
         const [ resultDate, setResulttDate] = useState(formatDate(new Date(LabResult.resultDate)));
         const [ resultDate2, setResulttDate2] = useState(formatDate(new Date(LabResult.resultDate)));
     
     const context=useContext(labtestContext);
         const {labtests,getLabTests}=context;
         const context2=useContext(labresultContext);
         const {editLabResult}=context2;
         const context3=useContext(labrequestContext);
        const {labrequests,getLabRequests}=context3;
        const parts = LabResult.filePath.split('\\')
        
        const remainingParts = parts.slice(1);
        
        const newPath = remainingParts.join('/');
            
        
        const [existingImage, setExistingImage] = useState(`http://localhost:5000/${newPath}`); // from DB
       console.log(existingImage);
        const [file, setFile] = useState(null);
        const [preview, setPreview] = useState(null);
          const handleResultDateChange = (e) => {
    if(e.target.value=="")
    {
        setResulttDate(undefined)
        setResulttDate2(undefined)
    }
    else{
            setResulttDate(e.target.value); // <-- Get input value here
    const newTime = `${e.target.value}T05:00:00`
    setResulttDate2(newTime);
    }

  };

  
     const onChange=(e)=>{
        if(e.target.value=="" && (e.target.name=="labrequestId"||e.target.name=="labtestId"))
        {
            setCredentials({...credentials,[e.target.name]:null})
        }
        else{
            setCredentials({...credentials,[e.target.name]:e.target.value})
        }
      
      
    }
    const handleChange = (selectedOption) => {
        if(selectedOption=="" )
        {
            setCredentials({...credentials,'labrequestId':null})
        }
        else
        {
          setCredentials({...credentials,'labrequestId':selectedOption.value})
        }
  };
    const handleChange2 = (selectedOption) => {
        if(selectedOption=="" )
        {
            setCredentials({...credentials,'labtestId':null})
        }
        else
        {
          setCredentials({...credentials,'labtestId':selectedOption.value})
        }
  };

const options = [
  { value: "", label: "Select Lab Request" }, // empty option
  ... labrequests.map(lr=> {
    const formattedRequestDate = new Date(lr?.requestDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
           
          });
    return{
    value: lr._id,
    label: `${formattedRequestDate}`
  }})
];
const options2 = [
  { value: "", label: "Select Lab Test" }, // empty option
  ... labtests.map(lt => ({
    value: lt._id,
    label: `${lt.name}`
  }))
];
const defaultValue = options.find(d=>d.value==labrequest);
const defaultValue2 = options2.find(d=>d.value==labtest);

const filterOption = (option, inputValue) => {
  // Only filter based on the 'label' property, for example
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};
const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFile(file);

      if (file) {
        setPreview(URL.createObjectURL(file)); // preview new image
      }
    };
  const editLabResults=async (e)=>{
         e.preventDefault();
        const {labrequestId,labtestId,resultValue,units,remarks}=credentials

         
          const user=await editLabResult(LabResult._id,labrequestId,labtestId,resultValue,units,remarks,file,resultDate2)
          console.log(user)
          if(user.success)
          {
        
            console.log("abc");
            setShowToast(true);
            setMsg("Lab Result updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }

useEffect(() => {
           const fetchData = async () => {
        const result6 = await getLabTests();
        const result7 = await getLabRequests();

          };
          fetchData();
          }, []); 
  
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={editLabResults}>
    <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="labrequestId" className="form-label">Lab Request</label>
            {/* <select id="labrequestId" className="form-control " name="labrequestId" onChange={onChange}>
                <option value="">-Lab Request-</option>
                    {Array.isArray(labrequests) && labrequests.map((row) =>  {
              const formattedRequestDate = new Date(row?.requestDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
           
          });
            return(
                    <option value={row._id}>{formattedRequestDate}</option>)
            })}
            </select> */}
             <Select id="labrequestId" options={options} filterOption={filterOption} defaultValue={defaultValue} onChange={handleChange} name="labrequestId" placeholder="Select Lab Request" />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="labtestId" className="form-label">Lab Test</label>
            {/* <select id="labtestId" className="form-control " name="labtestId" onChange={onChange}>
                <option value="">-Lab Test-</option>
                    {Array.isArray(labtests) && labtests.map((row) => (
                    <option value={row._id}>{row?.name}</option>
                    ))}
            </select> */}
             <Select id="labtestId" options={options2} filterOption={filterOption} defaultValue={defaultValue2} onChange={handleChange2} name="labtestId" placeholder="Select Lab Test" />
        </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="resultValue" className="form-label">Enter Result Value:</label>
            <input type="text" className="form-control" id="resultValue" value={credentials.resultValue} name="resultValue" onChange={onChange} />
      </div>
       
    </div>
      <div className='mx-0' style={{display:'flex'}}>
         <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="units" className="form-label">Enter Units:</label>
            <input type="text" className="form-control" id="units" value={credentials.units} name="units" onChange={onChange} />
      </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="remarks" className="form-label">Enter Remarks:</label>
            <textarea className="form-control" id="remarks" value={credentials.remarks} name="remarks" onChange={onChange} />
      </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="uploadedFileUrl" className="form-label">Select File:</label>
            <br/>
            {/* <input type="text" className="form-control" id="uploadedFileUrl" value={credentials.uploadedFileUrl} name="uploadedFileUrl" onChange={onChange} /> */}
             <input
              type="file"
              onChange={handleFileChange}
            />
      </div>
    </div>
        
     <div className='mx-0' style={{display:'flex'}}>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <div>
          <label className="form-label">Image Preview:</label>
          <br/>
          <a
              href={preview ? preview : existingImage}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={preview ? preview : existingImage}
                width="200"
                style={{ cursor: 'zoom-in' }}
              />
            </a>
        </div>
      </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="resultDate" className="form-label">Result Date</label>
          <input type="date" className="form-control" id="resultDate" name="resultDate" value={resultDate} onChange={handleResultDateChange}  aria-describedby="emailHelp"/>
        </div>
    <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
     {/* <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div> */}
      </div>

      
      <button disabled={resultDate==undefined||credentials.resultValue==""||credentials.units==""||credentials.remarks==""||credentials.uploadedFileUrl==""} type="submit" className="btn btn-primary">Update Lab Result</button>
      </form>
    </div>
  )
}

export default EditLabResult
