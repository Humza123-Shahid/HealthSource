import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
   import "../styles/pagination.css";

import userContext from '../context/userContext'
import roleContext from '../context/roleContext'
import staffContext from '../context/staffContext'
import patientContext from '../context/patientContext'

import { useNavigate,useLocation} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminUser = () => {
    const context=useContext(userContext);
    const {users,deleteUser,getUsers}=context;
    const context2=useContext(roleContext);
    const {roles,getRoles}=context2;
     const context3=useContext(staffContext);
    const {staffs,getStaffs}=context3;
     const context4=useContext(patientContext);
    const {patients,getPatients}=context4;
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [entries, setEntries] = useState(10);
                                                                const [page, setPage] = useState(1);
    const handleClick = () => {
        navigate('adduser');

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
  console.log(users)
  const filteredData = users?.filter(item =>
      item.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
     const totalPages = Math.ceil(filteredData.length / entries);
  const startIndex = (page - 1) * entries;
  const currentData = filteredData.slice(startIndex, startIndex + entries);
  const handleView = (staffName,Name,Email,roleName,index) => {
    //const dataitem=buses.find(da => da._id ==id)
    //const datadriver=getDriverById(driverId);
    // console.log(staffName,patientName,Name,roleName,index);
    navigate('getuser', { state: { staff:staffName,name:Name,email:Email,role:roleName,idx:index+1} });
     
  };
  const handleEdit = async (id,staff_id,Name,Email,Password,role_id) => {
    // const dataitem=buses.find(da => da._id ==id)
    // const datadriver=getDriverById(driverId);
    navigate('edituser', { state: { userId:id,staffId:staff_id,name:Name,email:Email,password:Password,roleId:role_id} });

    //navigate('edituser', { state: { userId:id,name:Name,email:Email,phone:Phone,password:Password,roleId:role_id} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deleteUser(id);
    // Call your delete API or function here
    //console.log("Deleted item with ID:", id);
    //setQuestions(prev => prev.filter(q => q._id !== id));
  }
  };
  // const getDriverName = (id) => {
  //   const result2= getDriverbyId(id);

  // };
  
const getRoleById = (id) => roles.find(d => d._id === id);
const getStaffById = (id) => staffs.find(d => d._id === id);
const getPatientById = (id) => patients.find(d => d._id === id);

  useEffect(() => {
        const fetchData = async () => {
        //const result = await getQuizzes(); // Call context function
        const result = await getUsers();
        const result2 = await getRoles();
        const result3 = await getStaffs();
        const result4 = await getPatients();

        //setMyData(result);                     // Set state in same file
      };
      
      fetchData();
      }, []); //
       useEffect(() => {
       
      console.log(users.length)
      if(users.length>200&&users.length<401){
          setEntries(25)
        }
        else  if(users.length>400&&users.length<701){
          setEntries(50)
        }
         else  if(users.length>700){
          setEntries(100)
        }
      
      }, [users]); //
      
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add User</button>
      {/* <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}> */}
        <h3 className="ms-4"
        style={{
          margin: "20px 0px 0px 15px",
          padding: "0px",
        }}>Users Data</h3>
         <div
        className="d-flex justify-content-between"
        style={{
          margin: "20px 0px 0px 15px",
          padding: "0px",
        }}
      >
        <div
          style={{
            margin: "11px 0px 0px 11px",
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
      {/* </div> */}
      <table  className="styled-table ms-4">
        <thead>
          <tr>
           <th>#</th>
            <th>Staff</th>
            <th>Email Address</th>
            <th>User Name</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row,index) => {
            const role = getRoleById(row.role);
            const staff = getStaffById(row.staff);
            // const patient = getPatientById(row.patient);
            return(
            <tr key={row._id}>
              <td>{index+1}</td>
              {/* <td>{row.driver_id}</td> */}
              {/* {getDriverName(row.driver_id)}  */}
              
              <td>{staff?.firstName}</td>
              <td>{row?.email}</td>
              <td>{row.username}</td>
              <td>{role?.name}</td>
              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(staff?.firstName,row.username,row.email,role?.name,index)}>
                View
              </button>
              <button onClick={() => handleEdit(row._id,staff?._id,row.username,row.email,row.password,role?._id)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
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
       {/* Bottom Controls */}
      <div
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

export default AdminUser
