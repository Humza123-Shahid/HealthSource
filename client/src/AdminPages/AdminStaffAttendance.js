  import React,{useState,useContext, useEffect} from 'react'
  import '../styles/StyledTable.css';
  import "../styles/pagination.css";

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
      const [entries, setEntries] = useState(10);
                                                const [page, setPage] = useState(1);
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
    const totalPages = Math.ceil(filteredData.length / entries);
  const startIndex = (page - 1) * entries;
  const currentData = filteredData.slice(startIndex, startIndex + entries);
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
         useEffect(() => {
               
              console.log(staffattendances.length)
              if(staffattendances.length>200&&staffattendances.length<401){
                  setEntries(25)
                }
                else  if(staffattendances.length>400&&staffattendances.length<701){
                  setEntries(50)
                }
                 else  if(staffattendances.length>700){
                  setEntries(100)
                }
              
              }, [staffattendances]); //
    return (
     <div>
        <button className="btn btn-primary mt-3 ms-4 mobile-margin" onClick={handleClick}>Add Staff Attendance</button>
        {/* <div className="container d-flex justify-content-between"> */}
          <h3  className="ms-4 mobile-margin"
        style={{
          margin: "20px 0px 0px 15px",
          padding: "0px",
        }}>Staff Attendances Data</h3>
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
          <div className="me-1" style={{display: 'flex',
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
            {currentData.map((row,index) => {
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
  
  export default AdminStaffAttendance
  