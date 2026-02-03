import React,{ useEffect, useState} from 'react'

import { useNavigate,useLocation} from 'react-router-dom';
import InfoMessage from '../components/InfoMessage';
import Sidebar from '../components/Sidebar';
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';

import { Outlet } from "react-router-dom";

const Admin = (props) => {
  const location = useLocation();
  const [showToast,setShowToast]=useState(false)
      const [msg,setMsg]=useState('')
      const [type,setType]=useState('')
           const navigate = useNavigate();
      
useEffect(()=>{
  if(localStorage.getItem('token')){

    if(localStorage.getItem('utype')=="user")
    {
      navigate("/");
    }
    if(location.state?.signUpSuccess)
         {
          setShowToast(true);
          setMsg("Account Created Successfully")
          setType("success")
          setTimeout(()=>{
            setShowToast(false)
          },1500)
         }
      else if(location.state?.loginSuccess){ 
          setShowToast(true);
          setMsg("Logged in Successfully")
          setType("success")
          setTimeout(()=>{
            setShowToast(false)
          },1500)
          window.history.replaceState({}, document.title); 
        }
         }
      else
      {
        console.log("elseadmin")
        navigate("/login");
      }
      // if(localStorage.getItem('token')){
        
      //   if(localStorage.getItem('utype')=="user")
      //   {
      //     navigate("/");
      //   }
      //   if (location.state?.loginSuccess) { 
      //     setShowToast(true);
      //     setMsg("Logged in Successfully")
      //     setType("success")
      //     setTimeout(()=>{
      //       setShowToast(false)
      //     },1500)
      //     window.history.replaceState({}, document.title); 
      //   }
      //    else if(location.state?.signUpSuccess)
      //    {
      //     setShowToast(true);
      //     setMsg("Account Created Successfully")
      //     setType("success")
      //     setTimeout(()=>{
      //       setShowToast(false)
      //     },1500)
      //    }
        //  if (sessionStorage.getItem("reloaded")=="false") {
        //  sessionStorage.setItem("reloaded", "true");
        //  window.location.reload();
        //  }
      // }
      // else
      // {
      //   navigate("/login");
      // }
      
    },[])
    
//    useEffect(() => {
//     if (window.location.pathname === "/") {
//       navigate("/admin");
//     }
//   }, [navigate]);
  return (
    <div className="d-flex">
      <InfoMessage showToast={showToast} msg={msg} type={type}/>
      {/* <div className='bg-dark' style={{backgroundColor:'rgb(44, 62, 80)'}}> */}
      <div className='bg-dark' style={{backgroundColor:'white'}}>
      <Sidebar />
      </div>
      <div className="flex-grow-1 d-flex flex-column" style={{ minHeight: '100vh',width:'80%' }}>
        <AdminNavbar/>
        <Outlet/>
        <Footer />
      </div>
    </div>
  )
}

export default Admin
