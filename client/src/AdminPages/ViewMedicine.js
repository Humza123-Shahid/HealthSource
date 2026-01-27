import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewMedicine = () => {
     const location = useLocation();
    const Medicine=location.state?.medicine || {};
   
    const index=location.state?.idx;
     const formattedExpiryDate = new Date(Medicine.expiryDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
  return (
    <div>
      <h1 className="ms-4">Medicine Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
           <th>Category</th>
            <th>Manufacturer</th>
            <th>Form</th>
            <th>Unit Price</th> 
            <th>Stock</th>
            <th>Expiry Date</th>
            <th>Batch Number</th>
            <th>Upc</th> 
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{index}</td>
              <td>{Medicine.name}</td>
              <td>{Medicine.category}</td>
              <td>{Medicine.manufacturer}</td>
              <td>{Medicine.form}</td>
              <td>{Medicine.unitPrice}</td>
              <td>{Medicine.stock}</td>
              <td>{formattedExpiryDate}</td>          
              <td>{Medicine.batchNumber}</td>
              <td>{Medicine.upc}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewMedicine
