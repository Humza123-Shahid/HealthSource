import React,{useState,useMemo,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import '../styles/pagination.css';
import admissionContext from '../context/admissionContext'
import patientContext from '../context/patientContext'
import doctorContext from '../context/doctorContext'
import staffContext from '../context/staffContext'
import wardContext from '../context/wardContext'
import roomContext from '../context/roomContext'
import bedContext from '../context/bedContext'

import { useNavigate,useLocation} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminAdmission = () => {
    const context=useContext(admissionContext);
    const {admissions,deleteAdmission,getAdmissions}=context;
    const context2=useContext(patientContext);
    const {patients,getPatients}=context2;
     const context3=useContext(doctorContext);
    const {doctors,getDoctors}=context3;
    const context4=useContext(staffContext);
    const {staffs,getStaffs}=context4;
    const context5=useContext(wardContext);
    const {wards,getWards}=context5;
    const context6=useContext(roomContext);
    const {rooms,getRooms}=context6;
    const context7=useContext(bedContext);
    const {beds,getBeds}=context7;
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = () => {
        navigate('addadmission');

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
  const filteredData = admissions.filter(item =>
      item.reason?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const totalPages = Math.ceil(filteredData.length / entries);
  const startIndex = (page - 1) * entries;
  const currentData = filteredData.slice(startIndex, startIndex + entries);
  const handleView = (admissionId,wardName,roomName,bedName,doctorName,patientName,index) => {
    //const dataitem=buses.find(da => da._id ==id)
    const dataadmission=getAdmissionById(admissionId);
    // console.log(staffName,patientName,Name,roleName,index);
    navigate('getadmission', { state: { admission:dataadmission,ward:wardName,room:roomName,bed:bedName,doctor:doctorName,patient:patientName,idx:index+1} });
     
  };
  const handleEdit = async (admissionId,ward_id,room_id,bed_id,doctor_id,patient_id) => {
    // const dataitem=buses.find(da => da._id ==id)
    const dataadmission=getAdmissionById(admissionId);
    navigate('editadmission', { state: { admission:dataadmission,wardId:ward_id,roomId:room_id,bedId:bed_id,doctorId:doctor_id,patientId:patient_id} });

    //navigate('edituser', { state: { userId:id,name:Name,email:Email,phone:Phone,password:Password,roleId:role_id} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deleteAdmission(id);
    // Call your delete API or function here
    //console.log("Deleted item with ID:", id);
    //setQuestions(prev => prev.filter(q => q._id !== id));
  }
  };
  // const getDriverName = (id) => {
  //   const result2= getDriverbyId(id);

  // };

const getAdmissionById = (id) => admissions.find(d => d._id === id);
const getDoctorById = (id) => doctors.find(d => d._id === id);
const getPatientById = (id) => patients.find(d => d._id === id);
const getStaffById = (id) => staffs.find(d => d._id === id);
const getWardById = (id) => wards.find(d => d._id === id);
const getRoomById = (id) => rooms.find(d => d._id === id);
const getBedById = (id) => beds.find(d => d._id === id);

  useEffect(() => {
        const fetchData = async () => {
        //const result = await getQuizzes(); // Call context function
        const result = await getAdmissions();
        const result3 = await getDoctors();
        const result4 = await getPatients();
        const result5 = await getStaffs();
        const result6 = await getWards();
        const result7 = await getRooms();
        const result8 = await getBeds();

        //setMyData(result);                     // Set state in same file
      };
  
      fetchData();
      }, []); //
      
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Admission</button>
      <h3 className="ms-4" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>Admissions Data</h3>
      <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>
        <div style={{
                    margin: '11px 0px 0px 11px',
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
           <th>Admitting Doctor</th>
           <th>Ward</th>
           <th>Room</th>
           <th>Bed</th>
           <th>Admission Date</th>
           <th>Discharge Date</th>
           <th>Reason</th>
           <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row,index) => {
            const doctor = getDoctorById(row.admittingDoctor);
            const patient = getPatientById(row.patient);
            const ward = getWardById(row.ward);
            const room = getRoomById(row.room);
            const bed = getBedById(row.bed);

            const staff = getStaffById(doctor?.staff);
             const formattedAdmissionDate = new Date(row?.admissionDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
            
          });
           const formattedDischargeDate = new Date(row?.dischargeDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
            
          });
            return(
            <tr key={row._id}>
              <td>{(index+1)+(page-1)*entries}</td>
              {/* <td>{row.driver_id}</td> */}
              {/* {getDriverName(row.driver_id)}  */}
              
              <td>{patient?.firstName}</td>
              <td>{staff?.firstName}</td>
              <td>{ward?.name}</td>
              <td>{room?.roomNumber}</td>
              <td>{bed?.bedNumber}</td>              
              <td>{formattedAdmissionDate}</td>
              <td>{formattedDischargeDate}</td>
              <td>{row?.reason}</td>
              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(row._id,ward?.name,room?.roomNumber,bed?.bedNumber,staff?.firstName,patient?.firstName,index)}>
                View
              </button>
              <button onClick={() => handleEdit(row._id,ward?._id,room?._id,bed?._id,staff?._id,row.patient)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
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
        <div  style={{
              margin: '5px 0px 0px 26px',
    minWidth: '230px',
     color: '#333'
        }}

        >
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + entries, filteredData.length)} of{" "}
          {filteredData.length} entries
        </div>

        <div className="dt-paging" style={{
                margin: '0px 0px 15px 0px'}}
        >
          <button 
          className={page === 1 ? 'dt-paging-button disabled' : 'dt-paging-button'}
          disabled={page === 1} onClick={() => setPage(page - 1)}
            // style={{
            //     cursor: page === 1 ?'default':'pointer',
            //     color: page === 1 ?'rgba(0, 0, 0, 0.5)':'#333',
            //     // fontWeight: page === i + 1 ? "bold" : "normal",
            //     padding: '0.5em 1em',
            //     borderRadius: '2px',
            //     boxSizing: 'border-box',
            //     minWidth: '1.5em',
            //     // background: 'transparent',
            //     border: "1px solid transparent",
            //     background:"transparent",
            //     margin: "0 0px 0 2px",
            //   }}
              >
            {"‹"}
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
            
              key={i}
              onClick={() => setPage(i + 1)}
              className={page === i+1 ? 'dt-paging-button current' : 'dt-paging-button none'}
              // style={{
              //   color: '#333',
              //   fontWeight: page === i + 1 ? "bold" : "normal",
              //   fontFamily: 'Arial ,sans-serif',
              //   padding: '0.5em 1em',
              //   borderRadius: '2px',
              //   boxSizing: 'border-box',
              //   minWidth: '1.5em',
              //   // background: 'transparent',
              //   border:page === i + 1 ? "1px solid rgba(0, 0, 0, 0.3)" : "1px solid transparent",
              //   background:page === i + 1 ? "linear-gradient(to bottom, rgba(229.5, 229.5, 229.5, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%)" : "transparent",
              //   margin: "0 0px 0 2px",
              // }}
            >
              {i + 1}
            </button>
          ))}

          <button
          className={page === totalPages ? 'dt-paging-button disabled' : 'dt-paging-button'}
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            // style={{
            //     cursor: page === totalPages ?'default':'pointer',
            //     color: page === totalPages ?'rgba(0, 0, 0, 0.5)':'#333',
            //     // fontWeight: page === i + 1 ? "bold" : "normal",
            //     padding: '0.5em 1em',
            //     borderRadius: '2px',
            //     boxSizing: 'border-box',
            //     minWidth: '1.5em',
            //     // background: 'transparent',
            //     border: "1px solid transparent",
            //     background:"transparent",
            //     margin: "0 0px 0 2px",
            //   }}
          >
            {"›"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminAdmission
