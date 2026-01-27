import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewNurse = () => {
     const location = useLocation();
    const Nurse=location.state?.nurse || {};
    const index=location.state?.idx;
    const Staffs=location.state?.staff || {};
    const Wards=location.state?.ward || {};
  return (
    <div>
      <h1 className="ms-4">Nurse Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Staff</th>
            <th>Qualification</th>
            <th>License Number</th>
            <th>Assigned Ward</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Nurse._id}>
              <td>{index}</td>
              <td>{Staffs.firstName}</td>
              <td>{Nurse.qualification}</td>
              <td>{Nurse.licenseNumber}</td>
              <td>{Wards.name}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewNurse
