import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import staffContext from '../context/staffContext'
// import bookingContext from '../context/bookingContext'

import { useNavigate,useLocation, data} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminStaff = () => {

     const context=useContext(staffContext);
    const {staffs,deleteStaff,getStaffs}=context;

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = () => {
        navigate('addstaff');

  };
  const handleSearchClick = () => {
        console.log("abc")

  };

  const filteredData = staffs.filter(item =>
     item.firstName?.toLowerCase().includes(searchTerm.toLowerCase())||
     item.lastName?.toLowerCase().includes(searchTerm.toLowerCase())||
     item.designation?.toLowerCase().includes(searchTerm.toLowerCase())||
     item.gender?.toLowerCase().includes(searchTerm.toLowerCase())||
     item.nationalId?.toLowerCase().includes(searchTerm.toLowerCase())||
     item.contact?.toLowerCase().includes(searchTerm.toLowerCase())||
     item.address?.toLowerCase().includes(searchTerm.toLowerCase())||
     item.qualification?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const handleView = (id,index) => {
    const dataitem=staffs.find(da => da._id ==id)
    
    navigate('getstaff', { state: { staff:dataitem,idx:index} });
     
  };
  const handleEdit = (id) => {
    const dataitem=staffs.find(da => da._id ==id)
    navigate('editstaff', { state: { staff:dataitem} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deleteStaff(id);
    
  }
  };

  useEffect(() => {
        const fetchData = async () => {
        const result = await getStaffs();
      };
  
      fetchData();
      }, []); //
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Staff</button>
      <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>
        <h3 className="ms-2">Staff Data</h3>
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
            <th>Designation</th>
            <th>National Id</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>Contact</th>
            {/* <th>Qualification</th> */}
            <th>Joining Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row,index) => {
            const formattedBirthDate = new Date(row?.dob).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
            // hour: 'numeric',
            // minute: 'numeric',
            // hour12: true // Ensures AM/PM
          });
          const formattedJoiningDate = new Date(row?.joiningDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
            return(
            <tr key={row._id}>
              <td>{index+1}</td>
              <td>{row?.firstName}</td>
              <td>{row.lastName}</td>
              <td>{row.designation}</td>
              <td>{row.nationalId}</td>
              <td>{row.gender}</td>
              <td>{formattedBirthDate}</td>
              <td>{row.address}</td>
              <td>{row.contact}</td>
              {/* <td>{row?.qualification}</td> */}
              <td>{formattedJoiningDate}</td>
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

export default AdminStaff