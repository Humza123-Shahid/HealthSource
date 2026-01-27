  import React,{useState,useContext, useEffect} from 'react'
  import '../styles/StyledTable.css';
  import staffattendanceContext from '../context/staffattendanceContext'
  import staffContext from '../context/staffContext'
  import staffdutyContext from '../context/staffdutyContext'
  import shiftContext from '../context/shiftContext'
  import { useNavigate,useLocation} from 'react-router-dom';
  import { FaSearch } from 'react-icons/fa';
  
  const AdminStaffAttendance = () => {
      const context=useContext(staffattendanceContext);
      const {staffattendances,deleteStaffAttendance,getStaffAttendances}=context;
      const context2=useContext(staffContext);
      const {staffs,getStaffs}=context2;
      const context3=useContext(shiftContext);
      const {shifts,getShifts}=context3;
      const context4=useContext(staffdutyContext);
      const {staffduties,getStaffDuties}=context4;
      const navigate = useNavigate();
      const [searchTerm, setSearchTerm] = useState('');
      const handleClick = () => {
          navigate('addstaffattendance');
  
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
    const filteredData = staffattendances.filter(item =>
        item.status?.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
    // const handleView = (id,dutyDate,staff2Name,staffId,shiftId,index) => {
    //   const dataitem=staffattendances.find(da => da._id ==id)
    //   const datastaff=getStaffById(staffId);
    //   const datashift=getShiftById(shiftId);
    //   navigate('getstaffattendance', { state: { staffattendance:dataitem,dutydate:dutyDate,staff2name:staff2Name,staff:datastaff,shift:datashift,idx:index} });
       
    // };
     const handleView = (id,dutyDate,staff2Name,index) => {
      const dataitem=staffattendances.find(da => da._id ==id)

      navigate('getstaffattendance', { state: { staffattendance:dataitem,dutydate:dutyDate,staff2name:staff2Name,idx:index} });
       
    };
    // const handleEdit = (id,dutyId,staffId,shiftId) => {
    //   const dataitem=staffattendances.find(da => da._id ==id)
    //   const datastaff=getStaffById(staffId);
    //   const datashift=getShiftById(shiftId);
    //   navigate('editstaffattendance', { state: { staffattendance:dataitem,duty:dutyId,staff:datastaff,shift:datashift} });
    // };
    const handleEdit = (id,dutyId) => {
      const dataitem=staffattendances.find(da => da._id ==id)
      navigate('editstaffattendance', { state: { staffattendance:dataitem,duty:dutyId} });
    };
    const handleDelete = (id) => {
       const confirmed = window.confirm("Are you sure you want to delete this?");
    if (confirmed) {
      deleteStaffAttendance(id);
      // Call your delete API or function here
      //console.log("Deleted item with ID:", id);
      //setQuestions(prev => prev.filter(q => q._id !== id));
    }
    };
    const getStaffById = (id) => staffs.find(d => d._id === id);
    const getShiftById = (id) => shifts.find(d => d._id === id);
    const getDutyById = (id) => staffduties.find(d => d._id === id);

    useEffect(() => {
          const fetchData = async () => {
          //const result = await getQuizzes(); // Call context function
          const result = await getStaffAttendances();
          const result2 = await getStaffs();
          const result3 = await getShifts();
          const result4 = await getStaffDuties();

          //setMyData(result);                     // Set state in same file
        };
    
        fetchData();
        }, []); //
    return (
     <div>
        <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Staff Attendance</button>
        <div className="container d-flex justify-content-between">
          <h3 className="ms-2">Staff Attendances Data</h3>
          <div className="me-1" style={{display: 'flex',
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
              {/* <th>Staff</th> */}
              <th>Duty</th>
              <th>Status</th>

              {/* <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row,index) => {
              const staff = getStaffById(row.staff);
              const duty = getDutyById(row.duty);
              const staff2 = getStaffById(duty?.staff);
              //  const formattedCheckInTime = new Date(row.checkIn).toLocaleString('en-US', {
              //     hour: 'numeric',
              //     minute: 'numeric',
              //     hour12: true // Ensures AM/PM
              //   });
              //  const formattedCheckOutTime = new Date(row.checkOut).toLocaleString('en-US', {
              //     hour: 'numeric',
              //     minute: 'numeric',
              //     hour12: true // Ensures AM/PM
              //   });
              //   const formattedDate = new Date(row?.date).toLocaleString('en-US', {
              //       year: 'numeric',
              //       month: '2-digit',
              //       day: '2-digit'
              //   });
                 const formattedDutyDate = new Date(duty?.dutyDate).toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
              return(
              <tr key={row._id}>
                <td>{index+1}</td>
                {/* <td>{staff?.firstName}</td> */}
                <td>{formattedDutyDate}-{staff2?.firstName}</td>
                <td>{row?.status}</td>
               
                {/* <td>{formattedDate}</td>
                <td>{formattedCheckInTime}</td>
                <td>{formattedCheckOutTime}</td> */}
                <td style={{width:"30%"}}>
                  <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                    // handleView(row._id,formattedDutyDate,staff2?.firstName,row.staff,row.shift,index+1)}>
                    handleView(row._id,formattedDutyDate,staff2?.firstName,index+1)}>
                  View
                </button>
                {/* <button onClick={() => handleEdit(row._id,row.duty,row.staff,row.shift)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}> */}
                <button onClick={() => handleEdit(row._id,row.duty)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>    
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
    );
  }
  
  export default AdminStaffAttendance
  