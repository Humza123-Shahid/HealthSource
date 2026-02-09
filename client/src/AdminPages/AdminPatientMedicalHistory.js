import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import patientmedicalhistoryContext from '../context/patientmedicalhistoryContext'
import patientContext from '../context/patientContext'
import doctorContext from '../context/doctorContext'
import staffContext from '../context/staffContext'

import { useNavigate,useLocation} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminPatientMedicalHistory = () => {
    const context=useContext(patientmedicalhistoryContext);
    const {patientmedicalhistories,deletePatientMedicalHistory,getPatientMedicalHistories}=context;
    const context2=useContext(patientContext);
    const {patients,getPatients}=context2;
     const context3=useContext(doctorContext);
    const {doctors,getDoctors}=context3;
    const context4=useContext(staffContext);
    const {staffs,getStaffs}=context4;
    let filteredData;
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = () => {
        navigate('addpatientmedicalhistory');

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
  if(localStorage.getItem('utype')=='patient')
  {
    console.log(localStorage.getItem('patientID'))
      // const filteredDatabyId=patientmedicalhistories.find(da => da.patient ==localStorage.getItem('patientID'))
      const filteredDatabyId=patientmedicalhistories.filter(da => da.patient ==localStorage.getItem('patientID'));

      console.log(filteredDatabyId);
      filteredData = filteredDatabyId?.filter(item =>
          item.condition?.toLowerCase().includes(searchTerm.toLowerCase())
        );
  }
  else{
      filteredData = patientmedicalhistories?.filter(item =>
          item.condition?.toLowerCase().includes(searchTerm.toLowerCase())
        );
  }
  
  const handleView = (patientmedicalhistoryId,doctorName,patientName,index) => {
    //const dataitem=buses.find(da => da._id ==id)
    const datapatientmedicalhistory=getPatientMedicalHistoryById(patientmedicalhistoryId);
    // console.log(staffName,patientName,Name,roleName,index);
    navigate('getpatientmedicalhistory', { state: { patientmedicalhistory:datapatientmedicalhistory,doctor:doctorName,patient:patientName,idx:index+1} });
     
  };
  const handleEdit = async (patientmedicalhistoryId,doctor_id,patient_id) => {
    // const dataitem=buses.find(da => da._id ==id)
    const datapatientmedicalhistory=getPatientMedicalHistoryById(patientmedicalhistoryId);
    navigate('editpatientmedicalhistory', { state: { patientmedicalhistory:datapatientmedicalhistory,doctorId:doctor_id,patientId:patient_id} });

    //navigate('edituser', { state: { userId:id,name:Name,email:Email,phone:Phone,password:Password,roleId:role_id} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deletePatientMedicalHistory(id);
    // Call your delete API or function here
    //console.log("Deleted item with ID:", id);
    //setQuestions(prev => prev.filter(q => q._id !== id));
  }
  };
  // const getDriverName = (id) => {
  //   const result2= getDriverbyId(id);

  // };
  
const getPatientMedicalHistoryById = (id) => patientmedicalhistories.find(d => d._id === id);
const getDoctorById = (id) => doctors.find(d => d.staff === id);
const getPatientById = (id) => patients.find(d => d._id === id);
const getStaffById = (id) => staffs.find(d => d._id === id);

  useEffect(() => {
        const fetchData = async () => {
        //const result = await getQuizzes(); // Call context function
        const result = await getPatientMedicalHistories();
        const result3 = await getDoctors();
        const result4 = await getPatients();
        const result5 = await getStaffs();

        //setMyData(result);                     // Set state in same file
      };
  
      fetchData();
      }, []); //
      
  return (
   <div>
      {localStorage.getItem('utype')!=='patient' &&
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Patient Medical History</button>
      }
      <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>
        <h3 className="ms-2">Patient Medical Histories Data</h3>
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
           <th>Doctor</th>
            <th>Condition </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData && filteredData.map((row,index) => {
            const doctor = getDoctorById(row.doctor);
            const patient = getPatientById(row.patient);
            const staff = getStaffById(doctor?.staff);
            
            return(
            <tr key={row._id}>
              <td>{index+1}</td>
              {/* <td>{row.driver_id}</td> */}
              {/* {getDriverName(row.driver_id)}  */}
              
              <td>{patient?.firstName}</td>
              <td>{staff?.firstName}</td>
              <td>{row?.condition}</td>
                           
              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(row._id,staff?.firstName,patient?.firstName,index)}>
                View
              </button>
              {localStorage.getItem('utype')!=='patient'?
              (<>
              <button onClick={() => handleEdit(row._id,staff._id,row.patient)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
                Edit
              </button>
              
              <button onClick={() => handleDelete(row._id)} style={{ color:"white",backgroundColor:"red" }}>
                Delete
              </button></>):(null)
              }
              </td>
            </tr>
            )
            })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPatientMedicalHistory
