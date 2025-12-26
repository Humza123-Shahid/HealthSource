import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewSurgeryTeam = () => {
     const location = useLocation();
    const SurgeryTeam=location.state?.surgeryteam || {};
    const surgeryName=location.state?.surgery || "";
    const staffName=location.state?.staff || "";
    const index=location.state?.idx;

  return (
    <div>
      <h1 className="ms-4">Surgery Team Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Surgery</th>
            <th>Staff</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
            <tr key={SurgeryTeam._id}>
              <td>{index}</td>
              <td>{surgeryName}</td>
              <td>{staffName}</td>
              <td>{SurgeryTeam?.role}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewSurgeryTeam
