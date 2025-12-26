  import React,{useState,useContext, useEffect} from 'react'
  import '../styles/StyledTable.css';
  import surgeryteamContext from '../context/surgeryteamContext'
  import surgeryContext from '../context/surgeryContext'
  import staffContext from '../context/staffContext'

  import { useNavigate,useLocation} from 'react-router-dom';
  import { FaSearch } from 'react-icons/fa';
  
  const AdminSurgeryTeam = () => {
      const context=useContext(surgeryteamContext);
      const {surgeryteams,deleteSurgeryTeam,getSurgeryTeams}=context;
      const context2=useContext(surgeryContext);
      const {surgeries,getSurgeries}=context2;
      const context3=useContext(staffContext);
        const {staffs,getStaffs}=context3;
      const navigate = useNavigate();
      const [searchTerm, setSearchTerm] = useState('');
      const handleClick = () => {
          navigate('addsurgeryteam');
  
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
    const filteredData = surgeryteams.filter(item =>
        item.role?.toLowerCase().includes(searchTerm.toLowerCase())
     );
    const handleView = (id,surgeryName,staffName,index) => {
      const dataitem=surgeryteams.find(da => da._id ==id)
      console.log(dataitem);
      navigate('getsurgeryteam', { state: { surgeryteam:dataitem,surgery:surgeryName,staff:staffName,idx:index} });
       
    };
    const handleEdit = (id,surgery_id,staff_id) => {
      const dataitem=surgeryteams.find(da => da._id ==id)
     
      navigate('editsurgeryteam', { state: { surgeryteam:dataitem,surgeryId:surgery_id,staffId:staff_id} });
    };
    const handleDelete = (id) => {
       const confirmed = window.confirm("Are you sure you want to delete this?");
    if (confirmed) {
      deleteSurgeryTeam(id);
      // Call your delete API or function here
      //console.log("Deleted item with ID:", id);
      //setQuestions(prev => prev.filter(q => q._id !== id));
    }
    };
    const getSurgeryById = (id) => surgeries.find(d => d._id === id);
    const getStaffById = (id) => staffs.find(d => d._id === id);

    useEffect(() => {
          const fetchData = async () => {
          //const result = await getQuizzes(); // Call context function
          const result = await getSurgeryTeams();
          const result2 = await getSurgeries();
          const result3 = await getStaffs();

          //setMyData(result);                     // Set state in same file
        };
    
        fetchData();
        }, []); //
    return (
     <div>
        <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Surgery Team</button>
        <div className="container d-flex justify-content-between">
          <h3 className="ms-2">Surgery Teams Data</h3>
          <div className="me-1" style={{display: 'flex',
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
              <th>Surgery</th>
              <th>Staff</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row,index) => {
            const surgery = getSurgeryById(row.surgery);
            const staff = getStaffById(row.staff);
              return(
              <tr key={row._id}>
                <td>{index+1}</td>
                <td>{surgery?.type}</td>
                <td>{staff?.firstName}</td>
                <td>{row?.role}</td>
                
                <td style={{width:"30%"}}>
                  <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                    handleView(row._id,surgery?.type,staff?.firstName,index+1)}>
                  View
                </button>
                <button onClick={() => handleEdit(row._id,row.surgery,row.staff)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
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
  
  export default AdminSurgeryTeam
  