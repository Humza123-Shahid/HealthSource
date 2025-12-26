import React,{ useState, useEffect}from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../styles/scrollBar.css';

const Sidebar = () => {
   let navigate=useNavigate();
   const [selectedTab, setSelectedTab] = useState(
    localStorage.getItem("activeTab") || "Buses"
  );
   useEffect(() => {
    localStorage.setItem("activeTab", selectedTab);
  }, [selectedTab]);

   const handleLogout = () => {
        localStorage.removeItem("token");
        sessionStorage.setItem("reloaded", "false");
        setSelectedTab("login")
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
  // <div className="bg-dark text-white p-3 vh-100" style={{ width: '250px',backgroundColor: '#2c3e50',
    <div className="bg-dark text-white p-3" style={{ width: '250px',backgroundColor: '#2c3e50',
        color: 'white',
        // height: '100vh',
        height: '100%',
        position: 'sticky',
        top: 0,
        padding: '1rem',
        // overflow: 'hidden'
        overflowY: 'auto'
        }}>
    <h4 className="mb-4">Admin Dashboard</h4>
    <ul className="nav flex-column">
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="dashboard" onClick={()=>SelectedTab("dashboard")}><i className="fas fa-tachometer-alt me-2"></i> Dashboard</Link>
      </li>
       <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="user" onClick={()=>SelectedTab("user")}><i className="fas fa-user me-2"></i> User</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="patient" onClick={()=>SelectedTab("patient")}><i className="fas fa-plus me-2"></i> Patient</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="booking" onClick={()=>SelectedTab("booking")}><i className="fas fa-book me-2"></i> Booking</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="role" onClick={()=>SelectedTab("role")}><i className="fas fa-users me-2"></i> Role</Link>
      </li>
       <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="staff" onClick={()=>SelectedTab("staff")}><i className="fas fa-user-tie me-2"></i> Staff</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="shift" onClick={()=>SelectedTab("shift")}><i className="fas fa-clock me-2"></i> Shift</Link>
      </li>
       <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="doctor" onClick={()=>SelectedTab("doctor")}><i className="fas fa-user-md me-2"></i> Doctor</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="appointment" onClick={()=>SelectedTab("appointment")}><i className="fas fa-calendar me-2"></i> Appointment</Link>
      </li>
      <li className="nav-item mb-2">
        {/* <Link className="nav-link text-white" style={{color:'white'}} to="consultation" onClick={()=>SelectedTab("consultation")}><i className="fas fa-check me-2"></i> Consultation</Link> */}
        <Link className="nav-link text-white" style={{color:'white'}} to="consultation" onClick={()=>SelectedTab("consultation")}><i className="fas fa-inbox me-2"></i> Consultation</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="surgery" onClick={()=>SelectedTab("surgery")}><i className="fas fa-medkit me-2"></i> Surgery</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" to="surgeryteam" onClick={()=>SelectedTab("surgeryteam")}><i className="fas fa-mask-face me-2"></i> Surgery Team</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" to="operationtheatre" onClick={()=>SelectedTab("operationtheatre")}><i className="fas fa-bed-pulse me-2"></i> Operation Theatre</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" to="labtest" onClick={()=>SelectedTab("labtest")}><i className="fas fa-microscope me-2"></i> Lab Test</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" to="labrequest" onClick={()=>SelectedTab("labrequest")}><i className="fas fa-vial-circle-check me-2"></i> Lab Request</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" to="login" onClick={handleLogout}><i className="fas fa-sign-out me-2"></i>Logout</Link>
      </li>
    </ul>
  </div>
  );
};

export default Sidebar;