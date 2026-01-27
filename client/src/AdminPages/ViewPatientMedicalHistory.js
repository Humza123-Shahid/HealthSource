import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewPatientMedicalHistory = () => {
     const location = useLocation();
    const PatientMedicalHistory=location.state?.patientmedicalhistory || {};
    const doctorName=location.state?.doctor || null;
    const patientName=location.state?.patient || null;
    const index=location.state?.idx;
  return (
    <div>
      <h1 className="ms-4">Patient Medical History Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Condition</th>
            <th>Treatment</th>
            <th>Status</th>
            <th>Notes</th>

          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{index}</td>
              <td>{patientName}</td>
              <td>{doctorName}</td>
              <td>{PatientMedicalHistory.condition}</td>
              <td>{PatientMedicalHistory.treatment}</td>
              <td>{PatientMedicalHistory.status}</td>
              <td>{PatientMedicalHistory.notes}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewPatientMedicalHistory
