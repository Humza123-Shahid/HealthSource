import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
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
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Department</button>
      <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>
        <h3 className="ms-2">Departments Data</h3>
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
            <th>Head Of Department</th>
            <th>Name</th>
            <th>Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row,index) => {
            const StaffName = getStaffById(row.headOfDepartment);
            return(
            <tr key={row._id}>
              <td>{index+1}</td>
              <td>{StaffName?.firstName}</td>
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
  );
}

export default AdminDepartment
