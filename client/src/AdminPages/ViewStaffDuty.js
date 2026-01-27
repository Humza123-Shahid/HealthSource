import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewStaffDuty = () => {
     const location = useLocation();
    const StaffDuty=location.state?.staffduty || {};
    const staffName=location.state?.staff || null;
    const shiftName=location.state?.shift || null;
    const index=location.state?.idx;
     const formattedDutyDate = new Date(StaffDuty.dutyDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
            // hour: 'numeric',
            // minute: 'numeric',
            // hour12: true // Ensures AM/PM
          });
  return (
    <div>
      <h1 className="ms-4">Staff Duty Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Staff</th>
            <th>Shift</th>
            <th>Duty Date</th>
            <th>Duty Type</th>
            <th>Status</th>

          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{index}</td>
              <td>{staffName}</td>
              <td>{shiftName}</td>
              <td>{formattedDutyDate}</td>
              <td>{StaffDuty.duty_type}</td>
              <td>{StaffDuty.status}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewStaffDuty
