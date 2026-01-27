import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import medicineContext from '../context/medicineContext'

import { useNavigate,useLocation} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminMedicine = () => {
    const context=useContext(medicineContext);
    const {medicines,deleteMedicine,getMedicines}=context;
    
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = () => {
        navigate('addmedicine');

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
  const filteredData = medicines.filter(item =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase())||
      item.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase())||
      item.form?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const handleView = (medicineId,index) => {
    //const dataitem=buses.find(da => da._id ==id)
    const datamedicine=getMedicineById(medicineId);
    // console.log(staffName,patientName,Name,roleName,index);
    navigate('getmedicine', { state: { medicine:datamedicine,idx:index+1} });
     
  };
  const handleEdit = async (medicineId) => {
    // const dataitem=buses.find(da => da._id ==id)
    const datamedicine=getMedicineById(medicineId);
    navigate('editmedicine', { state: { medicine:datamedicine} });

    //navigate('edituser', { state: { userId:id,name:Name,email:Email,phone:Phone,password:Password,roleId:role_id} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deleteMedicine(id);
    // Call your delete API or function here
    //console.log("Deleted item with ID:", id);
    //setQuestions(prev => prev.filter(q => q._id !== id));
  }
  };
  // const getDriverName = (id) => {
  //   const result2= getDriverbyId(id);

  // };
  
const getMedicineById = (id) => medicines.find(d => d._id === id);

  useEffect(() => {
        const fetchData = async () => {
        //const result = await getQuizzes(); // Call context function
        const result = await getMedicines();
        //setMyData(result);                     // Set state in same file
      };
  
      fetchData();
      }, []); //
      
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Medicine</button>
      <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>
        <h3 className="ms-2">Medicines Data</h3>
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
           <th>Name</th>
           <th>Category</th>
            <th>Manufacturer</th>
            <th>Form</th>
            <th>Unit Price</th>            
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row,index) => (
            <tr key={row._id}>
              <td>{index+1}</td>
              {/* <td>{row.driver_id}</td> */}
              {/* {getDriverName(row.driver_id)}  */}
              
              <td>{row?.name}</td>
              <td>{row?.category}</td>
              
              <td>{row?.manufacturer}</td>
              <td>{row?.form}</td>
              <td>{row?.unitPrice}</td>

              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(row._id,index)}>
                View
              </button>
              <button onClick={() => handleEdit(row._id)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
                Edit
              </button>
              <button onClick={() => handleDelete(row._id)} style={{ color:"white",backgroundColor:"red" }}>
                Delete
              </button>
              </td>
            </tr>
            
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminMedicine
