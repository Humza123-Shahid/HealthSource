import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewRole = () => {
     const location = useLocation();
    const Role=location.state?.role || {};
    const index=location.state?.idx;
  return (
    <div>
      <h1 className="ms-4">Role Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Permissions</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Role._id}>
              <td>{index}</td>
              <td>{Role.name}</td>
              <td>{Role.permissions}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewRole
