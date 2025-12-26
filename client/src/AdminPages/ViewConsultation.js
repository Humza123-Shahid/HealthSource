import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewConsultation = () => {
     const location = useLocation();
     const Consultation=location.state?.consultation || {};
    const AppointmentName=location.state?.appointment || {};
    const doctorName=location.state?.doctor || null;
    const patientName=location.state?.patient || null;
    const index=location.state?.idx;
    const formattedFollowUpDate = new Date(Consultation.followUpDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
  return (
    <div>
      <h1 className="ms-4">Consultation Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Appointment</th>
            <th>Symptoms</th>
            <th>Diagnosis</th>
            <th>Notes</th>
            <th>FollowUp Date</th>
            <th>Temperature</th>
            <th>Blood Pressure</th>
            <th>Pulse</th>
            <th>Oxygen Level</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{index}</td>
              <td>{patientName}</td>
              <td>{doctorName}</td>
              <td>{AppointmentName}</td>
              <td>{Consultation.symptoms}</td>
              <td>{Consultation.diagnosis}</td>
              <td>{Consultation.notes}</td>
              <td>{formattedFollowUpDate}</td>
              <td>{Consultation.vitals.temperature}</td>
              <td>{Consultation.vitals.bloodPressure}</td>
              <td>{Consultation.vitals.pulse}</td>
              <td>{Consultation.vitals.oxygenLevel}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewConsultation
