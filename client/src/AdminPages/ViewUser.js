import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewUser = () => {
     const location = useLocation();
    const Name=location.state?.name || {};
    const staffName=location.state?.staff || null;
    const Email=location.state?.email || null;
    const roleName=location.state?.role|| null;
    const index=location.state?.idx;

  return (
    <div>
      <h1 className="ms-4">User Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Staff</th>
            <th>Email Address</th>
            <th>User Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{index}</td>
              <td>{staffName}</td>
              <td>{Email}</td>
              <td>{Name}</td>
              <td>{roleName}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewUser
