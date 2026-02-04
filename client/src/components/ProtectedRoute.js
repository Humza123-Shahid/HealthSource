import React,{ useState, useEffect,useContext}from 'react';

import { Navigate } from "react-router-dom";
import roleContext from '../context/roleContext'

const ProtectedRoute = ({ RouteName, children }) => {
       const context=useContext(roleContext);
      const {roles2,setRoles2,getRolesbyName}=context;
    const [permissions,setPermissions]=useState([])
    const [isReady, setIsReady] = useState(false);
    let temp = [];
    // const [hasPermission,setHasPermissions]=useState(false)
    useEffect(() => {
    //   console.log(localStorage.getItem('utype'));
        // setRoles2([]);
        getRolesbyName(localStorage.getItem('utype'));
       
      }, []);
      useEffect(() => {
    //    console.log(roles2);
        roles2.forEach((role, index) => {
        // console.log(`Permission at index ${index}: ${role.permissions}`);
      setPermissions(prevPermissions => [...prevPermissions, role.permissions]); 
      setIsReady(true);
      });
        }, [roles2]);
     
        // getRolesbyName(localStorage.getItem('utype'));
    
    //     roles2.forEach((role, index) => {
    //     // console.log(`Permission at index ${index}: ${role.permissions}`);
    //   temp.push(role);
    //     })
        //setPermissions(temp); 
        //   useEffect(() => {
        //     const hasPermission2 = permissions.includes(RouteName)
        //     setHasPermissions(hasPermission2);
        // }, [permissions]);
        // useEffect(() => {
        //      if (!hasPermission) {
        //         return <Navigate to="/404" replace />;
        //     }
        // }, [hasPermission]);
//   const user = JSON.parse(localStorage.getItem("user")); // or from context

//   if (!user) {
//     return <Navigate to="/404" replace />;
//   }
console.log(RouteName)
console.log(permissions)
if (isReady) {
  const hasPermission = permissions.includes(RouteName)
console.log(hasPermission)

  if (!hasPermission) {
    return <Navigate to="/404" replace />;
  }

  return children;
}
};

export default ProtectedRoute;