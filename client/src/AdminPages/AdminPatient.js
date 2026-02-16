import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import patientContext from '../context/patientContext'
// import bookingContext from '../context/bookingContext'

import { useNavigate,useLocation, data} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminPatient = () => {

     const context=useContext(patientContext);
    const {patients,deletePatient,getPatients}=context;

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = () => {
        navigate('addpatient');

  };
  const handleSearchClick = () => {
        console.log("abc")

  };

  const filteredData = patients.filter(item =>
     item.firstName?.toLowerCase().includes(searchTerm.toLowerCase())||
     item.lastName?.toLowerCase().includes(searchTerm.toLowerCase())||
     item.fatherName?.toLowerCase().includes(searchTerm.toLowerCase())||
     item.gender?.toLowerCase().includes(searchTerm.toLowerCase())||
     item.nationalId?.toLowerCase().includes(searchTerm.toLowerCase())||
     item.contact?.toLowerCase().includes(searchTerm.toLowerCase())||
     item.address?.toLowerCase().includes(searchTerm.toLowerCase())||
     item.maritalStatus?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const handleView = (id,index) => {
    const dataitem=patients.find(da => da._id ==id)
    
    navigate('getpatient', { state: { patient:dataitem,idx:index} });
     
  };
  const handleEdit = (id) => {
    const dataitem=patients.find(da => da._id ==id)
    navigate('editpatient', { state: { patient:dataitem} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deletePatient(id);
    
  }
  };

  useEffect(() => {
        const fetchData = async () => {
        const result2 = await getPatients();
      };
  
      fetchData();
      }, []); //
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Patient</button>
      <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>
        <h3 className="ms-2">Patient Data</h3>
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
      <div className="dashboard-content">
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
            <th>Father Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Age</th>
            <th>National Id</th>
            <th>Contact</th>
            <th>Marital Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row,index) => {
            const formattedBirthDate = new Date(row?.dateOfBirth).toLocaleString('en-US', {
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
              <td>{row?.firstName}</td>
              <td>{row.lastName}</td>
              <td>{row.email}</td>
              <td>{row.fatherName}</td>
              <td>{row.gender}</td>
              <td>{formattedBirthDate}</td>
              <td>{row?.age}</td>
              <td>{row.nationalId}</td>
              <td>{row.contact}</td>
              <td>{row.maritalStatus}</td>
              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(row._id,index+1)}>
                View
              </button>
                <button onClick={() => handleEdit(row._id)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
              {/* <button onClick={() => handleEdit(row._id,row.organizer,row.venue)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}> */}
                Edit
              </button>
              <button onClick={() => handleDelete(row._id)} style={{ color:"white",backgroundColor:"red" }}>
                Delete
              </button>
              </td>
            </tr>)
        })}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default AdminPatient