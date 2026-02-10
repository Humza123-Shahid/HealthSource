import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewDepartment = () => {
     const location = useLocation();
    const Department=location.state?.department || {};
    const index=location.state?.idx;
     const Staffs=location.state?.staff || {};
  return (
    <div>
      <h1 className="ms-4">Department Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Head Of Department</th>
            <th>Name</th>
            <th>Code</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Department._id}>
              <td>{index}</td>
              <td>{Staffs.firstName}</td>
              <td>{Department.name}</td>
              <td>{Department.code}</td>
              <td>{Department.description}</td>

            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewDepartment
