import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewAdmission = () => {
     const location = useLocation();
     const Admission=location.state?.admission || {};
    const wardName=location.state?.ward || {};
    const roomName=location.state?.room || {};
    const bedName=location.state?.bed || {};
    const doctorName=location.state?.doctor || null;
    const patientName=location.state?.patient || null;
    const index=location.state?.idx;
    const formattedAdmissionDate = new Date(Admission.admissionDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
    const formattedDischargeDate = new Date(Admission.dischargeDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
  return (
    <div>
      <h1 className="ms-4">Lab Request Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Patient</th>
           <th>Admitting Doctor</th>
           <th>Ward</th>
           <th>Room</th>
           <th>Bed</th>
           <th>Admission Date</th>
           <th>Discharge Date</th>
           <th>Reason</th>
           <th>Condition On Admission</th>
           <th>Status</th>

          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{index}</td>
              <td>{patientName}</td>
              <td>{doctorName}</td>
              <td>{wardName}</td>
              <td>{roomName}</td>
              <td>{bedName}</td>

              <td>{formattedAdmissionDate}</td>
              <td>{formattedDischargeDate}</td>

              <td>{Admission.reason}</td>
              <td>{Admission.conditionOnAdmission}</td>
              <td>{Admission.status}</td>
              
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewAdmission
