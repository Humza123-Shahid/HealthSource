import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewBed = () => {
     const location = useLocation();
    const Bed=location.state?.bed || {};
    const index=location.state?.idx;
     const Rooms=location.state?.room || {};
  return (
    <div>
      <h1 className="ms-4">Bed Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Room</th>
            <th>Bed Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Bed._id}>
              <td>{index}</td>
              <td>{Rooms.roomNumber}</td>
              <td>{Bed.bedNumber}</td>
              <td>{Bed.status}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewBed
