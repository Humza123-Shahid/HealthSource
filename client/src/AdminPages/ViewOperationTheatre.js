import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewOperationTheatre = () => {
     const location = useLocation();
    const OperationTheatre=location.state?.operationtheatre || {};
    const index=location.state?.idx;
  return (
    <div>
      <h1 className="ms-4 mobile-margin">Operation Theatre Data</h1>
      <div className="dashboard-content">
      <table  className="styled-table ms-4 mobile-margin">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Equipment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            <tr key={OperationTheatre._id}>
              <td>{index}</td>
              <td>{OperationTheatre.name}</td>
              <td>{OperationTheatre.equipment}</td>
              <td>{OperationTheatre.status}</td>
            </tr>
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default ViewOperationTheatre
