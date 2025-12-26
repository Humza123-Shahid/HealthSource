import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewSurgery = () => {
     const location = useLocation();
    const Surgery=location.state?.surgery || {};
    const patientName=location.state?.patient || "";
    const doctorName=location.state?.doctor || "";
    const operationName=location.state?.operation || "";
    const index=location.state?.idx;
    const formattedStartTime = new Date(Surgery.startTime).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true // Ensures AM/PM
    });
     const formattedEndTime = new Date(Surgery.endTime).toLocaleString('en-US', {
      // year: 'numeric',
      // month: '2-digit',
      // day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true // Ensures AM/PM
    });
     const formattedScheduledDate = new Date(Surgery?.scheduledDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });

  return (
    <div>
      <h1 className="ms-4">Surgery Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Patient</th>
            <th>Primary Surgeon</th>
            <th>Type</th>
            <th>Scheduled Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Operation Theatre</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Surgery._id}>
              <td>{index}</td>
              <td>{patientName}</td>
              <td>{doctorName}</td>
              <td>{Surgery.type}</td>
              <td>{formattedScheduledDate}</td>
              <td>{formattedStartTime}</td>
              <td>{formattedEndTime}</td>
              <td>{operationName}</td>
              <td>{Surgery.notes}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewSurgery
