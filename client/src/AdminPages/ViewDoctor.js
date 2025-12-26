import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewDoctor = () => {
     const location = useLocation();
    const Doctor=location.state?.doctor || {};
    const index=location.state?.idx;
     const Staffs=location.state?.staff || {};
     const Status=Doctor.onCall?"Available":"UnAvailable";
  return (
    <div>
      <h1 className="ms-4">Doctor Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Staff Name</th>
            <th>Specializations</th>
            <th>License Number</th>
            <th>Experience Years</th>
            <th>Consultation Fee</th>
            <th>On Call</th>
            <th>Signature Url</th>

          </tr>
        </thead>
        <tbody>
            <tr key={Doctor._id}>
              <td>{index}</td>
              <td>{Staffs.firstName}</td>
              <td>{Doctor.specializations}</td>
              <td>{Doctor.licenseNumber}</td>
              <td>{Doctor.experienceYears}</td>
              <td>{Doctor.consultationFee}</td>
              <td>{Status}</td>
              <td>{Doctor.signatureUrl}</td>

            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewDoctor
