import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from 'react-icons/fa';

const AdminNavbar = () => (
  <nav className="navbar navbar-expand navbar-light bg-light px-4">
    <span className="navbar-brand">Dashboard</span>
    {/* <Link to="/" className='ms-auto'>
  <span role="img" aria-label="Home" style={{ fontSize: '25px' }}>🏠</span>
</Link> */}
<Link to="/" className="frontend-link ms-auto">
          {/* Use the imported icon component */}
          {/* <FaHome style={{ fontSize: '22px' ,color:'rgba(0,0,0,0.9)'}} className="home-icon" /> 
          <span style={{color:'rgba(0,0,0,0.9)'}}>View Home</span> */}
          <div className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 cursor-pointer w-fit" style={{color:'rgba(0,0,0,0.9)'}}>
  <FaHome className="h-5 w-5" />
  <span className="font-semibold tracking-wide">Back to Home</span>
</div>
        </Link>
    {/* <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <a className="nav-link" href="#"><i className="fas fa-bell"></i></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#"><i className="fas fa-user"></i></a>
      </li>
    </ul> */}
  </nav>
);

export default AdminNavbar;