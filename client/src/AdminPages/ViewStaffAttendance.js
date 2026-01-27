import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewStaffAttendance = () => {
     const location = useLocation();
    const StaffAttendance=location.state?.staffattendance || {};
    const dutyDate=location.state?.dutydate || {};
    const staff2Name=location.state?.staff2name || {};
    // const Staff=location.state?.staff || {};
    // const Shift=location.state?.shift || {};
    const index=location.state?.idx;
//    const formattedCheckInTime = new Date(StaffAttendance.checkIn).toLocaleString('en-US', {
//         hour: 'numeric',
//         minute: 'numeric',
//         hour12: true // Ensures AM/PM
//     });
// const formattedCheckOutTime = new Date(StaffAttendance.checkOut).toLocaleString('en-US', {
//         hour: 'numeric',
//         minute: 'numeric',
//         hour12: true // Ensures AM/PM
//     });
//     const formattedDate = new Date(StaffAttendance?.date).toLocaleString('en-US', {
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit'
//     });
  return (
    <div>
      <h3 className="ms-4">Staff Attendances Data</h3>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            {/* <th>Staff</th> */}
            <th>Duty</th>
            {/* <th>Date</th>
            <th>Check In Time</th>
            <th>Check Out Time</th> */}
            {/* <th>Shift</th> */}
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            <tr key={StaffAttendance._id}>
              <td>{index}</td>
              {/* <td>{Staff.firstName}</td> */}
              <td>{dutyDate}-{staff2Name}</td>
              {/* <td>{formattedDate}</td>
              <td>{formattedCheckInTime}</td>
              <td>{formattedCheckOutTime}</td> */}
              {/* <td>{Shift.name}</td> */}
              <td>{StaffAttendance.status}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewStaffAttendance
