import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
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
const getDoctorById = (id) => doctors.find(d => d.staff === id);
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
      <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>
        <h3 className="ms-2">Admissions Data</h3>
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
          {filteredData.map((row,index) => {
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
              <td>{index+1}</td>
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
    </div>
  );
}

export default AdminAdmission
