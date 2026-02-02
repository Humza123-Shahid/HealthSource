import React ,{useState,useContext,useEffect} from 'react'

import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";

import UserFooter from '../components/UserFooter';
import appointmentContext from '../context/appointmentContext'
import patientContext from '../context/patientContext'
import doctorContext from '../context/doctorContext'
import staffContext from '../context/staffContext'
const customStyles = {
  // Styles for the selected value (the text displayed in the control after selection)
   valueContainer: (base) => ({
    ...base,
    justifyContent: 'flex-start', // Aligns content to the start (left)
  }),
  // You might also want to adjust other components if needed, e.g., the placeholder
//   placeholder: (base) => ({
//     ...base,
//     marginLeft: '0px', // Optional: adjust placeholder alignment
//   }),
  singleValue: (provided) => ({
    ...provided,
    color: '#848E9F', // Change selected text color to blue
    marginLeft: '0', // Remove any default left margin if necessary
    textAlign: 'left', // Ensure text alignment is left
  }),
  // You can also change the color of the control itself (the main container)
  control: (provided, state) => ({
    ...provided,
    height: '55px',
    borderColor: '#ced4da',
    boxShadow: state.isFocused ? '0 0 0 4px rgb(139, 226, 238)' : provided.boxShadow,
    '&:hover': {
      borderColor: state.isFocused ? '#ced4da' : provided.borderColor // Ensure consistent hover color
    }
  }),
};
const Appointment = () => {
     const context=useContext(appointmentContext);
         const {addAppointment}=context;
         const context2=useContext(patientContext);
         const {patients,getPatients}=context2;
          const context3=useContext(doctorContext);
         const {doctors,getDoctors}=context3;
         const context4=useContext(staffContext);
         const {staffs,getStaffs}=context4;
         const [credentials,setCredentials] =useState({patientId:null,doctorId:null,bookingType:"",status:"booked",notes:""})
             const [ appointmentDate, setAppointmentDate] = useState("");
    const handleAppointmentDateChange = (e) => {
        console.log(e.target.value);
    setAppointmentDate(e.target.value); // <-- Get input value here
  };
       const scrollToTop = () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth' // Adds a smooth scrolling animation
          });
        };
          const handleLogout =()=>{
            localStorage.removeItem('token');
          }
          const onChange=(e)=>{
        if(e.target.value=="" && (e.target.name=="patientId"||e.target.name=="doctorId"))
        {
            setCredentials({...credentials,[e.target.name]:null})
        }
        else{
            setCredentials({...credentials,[e.target.name]:e.target.value})
        }
      
      
    }
           const handleChange = (selectedOption) => {
        if(selectedOption=="" )
        {
            setCredentials({...credentials,'patientId':null})
        }
        else
        {
          setCredentials({...credentials,'patientId':selectedOption.value})
        }
  };
   const handleChange2 = (selectedOption) => {
        if(selectedOption=="" )
        {
            setCredentials({...credentials,'doctorId':null})
        }
        else
        {
          setCredentials({...credentials,'doctorId':selectedOption.value})
        }
  };
        const getPatientById = (id) => patients.find(d => d?._id === id);
        const getStaffById = (id) => staffs.find(d => d?._id === id);
          const options = [
            { value: "", label: "Select Patient" }, // empty option
            ... patients.map(pt => ({
                value: pt?._id,
                label: `${pt?.firstName}`
            }))
            ];
            const options2 = [
            { value: "", label: "Select Doctor" }, // empty option
            ... doctors.map(dt => {
                const staff = getStaffById(dt?.staff);
                return{
                value: dt?._id,
                label: `${staff?.firstName}`
            }})
            ];
            const filterOption = (option, inputValue) => {
            // Only filter based on the 'label' property, for example
            return option.label.toLowerCase().includes(inputValue.toLowerCase());
            };
    const addAppointments=async (e)=>{
         e.preventDefault();
        const {patientId,doctorId,bookingType,status,notes}=credentials
       // const patientobj= getPatientById(patientId);

         console.log(patientId,doctorId);
          const user=await addAppointment(patientId,doctorId,appointmentDate,bookingType,status,notes)
          console.log(user)
          if(user.success)
          {
             let message = "Appointment added successfully";
            alert(message);
            console.log("abc");
            // setShowToast(true);
            // setMsg("Appointment added successfully")
            // setType("success")
            // setTimeout(()=>{
            //   setShowToast(false)
            // },1500)
          }
    }
            useEffect(() => {
                       const fetchData = async () => {
                    const result3 = await getDoctors();
                    const result4 = await getPatients();
                    const result5 = await getStaffs();
            
                      };
                      fetchData();
                      }, []); 
  return (
    <div>
      <div class="container-fluid py-2 border-bottom d-none d-lg-block">
        <div class="container">
            <div class="row">
                <div class="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
                    <div class="d-inline-flex align-items-center">
                        <a class="text-decoration-none text-body pe-3" href="#!"><i
                                class="bi bi-telephone me-2"></i>+012
                            345 6789</a>
                        <span class="text-body">|</span>
                        <a class="text-decoration-none text-body px-3" href="#!"><i
                                class="bi bi-envelope me-2"></i>info@example.com</a>
                    </div>
                </div>
                <div class="col-md-6 text-center text-lg-end">
                    <div class="d-inline-flex align-items-center">
                        <a class="text-body px-2" href="#!">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a class="text-body px-2" href="#!">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a class="text-body px-2" href="#!">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a class="text-body px-2" href="#!">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a class="text-body ps-2" href="#!">
                            <i class="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <div class="container-fluid sticky-top bg-white shadow-sm mb-5">
        <div class="container">
            <nav class="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
                <a href="index.html" class="navbar-brand">
                    <h1 class="m-0 text-uppercase text-primary"><i class="fa fa-clinic-medical me-2"></i>Medinova</h1>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav ms-auto py-0">
                        <Link to="/" class="nav-item nav-link">Home</Link>
                        <Link to="/aboutus" class="nav-item nav-link">About</Link>
                        <Link to="/service" class="nav-item nav-link ">Service</Link>
                       {/* <a href="price.html" class="nav-item nav-link">Pricing</a> */}
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle active" data-bs-toggle="dropdown">More</a>
                            <div class="dropdown-menu m-0">
                                {/* <a href="blog.html" class="dropdown-item">Blog Grid</a>
                                <a href="detail.html" class="dropdown-item">Blog Detail</a> */}
                                <Link to="/team" class="dropdown-item">The Team</Link>
                                {/* <a href="testimonial.html" class="dropdown-item">Testimonial</a> */}
                                <Link to="/contact" class="dropdown-item">Contact</Link>
                                <Link to="/appointment" class="dropdown-item">Appointment</Link>
                                <Link to="/search" class="dropdown-item">Search</Link>
                            </div>
                        </div>
                        {/* <a href="login.html" class="nav-item nav-link">Log In</a> */}
                        {!localStorage.getItem('token')?
                        <li><Link to="/login" className="nav-item nav-link"> Login</Link></li>
                        :localStorage.getItem('utype')=="user"?<li><Link to="/login" className="nav-item nav-link" onClick={handleLogout}>Logout</Link></li>
                        :<li><Link to="/admin" className="nav-item nav-link">Dashboard</Link></li>}
                    </div>
                </div>
            </nav>
        </div>
    </div>


    <div class="container-fluid py-5">
        <div class="container">
            <div class="row gx-5">
                <div class="col-lg-6 mb-5 mb-lg-0">
                    <div class="mb-4">
                        <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5">Appointment</h5>
                        <h1 class="display-4">Make An Appointment For Your Family</h1>
                    </div>
                    <p class="mb-5">Eirmod sed tempor lorem ut dolores. Aliquyam sit sadipscing kasd ipsum. Dolor ea et
                        dolore et at sea ea at dolor, justo ipsum duo rebum sea invidunt voluptua. Eos vero eos vero ea
                        et dolore eirmod et. Dolores diam duo invidunt lorem. Elitr ut dolores magna sit. Sea dolore
                        sanctus sed et. Takimata takimata sanctus sed.</p>
                    <a class="btn btn-primary rounded-pill py-3 px-5 me-3" href="#!">Find Doctor</a>
                    <a class="btn btn-outline-primary rounded-pill py-3 px-5" href="#!">Read More</a>
                </div>
                <div class="col-lg-6">
                    <div class="bg-light text-center rounded p-5">
                        <h1 class="mb-4">Book An Appointment</h1>
                        <form onSubmit={addAppointments}>
                            <div class="row g-3">
                                <div class="col-12 col-sm-6">
                                <Select id="patientId" options={options} styles={customStyles} filterOption={filterOption} onChange={handleChange} name="patientId" placeholder="Select Patient" />

                                </div>
                                <div class="col-12 col-sm-6">
                                <Select id="doctorId" options={options2} styles={customStyles} filterOption={filterOption} onChange={handleChange2} name="doctorId" placeholder="Select Doctor" />

                                </div>
                                
                                <div class="col-12 col-sm-6">
                                    <input type="datetime-local" className="form-control" id="appointmentDate" name="appointmentDate" value={appointmentDate} placeholder="Appointment Date" onChange={handleAppointmentDateChange}  aria-describedby="emailHelp" style={{'height': '55px'}} />

                                </div>
                                <div class="col-12 col-sm-6">
                                     <select id="mySelect" style={{'height': '55px','backgroundColor':'white'}} className="form-control " name="bookingType" onChange={onChange}>
                                        <option value="">Select Type</option>
                                        <option value="online">Online</option>
                                        <option value="walk-in">Walk-In</option>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <button disabled={credentials.bookingType==""||credentials.patientId==null||credentials.doctorId==null||appointmentDate==""} class="btn btn-primary w-100 py-3" type="submit">Make An
                                        Appointment</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <UserFooter/>


    <a class="btn btn-lg btn-primary btn-lg-square back-to-top" onClick={scrollToTop}><i class="bi bi-arrow-up"></i></a>

    </div>
  )
}

export default Appointment
