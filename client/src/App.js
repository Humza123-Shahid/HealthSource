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
import LabRequestState from './context/LabRequestState';
import AdminLabRequest from './AdminPages/AdminLabRequest';
import AddLabRequest from './AdminPages/AddLabRequest';
import ViewLabRequest from './AdminPages/ViewLabRequest';
import EditLabRequest from './AdminPages/EditLabRequest';
import LabResultState from './context/LabResultState';
import AdminLabResult from './AdminPages/AdminLabResult';
import AddLabResult from './AdminPages/AddLabResult';
import EditLabResult from './AdminPages/EditLabResult';
import ViewLabResult from './AdminPages/ViewLabResult';
import PatientMedicalHistoryState from './context/PatientMedicalHistoryState';
import AdminPatientMedicalHistory from './AdminPages/AdminPatientMedicalHistory';
import AddPatientMedicalHistory from './AdminPages/AddPatientMedicalHistory';
import ViewPatientMedicalHistory from './AdminPages/ViewPatientMedicalHistory';
import EditPatientMedicalHistory from './AdminPages/EditPatientMedicalHistory';
import MedicineState from './context/MedicineState';
import AdminMedicine from './AdminPages/AdminMedicine';
import AddMedicine from './AdminPages/AddMedicine';
import ViewMedicine from './AdminPages/ViewMedicine';
import EditMedicine from './AdminPages/EditMedicine';
import PrescriptionState from './context/PrescriptionState';
import AddPrescription from './AdminPages/AddPrescription';
import AdminPrescription from './AdminPages/AdminPrescription';
import ViewPrescription from './AdminPages/ViewPrescription';
import EditPrescription from './AdminPages/EditPrescription';
import WardState from './context/WardState';
import AdminWard from './AdminPages/AdminWard';
import AddWard from './AdminPages/AddWard';
import ViewWard from './AdminPages/ViewWard';
import EditWard from './AdminPages/EditWard';
import RoomState from './context/RoomState';
import AdminRoom from './AdminPages/AdminRoom';
import AddRoom from './AdminPages/AddRoom';
import ViewRoom from './AdminPages/ViewRoom';
import EditRoom from './AdminPages/EditRoom';
import BedState from './context/BedState';
import AdminBed from './AdminPages/AdminBed';
import AddBed from './AdminPages/AddBed';
import ViewBed from './AdminPages/ViewBed';
import EditBed from './AdminPages/EditBed';
import NurseState from './context/NurseState';
import AdminNurse from './AdminPages/AdminNurse';
import AddNurse from './AdminPages/AddNurse';
import ViewNurse from './AdminPages/ViewNurse';
import EditNurse from './AdminPages/EditNurse';
import StaffAttendanceState from './context/StaffAttendanceState';
import AdminStaffAttendance from './AdminPages/AdminStaffAttendance';
import AddStaffAttendance from './AdminPages/AddStaffAttendance';
import ViewStaffAttendance from './AdminPages/ViewStaffAttendance';
import EditStaffAttendance from './AdminPages/EditStaffAttendance';
import AdmissionState from './context/AdmissionState';
import AdminAdmission from './AdminPages/AdminAdmission';
import AddAdmission from './AdminPages/AddAdmission';
import ViewAdmission from './AdminPages/ViewAdmission';
import EditAdmission from './AdminPages/EditAdmission';
import StaffDutyState from './context/StaffDutyState';
import AdminStaffDuty from './AdminPages/AdminStaffDuty';
import AddStaffDuty from './AdminPages/AddStaffDuty';
import ViewStaffDuty from './AdminPages/ViewStaffDuty';
import EditStaffDuty from './AdminPages/EditStaffDuty';
import Home from './UserPages/Home';
import AboutUs from './UserPages/AboutUs';
import Service from './UserPages/Service';
import Team from './UserPages/Team';
import Contact from './UserPages/Contact';
import Appointment from './UserPages/Appointment';
import Search from './UserPages/Search';
import Login from './components/Login';
import SignUp from './components/SignUp';
import SocialState from './context/SocialState';
import AdminSocial from './AdminPages/AdminSocial';
import AddSocial from './AdminPages/AddSocial';
import ViewSocial from './AdminPages/ViewSocial';
import EditSocial from './AdminPages/EditSocial';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './AdminPages/NotFound';

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
    // if (location.pathname !== "/") {
    //   navigate("/");
    //   window.location.reload();
    // }
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
      <LabRequestState>
      <LabResultState>
      <PatientMedicalHistoryState>
      <MedicineState>
      <PrescriptionState>
      <WardState>
      <RoomState>
      <BedState>
      <NurseState>
      <StaffAttendanceState>
      <AdmissionState>
      <StaffDutyState>
      <SocialState>
      <UserState>
        {/* <div className="container"  style={{ maxWidth: "100vw",paddingLeft:"0px",paddingRight:"0px" }}> */}
          <Routes>
          <Route exact path="/admin" element={<Admin/>} >
              
              <Route path="user" element={<ProtectedRoute RouteName={"User"}> <AdminUser/> </ProtectedRoute>} />  
              <Route path="user/adduser" element={<AddUser/>} />
              <Route path="user/getuser" element={<ViewUser/>} />  
              <Route path="user/edituser" element={<EditUser/>} />
              <Route path="role" element={<ProtectedRoute RouteName={"Role"}><AdminRole/></ProtectedRoute>} /> 
              <Route path="role/addrole" element={<AddRole/>} />
              <Route path="role/getrole" element={<ViewRole/>} /> 
              <Route path="role/editrole" element={<EditRole/>} />
              <Route path="patient" element={<ProtectedRoute RouteName={"Patient"}><AdminPatient/></ProtectedRoute>} /> 
              <Route path="patient/addpatient" element={<AddPatient/>} />
              <Route path="patient/getpatient" element={<ViewPatient/>} /> 
              <Route path="patient/editpatient" element={<EditPatient/>} />
              <Route path="patientmedicalhistory" element={<ProtectedRoute RouteName={"Patient Medical History"}><AdminPatientMedicalHistory/></ProtectedRoute>} /> 
              <Route path="patientmedicalhistory/addpatientmedicalhistory" element={<AddPatientMedicalHistory/>} />
              <Route path="patientmedicalhistory/getpatientmedicalhistory" element={<ViewPatientMedicalHistory/>} /> 
              <Route path="patientmedicalhistory/editpatientmedicalhistory" element={<EditPatientMedicalHistory/>} />
              <Route path="staff" element={<ProtectedRoute RouteName={"Staff"}><AdminStaff/></ProtectedRoute>} /> 
              <Route path="staff/addstaff" element={<AddStaff/>} />
              <Route path="staff/getstaff" element={<ViewStaff/>} /> 
              <Route path="staff/editstaff" element={<EditStaff/>} />
              <Route path="shift" element={<ProtectedRoute RouteName={"Shift"}><AdminShift/></ProtectedRoute>} /> 
              <Route path="shift/addshift" element={<AddShift/>} />
              <Route path="shift/getshift" element={<ViewShift/>} /> 
              <Route path="shift/editshift" element={<EditShift/>} />
              <Route path="staffduty" element={<ProtectedRoute RouteName={"Staff Duty"}><AdminStaffDuty/></ProtectedRoute>} /> 
              <Route path="staffduty/addstaffduty" element={<AddStaffDuty/>} />
              <Route path="staffduty/getstaffduty" element={<ViewStaffDuty/>} /> 
              <Route path="staffduty/editstaffduty" element={<EditStaffDuty/>} />
              <Route path="doctor" element={<ProtectedRoute RouteName={"Doctor"}><AdminDoctor/></ProtectedRoute>} /> 
              <Route path="doctor/adddoctor" element={<AddDoctor/>} />
              <Route path="doctor/getdoctor" element={<ViewDoctor/>} /> 
              <Route path="doctor/editdoctor" element={<EditDoctor/>} />
              <Route path="appointment" element={<ProtectedRoute RouteName={"Appointment"}><AdminAppointment/></ProtectedRoute>} /> 
              <Route path="appointment/addappointment" element={<AddAppointment/>} />
              <Route path="appointment/getappointment" element={<ViewAppointment/>} /> 
              <Route path="appointment/editappointment" element={<EditAppointment/>} />
              <Route path="consultation" element={<ProtectedRoute RouteName={"Consultation"}><AdminConsultation/></ProtectedRoute>} /> 
              <Route path="consultation/addconsultation" element={<AddConsultation/>} />
              <Route path="consultation/getconsultation" element={<ViewConsultation/>} /> 
              <Route path="consultation/editconsultation" element={<EditConsultation/>} />
              <Route path="surgery" element={<ProtectedRoute RouteName={"Surgery"}><AdminSurgery/></ProtectedRoute>} /> 
              <Route path="surgery/addsurgery" element={<AddSurgery/>} />
              <Route path="surgery/getsurgery" element={<ViewSurgery/>} /> 
              <Route path="surgery/editsurgery" element={<EditSurgery/>} />
              <Route path="surgeryteam" element={<ProtectedRoute RouteName={"Surgery Team"}><AdminSurgeryTeam/></ProtectedRoute>} /> 
              <Route path="surgeryteam/addsurgeryteam" element={<AddSurgeryTeam/>} />
              <Route path="surgeryteam/getsurgeryteam" element={<ViewSurgeryTeam/>} /> 
              <Route path="surgeryteam/editsurgeryteam" element={<EditSurgeryTeam/>} />
              <Route path="operationtheatre" element={<ProtectedRoute RouteName={"Operation Theatre"}><AdminOperationTheatre/></ProtectedRoute>} /> 
              <Route path="operationtheatre/addoperationtheatre" element={<AddOperationTheatre/>} />
              <Route path="operationtheatre/getoperationtheatre" element={<ViewOperationTheatre/>} /> 
              <Route path="operationtheatre/editoperationtheatre" element={<EditOperationTheatre/>} />
              <Route path="labtest" element={<ProtectedRoute RouteName={"Lab Test"}><AdminLabTest/></ProtectedRoute>} /> 
              <Route path="labtest/addlabtest" element={<AddLabTest/>} />
              <Route path="labtest/getlabtest" element={<ViewLabTest/>} /> 
              <Route path="labtest/editlabtest" element={<EditLabTest/>} />
              <Route path="labrequest" element={<ProtectedRoute RouteName={"Lab Request"}><AdminLabRequest/></ProtectedRoute>} /> 
              <Route path="labrequest/addlabrequest" element={<AddLabRequest/>} />
              <Route path="labrequest/getlabrequest" element={<ViewLabRequest/>} /> 
              <Route path="labrequest/editlabrequest" element={<EditLabRequest/>} />
              <Route path="labresult" element={<ProtectedRoute RouteName={"Lab Result"}><AdminLabResult/></ProtectedRoute>} /> 
              <Route path="labresult/addlabresult" element={<AddLabResult/>} />
              <Route path="labresult/getlabresult" element={<ViewLabResult/>} /> 
              <Route path="labresult/editlabresult" element={<EditLabResult/>} />
              <Route path="medicine" element={<ProtectedRoute RouteName={"Medicine"}><AdminMedicine/></ProtectedRoute>} /> 
              <Route path="medicine/addmedicine" element={<AddMedicine/>} />
              <Route path="medicine/getmedicine" element={<ViewMedicine/>} /> 
              <Route path="medicine/editmedicine" element={<EditMedicine/>} />
              <Route path="prescription" element={<ProtectedRoute RouteName={"Prescription"}><AdminPrescription/></ProtectedRoute>} /> 
              <Route path="prescription/addprescription" element={<AddPrescription/>} />
              <Route path="prescription/getprescription" element={<ViewPrescription/>} /> 
              <Route path="prescription/editprescription" element={<EditPrescription/>} />
              <Route path="ward" element={<ProtectedRoute RouteName={"Ward"}><AdminWard/></ProtectedRoute>} /> 
              <Route path="ward/addward" element={<AddWard/>} />
              <Route path="ward/getward" element={<ViewWard/>} /> 
              <Route path="ward/editward" element={<EditWard/>} />
              <Route path="room" element={<ProtectedRoute RouteName={"Room"}><AdminRoom/></ProtectedRoute>} /> 
              <Route path="room/addroom" element={<AddRoom/>} />
              <Route path="room/getroom" element={<ViewRoom/>} /> 
              <Route path="room/editroom" element={<EditRoom/>} />
              <Route path="bed" element={<ProtectedRoute RouteName={"Bed"}><AdminBed/></ProtectedRoute>} /> 
              <Route path="bed/addbed" element={<AddBed/>} />
              <Route path="bed/getbed" element={<ViewBed/>} /> 
              <Route path="bed/editbed" element={<EditBed/>} />
              <Route path="nurse" element={<ProtectedRoute RouteName={"Nurse"}><AdminNurse/></ProtectedRoute>} /> 
              <Route path="nurse/addnurse" element={<AddNurse/>} />
              <Route path="nurse/getnurse" element={<ViewNurse/>} /> 
              <Route path="nurse/editnurse" element={<EditNurse/>} />
              <Route path="staffattendance" element={<ProtectedRoute RouteName={"Staff Attendance"}><AdminStaffAttendance/></ProtectedRoute>} /> 
              <Route path="staffattendance/addstaffattendance" element={<AddStaffAttendance/>} />
              <Route path="staffattendance/getstaffattendance" element={<ViewStaffAttendance/>} /> 
              <Route path="staffattendance/editstaffattendance" element={<EditStaffAttendance/>} />
              <Route path="admission" element={<ProtectedRoute RouteName={"Admission"}><AdminAdmission/></ProtectedRoute>} /> 
              <Route path="admission/addadmission" element={<AddAdmission/>} />
              <Route path="admission/getadmission" element={<ViewAdmission/>} /> 
              <Route path="admission/editadmission" element={<EditAdmission/>} />
              <Route path="social" element={<ProtectedRoute RouteName={"Social"}><AdminSocial/></ProtectedRoute>} /> 
              <Route path="social/addsocial" element={<AddSocial/>} />
              <Route path="social/getsocial" element={<ViewSocial/>} /> 
              <Route path="social/editsocial" element={<EditSocial/>} />
          </Route>
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/admin/login" element={<Login/>} />
              <Route path="/signup" element={<SignUp/>} />
              <Route path="/" element={<Home />}/>
              <Route path="aboutus" element={<AboutUs />}/> 
              <Route path="service" element={<Service />}/> 
              <Route path="team" element={<Team />}/> 
              <Route path="contact" element={<Contact />}/> 
              <Route path="appointment" element={<Appointment />}/> 
              <Route path="search" element={<Search />}/> 

             {/* </Route> */}
          </Routes>
        {/* </div> */}
      </UserState>
      </SocialState>
      </StaffDutyState>
      </AdmissionState>
      </StaffAttendanceState>
      </NurseState>
      </BedState>
      </RoomState>
      </WardState>
      </PrescriptionState>
      </MedicineState>
      </PatientMedicalHistoryState>
      </LabResultState>
      </LabRequestState>
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

