import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from "react-router-dom";
import { useState,useEffect } from 'react';

import Admin from './AdminPages/Admin';

import AdminUser from './AdminPages/AdminUser';
import UserState from './context/UserState';
import StaffState from './context/StaffState';
import PatientState from './context/PatientState';
import RoleState from './context/RoleState';
import AddUser from './AdminPages/AddUser';
import ViewUser from './AdminPages/ViewUser';
import EditUser from './AdminPages/EditUser';
import AdminRole from './AdminPages/AdminRole';
import ViewRole from './AdminPages/ViewRole';
import AddRole from './AdminPages/AddRole';
import EditRole from './AdminPages/EditRole';
import AdminPatient from './AdminPages/AdminPatient';
import AddPatient from './AdminPages/AddPatient';
import ViewPatient from './AdminPages/ViewPatient';
import EditPatient from './AdminPages/EditPatient';
import ShiftState from './context/ShiftState';
import AdminStaff from './AdminPages/AdminStaff';
import AddStaff from './AdminPages/AddStaff';
import ViewStaff from './AdminPages/ViewStaff';
import EditStaff from './AdminPages/EditStaff';
import AdminShift from './AdminPages/AdminShift';
import AddShift from './AdminPages/AddShift';
import ViewShift from './AdminPages/ViewShift';
import EditShift from './AdminPages/EditShift';
import DoctorState from './context/DoctorState';
import AdminDoctor from './AdminPages/AdminDoctor';
import AddDoctor from './AdminPages/AddDoctor';
import ViewDoctor from './AdminPages/ViewDoctor';
import EditDoctor from './AdminPages/EditDoctor';
import AppointmentState from './context/AppointmentState';
import AdminAppointment from './AdminPages/AdminAppointment';
import AddAppointment from './AdminPages/AddAppointment';
import ViewAppointment from './AdminPages/ViewAppointment';
import EditAppointment from './AdminPages/EditAppointment';
import ConsultationState from './context/ConsultationState';
import AdminConsultation from './AdminPages/AdminConsultation';
import AddConsultation from './AdminPages/AddConsultation';
import ViewConsultation from './AdminPages/ViewConsultation';
import EditConsultation from './AdminPages/EditConsultation';
import SurgeryState from './context/SurgeryState';
import OperationTheatreState from './context/OperationTheatreState';
import AdminSurgery from './AdminPages/AdminSurgery';
import AddSurgery from './AdminPages/AddSurgery';
import ViewSurgery from './AdminPages/ViewSurgery';
import EditSurgery from './AdminPages/EditSurgery';
import SurgeryTeamState from './context/SurgeryTeamState';
import AdminSurgeryTeam from './AdminPages/AdminSurgeryTeam';
import AddSurgeryTeam from './AdminPages/AddSurgeryTeam';
import EditSurgeryTeam from './AdminPages/EditSurgeryTeam';
import ViewSurgeryTeam from './AdminPages/ViewSurgeryTeam';
import AdminOperationTheatre from './AdminPages/AdminOperationTheatre';
import AddOperationTheatre from './AdminPages/AddOperationTheatre';
import EditOperationTheatre from './AdminPages/EditOperationTheatre';
import ViewOperationTheatre from './AdminPages/ViewOperationTheatre';
import LabTestState from './context/LabTestState';
import AdminLabTest from './AdminPages/AdminLabTest';
import AddLabTest from './AdminPages/AddLabTest';
import ViewLabTest from './AdminPages/ViewLabTest';
import EditLabTest from './AdminPages/EditLabTest';

function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  const location = useLocation();
  const navigate= useNavigate();
  //code to redirect to home page on reload at any other page
  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/");
      window.location.reload();
    }
  }, []);
  
  return (
    <>
  
      <StaffState>
      <PatientState>
      <RoleState>
      <ShiftState>
      <DoctorState>
      <AppointmentState>
      <ConsultationState>
      <SurgeryState>
      <SurgeryTeamState>
      <OperationTheatreState>
      <LabTestState>
      <UserState>
        {/* <div className="container"  style={{ maxWidth: "100vw",paddingLeft:"0px",paddingRight:"0px" }}> */}
          <Routes>
          <Route exact path="/" element={<Admin/>} >
              
              <Route path="user" element={<AdminUser/>} />  
              <Route path="user/adduser" element={<AddUser/>} />
              <Route path="user/getuser" element={<ViewUser/>} />  
              <Route path="user/edituser" element={<EditUser/>} />
              <Route path="role" element={<AdminRole/>} /> 
              <Route path="role/addrole" element={<AddRole/>} />
              <Route path="role/getrole" element={<ViewRole/>} /> 
              <Route path="role/editrole" element={<EditRole/>} />
              <Route path="patient" element={<AdminPatient/>} /> 
              <Route path="patient/addpatient" element={<AddPatient/>} />
              <Route path="patient/getpatient" element={<ViewPatient/>} /> 
              <Route path="patient/editpatient" element={<EditPatient/>} />
              <Route path="staff" element={<AdminStaff/>} /> 
              <Route path="staff/addstaff" element={<AddStaff/>} />
              <Route path="staff/getstaff" element={<ViewStaff/>} /> 
              <Route path="staff/editstaff" element={<EditStaff/>} />
              <Route path="shift" element={<AdminShift/>} /> 
              <Route path="shift/addshift" element={<AddShift/>} />
              <Route path="shift/getshift" element={<ViewShift/>} /> 
              <Route path="shift/editshift" element={<EditShift/>} />
              <Route path="doctor" element={<AdminDoctor/>} /> 
              <Route path="doctor/adddoctor" element={<AddDoctor/>} />
              <Route path="doctor/getdoctor" element={<ViewDoctor/>} /> 
              <Route path="doctor/editdoctor" element={<EditDoctor/>} />
              <Route path="appointment" element={<AdminAppointment/>} /> 
              <Route path="appointment/addappointment" element={<AddAppointment/>} />
              <Route path="appointment/getappointment" element={<ViewAppointment/>} /> 
              <Route path="appointment/editappointment" element={<EditAppointment/>} />
              <Route path="consultation" element={<AdminConsultation/>} /> 
              <Route path="consultation/addconsultation" element={<AddConsultation/>} />
              <Route path="consultation/getconsultation" element={<ViewConsultation/>} /> 
              <Route path="consultation/editconsultation" element={<EditConsultation/>} />
              <Route path="surgery" element={<AdminSurgery/>} /> 
              <Route path="surgery/addsurgery" element={<AddSurgery/>} />
              <Route path="surgery/getsurgery" element={<ViewSurgery/>} /> 
              <Route path="surgery/editsurgery" element={<EditSurgery/>} />
              <Route path="surgeryteam" element={<AdminSurgeryTeam/>} /> 
              <Route path="surgeryteam/addsurgeryteam" element={<AddSurgeryTeam/>} />
              <Route path="surgeryteam/getsurgeryteam" element={<ViewSurgeryTeam/>} /> 
              <Route path="surgeryteam/editsurgeryteam" element={<EditSurgeryTeam/>} />
              <Route path="operationtheatre" element={<AdminOperationTheatre/>} /> 
              <Route path="operationtheatre/addoperationtheatre" element={<AddOperationTheatre/>} />
              <Route path="operationtheatre/getoperationtheatre" element={<ViewOperationTheatre/>} /> 
              <Route path="operationtheatre/editoperationtheatre" element={<EditOperationTheatre/>} />
              <Route path="labtest" element={<AdminLabTest/>} /> 
              <Route path="labtest/addlabtest" element={<AddLabTest/>} />
              <Route path="labtest/getlabtest" element={<ViewLabTest/>} /> 
              <Route path="labtest/editlabtest" element={<EditLabTest/>} />

          </Route>
                     
          </Routes>
        {/* </div> */}
      </UserState>
      </LabTestState>
      </OperationTheatreState>
      </SurgeryTeamState>
      </SurgeryState>
      </ConsultationState>
      </AppointmentState>
      </DoctorState>
      </ShiftState>
      </RoleState>
      </PatientState>
      </StaffState>
      
        
    </>
  );
}

export default App;

