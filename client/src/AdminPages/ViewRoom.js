import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewRoom = () => {
     const location = useLocation();
    const Room=location.state?.room || {};
    const index=location.state?.idx;
     const Wards=location.state?.ward || {};
  return (
    <div>
      <h1 className="ms-4 mobile-margin">Room Data</h1>
      <div className="dashboard-content">
      <table  className="styled-table ms-4 mobile-margin">
        <thead>
          <tr>
            <th>#</th>
            <th>Ward</th>
            <th>Room Number</th>
            <th>Type</th>
            <th>Charges Per Day</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Room._id}>
              <td>{index}</td>
              <td>{Wards.name}</td>
              <td>{Room.roomNumber}</td>
              <td>{Room.type}</td>
              <td>{Room.chargesPerDay}</td>
            </tr>
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default ViewRoom
