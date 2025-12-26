
import React,{useState,useContext,useEffect} from 'react'
import labtestContext from '../context/labtestContext'
import InfoMessage from '../components/InfoMessage';

const AddLabTest = () => {
    const context=useContext(labtestContext);
    const {addLabTest}=context;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [normalRange, setNormalRange] = useState('');
    const [price, setPrice] = useState(0);
    const [code, setCode] = useState('');
    
 
  const handleNameChange = (e) => {
    setName(e.target.value); // <-- Get input value here
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value); // <-- Get input value here
  };
  const handleNormalRangeChange = (e) => {
    setNormalRange(e.target.value); // <-- Get input value here
  };
   const handlePriceChange = (e) => {
    setPrice(e.target.value); // <-- Get input value here
  };
  const handleCodeChange = (e) => {
    setCode(e.target.value); // <-- Get input value here
  };

  const addLabTests=async (e)=>{
    console.log("abc");
          e.preventDefault();
          const success= await addLabTest(name,category,normalRange,price,code)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Lab Test added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addLabTests}>

    <div className='mx-0' style={{display:'flex'}}>
   
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="vname" className="form-label">Enter Name:</label>
            <input type="text" className="form-control" id="vname" value={name} name="vname" onChange={handleNameChange} />
      </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="category" className="form-label">Enter Category:</label>
            <input type="text" className="form-control" id="category" value={category} name="category" onChange={handleCategoryChange} />
      </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="normalRange" className="form-label">Enter Normal Range:</label>
            <input type="text" className="form-control" id="normalRange" value={normalRange} name="normalRange" onChange={handleNormalRangeChange} />
      </div>
        
      </div>
      <div className='mx-0' style={{display:'flex'}}>
         <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="price" className="form-label">Enter Price:</label>
        <input type="number" className="form-control" id="price" value={price} name="price" onChange={handlePriceChange} />
    </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="code" className="form-label">Enter Code:</label>
            <input type="text" className="form-control" id="code" value={code} name="code" onChange={handleCodeChange} />
      </div>
       <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
        </div>
      </div>
      <button disabled={name.length<1||category.length<1||normalRange.length<1||code.length<1} type="submit" className="btn btn-primary" >Add Lab Test</button>
      </form>
    </div>
  )
}

export default AddLabTest
