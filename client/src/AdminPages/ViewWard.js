import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewWard = () => {
     const location = useLocation();
    const Ward=location.state?.ward || {};
    const index=location.state?.idx;
  return (
    <div>
      <h1 className="ms-4">Beverage Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Total Rooms</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Ward._id}>
              <td>{index}</td>
              <td>{Ward.name}</td>
              <td>{Ward.type}</td>
              <td>{Ward.totalRooms}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewWard
