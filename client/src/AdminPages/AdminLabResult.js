import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import labresultContext from '../context/labresultContext'
import labrequestContext from '../context/labrequestContext'
import labtestContext from '../context/labtestContext'

import { useNavigate,useLocation} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminLabResult = () => {
    const context=useContext(labresultContext);
    const {labresults,deleteLabResult,getLabResults}=context;
    const context2=useContext(labrequestContext);
    const {labrequests,getLabRequests}=context2;
    const context3=useContext(labtestContext);
    const {labtests,getLabTests}=context3;

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = () => {
        navigate('addlabresult');

  };
  const handleSearchClick = () => {
        console.log("abc")

  };
  // useEffect(() => {
  //   const storedCount = localStorage.getItem("qcount");
  //   if (storedCount !== null) {
  //     setQcount(Number(storedCount));
  //   }
  // }, []);
  const filteredData = labresults.filter(item =>
      item.resultValue?.toLowerCase().includes(searchTerm.toLowerCase())||
      item.units?.toLowerCase().includes(searchTerm.toLowerCase())||
      item.remarks?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const handleView = (labresultId,labtestName,labrequestName,index) => {
    //const dataitem=buses.find(da => da._id ==id)
    const datalabresult=getLabResultById(labresultId);
    // console.log(staffName,patientName,Name,roleName,index);
    navigate('getlabresult', { state: { labresult:datalabresult,labtest:labtestName,labrequest:labrequestName,idx:index+1} });
     
  };
  const handleEdit = async (labresultId,labtest_id,labrequest_id) => {
    // const dataitem=buses.find(da => da._id ==id)
    const datalabresult=getLabResultById(labresultId);
    navigate('editlabresult', { state: { labresult:datalabresult,labtestId:labtest_id,labrequestId:labrequest_id} });

    //navigate('edituser', { state: { userId:id,name:Name,email:Email,phone:Phone,password:Password,roleId:role_id} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deleteLabResult(id);
    // Call your delete API or function here
    //console.log("Deleted item with ID:", id);
    //setQuestions(prev => prev.filter(q => q._id !== id));
  }
  };
  // const getDriverName = (id) => {
  //   const result2= getDriverbyId(id);

  // };

const getLabRequestById = (id) => labrequests.find(d => d._id === id);
const getLabResultById = (id) => labresults.find(d => d._id === id);
const getLabTestById = (id) => labtests.find(d => d._id === id);

  useEffect(() => {
        const fetchData = async () => {
        //const result = await getQuizzes(); // Call context function
        const result = await getLabRequests();
        const result3 = await getLabResults();
        const result6 = await getLabTests();
        //setMyData(result);                     // Set state in same file
      };
  
      fetchData();
      }, []); //
      
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Lab Result</button>
      <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>
        <h3 className="ms-2">Lab Results Data</h3>
        <div className="me-5" style={{display: 'flex',
      alignItems: 'center',
      border: '1px solid #ccc',
      borderRadius: '20px',
      padding: '0px 15px'}}>
        <input
          type="text"
          placeholder="Search..."
          className="me-2 mt-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{border: 'none',
      outline: 'none',
      flexGrow: '1',
      padding: '5px',
      fontSize: '16px'}}
        />
        <FaSearch style={{color: '#888',marginLeft: '0px',cursor:'pointer'}} onClick={handleSearchClick}/>
        </div>
      </div>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
           <th>#</th>
           <th>Lab Request</th>
           <th>Test</th>
           <th>Result Value</th>
           <th>Units</th>
           <th>Remarks</th>
           <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row,index) => {
            const request = getLabRequestById(row.labRequest);
            const test = getLabTestById(row.test);
             const formattedRequestDate = new Date(request?.requestDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
            // hour: 'numeric',
            // minute: 'numeric',
            // hour12: true // Ensures AM/PM
          });
            return(
            <tr key={row._id}>
              <td>{index+1}</td>
              {/* <td>{row.driver_id}</td> */}
              {/* {getDriverName(row.driver_id)}  */}
              <td>{formattedRequestDate}</td>
              <td>{test?.name}</td>
              <td>{row?.resultValue}</td>
              <td>{row?.units}</td>
              <td>{row?.remarks}</td>
              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(row._id,test?.name,formattedRequestDate,index)}>
                View
              </button>
              <button onClick={() => handleEdit(row._id,test?._id,request._id)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
                Edit
              </button>
              <button onClick={() => handleDelete(row._id)} style={{ color:"white",backgroundColor:"red" }}>
                Delete
              </button>
              </td>
            </tr>
            )
            })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminLabResult
