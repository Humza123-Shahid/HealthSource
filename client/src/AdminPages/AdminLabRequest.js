import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import labrequestContext from '../context/labrequestContext'
import patientContext from '../context/patientContext'
import doctorContext from '../context/doctorContext'
import staffContext from '../context/staffContext'
import labtestContext from '../context/labtestContext'

import { useNavigate,useLocation} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminLabRequest = () => {
    const context=useContext(labrequestContext);
    const {labrequests,deleteLabRequest,getLabRequests}=context;
    const context2=useContext(patientContext);
    const {patients,getPatients}=context2;
     const context3=useContext(doctorContext);
    const {doctors,getDoctors}=context3;
    const context4=useContext(staffContext);
    const {staffs,getStaffs}=context4;
    const context5=useContext(labtestContext);
    const {labtests,getLabTests}=context5;

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = () => {
        navigate('addlabrequest');

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
  const filteredData = labrequests.filter(item =>
      item.notes?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const handleView = (labrequestId,labtestName,doctorName,patientName,index) => {
    //const dataitem=buses.find(da => da._id ==id)
    const datalabrequest=getLabRequestById(labrequestId);
    // console.log(staffName,patientName,Name,roleName,index);
    navigate('getlabrequest', { state: { labrequest:datalabrequest,labtest:labtestName,doctor:doctorName,patient:patientName,idx:index+1} });
     
  };
  const handleEdit = async (labrequestId,labtest_id,doctor_id,patient_id) => {
    // const dataitem=buses.find(da => da._id ==id)
    const datalabrequest=getLabRequestById(labrequestId);
    navigate('editlabrequest', { state: { labrequest:datalabrequest,labtestId:labtest_id,doctorId:doctor_id,patientId:patient_id} });

    //navigate('edituser', { state: { userId:id,name:Name,email:Email,phone:Phone,password:Password,roleId:role_id} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deleteLabRequest(id);
    // Call your delete API or function here
    //console.log("Deleted item with ID:", id);
    //setQuestions(prev => prev.filter(q => q._id !== id));
  }
  };
  // const getDriverName = (id) => {
  //   const result2= getDriverbyId(id);

  // };

const getLabRequestById = (id) => labrequests.find(d => d._id === id);
const getLabTestById = (id) => labtests.find(d => d._id === id);
const getDoctorById = (id) => doctors.find(d => d.staff === id);
const getPatientById = (id) => patients.find(d => d._id === id);
const getStaffById = (id) => staffs.find(d => d._id === id);

  useEffect(() => {
        const fetchData = async () => {
        //const result = await getQuizzes(); // Call context function
        const result = await getLabRequests();
        const result3 = await getDoctors();
        const result4 = await getPatients();
        const result5 = await getStaffs();
        const result6 = await getLabTests();
        //setMyData(result);                     // Set state in same file
      };
  
      fetchData();
      }, []); //
      
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Lab Request</button>
      <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>
        <h3 className="ms-2">Lab Requests Data</h3>
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
           <th>Patient</th>
           <th>Doctor</th>
           <th>Test</th>
           <th>Request Date</th>
           <th>Notes</th>
           <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row,index) => {
            const doctor = getDoctorById(row.doctor);
            const patient = getPatientById(row.patient);
            const test = getLabTestById(row.test);
            const staff = getStaffById(doctor?.staff);
             const formattedRequestDate = new Date(row?.requestDate).toLocaleString('en-US', {
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
              
              <td>{patient?.firstName}</td>
              <td>{staff?.firstName}</td>
              
              <td>{test?.name}</td>
              <td>{formattedRequestDate}</td>
              <td>{row?.notes}</td>
              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(row._id,test?.name,staff?.firstName,patient?.firstName,index)}>
                View
              </button>
              <button onClick={() => handleEdit(row._id,test?._id,staff?._id,row.patient)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
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

export default AdminLabRequest
