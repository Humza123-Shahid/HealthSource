import React,{useState,useContext,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import shiftContext from '../context/shiftContext'

const ViewStaff = () => {
     const location = useLocation();
    const Staff=location.state?.staff || {};
    const index=location.state?.idx;
     const context2=useContext(shiftContext);
    const {shifts,getShifts}=context2;
    const targetShift = shifts?.find(shift => shift._id == Staff.shift);
    const formattedBirthDate = new Date(Staff?.dob).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
            // hour: 'numeric',
            // minute: 'numeric',
            // hour12: true // Ensures AM/PM
          });
          const formattedJoiningDate = new Date(Staff?.joiningDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
    useEffect(() => {
               const fetchData = async () => {
        
                const result=await getShifts()
               
    
              };
              fetchData();
    }, []); 
  return (
    <div>
      <h1 className="ms-4">Staff Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Designation</th>
            <th>National Id</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Qualification</th>
            <th>Joining Date</th>
            <th>Employment Type</th>
            <th>Salary</th>
            <th>Shift</th>
            <th>Photo Url</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Staff._id}>
              <td>{index}</td>
              <td>{Staff?.firstName}</td>
              <td>{Staff.lastName}</td>
              <td>{Staff.designation}</td>
              <td>{Staff.nationalId}</td>
              <td>{Staff.gender}</td>
              <td>{formattedBirthDate}</td>
              <td>{Staff.address}</td>
              
              <td>{Staff.contact}</td>
              
              <td>{Staff.qualification}</td>
              <td>{formattedJoiningDate}</td>
              <td>{Staff?.employmentType}</td>
              <td>{Staff.salary}</td>
              <td>{targetShift?.name}</td>
              <td>{Staff.photoUrl}</td>
              <td>{Staff.status}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewStaff
