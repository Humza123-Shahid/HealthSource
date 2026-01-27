import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewLabRequest = () => {
     const location = useLocation();
     const LabRequest=location.state?.labrequest || {};
    const labtestName=location.state?.labtest || {};
    const doctorName=location.state?.doctor || null;
    const patientName=location.state?.patient || null;
    const index=location.state?.idx;
    const formattedRequestDate = new Date(LabRequest.requestDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
  return (
    <div>
      <h1 className="ms-4">Lab Request Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Patient</th>
           <th>Doctor</th>
           <th>Test</th>
           <th>Request Date</th>
           <th>Priority</th>
           <th>Status</th>
           <th>Notes</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{index}</td>
              <td>{patientName}</td>
              <td>{doctorName}</td>
              <td>{labtestName}</td>
              <td>{formattedRequestDate}</td>
              <td>{LabRequest.priority}</td>
              <td>{LabRequest.status}</td>
              <td>{LabRequest.notes}</td>
              
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewLabRequest
