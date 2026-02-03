import React,{ useState, useEffect,useContext}from 'react';

import { Navigate } from "react-router-dom";
import roleContext from '../context/roleContext'

const ProtectedRoute = ({ RouteName, children }) => {
       const context=useContext(roleContext);
      const {roles2,setRoles2,getRolesbyName}=context;
    const [permissions,setPermissions]=useState([])

    useEffect(() => {
    //   console.log(localStorage.getItem('utype'));
        setRoles2([]);
        getRolesbyName(localStorage.getItem('utype'));
       
      }, []);
      useEffect(() => {
    //    console.log(roles2);
        roles2.forEach((role, index) => {
        // console.log(`Permission at index ${index}: ${role.permissions}`);
      setPermissions(prevPermissions => [...prevPermissions, role.permissions]); 
      });
        }, [roles2]);
//   const user = JSON.parse(localStorage.getItem("user")); // or from context

//   if (!user) {
//     return <Navigate to="/404" replace />;
//   }

  const hasPermission = permissions.includes(RouteName)

  if (!hasPermission) {
    return <Navigate to="/404" replace />;
  }

  return children;
};

export default ProtectedRoute;