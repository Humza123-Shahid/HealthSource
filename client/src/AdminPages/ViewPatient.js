import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewPatient = () => {
     const location = useLocation();
    const Patient=location.state?.patient || {};
    const index=location.state?.idx;
    const formattedBirthDate = new Date(Patient?.dateOfBirth).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
            // hour: 'numeric',
            // minute: 'numeric',
            // hour12: true // Ensures AM/PM
          });
     const formattedRegistrationDate = new Date(Patient?.registrationDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
            // hour: 'numeric',
            // minute: 'numeric',
            // hour12: true // Ensures AM/PM
          });
  return (
    <div>
      <h1 className="ms-4">Patient Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Father Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Age</th>
            <th>National Id</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Marital Status</th>
            <th>Blood Group</th>
            <th>Disabilities</th>
            <th>Chronic Conditions</th>
            <th>Registration Date</th>
            <th>Photo Url</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Patient._id}>
              <td>{index}</td>
              <td>{Patient?.firstName}</td>
              <td>{Patient.lastName}</td>
              <td>{Patient.fatherName}</td>
              <td>{Patient.gender}</td>
              <td>{formattedBirthDate}</td>
              <td>{Patient?.age}</td>
              <td>{Patient.nationalId}</td>
              <td>{Patient.contact}</td>
              <td>{Patient.address}</td>
              <td>{Patient.maritalStatus}</td>
              <td>{Patient.bloodGroup}</td>
              <td>{Patient?.disabilities}</td>
              <td>{Patient.chronicConditions}</td>
              <td>{formattedRegistrationDate}</td>
              <td>{Patient.photoUrl}</td>
              <td>{Patient.status}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewPatient
