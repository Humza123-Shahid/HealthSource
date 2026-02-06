import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import doctorContext from '../context/doctorContext'
import staffContext from '../context/staffContext'

import { useNavigate,useLocation, data} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminDoctor = () => {
    const context=useContext(doctorContext);
    const {doctors,deleteDoctor,getDoctors}=context;
     const context2=useContext(staffContext);
    const {staffs,getStaffs}=context2;
    const navigate = useNavigate();
    let filteredData;
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = () => {
        navigate('adddoctor');

  };
  const handleSearchClick = () => {
        console.log("abc")

  };
  // useEffect(() => {
  //   const storedCount = localStorage.getItem("qcount");
  //   if (storedCount !== null) {
  //     setQcount(Number(storedCount));
  //   }
  // }, []);
  // const filteredData = doctors.filter(item =>
  //     item.specializations?.toLowerCase().includes(searchTerm.toLowerCase())||
  //     item.licenseNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  if(localStorage.getItem('utype')=='doctor')
  {
    console.log(localStorage.getItem('doctorID'))
      // const filteredDatabyId=patientmedicalhistories.find(da => da.patient ==localStorage.getItem('patientID'))
      const filteredDatabyId=doctors.filter(da => da.staff ==localStorage.getItem('doctorID'));

      console.log(filteredDatabyId);
      filteredData = filteredDatabyId?.filter(item =>
          item.specializations?.toLowerCase().includes(searchTerm.toLowerCase())||
          item.licenseNumber?.toLowerCase().includes(searchTerm.toLowerCase())
        );
  }
  else{
      filteredData = doctors?.filter(item =>
          item.specializations?.toLowerCase().includes(searchTerm.toLowerCase())||
          item.licenseNumber?.toLowerCase().includes(searchTerm.toLowerCase())
        );
  }
  const handleView = (id,index,staffId) => {
    const dataitem=doctors.find(da => da._id ==id)
     //const datacat=getCategoryById(catId);
          const datastaff=getStaffById(staffId);

    navigate('getdoctor', { state: { doctor:dataitem,idx:index,staff:datastaff} });
     
  };
  const handleEdit = (id,staffId) => {
    const dataitem=doctors.find(da => da._id ==id)
    const datastaff=getStaffById(staffId);
    console.log(datastaff)
    //const datacat=getCategoryById(catId);
    navigate('editdoctor', { state: { doctor:dataitem} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deleteDoctor(id);
    // Call your delete API or function here
    //console.log("Deleted item with ID:", id);
    //setQuestions(prev => prev.filter(q => q._id !== id));
  }
  };
  const getStaffById = (id) => staffs.find(d => d._id === id);

  useEffect(() => {
        const fetchData = async () => {
        //const result = await getQuizzes(); // Call context function
        const result = await getDoctors();
        const result2 = await getStaffs();

        //const result2 = await getExpenceCategories();

        //setMyData(result);                     // Set state in same file
      };
  
      fetchData();
      }, []); //
  return (
   <div>
    {localStorage.getItem('utype')!=='doctor' &&
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Doctor</button>
    }
      <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>
        <h3 className="ms-2">Doctor Data</h3>
        <div className="me-5" style={{display: 'flex',
      alignItems: 'center',
      border: '1px solid #ccc',
      borderRadius: '20px',
      padding: '0px 15px'}}>
        <input
          type="text"
          placeholder="Search..."
          className="me-2 mt-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{border: 'none',
      outline: 'none',
      flexGrow: '1',
      padding: '5px',
      fontSize: '16px'}}
        />
        <FaSearch style={{color: '#888',marginLeft: '0px',cursor:'pointer'}} onClick={handleSearchClick}/>
        </div>
      </div>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Staff Name</th>
            <th>Specializations</th>
            <th>License Number</th>
            <th>Experience Years</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row,index) => {
            const StaffName = getStaffById(row.staff);
            return(
            <tr key={row._id}>
              <td>{index+1}</td>
              <td>{StaffName?.firstName}</td>
              <td>{row.specializations}</td>
              <td>{row.licenseNumber}</td>
              <td>{row.experienceYears}</td>
             
              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(row._id,index+1,row.staff)}>
                View
              </button>
              {localStorage.getItem('utype')!=='doctor' &&
              <button onClick={() => handleEdit(row._id,row.staff)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
                Edit
              </button>
              &&
              <button onClick={() => handleDelete(row._id)} style={{ color:"white",backgroundColor:"red" }}>
                Delete
              </button>
              }
              </td>
            </tr>)
        })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDoctor
