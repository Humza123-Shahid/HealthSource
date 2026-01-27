import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import staffdutyContext from '../context/staffdutyContext'
import staffContext from '../context/staffContext'
import shiftContext from '../context/shiftContext'

import { useNavigate,useLocation} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminStaffDuty = () => {
    const context=useContext(staffdutyContext);
    const {staffduties,deleteStaffDuty,getStaffDuties}=context;
    const context2=useContext(staffContext);
    const {staffs,getStaffs}=context2;
    const context3=useContext(shiftContext);
    const {shifts,getShifts}=context3;
    
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = () => {
        navigate('addstaffduty');

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
  // const filteredData = staffduties.filter(item =>
  //     item.staffdutyTime?.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  const handleView = (staffdutyId,staffName,shiftName,index) => {
    //const dataitem=buses.find(da => da._id ==id)
    const datastaffduty=getStaffDutyById(staffdutyId);
    // console.log(staffName,patientName,Name,roleName,index);
    navigate('getstaffduty', { state: { staffduty:datastaffduty,staff:staffName,shift:shiftName,idx:index+1} });
     
  };
  const handleEdit = async (staffdutyId,staff_id,shift_id) => {
    // const dataitem=buses.find(da => da._id ==id)
    const datastaffduty=getStaffDutyById(staffdutyId);
    navigate('editstaffduty', { state: { staffduty:datastaffduty,staffId:staff_id,shiftId:shift_id} });

    //navigate('edituser', { state: { userId:id,name:Name,email:Email,phone:Phone,password:Password,roleId:role_id} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deleteStaffDuty(id);
    // Call your delete API or function here
    //console.log("Deleted item with ID:", id);
    //setQuestions(prev => prev.filter(q => q._id !== id));
  }
  };
  // const getDriverName = (id) => {
  //   const result2= getDriverbyId(id);

  // };
  
const getStaffDutyById = (id) => staffduties.find(d => d._id === id);
const getStaffById = (id) => staffs.find(d => d._id === id);
const getShiftById = (id) => shifts.find(d => d._id === id);

  useEffect(() => {
        const fetchData = async () => {
        //const result = await getQuizzes(); // Call context function
        const result = await getStaffDuties();
        const result2 = await getStaffs();
        const result3 = await getShifts();

        //setMyData(result);                     // Set state in same file
      };
  
      fetchData();
      }, []); //
      
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add StaffDuty</button>
      <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>
        <h3 className="ms-2">StaffDuties Data</h3>
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
           <th>Shift</th>
            <th>Duty Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {staffduties.map((row,index) => {
            const staff = getStaffById(row?.staff);
            const shift = getShiftById(row?.shift);

             const formattedDutyDate = new Date(row?.dutyDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
            return(
            <tr key={row._id}>
              <td>{index+1}</td>
              {/* <td>{row.driver_id}</td> */}
              {/* {getDriverName(row.driver_id)}  */}
              
              <td>{staff?.firstName}</td>
              <td>{shift?.name}</td>            
              <td>{formattedDutyDate}</td>
              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(row._id,staff?.firstName,shift?.name,index)}>
                View
              </button>
              <button onClick={() => handleEdit(row._id,staff?._id,shift?._id)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
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

export default AdminStaffDuty
