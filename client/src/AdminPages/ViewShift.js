import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewShift = () => {
     const location = useLocation();
    const Shift=location.state?.shift || {};
    const index=location.state?.idx;
    const formattedStartTime = new Date(Shift.startTime).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true // Ensures AM/PM
    });
     const formattedEndTime = new Date(Shift.endTime).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true // Ensures AM/PM
    });
  return (
    <div>
      <h1 className="ms-4">Shift Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Break Minutes</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Shift._id}>
              <td>{index}</td>
              <td>{Shift.name}</td>
              <td>{formattedStartTime}</td>
              <td>{formattedEndTime}</td>
              <td>{Shift.breakMinutes}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewShift
