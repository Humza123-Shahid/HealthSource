import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import roomContext from '../context/roomContext'
import wardContext from '../context/wardContext'

import { useNavigate,useLocation, data} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminRoom = () => {
    const context=useContext(roomContext);
    const {rooms,deleteRoom,getRooms}=context;
     const context2=useContext(wardContext);
    const {wards,getWards}=context2;
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = () => {
        navigate('addroom');

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
  const filteredData = rooms.filter(item =>
      item.roomNumber?.toLowerCase().includes(searchTerm.toLowerCase())||
      item.type?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const handleView = (id,index,wardId) => {
    const dataitem=rooms.find(da => da._id ==id)
     //const datacat=getCategoryById(catId);
          const dataward=getWardById(wardId);

    navigate('getroom', { state: { room:dataitem,idx:index,ward:dataward} });
     
  };
  const handleEdit = (id,wardId) => {
    const dataitem=rooms.find(da => da._id ==id)
    const dataward=getWardById(wardId);
    console.log(dataward)
    //const datacat=getCategoryById(catId);
    navigate('editroom', { state: { room:dataitem,ward:dataward} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deleteRoom(id);
    // Call your delete API or function here
    //console.log("Deleted item with ID:", id);
    //setQuestions(prev => prev.filter(q => q._id !== id));
  }
  };
  const getWardById = (id) => wards.find(d => d._id === id);

  useEffect(() => {
        const fetchData = async () => {
        //const result = await getQuizzes(); // Call context function
        const result = await getRooms();
        const result2 = await getWards();

        //const result2 = await getExpenceCategories();

        //setMyData(result);                     // Set state in same file
      };
  
      fetchData();
      }, []); //
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Room</button>
      <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>
        <h3 className="ms-2">Rooms Data</h3>
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
            <th>Ward</th>
            <th>Room Number</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row,index) => {
            const WardName = getWardById(row.ward);
            return(
            <tr key={row._id}>
              <td>{index+1}</td>
              <td>{WardName?.name}</td>
              <td>{row.roomNumber}</td>
              <td>{row.type}</td>
              
              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(row._id,index+1,row.ward)}>
                View
              </button>
              <button onClick={() => handleEdit(row._id,row.ward)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
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

export default AdminRoom
