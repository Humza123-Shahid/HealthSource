import React, { useState,useEffect } from 'react'
import { Link,useNavigate, useLocation} from 'react-router-dom'
import logimg from '../img/userlogtransparent.png';
import InfoMessage from './InfoMessage';

const Login = (props) => {
  //const location = useLocation();
    const [credentials,setCredentials] =useState({username:"",password:""})
    const [showToast,setShowToast]=useState(false)
    const [msg,setMsg]=useState('')
    const [type,setType]=useState('')
    const location = useLocation(); 
    let navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response=await fetch("http://localhost:5000/api/auth/login",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({username:credentials.username,password:credentials.password})
      });
      const json=await response.json()
      console.log(json);
      if(json.success)
      {
        localStorage.setItem('token',json.authtoken);
        //localStorage.setItem('cat',json.category);
        
        //props.showAlert("Logged in Successfully","success")

        
        if(json.userType=="admin")
        {
          //localStorage.setItem('showLoginToast', 'true');
          localStorage.setItem('utype',"admin");
          //sessionStorage.setItem("reloaded", "false");
          navigate("/admin",{
          state: { loginSuccess: true},
          replace: true, // optional: prevents back button returning to login
        });
        }
        else if(json.userType=="user")
        {
          //localStorage.setItem('showLoginToast', 'true');
          localStorage.setItem('utype',"user");
          //localStorage.setItem('uclass',json.qclass);
          navigate("/",{
            state: { loginSuccess: true},
            replace: true, // optional: prevents back button returning to login
          });
        }
      }
      else{
        setShowToast(true);
        setMsg("Invalid Credentials")
        setType("error")
        setTimeout(()=>{
          setShowToast(false)
        },1500)
      }
    }
    const onChange=(e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    useEffect(() => {
    // Set the title based on the current path or other page-specific data
    if (location.pathname === '/') {
      document.title = 'HealthSource - Login';
    }
  }, []);
  return (
    <div className='mt-0 d-flex flex-column align-items-center justify-content-center' style={{backgroundColor:"#318CE7",height:'100vh'}}>
      <InfoMessage showToast={showToast} msg={msg} type={type}/>
      <form className='mt-3 mb-3 pt-4 px-3' onSubmit={handleSubmit} style={{backgroundColor:"white",borderRadius: '10px'}} >
        <img src={logimg} className="center" style={{display:'block',margin:'0 auto',width:'100px'}}alt="..."/>
        <h2 style={{textAlign:"center",width:'50vh'}}>Sign In</h2>
        <div className="mb-3">
            <label htmlFor="username" className="form-label">User Name</label>
            <input type="username" className="form-control" value={credentials.username} onChange={onChange} id="username" name="username" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your username with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="passord" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password"/>
        </div>

        <button type="submit" className="btn btn-primary mb-4" style={{width:'100%'}} >Log In</button>
         <p className="mb-5" style={{textAlign:'center'}}>
        Don't have an account?{' '}
        <Link to="/signup" style={{textDecoration:'underline'}}>
         Sign Up
        </Link>
      </p>
      </form>
     
    </div>
  )
}

export default Login
