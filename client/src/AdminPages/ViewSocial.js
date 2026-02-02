import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewSocial = () => {
     const location = useLocation();
    const Social=location.state?.social || {};
    const index=location.state?.idx;
  return (
    <div>
      <h1 className="ms-4">Social Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Platform Name</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Social._id}>
              <td>{index}</td>
              <td>{Social.platformName}</td>
              <td>{Social.url}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewSocial
