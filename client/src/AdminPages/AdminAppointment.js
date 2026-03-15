import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import '../styles/pagination.css';
import appointmentContext from '../context/appointmentContext'
import patientContext from '../context/patientContext'
import doctorContext from '../context/doctorContext'
import staffContext from '../context/staffContext'

import { useNavigate,useLocation} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminAppointment = () => {
    const context=useContext(appointmentContext);
    const {appointments,deleteAppointment,getAppointments}=context;
    const context2=useContext(patientContext);
    const {patients,getPatients}=context2;
     const context3=useContext(doctorContext);
    const {doctors,getDoctors}=context3;
    const context4=useContext(staffContext);
    const {staffs,getStaffs}=context4;
    const [entries, setEntries] = useState(10);
      const [page, setPage] = useState(1);

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = () => {
        navigate('addappointment');

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
  // const filteredData = appointments.filter(item =>
  //     item.appointmentTime?.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  const totalPages = Math.ceil(appointments.length / entries);
  const startIndex = (page - 1) * entries;
  const currentData = appointments.slice(startIndex, startIndex + entries);
  const handleView = (appointmentId,doctorName,patientName,index) => {
    //const dataitem=buses.find(da => da._id ==id)
    const dataappointment=getAppointmentById(appointmentId);
    // console.log(staffName,patientName,Name,roleName,index);
    navigate('getappointment', { state: { appointment:dataappointment,doctor:doctorName,patient:patientName,idx:index+1} });
     
  };
  const handleEdit = async (appointmentId,doctor_id,patient_id) => {
    // const dataitem=buses.find(da => da._id ==id)
    const dataappointment=getAppointmentById(appointmentId);
    navigate('editappointment', { state: { appointment:dataappointment,doctorId:doctor_id,patientId:patient_id} });

    //navigate('edituser', { state: { userId:id,name:Name,email:Email,phone:Phone,password:Password,roleId:role_id} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deleteAppointment(id);
    // Call your delete API or function here
    //console.log("Deleted item with ID:", id);
    //setQuestions(prev => prev.filter(q => q._id !== id));
  }
  };
  // const getDriverName = (id) => {
  //   const result2= getDriverbyId(id);

  // };
  
const getAppointmentById = (id) => appointments.find(d => d._id === id);
// const getDoctorById = (id) => doctors.find(d => d.staff === id);
const getDoctorById = (id) => doctors.find(d => d._id === id);

const getPatientById = (id) => patients.find(d => d._id === id);
const getStaffById = (id) => staffs.find(d => d._id === id);

  useEffect(() => {
        const fetchData = async () => {
        //const result = await getQuizzes(); // Call context function
        const result = await getAppointments();
        const result3 = await getDoctors();
        const result4 = await getPatients();
        const result5 = await getStaffs();

        //setMyData(result);                     // Set state in same file
      };
   
      fetchData();
      }, []); //
      useEffect(() => {
                                     
                      console.log(appointments.length)
                      if(appointments.length>200&&appointments.length<401){
                          setEntries(25)
                        }
                        else  if(appointments.length>400&&appointments.length<701){
                          setEntries(50)
                        }
                        else  if(appointments.length>700){
                          setEntries(100)
                        }
                      
                      }, [appointments]); //
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4 mobile-margin" onClick={handleClick}>Add Appointment</button>
      {/* <div className="d-flex justify-content-between" style={{ */}
      
        <h3  className="ms-4 mobile-margin" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>Appointments Data</h3>
        <div className="ms-4 d-flex change-flex justify-content-between mobile-margin" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>
        <div style={{
                    margin: '11px 0px 0px 0px',
     color: '#333'}}>
          <select
            value={entries}
            onChange={(e) => setEntries(Number(e.target.value))}
            style={{
                padding: '4px',
    border: '1px solid #aaa',
    borderRadius:'3px',
    width: '56px'}}
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
      <div className="dashboard-content">
      <table  className="styled-table ms-4 mobile-margin">
        <thead>
          <tr>
           <th>#</th>
           <th>Patient</th>
           <th>Doctor</th>
            <th>Appointment Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row,index) => {
            const doctor = getDoctorById(row.doctor);
            const patient = getPatientById(row.patient);
            const staff = getStaffById(doctor?.staff);
             const formattedAppointmentDate = new Date(row?.appointmentDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true // Ensures AM/PM
          });
            return(
            <tr key={row._id}>
              <td>{(index+1)+(page-1)*entries}</td>
              {/* <td>{row.driver_id}</td> */}
              {/* {getDriverName(row.driver_id)}  */}
              
              <td>{patient?.firstName}</td>
              <td>{staff?.firstName}</td>
              
              <td>{formattedAppointmentDate}</td>
              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(row._id,staff?.firstName,patient?.firstName,index)}>
                View
              </button>
              <button onClick={() => handleEdit(row._id,staff._id,row.patient)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
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
      {/* Bottom Controls */}
      <div
      className='change-flex'
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <div  style={{
              margin: '5px 0px 0px 26px',
    minWidth: '230px',
     color: '#333'
        }}
        className='mobile-margin'
        >
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + entries, appointments.length)} of{" "}
          {appointments.length} entries
        </div>

        <div className="dt-paging" style={{
                margin: '0px 0px 15px 0px'}}
        >
          <button 
          className={page === 1 ? 'dt-paging-button disabled' : 'dt-paging-button'}
          disabled={page === 1} onClick={() => setPage(page - 1)}
              >
            {"‹"}
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
            
              key={i}
              onClick={() => setPage(i + 1)}
              className={page === i+1 ? 'dt-paging-button current' : 'dt-paging-button none'}
            >
              {i + 1}
            </button>
          ))}

          <button
          className={page === totalPages ? 'dt-paging-button disabled' : 'dt-paging-button'}
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

export default AdminAppointment
