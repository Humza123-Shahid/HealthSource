import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import nurseContext from '../context/nurseContext'
import staffContext from '../context/staffContext'
import wardContext from '../context/wardContext'

import { useNavigate,useLocation, data} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminNurse = () => {
    const context=useContext(nurseContext);
    const {nurses,deleteNurse,getNurses}=context;
     const context2=useContext(staffContext);
    const {staffs,getStaffs}=context2;
      const context3=useContext(wardContext);
    const {wards,getWards}=context3;
        let filteredData;

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = () => {
        navigate('addnurse');

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
//   const filteredData = nurses.filter(item =>
//       item.qualification?.toLowerCase().includes(searchTerm.toLowerCase())||
//       item.licenseNumber?.toLowerCase().includes(searchTerm.toLowerCase())
// );
 if(localStorage.getItem('utype')=='nurse')
  {
    console.log(localStorage.getItem('nurseID'))
      // const filteredDatabyId=patientmedicalhistories.find(da => da.patient ==localStorage.getItem('patientID'))
      const filteredDatabyId=nurses.filter(da => da.staff ==localStorage.getItem('nurseID'));

      console.log(filteredDatabyId);
      filteredData = filteredDatabyId?.filter(item =>
          item.qualification?.toLowerCase().includes(searchTerm.toLowerCase())||
          item.licenseNumber?.toLowerCase().includes(searchTerm.toLowerCase())
        );
  }
  else{
      filteredData = nurses?.filter(item =>
          item.qualification?.toLowerCase().includes(searchTerm.toLowerCase())||
          item.licenseNumber?.toLowerCase().includes(searchTerm.toLowerCase())
        );
  }
  const handleView = (id,index,staffId,wardId) => {
    const dataitem=nurses.find(da => da._id ==id)
     //const datacat=getCategoryById(catId);
    const datastaff=getStaffById(staffId);
    const dataward=getWardById(wardId);

    navigate('getnurse', { state: { nurse:dataitem,idx:index,staff:datastaff,ward:dataward} });
     
  };
  const handleEdit = (id,staffId,wardId) => {
    const dataitem=nurses.find(da => da._id ==id)
    const datastaff=getStaffById(staffId);
    const dataward=getWardById(wardId);
    //const datacat=getCategoryById(catId);
    navigate('editnurse', { state: { nurse:dataitem,staff:datastaff,ward:dataward} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deleteNurse(id);
    // Call your delete API or function here
    //console.log("Deleted item with ID:", id);
    //setQuestions(prev => prev.filter(q => q._id !== id));
  }
  };
  const getStaffById = (id) => staffs.find(d => d._id === id);
  const getWardById = (id) => wards.find(d => d._id === id);

  useEffect(() => {
        const fetchData = async () => {
        //const result = await getQuizzes(); // Call context function
        const result = await getNurses();
        const result2 = await getStaffs();
        const result3 = await getWards();

        //const result2 = await getExpenceCategories();

        //setMyData(result);                     // Set state in same file
      };
  
      fetchData();
      }, []); //
  return (
   <div>
      {localStorage.getItem('utype')!=='nurse' &&
        <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Nurse</button>
      }
      <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>
        <h3 className="ms-2">Nurses Data</h3>
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
            <th>Staff</th>
            <th>Qualification</th>
            <th>License Number</th>
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
              <td>{row.qualification}</td>
              <td>{row.licenseNumber}</td>
              
              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(row._id,index+1,row.staff,row.assignedWard)}>
                View
              </button>
              {localStorage.getItem('utype')!=='nurse' &&
              <button onClick={() => handleEdit(row._id,row.staff,row.assignedWard)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
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

export default AdminNurse
