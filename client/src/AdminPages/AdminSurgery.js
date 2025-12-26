  import React,{useState,useContext, useEffect} from 'react'
  import '../styles/StyledTable.css';
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
      const {operationTheatres,getOperationTheatres}=context4;
      const context5=useContext(staffContext);
        const {staffs,getStaffs}=context5;
      const navigate = useNavigate();
      const [searchTerm, setSearchTerm] = useState('');
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
    const handleView = (id,patientName,doctorName,operationName,index) => {
      const dataitem=surgeries.find(da => da._id ==id)
      console.log(dataitem);
      navigate('getsurgery', { state: { surgery:dataitem,patient:patientName,doctor:doctorName,operation:operationName,idx:index} });
       
    };
    const handleEdit = (id,patient_id,doctor_id,operation_id) => {
      const dataitem=surgeries.find(da => da._id ==id)
     
      navigate('editsurgery', { state: { surgery:dataitem,patientId:patient_id,doctorId:doctor_id,operationId:operation_id} });
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
    const getOperationTheatresById = (id) => operationTheatres.find(d => d._id === id);

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
    return (
     <div>
        <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Surgery</button>
        <div className="container d-flex justify-content-between">
          <h3 className="ms-2">Surgeries Data</h3>
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
              <th>Patient</th>
              <th>Primary Surgeon</th>
              <th>Type</th>
              <th>Scheduled Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row,index) => {
            const patient = getPatientById(row.patient);
            // const doctor = getDoctorById(row.primarySurgeon);
            const staff = getStaffById(row.primarySurgeon);
            const operation = getOperationTheatres(row?.operationTheatre);
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
                <td>{patient?.firstName}</td>
                <td>{staff?.firstName}</td>
                <td>{row?.type}</td>
                <td>{formattedScheduledDate}</td>
                <td>{formattedStartTime}</td>
                <td>{formattedEndTime}</td>
                <td style={{width:"30%"}}>
                  <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                    handleView(row._id,patient?.firstName,staff?.firstName,operation.name,index+1)}>
                  View
                </button>
                <button onClick={() => handleEdit(row._id,row.patient,staff._id,row.operationTheatres)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
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
  
  export default AdminSurgery
  