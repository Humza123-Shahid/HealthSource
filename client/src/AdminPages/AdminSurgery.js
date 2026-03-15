  import React,{useState,useContext, useEffect} from 'react'
  import '../styles/StyledTable.css';
    import "../styles/pagination.css";
  import surgeryContext from '../context/surgeryContext'
  import patientContext from '../context/patientContext'
  import doctorContext from '../context/doctorContext'
  import operationtheatreContext from '../context/operationtheatreContext'
  import staffContext from '../context/staffContext'

  import { useNavigate,useLocation} from 'react-router-dom';
  import { FaSearch } from 'react-icons/fa';
  
  const AdminSurgery = () => {
      const context=useContext(surgeryContext);
      const {surgeries,deleteSurgery,getSurgeries}=context;
      const context2=useContext(patientContext);
      const {patients,getPatients}=context2;
      const context3=useContext(doctorContext);
      const {doctors,getDoctors}=context3;
      const context4=useContext(operationtheatreContext);
      const {operationtheatres,getOperationTheatres}=context4;
      const context5=useContext(staffContext);
        const {staffs,getStaffs}=context5;
      const navigate = useNavigate();
      const [searchTerm, setSearchTerm] = useState('');
       const [entries, setEntries] = useState(10);
                                                      const [page, setPage] = useState(1);
      const handleClick = () => {
          navigate('addsurgery');
  
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
    const filteredData = surgeries.filter(item =>
        item.type?.toLowerCase().includes(searchTerm.toLowerCase())
     );
     const totalPages = Math.ceil(filteredData.length / entries);
  const startIndex = (page - 1) * entries;
  const currentData = filteredData.slice(startIndex, startIndex + entries);
    const handleView = (id,patientName,doctorName,operationName,index) => {
      const dataitem=surgeries.find(da => da._id ==id)
      console.log(dataitem);
      navigate('getsurgery', { state: { surgery:dataitem,patient:patientName,doctor:doctorName,operation:operationName,idx:index} });
       
    };
    const handleEdit = (id,doctor_id,operation_id) => {
      const dataitem=surgeries.find(da => da._id ==id)
     
      navigate('editsurgery', { state: { surgery:dataitem,doctorId:doctor_id,operationId:operation_id} });
    };
    const handleDelete = (id) => {
       const confirmed = window.confirm("Are you sure you want to delete this?");
    if (confirmed) {
      deleteSurgery(id);
      // Call your delete API or function here
      //console.log("Deleted item with ID:", id);
      //setQuestions(prev => prev.filter(q => q._id !== id));
    }
    };
    const getPatientById = (id) => patients.find(d => d._id === id);
    const getDoctorById = (id) => doctors.find(d => d._id === id);
    const getStaffById = (id) => staffs.find(d => d._id === id);
    const getOperationTheatresById = (id) => operationtheatres.find(d => d._id === id);

    useEffect(() => {
          const fetchData = async () => {
          //const result = await getQuizzes(); // Call context function
          const result = await getSurgeries();
          const result2 = await getPatients();
          const result3 = await getDoctors();
          const result4 = await getStaffs();
          const result5= await getOperationTheatres();

          //setMyData(result);                     // Set state in same file
        };
       
        fetchData();
        }, []); //
         useEffect(() => {
               
              console.log(surgeries.length)
              if(surgeries.length>200&&surgeries.length<401){
                  setEntries(25)
                }
                else  if(surgeries.length>400&&surgeries.length<701){
                  setEntries(50)
                }
                 else  if(surgeries.length>700){
                  setEntries(100)
                }
              
              }, [surgeries]); //
    return (
     <div>
        <button className="btn btn-primary mt-3 ms-4 mobile-margin" onClick={handleClick}>Add Surgery</button>
        {/* <div className="container d-flex justify-content-between"> */}
          <h3 className="ms-4 mobile-margin"
        style={{
          margin: "20px 0px 0px 15px",
          padding: "0px",
        }}>Surgeries Data</h3>
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
              <th>Patient NationalId/Name</th>
              <th>Primary Surgeon</th>
              <th>Type</th>
              <th>Scheduled Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row,index) => {
            // const patient = getPatientById(row.patient);
            const doctor = getDoctorById(row.primarySurgeon);
            const staff = getStaffById(doctor?.staff);
            const operation = getOperationTheatresById(row?.operationTheatre);
            const patient = getPatientById(row?.patient);

               const formattedStartTime = new Date(row.startTime).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true // Ensures AM/PM
                });
               const formattedEndTime = new Date(row.endTime).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true // Ensures AM/PM
                });
                const formattedScheduledDate = new Date(row?.scheduledDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
              return(
              <tr key={row._id}>
                <td>{index+1}</td>
                <td>{patient?.nationalId}-{patient?.firstName}</td>
                <td>{staff?.firstName}</td>
                <td>{row?.type}</td>
                <td>{formattedScheduledDate}</td>
                <td>{formattedStartTime}</td>
                <td>{formattedEndTime}</td>
                <td style={{width:"30%"}}>
                  <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                    handleView(row._id,patient,staff?.firstName,operation.name,index+1)}>
                  View
                </button>
                <button onClick={() => handleEdit(row._id,staff._id,row.operationTheatre)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
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
  
  export default AdminSurgery
  