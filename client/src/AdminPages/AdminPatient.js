import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import "../styles/pagination.css";
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
     const [entries, setEntries] = useState(10);
                  const [page, setPage] = useState(1);
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
    const totalPages = Math.ceil(filteredData.length / entries);
  const startIndex = (page - 1) * entries;
  const currentData = filteredData.slice(startIndex, startIndex + entries);
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
       useEffect(() => {
             
            console.log(patients.length)
            if(patients.length>200&&patients.length<401){
                setEntries(25)
              }
              else  if(patients.length>400&&patients.length<701){
                setEntries(50)
              }
               else  if(patients.length>700){
                setEntries(100)
              }
            
            }, [patients]); //
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4 mobile-margin" onClick={handleClick}>Add Patient</button>
      {/* <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}> */}
        <h3 className="ms-4 mobile-margin"
        style={{
          margin: "20px 0px 0px 15px",
          padding: "0px",
        }}>Patient Data</h3>
        <div
        className="ms-4 d-flex change-flex justify-content-between mobile-margin"
        style={{
          margin: "20px 0px 0px 15px",
          padding: "0px",
        }}
      >
        <div
          style={{
            margin: "11px 0px 0px 0px",
            color: "#333",
          }}
        >
          <select
            value={entries}
            onChange={(e) => setEntries(Number(e.target.value))}
            style={{
              padding: "4px",
              border: "1px solid #aaa",
              borderRadius: "3px",
              width: "56px",
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>{" "}
          entries per page
        </div>
        <div className="me-5" style={{display: 'flex',
      alignItems: 'center',
      border: '1px solid #ccc',
      borderRadius: '20px',
      padding: '0px 15px',
      width:'250px'}}>
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
      {/* </div> */}
      <div className="dashboard-content">
      <table  className="styled-table ms-4 mobile-margin">
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
          {currentData.map((row,index) => {
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
      {/* Bottom Controls */}
      <div
      className='change-flex'
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
          
        }}
      >
        <div
          style={{
            margin: "5px 0px 0px 26px",
            minWidth: "230px",
            color: "#333",
          }}
          className='mobile-margin'
        >
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + entries, filteredData.length)} of{" "}
          {filteredData.length} entries
        </div>

        <div
          className="dt-paging"
          style={{
            margin: "0px 0px 15px 0px",
          }}
        >
          <button
            className={
              page === 1 ? "dt-paging-button disabled" : "dt-paging-button"
            }
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            {"‹"}
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={
                page === i + 1
                  ? "dt-paging-button current"
                  : "dt-paging-button none"
              }
            >
              {i + 1}
            </button>
          ))}

          <button
            className={
              page === totalPages
                ? "dt-paging-button disabled"
                : "dt-paging-button"
            }
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            {"›"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPatient