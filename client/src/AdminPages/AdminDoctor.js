import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import '../styles/pagination.css';
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
    const [entries, setEntries] = useState(10);
                  const [page, setPage] = useState(1);
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
    const totalPages = Math.ceil(filteredData.length / entries);
  const startIndex = (page - 1) * entries;
  const currentData = filteredData.slice(startIndex, startIndex + entries);
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
      useEffect(() => {
                                     
                      console.log(doctors.length)
                      if(doctors.length>200&&doctors.length<401){
                          setEntries(25)
                        }
                        else  if(doctors.length>400&&doctors.length<701){
                          setEntries(50)
                        }
                        else  if(doctors.length>700){
                          setEntries(100)
                        }
                      
                      }, [doctors]); //
  return (
   <div>
    {localStorage.getItem('utype')!=='doctor' &&
      <button className="btn btn-primary mt-3 ms-4 mobile-margin" onClick={handleClick}>Add Doctor</button>
    }
      {/* <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}> */}
        <h3 className="ms-4 mobile-margin" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>Doctor Data</h3>
        <div className="ms-4 d-flex change-flex justify-content-between mobile-margin" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>
        <div style={{
                    margin: '11px 0px 0px 0px',
     color: '#333'}}>
          <select
            value={entries}
            onChange={(e) => setEntries(Number(e.target.value))}
            style={{
                padding: '4px',
    border: '1px solid #aaa',
    borderRadius:'3px',
    width: '56px'}}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>{" "}
          entries per page
        </div>
        <div className="me-5" style={{display: 'flex',
      alignItems: 'center',
      border: '1px solid #ccc',
      borderRadius: '20px',
      padding: '0px 15px',
      width:'250px'}}>
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
      {/* </div> */}
      <div className="dashboard-content">
      <table  className="styled-table ms-4 mobile-margin">
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
          {currentData.map((row,index) => {
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
              {localStorage.getItem('utype')!=='doctor'? 
              (<>
              <button onClick={() => handleEdit(row._id,row.staff)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
                Edit
              </button>
              
              <button onClick={() => handleDelete(row._id)} style={{ color:"white",backgroundColor:"red" }}>
                Delete
              </button>
              </>):(null)
              }
              </td>
            </tr>)
        })}
        </tbody>
      </table>
      </div>
      {/* Bottom Controls */}
      <div
      className='change-flex'
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <div  style={{
              margin: '5px 0px 0px 26px',
    minWidth: '230px',
     color: '#333'
        }}
        className='mobile-margin'
        >
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + entries, filteredData.length)} of{" "}
          {filteredData.length} entries
        </div>

        <div className="dt-paging" style={{
                margin: '0px 0px 15px 0px'}}
        >
          <button 
          className={page === 1 ? 'dt-paging-button disabled' : 'dt-paging-button'}
          disabled={page === 1} onClick={() => setPage(page - 1)}
              >
            {"‹"}
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
            
              key={i}
              onClick={() => setPage(i + 1)}
              className={page === i+1 ? 'dt-paging-button current' : 'dt-paging-button none'}
            >
              {i + 1}
            </button>
          ))}

          <button
          className={page === totalPages ? 'dt-paging-button disabled' : 'dt-paging-button'}
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            {"›"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDoctor
