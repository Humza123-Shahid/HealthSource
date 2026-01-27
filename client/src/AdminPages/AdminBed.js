import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import bedContext from '../context/bedContext'
import roomContext from '../context/roomContext'

import { useNavigate,useLocation, data} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminBed = () => {
    const context=useContext(bedContext);
    const {beds,deleteBed,getBeds}=context;
     const context2=useContext(roomContext);
    const {rooms,getRooms}=context2;
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = () => {
        navigate('addbed');

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
  const filteredData = beds.filter(item =>
      item.bedNumber?.toLowerCase().includes(searchTerm.toLowerCase())
);
  const handleView = (id,index,roomId) => {
    const dataitem=beds.find(da => da._id ==id)
     //const datacat=getCategoryById(catId);
          const dataroom=getRoomById(roomId);

    navigate('getbed', { state: { bed:dataitem,idx:index,room:dataroom} });
     
  };
  const handleEdit = (id,roomId) => {
    const dataitem=beds.find(da => da._id ==id)
    const dataroom=getRoomById(roomId);
    console.log(dataroom)
    //const datacat=getCategoryById(catId);
    navigate('editbed', { state: { bed:dataitem,room:dataroom} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deleteBed(id);
    // Call your delete API or function here
    //console.log("Deleted item with ID:", id);
    //setQuestions(prev => prev.filter(q => q._id !== id));
  }
  };
  const getRoomById = (id) => rooms.find(d => d._id === id);

  useEffect(() => {
        const fetchData = async () => {
        //const result = await getQuizzes(); // Call context function
        const result = await getBeds();
        const result2 = await getRooms();

        //const result2 = await getExpenceCategories();

        //setMyData(result);                     // Set state in same file
      };
  
      fetchData();
      }, []); //
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Bed</button>
      <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>
        <h3 className="ms-2">Beds Data</h3>
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
            <th>Room</th>
            <th>Bed Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row,index) => {
            const RoomName = getRoomById(row.room);
            return(
            <tr key={row._id}>
              <td>{index+1}</td>
              <td>{RoomName?.roomNumber}</td>
              <td>{row.bedNumber}</td>
              
              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(row._id,index+1,row.room)}>
                View
              </button>
              <button onClick={() => handleEdit(row._id,row.room)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
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

export default AdminBed
