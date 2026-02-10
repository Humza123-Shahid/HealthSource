import React,{ useState, useEffect,useContext}from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../styles/scrollBar.css';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import roleContext from '../context/roleContext'

// import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import logo from '../img/HealthSourceLogo.png';

const Sidebar = () => {
   const context=useContext(roleContext);
      const {roles2,setRoles2,getRolesbyName}=context;
    const [permissions,setPermissions]=useState([])
   let navigate=useNavigate();
   const [selectedTab, setSelectedTab] = useState(
    localStorage.getItem("activeTab") || "Buses"
  );
   useEffect(() => {
    localStorage.setItem("activeTab", selectedTab);

  }, [selectedTab]);
useEffect(() => {
  console.log(localStorage.getItem('utype'));
    getRolesbyName(localStorage.getItem('utype'));
   
  }, []);
useEffect(() => {
 console.log(roles2);
  roles2.forEach((role, index) => {
  console.log(`Permission at index ${index}: ${role.permissions}`);
setPermissions(prevPermissions => [...prevPermissions, role.permissions]); 
});
  }, [roles2]);
  useEffect(() => {
 console.log(permissions);
  }, [permissions]);
   const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("utype");
        sessionStorage.setItem("reloaded", "false");
        setSelectedTab("login")
        setPermissions([]);
        setRoles2([]);
        //  navigate('/login')
        // Optionally, redirect to a login page or home page after logout
        // history.push('/login'); // If using useHistory hook
      };
      const SelectedTab = (abc) => {
        
        setSelectedTab(abc)
        // Optionally, redirect to a login page or home page after logout
        // history.push('/login'); // If using useHistory hook
      };
  return(
  // <div className="bg-dark text-black p-3 vh-100" style={{ width: '250px',backgroundColor: '#2c3e50',
    <div className="bg-white text-black p-2" style={{ width: '270px',backgroundColor: 'white',
        color: 'black',
        // height: '100%',
        height: '100vh',
        position: 'sticky',
        top: 0,
        padding: '1rem',
        //overflow: 'hidden'
        overflowY: 'auto'
        }}>
    <div style={{'display':"flex",
    'flex-direction':'row',
  'justifyContent':"center",
  'alignItems':"center",
  'minHeight':"10vh"}} >
        {/* <h4 className="mb-1" style={{'color':'black'}}>Admin Dashboard</h4> */}
        <img src={logo} style={{'width':'100%'}}></img>
    {/* <LocalHospitalIcon sx={{ fontSize: '3.5rem' }}  /> */}
    
  </div>
  {/* <hr /> */}
    <ul className="nav flex-column">
      {/* <li className="nav-item mb-2">
        <Link className="nav-link text-black" style={{color:'black'}} to="dashboard" onClick={()=>SelectedTab("dashboard")}><i className="fas fa-tachometer-alt me-2"></i> Dashboard</Link>
      </li> */}
      {permissions.includes('User') && (
       <li className="nav-item mb-2">
        <Link className="nav-link "  to="user" onClick={()=>SelectedTab("user")}><i className="iconcolor fas fa-user me-2"></i> User</Link>
      </li>
      )}
      {permissions.includes('Patient') && (
      <li className="nav-item mb-2">
        <Link className="nav-link "  to="patient" onClick={()=>SelectedTab("patient")}><i className="iconcolor fas fa-plus me-2"></i> Patient</Link>
      </li>
      )}
      {permissions.includes('Patient Medical History') && (

      <li className="nav-item mb-2">
        <Link className="nav-link "  to="patientmedicalhistory" onClick={()=>SelectedTab("patientmedicalhistory")}><i className="iconcolor fas fa-book-medical me-2"></i> Patient Medical History</Link>
      </li>
      )}
      {permissions.includes('Role') && (

      <li className="nav-item mb-2">
        <Link className="nav-link "  to="role" onClick={()=>SelectedTab("role")}><i className="iconcolor fas fa-users me-2"></i> Role</Link>
      </li>
      )}
  
      {permissions.includes('Staff') && (

       <li className="nav-item mb-2">
        <Link className="nav-link "  to="staff" onClick={()=>SelectedTab("staff")}><i className="iconcolor fas fa-user-tie me-2"></i> Staff</Link>
      </li>
      )}
      {permissions.includes('Shift') && (

      <li className="nav-item mb-2">
        <Link className="nav-link "  to="shift" onClick={()=>SelectedTab("shift")}><i className="iconcolor fas fa-clock me-2"></i> Shift</Link>
      </li>
      )}

      {permissions.includes('Staff Duty') && (

      <li className="nav-item mb-2">
        <Link className="nav-link "  to="staffduty" onClick={()=>SelectedTab("staffduty")}><i className="iconcolor fas fa-tasks me-2"></i>Staff Duty</Link>
      </li>
      )}
      
      {permissions.includes('Department') && (

       <li className="nav-item mb-2">
        <Link className="nav-link "  to="department" onClick={()=>SelectedTab("department")}><i className="iconcolor far fa-building me-2" aria-hidden="true"></i> Department</Link>
      </li>
      )}
      {permissions.includes('Doctor') && (

       <li className="nav-item mb-2">
        <Link className="nav-link "  to="doctor" onClick={()=>SelectedTab("doctor")}><i className="iconcolor fas fa-user-md me-2"></i> Doctor</Link>
      </li>
      )}

      {permissions.includes('Appointment') && (

      <li className="nav-item mb-2">
        <Link className="nav-link "  to="appointment" onClick={()=>SelectedTab("appointment")}><i className="iconcolor fas fa-calendar me-2"></i> Appointment</Link>
      </li>
      )}

      {permissions.includes('Consultation') && (

      <li className="nav-item mb-2">
        {/* <Link className="nav-link "  to="consultation" onClick={()=>SelectedTab("consultation")}><i className="fas fa-check me-2"></i> Consultation</Link> */}
        <Link className="nav-link "  to="consultation" onClick={()=>SelectedTab("consultation")}><i className="iconcolor fas fa-inbox me-2"></i> Consultation</Link>
      </li>
      )}

      {permissions.includes('Surgery') && (

      <li className="nav-item mb-2">
        <Link className="nav-link "  to="surgery" onClick={()=>SelectedTab("surgery")}><i className="iconcolor fas fa-medkit me-2"></i> Surgery</Link>
      </li>
      )}

      {permissions.includes('Surgery Team') && (

      <li className="nav-item mb-2">
        <Link className="nav-link "  to="surgeryteam" onClick={()=>SelectedTab("surgeryteam")}><i className="iconcolor fas fa-mask-face me-2"></i> Surgery Team</Link>
      </li>
      )}

      {permissions.includes('Operation Theatre') && (

      <li className="nav-item mb-2">
        <Link className="nav-link "  to="operationtheatre" onClick={()=>SelectedTab("operationtheatre")}><i className="iconcolor fas fa-bed-pulse me-2"></i> Operation Theatre</Link>
      </li>
      )}

      {permissions.includes('Medicine') && (

      <li className="nav-item mb-2">
        <Link className="nav-link "  to="medicine" onClick={()=>SelectedTab("medicine")}><i className="iconcolor fas fa-tablets me-2"></i> Medicine</Link>
      </li>
      )}

      {permissions.includes('Prescription') && (

       <li className="nav-item mb-2">
        <Link className="nav-link "  to="prescription" onClick={()=>SelectedTab("prescription")}><i className="iconcolor fas fa-prescription me-2"></i> Prescription</Link>
      </li>
      )}

      {permissions.includes('Lab Test') && (

      <li className="nav-item mb-2">
        <Link className="nav-link "  to="labtest" onClick={()=>SelectedTab("labtest")}><i className="iconcolor fas fa-microscope me-2"></i> Lab Test</Link>
      </li>
      )}

      {permissions.includes('Lab Request') && (

      <li className="nav-item mb-2">
        <Link className="nav-link "  to="labrequest" onClick={()=>SelectedTab("labrequest")}><i className="iconcolor fas fa-vial-circle-check me-2"></i> Lab Request</Link>
      </li>
      )}

      {permissions.includes('Lab Result') && (

      <li className="nav-item mb-2">
        <Link className="nav-link "  to="labresult" onClick={()=>SelectedTab("labresult")}><i className="iconcolor fas fa-info-circle me-2"></i> Lab Result</Link>
      </li>
      )}

      {permissions.includes('Ward') && (

      <li className="nav-item mb-2">
        <Link className="nav-link "  to="ward" onClick={()=>SelectedTab("ward")}><i className="iconcolor fas fa-house-medical me-2"></i> Ward</Link>
      </li>
      )}

      {permissions.includes('Room') && (

      <li className="nav-item mb-2">
        <Link className="nav-link "  to="room" onClick={()=>SelectedTab("room")}><i className="iconcolor fas fa-door-open me-2"></i>Room</Link>
      </li>
      )}

      {permissions.includes('Bed') && (

      <li className="nav-item mb-2">
        <Link className="nav-link "  to="bed" onClick={()=>SelectedTab("bed")}><i className="iconcolor fas fa-bed me-2"></i>Bed</Link>
      </li>
      )}

      {permissions.includes('Nurse') && (

       <li className="nav-item mb-2">
        <Link className="nav-link "  to="nurse" onClick={()=>SelectedTab("nurse")}><i className="iconcolor fas fa-user-nurse me-2"></i>Nurse</Link>
      </li>
      )}

      {permissions.includes('Admission') && (

      <li className="nav-item mb-2">
        <Link className="nav-link "  to="admission" onClick={()=>SelectedTab("admission")}><i className="iconcolor fas fa-plus-square me-2"></i>Admission</Link>
      </li>
      )}

      {permissions.includes('Staff Attendance') && (

      <li className="nav-item mb-2">
        <Link className="nav-link "  to="staffattendance" onClick={()=>SelectedTab("staffattendance")}><i className="iconcolor fas fa-fingerprint me-2"></i>Staff Attendance</Link>
      </li>
      )}

      {permissions.includes('Social') && (

      <li className="nav-item mb-2">
        <Link className="nav-link "  to="social" onClick={()=>SelectedTab("social")}><i className="iconcolor fas fa-hashtag me-2"></i>Social</Link>
      </li>
      )}      
      <li className="nav-item mb-2">
      <Link className="nav-link "  to="/login" onClick={handleLogout}><i className="iconcolor fas fa-sign-out me-2"></i>Logout</Link>
      </li>
    </ul>
  </div>
  );
};

export default Sidebar;