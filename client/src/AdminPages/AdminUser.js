import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
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
  const filteredData = users.filter(item =>
      item.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const handleView = (staffName,patientName,Name,roleName,index) => {
    //const dataitem=buses.find(da => da._id ==id)
    //const datadriver=getDriverById(driverId);
    // console.log(staffName,patientName,Name,roleName,index);
    navigate('getuser', { state: { staff:staffName,patient:patientName,name:Name,role:roleName,idx:index+1} });
     
  };
  const handleEdit = async (id,staff_id,patient_id,Name,Password,role_id) => {
    // const dataitem=buses.find(da => da._id ==id)
    // const datadriver=getDriverById(driverId);
    navigate('edituser', { state: { userId:id,staffId:staff_id,patientId:patient_id,name:Name,password:Password,roleId:role_id} });

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
      
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add User</button>
      <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>
        <h3 className="ms-2">Users Data</h3>
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
            <th>Staff</th>
            <th>Patient</th>
            <th>User Name</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row,index) => {
            const role = getRoleById(row.role);
            const staff = getStaffById(row.staff);
            const patient = getPatientById(row.patient);
            return(
            <tr key={row._id}>
              <td>{index+1}</td>
              {/* <td>{row.driver_id}</td> */}
              {/* {getDriverName(row.driver_id)}  */}
              
              <td>{staff?.firstName}</td>
              <td>{patient?.firstName}</td>
              <td>{row.username}</td>
              <td>{role?.name}</td>
              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(staff?.firstName,patient?.firstName,row.username,role?.name,index)}>
                View
              </button>
              <button onClick={() => handleEdit(row._id,staff?._id,patient?._id,row.username,row.password,role?._id)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
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

export default AdminUser
