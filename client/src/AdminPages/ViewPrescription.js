import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewPrescription = () => {
     const location = useLocation();
     const Prescription=location.state?.prescription || {};
    const medicineName=location.state?.medicine || null;
    const consultationName=location.state?.consultation || null;
    const doctorName=location.state?.doctor || null;
    const patientName=location.state?.patient || null;
    const index=location.state?.idx;
    const formattedIssuedDate = new Date(Prescription.issuedDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
  return (
    <div>
      <h1 className="ms-4">Prescription Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Consultation</th>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Issued Date</th>
            <th>Notes</th>
            <th>Medicine</th>
            <th>Dosage</th>
            <th>Frequency</th>
            <th>Duration</th>
            <th>Instructions</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{index}</td>
              <td>{consultationName}</td>
              <td>{doctorName}</td>
              <td>{patientName}</td>
              <td>{formattedIssuedDate}</td>
              <td>{Prescription.notes}</td>
              <td>{medicineName}</td>
              <td>{Prescription.medicines.dosage}</td>
              <td>{Prescription.medicines.frequency}</td>
              <td>{Prescription.medicines.duration}</td>
              <td>{Prescription.medicines.instructions}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewPrescription
