import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewLabResult = () => {
     const location = useLocation();
    const LabResult=location.state?.labresult || {};
     const labrequestName=location.state?.labrequest || {};
    const labtestName=location.state?.labtest || {};
    const index=location.state?.idx;
    const formattedResultDate = new Date(LabResult.resultDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
  return (
    <div>
      <h1 className="ms-4">Lab Result Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Lab Request</th>
            <th>Test</th>
            <th>Result Value</th>
            <th>Units</th>
            <th>Remarks</th>
            <th>File Path</th>
            <th>Result Date</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{index}</td>
              <td>{labrequestName}</td>
              <td>{labtestName}</td>
              <td>{LabResult.resultValue}</td>
              <td>{LabResult.units}</td>
              <td>{LabResult.remarks}</td>
              <td>{LabResult.filePath}</td> 
              <td>{formattedResultDate}</td>
              
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewLabResult
