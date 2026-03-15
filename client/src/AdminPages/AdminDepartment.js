import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import '../styles/pagination.css';

import departmentContext from '../context/departmentContext'
import staffContext from '../context/staffContext'

import { useNavigate,useLocation, data} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminDepartment = () => {
    const context=useContext(departmentContext);
    const {departments,deleteDepartment,getDepartments}=context;
     const context2=useContext(staffContext);
    const {staffs,getStaffs}=context2;
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [entries, setEntries] = useState(10);
              const [page, setPage] = useState(1);
    const handleClick = () => {
        navigate('adddepartment');

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
  const filteredData = departments.filter(item =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())||
      item.code?.toLowerCase().includes(searchTerm.toLowerCase())
);
  const totalPages = Math.ceil(filteredData.length / entries);
  const startIndex = (page - 1) * entries;
  const currentData = filteredData.slice(startIndex, startIndex + entries);
  const handleView = (id,index,staffId) => {
    const dataitem=departments.find(da => da._id ==id)
     //const datacat=getCategoryById(catId);
          const datastaff=getStaffById(staffId);

    navigate('getdepartment', { state: { department:dataitem,idx:index,staff:datastaff} });
     
  };
  const handleEdit = (id,staffId) => {
    const dataitem=departments.find(da => da._id ==id)
    const datastaff=getStaffById(staffId);
    console.log(datastaff)
    //const datacat=getCategoryById(catId);
    navigate('editdepartment', { state: { department:dataitem,staff:datastaff} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deleteDepartment(id);
    // Call your delete API or function here
    //console.log("Deleted item with ID:", id);
    //setQuestions(prev => prev.filter(q => q._id !== id));
  }
  };
  const getStaffById = (id) => staffs.find(d => d._id === id);

  useEffect(() => {
        const fetchData = async () => {
        //const result = await getQuizzes(); // Call context function
        const result = await getDepartments();
        const result2 = await getStaffs();

        //const result2 = await getExpenceCategories();

        //setMyData(result);                     // Set state in same file
      };
  
      fetchData();
      }, []); //
      useEffect(() => {
                                     
                      console.log(departments.length)
                      if(departments.length>200&&departments.length<401){
                          setEntries(25)
                        }
                        else  if(departments.length>400&&departments.length<701){
                          setEntries(50)
                        }
                        else  if(departments.length>700){
                          setEntries(100)
                        }
                      
                      }, [departments]); //
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4 mobile-margin" onClick={handleClick}>Add Department</button>
      {/* <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}> */}
        <h3 className="ms-4 mobile-margin" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>Departments Data</h3>
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
            {/* <th>Head Of Department</th> */}
            <th>Name</th>
            <th>Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row,index) => {
            // const StaffName = getStaffById(row.headOfDepartment);
            return(
            <tr key={row._id}>
              <td>{index+1}</td>
              {/* <td>{StaffName?.firstName}</td> */}
              <td>{row.name}</td>
              <td>{row.code}</td>
              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(row._id,index+1,row.headOfDepartment)}>
                View
              </button>
              <button onClick={() => handleEdit(row._id,row.headOfDepartment)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
                Edit
              </button>
              <button onClick={() => handleDelete(row._id)} style={{ color:"white",backgroundColor:"red" }}>
                Delete
              </button>
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

export default AdminDepartment
