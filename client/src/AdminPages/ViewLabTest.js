import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewLabTest = () => {
     const location = useLocation();
    const LabTest=location.state?.labtest || {};
    const index=location.state?.idx;
  return (
    <div>
      <h1 className="ms-4">Lab Test Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Normal Range</th>
            <th>Price</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
            <tr key={LabTest._id}>
              <td>{index}</td>
              <td>{LabTest.name}</td>
              <td>{LabTest.category}</td>
              <td>{LabTest.normalRange}</td>
              <td>{LabTest.price}</td>
              <td>{LabTest.code}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewLabTest
