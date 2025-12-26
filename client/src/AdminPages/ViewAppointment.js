import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewAppointment = () => {
     const location = useLocation();
    const Appointment=location.state?.appointment || {};
    const doctorName=location.state?.doctor || null;
    const patientName=location.state?.patient || null;
    const index=location.state?.idx;
     const formattedAppointmentDate = new Date(Appointment.appointmentDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
  return (
    <div>
      <h1 className="ms-4">Appointment Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Booking Type</th>
            <th>Status</th>
            <th>Notes</th>

          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{index}</td>
              <td>{patientName}</td>
              <td>{doctorName}</td>
              <td>{formattedAppointmentDate}</td>
              <td>{Appointment.appointmentTime}</td>
              <td>{Appointment.bookingType}</td>
              <td>{Appointment.status}</td>
              <td>{Appointment.notes}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewAppointment
