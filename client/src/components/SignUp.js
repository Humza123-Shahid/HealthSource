import React, { useState,useEffect,useRef,useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import logimg from '../img/userlogtransparent.png';
import InfoMessage from './InfoMessage';
import staffContext from '../context/staffContext'
import patientContext from '../context/patientContext'

//const Signup = (props) => {
const SignUp = (props) => {
    // const context=useContext(staffContext);
    // const {staffs,getStaffs}=context;
    const context2=useContext(patientContext);
    const {addPatient}=context2;
    const [showToast,setShowToast]=useState(false)
    const [msg,setMsg]=useState('')
    const [type,setType]=useState('')
    // const [roles,setRoles]=useState([]);
  // const [credentials,setCredentials] =useState({staffId:"",patientId:"",name:"",email:"",phone_number:'',password:"",cpassword:"",roleId:""})

  const [credentials,setCredentials] =useState({firstName:"",gender:"",age:"",nationalId:"",maritalStatus:'',bloodGroup:""})
  

  let navigate=useNavigate();
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    let {firstName,gender,age,nationalId,maritalStatus,bloodGroup}=credentials
    const success=await addPatient(firstName,gender,age,nationalId,maritalStatus,bloodGroup)
          console.log(success)
          if(success)
          {
            localStorage.setItem('token',json.authtoken);

            // console.log("abc");
            // setShowToast(true);
            // setMsg("User added successfully")
            // setType("success")
            // setTimeout(()=>{
            //   setShowToast(false)
            // },1500)
            navigate("/admin",{
              state: { signUpSuccess: true},
              replace: true, // optional: prevents back button returning to login
            });
          }
           else{
                  setShowToast(true);
                setMsg("Invalid Credentials")
                setType("error")
                setTimeout(()=>{
                  setShowToast(false)
                },1500)
                //props.showAlert("Invalid Details","danger")
            }

    // let {staffId,patientId,name,password,cpassword,roleId}=credentials
    // if(staffId=="")
    // {
    //     staffId=null;
    // }
    // if(patientId=="")
    // {
    //     patientId=null;
    // }
    // if(roleId=="")
    // {
    //     roleId=null;
    // }
    // if(password!=cpassword)
    // {
    //   setShowToast(true);
    //     setMsg("Passwords do not match")
    //     setType("error")
    //     setTimeout(()=>{
    //       setShowToast(false)
    //     },1500)
    //   //props.showAlert("Passwords do not match","danger")
    //   return;
    // }
    const user="user";
    //console.log(staffId,patientId,name,password,roleId);
    // const response=await fetch("http://localhost:5000/api/auth/registeruser",{
    //     method:'POST',
    //     headers:{
    //         'Content-Type':'application/json'
    //     },
    //     body:JSON.stringify({staffId,patientId,name,password,roleId})
    //   });
    //   const json=await response.json()
    //   console.log(json);
    //   if(json.success)
    //   {
        
        
    //     localStorage.setItem('token',json.authtoken);
    //       if(json.userType=="admin")
    //     {
    //       //localStorage.setItem('showLoginToast', 'true');
    //       localStorage.setItem('utype',"admin");
    //       //sessionStorage.setItem("reloaded", "false");
    //       navigate("/admin",{
    //       state: { loginSuccess: true},
    //       replace: true, // optional: prevents back button returning to login
    //     });
    //     }
    //     else if(json.userType=="user")
    //     {
    //       //localStorage.setItem('showLoginToast', 'true');
    //       localStorage.setItem('utype',"user");
    //       //localStorage.setItem('uclass',json.qclass);
    //       navigate("/",{
    //         state: { loginSuccess: true},
    //         replace: true, // optional: prevents back button returning to login
    //       });
    //     }
        
    //   }
    //   else{
    //       setShowToast(true);
    //     setMsg("Invalid Credentials")
    //     setType("error")
    //     setTimeout(()=>{
    //       setShowToast(false)
    //     },1500)
    //     //props.showAlert("Invalid Details","danger")
    // }
}
    const onChange=(e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
    }
      // useEffect(() => {
      //       const fetchData = async () => {
      //       const response=await fetch("http://localhost:5000/api/role/fetchallroles",{
      //               method:'GET',
      //               headers:{
      //                   'Content-Type':'application/json'
      //               },
      //             });
      //             const json=await response.json()
      //             console.log(json);
      //             setRoles(json)

      //       const result = await getStaffs();
      //       const result2 = await getPatients();

      //     };
      //     fetchData();
      //     }, []); 
      //   useEffect(() => {
      //       console.log(staffs)
      //     }, [staffs]); 
  return (
    <div className='mt-0 d-flex flex-column align-items-center justify-content-center' style={{backgroundColor:"#318CE7",height:'100vh'}}>
      <InfoMessage showToast={showToast} msg={msg} type={type}/>
      <form className='mt-3 mb-3 pt-4 px-3' onSubmit={handleSubmit} style={{backgroundColor:"white",borderRadius: '10px',width:'50vw'}} >
        <img src={logimg} className="center" style={{display:'block',margin:'0 auto',width:'100px'}}alt="..."/>
        <h2 className='mb-3' style={{textAlign:"center",width:'100%'}}>Sign Up</h2>
       <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3" style={{width:'100%'}}>
          <label htmlFor="fisrtName" className="form-label">First Name</label>
          <input type="text" className="form-control" id="fisrtName" name="fisrtName" onChange={onChange}  aria-describedby="emailHelp"/>
        </div>
         <div className="mb-3 ms-3 me-3" style={{width:'100%'}}>
            <label htmlFor="gender" className="form-label">Enter Gender:</label>
            {/* <input type="text" className="form-control" id="gender" value={gender} name="gender" onChange={handleGenderChange} /> */}
            <select id="mySelect" className="form-control " name="gender" onChange={onChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
            </select>
      </div>
        {/* <div className="mb-3" style={{width:'100%'}}>
          <label htmlFor="staffId" className="form-label">Staff</label>
            <select id="staffId" className="form-control " name="staffId" onChange={onChange}>
                
              <option value="">-Staff-</option>
                  {Array.isArray(staffs) && staffs.map((staff) => (
                  <option value={staff._id}>{staff.firstName}</option>
                  ))}
            </select>
        </div>
        
        <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="patientId" className="form-label">Patient</label>
            <select id="patientId" className="form-control " name="patientId" onChange={onChange}>
                
              <option value="">-Patient-</option>
                  {Array.isArray(patients) && patients.map((patient) => (
                  <option value={patient._id}>{patient.firstName}</option>
                  ))}
            </select>
        </div> */}
        </div>
        <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="age" className="form-label">Enter Age:</label>
            <input type="number" className="form-control" id="age" name="age" onChange={onChange} />
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="nid" className="form-label">Enter National Id:</label>
                <input type="text" className="form-control" id="nid" name="nationalId" onChange={onChange} />
        </div>
         {/* <div className="mb-3" style={{width:'100%'}}>
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange}  aria-describedby="emailHelp"/>
        </div>
         <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={3} required/>
        </div> */}

        </div>
        <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="mstatus" className="form-label">Enter Marital Status:</label>
                {/* <input type="text" className="form-control" id="mstatus" value={maritalStatus} name="mstatus" onChange={handleMaritalStatusChange} /> */}
                 <select id="mySelect" className="form-control "  name="maritalStatus" onChange={onChange}>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="other">Other</option>
                 </select>
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
                <label htmlFor="bgroup" className="form-label">Enter Blood Group:</label>
                <select id="mySelect" className="form-control " name="bloodGroup" onChange={onChange}>
                  <option value="a+">A+</option>
                  <option value="a-">A-</option>
                  <option value="b+">B+</option>
                  <option value="b-">B-</option>
                  <option value="ab+">AB+</option>
                  <option value="ab-">AB-</option>
                  <option value="o+">O+</option>
                  <option value="0-">O-</option>
                </select>
        </div>
        {/* <div className="mb-3" style={{width:'100%'}}>
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={3} required/>
        </div>
        <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="role" className="form-label">Role</label>
            <select id="roleId" className="form-control " name="roleId" onChange={onChange}>
                
              <option value="">-Role-</option>
                  {Array.isArray(roles) && roles.map((row) => (
                  <option value={row._id}>{row.name}</option>
                  ))}
            </select>
        </div> */}
        </div>

        <button type="submit" className="btn btn-primary mb-2" style={{width:'50%',display:'block',margin:'auto'}} >Register</button>
          <p className="ms-0 mt-0 mb-5" style={{textAlign:'center'}}>
        Already have an account?{' '}
        <Link to="/login" style={{textDecoration:'underline'}}>
         Sign In
        </Link>

      </p>
      </form>
     
    </div>
  )
}

export default SignUp
