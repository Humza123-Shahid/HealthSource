import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import '../styles/pagination.css';
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
    const [entries, setEntries] = useState(10);
          const [page, setPage] = useState(1);
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
  const totalPages = Math.ceil(filteredData.length / entries);
  const startIndex = (page - 1) * entries;
  const currentData = filteredData.slice(startIndex, startIndex + entries);
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
      useEffect(() => {
                                     
                      console.log(beds.length)
                      if(beds.length>200&&beds.length<401){
                          setEntries(25)
                        }
                        else  if(beds.length>400&&beds.length<701){
                          setEntries(50)
                        }
                        else  if(beds.length>700){
                          setEntries(100)
                        }
                      
                      }, [beds]); //
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Bed</button>
      {/* <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}> */}
        <h3 className="ms-4" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>Beds Data</h3>
      <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>
        <div style={{
                    margin: '11px 0px 0px 11px',
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
      {/* </div> */}
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
          {currentData.map((row,index) => {
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
      {/* Bottom Controls */}
      <div
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

export default AdminBed
