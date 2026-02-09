import React,{useEffect,useContext,useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";

// import '../lib/owlcarousel/assets/owl.carousel.min.css';
// import '../lib/owlcarousel/assets/owl.theme.default.min.css';
// import $ from "jquery";
// import "../css/style.css";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
// import "owl.carousel";
// window.$ = window.jQuery = $;
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination} from "swiper/modules";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import '../styles/swiperPagination.css';
import socialContext from '../context/socialContext'
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

const Home = () => {
    const context5=useContext(socialContext);
        const {socials,getSocials}=context5;
    const prevRef = useRef(null);
  const nextRef = useRef(null);
  const prevRef2 = useRef(null);
  const nextRef2 = useRef(null);
  const imgRef = useRef(null);
  const [facebookLink, setFacebookLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [linkedinLink, setLinkedInLink] = useState('');
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
    // const dynamicNumber=1;
    // const dynamicSrc="img/team-"+ dynamicNumber+".jpg";
    // console.log(dynamicSrc);
    // const myImage=document.getElementById("doctorImage1");
    // console.log(myImage);
    // myImage.src=dynamicSrc;


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
              ... doctors?.map(dt => {
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
    useEffect(() => {
    // const script = document.createElement('script');
    // script.src = '../lib/owlcarousel/owl.carousel.min.js'; // Use public path
    // script.async = true;
    // script.onload = () => {
    //   // Script is loaded, you can now use its functions
    //   if (window.someGlobalFunction) {
    //     window.someGlobalFunction();
    //   }
    // };

    // document.body.appendChild(script);

    // // Cleanup function to remove script when component unmounts
    // return () => {
    //   document.body.removeChild(script);
    // };
    //  $(".owl-carousel").owlCarousel({
    //     loop: true,
    //   items: 1
    // });
     const fetchData = async () => {
            const result2 = await getSocials();
         
          };
      
          fetchData();
    //       if (imgRef.current) {
    //             console.log("Image element found:", imgRef.current);
    //             imgRef.current.src = dynamicSrc; 
    // }
  }, []); 
useEffect(() => {
      const facebook=socials.find(d => d.platformName == "Facebook");
      const instagram=socials.find(d => d.platformName == "Instagram");
      const twitter=socials.find(d => d.platformName == "Twitter");
      const youtube=socials.find(d => d.platformName == "Youtube");
      const linkedin=socials.find(d => d.platformName == "LinkedIn");
      setFacebookLink(facebook?.url);
      setInstagramLink(instagram?.url);
      setTwitterLink(twitter?.url);
      setYoutubeLink(youtube?.url);
      setLinkedInLink(linkedin?.url);


  }, [socials]); 
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
                        <a class="text-body px-2" target="_blank" href={facebookLink} >
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a class="text-body px-2" target="_blank" href={twitterLink} >
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a class="text-body px-2" target="_blank" href={linkedinLink} >
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a class="text-body px-2" target="_blank" href={instagramLink} >
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a class="text-body ps-2" target="_blank" href={youtubeLink} >
                            <i class="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="container-fluid sticky-top bg-white shadow-sm">
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
                        {/* <a href="index.html" class="nav-item nav-link active">Home</a> */}
                        <Link to="/" class="nav-item nav-link active">Home</Link>
                        <Link to="/aboutus" class="nav-item nav-link">About</Link>
                        {/* <a href="about.html" class="nav-item nav-link">About</a> */}
                        <Link to="/service" class="nav-item nav-link">Service</Link>
                        {/* <a href="price.html" class="nav-item nav-link">Pricing</a> */}
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">More</a>
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
                        <Link to="/login" className="nav-item nav-link"> Login</Link>
                        :localStorage.getItem('utype')=="user"?<Link to="/login" className="nav-item nav-link" onClick={handleLogout}>Logout</Link>
                        :<Link to="/admin" className="nav-item nav-link">Dashboard</Link>}
                        {/* <a href="contact.html" class="nav-item nav-link">Contact</a> */}
                    </div>
                </div>
            </nav>
        </div>
    </div>


    <div class="container-fluid bg-primary py-5 mb-5 hero-header">
        <div class="container py-5">
            <div class="row justify-content-start">
                <div class="col-lg-8 text-center text-lg-start">
                    <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5"
                        style={{'borderColor': 'rgba(256, 256, 256, .3) !important'}}>Welcome To Medinova</h5>
                    <h1 class="display-1 text-white mb-md-4">Best Healthcare Solution In Your City</h1>
                    <div class="pt-2">
                        <a href="#!" class="btn btn-light rounded-pill py-md-3 px-md-5 mx-2">Find Doctor</a>
                        <a href="#!" class="btn btn-outline-light rounded-pill py-md-3 px-md-5 mx-2">Appointment</a>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="container-fluid py-5">
        <div class="container">
            <div class="row gx-5">
                <div class="col-lg-5 mb-5 mb-lg-0" style={{'minHeight': '500px'}}>
                    <div class="position-relative h-100">
                        <img class="position-absolute w-100 h-100 rounded" src="img/about.jpg"
                            style={{objectFit: 'cover'}}/>
                    </div>
                </div>
                <div class="col-lg-7">
                    <div class="mb-4">
                        <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5">About Us</h5>
                        <h1 class="display-4">Best Medical Care For Yourself and Your Family</h1>
                    </div>
                    <p>Tempor erat elitr at rebum at at clita aliquyam consetetur. Diam dolor diam ipsum et, tempor
                        voluptua sit consetetur sit. Aliquyam diam amet diam et eos sadipscing labore. Clita erat ipsum
                        et lorem et sit, sed stet no labore lorem sit. Sanctus clita duo justo et tempor consetetur
                        takimata eirmod, dolores takimata consetetur invidunt magna dolores aliquyam dolores dolore.
                        Amet erat amet et magna</p>
                    <div class="row g-3 pt-3">
                        <div class="col-sm-3 col-6">
                            <div class="bg-light text-center rounded-circle py-4">
                                <i class="fa fa-3x fa-user-md text-primary mb-3"></i>
                                <h6 class="mb-0">Qualified<small class="d-block text-primary">Doctors</small></h6>
                            </div>
                        </div>
                        <div class="col-sm-3 col-6">
                            <div class="bg-light text-center rounded-circle py-4">
                                <i class="fa fa-3x fa-procedures text-primary mb-3"></i>
                                <h6 class="mb-0">Emergency<small class="d-block text-primary">Services</small></h6>
                            </div>
                        </div>
                        <div class="col-sm-3 col-6">
                            <div class="bg-light text-center rounded-circle py-4">
                                <i class="fa fa-3x fa-microscope text-primary mb-3"></i>
                                <h6 class="mb-0">Accurate<small class="d-block text-primary">Testing</small></h6>
                            </div>
                        </div>
                        <div class="col-sm-3 col-6">
                            <div class="bg-light text-center rounded-circle py-4">
                                <i class="fa fa-3x fa-ambulance text-primary mb-3"></i>
                                <h6 class="mb-0">Free<small class="d-block text-primary">Ambulance</small></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="container-fluid py-5">
        <div class="container">
            <div class="text-center mx-auto mb-5" style={{'maxWidth': '500px'}}>
                <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5">Services</h5>
                <h1 class="display-4">Excellent Medical Services</h1>
            </div>
            <div class="row g-5">
                <div class="col-lg-4 col-md-6">
                    <div
                        class="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                        <div class="service-icon mb-4">
                            <i class="fa fa-2x fa-user-md text-white"></i>
                        </div>
                        <h4 class="mb-3">Emergency Care</h4>
                        <p class="m-0">Kasd dolor no lorem nonumy sit labore tempor at justo rebum rebum stet, justo
                            elitr dolor amet sit</p>
                        <a class="btn btn-lg btn-primary rounded-pill" href="#!">
                            <i class="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div
                        class="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                        <div class="service-icon mb-4">
                            <i class="fa fa-2x fa-procedures text-white"></i>
                        </div>
                        <h4 class="mb-3">Operation & Surgery</h4>
                        <p class="m-0">Kasd dolor no lorem nonumy sit labore tempor at justo rebum rebum stet, justo
                            elitr dolor amet sit</p>
                        <a class="btn btn-lg btn-primary rounded-pill" href="#!">
                            <i class="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div
                        class="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                        <div class="service-icon mb-4">
                            <i class="fa fa-2x fa-stethoscope text-white"></i>
                        </div>
                        <h4 class="mb-3">Outdoor Checkup</h4>
                        <p class="m-0">Kasd dolor no lorem nonumy sit labore tempor at justo rebum rebum stet, justo
                            elitr dolor amet sit</p>
                        <a class="btn btn-lg btn-primary rounded-pill" href="#!">
                            <i class="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div
                        class="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                        <div class="service-icon mb-4">
                            <i class="fa fa-2x fa-ambulance text-white"></i>
                        </div>
                        <h4 class="mb-3">Ambulance Service</h4>
                        <p class="m-0">Kasd dolor no lorem nonumy sit labore tempor at justo rebum rebum stet, justo
                            elitr dolor amet sit</p>
                        <a class="btn btn-lg btn-primary rounded-pill" href="#!">
                            <i class="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div
                        class="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                        <div class="service-icon mb-4">
                            <i class="fa fa-2x fa-pills text-white"></i>
                        </div>
                        <h4 class="mb-3">Medicine & Pharmacy</h4>
                        <p class="m-0">Kasd dolor no lorem nonumy sit labore tempor at justo rebum rebum stet, justo
                            elitr dolor amet sit</p>
                        <a class="btn btn-lg btn-primary rounded-pill" href="#!">
                            <i class="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div
                        class="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                        <div class="service-icon mb-4">
                            <i class="fa fa-2x fa-microscope text-white"></i>
                        </div>
                        <h4 class="mb-3">Blood Testing</h4>
                        <p class="m-0">Kasd dolor no lorem nonumy sit labore tempor at justo rebum rebum stet, justo
                            elitr dolor amet sit</p>
                        <a class="btn btn-lg btn-primary rounded-pill" href="#!">
                            <i class="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="container-fluid bg-primary my-5 py-5">
        <div class="container py-5">
            <div class="row gx-5">
                <div class="col-lg-6 mb-5 mb-lg-0">
                    <div class="mb-4">
                        <h5 class="d-inline-block text-white text-uppercase border-bottom border-5">Appointment</h5>
                        <h1 class="display-4">Make An Appointment For Your Family</h1>
                    </div>
                    <p class="text-white mb-5">Eirmod sed tempor lorem ut dolores. Aliquyam sit sadipscing kasd ipsum.
                        Dolor ea et dolore et at sea ea at dolor, justo ipsum duo rebum sea invidunt voluptua. Eos vero
                        eos vero ea et dolore eirmod et. Dolores diam duo invidunt lorem. Elitr ut dolores magna sit.
                        Sea dolore sanctus sed et. Takimata takimata sanctus sed.</p>
                    <a class="btn btn-dark rounded-pill py-3 px-5 me-3" href="#!">Find Doctor</a>
                    <a class="btn btn-outline-dark rounded-pill py-3 px-5" href="#!">Read More</a>
                </div>
                <div class="col-lg-6">
                    <div class="bg-white text-center rounded p-5">
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


    <div class="container-fluid py-5">
        <div class="container">
            <div class="text-center mx-auto mb-5" style={{'maxWidth': '500px'}}>
                <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5">Medical Packages</h5>
                <h1 class="display-4">Awesome Medical Programs</h1>
            </div>
            <div class="owl-carousel price-carousel position-relative" style={{'padding': '0 45px 45px 45px'}}>
            <Swiper  loop={true}  autoplay={{
							delay: 3000,
							disableOnInteraction: false,
						}}
						modules={[Autoplay, Pagination,Navigation]}
						// pagination={{ clickable: true }}
                        spaceBetween={45}
                        slidesPerView={3}
                        speed={1000}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef2.current;
                            swiper.params.navigation.nextEl = nextRef2.current;
                            }}
                            navigation={{
                            prevEl: prevRef2.current,
                            nextEl: nextRef2.current,
                        }}
                        style={{height:'655px'}}
				>
                <SwiperSlide>
                <div class="bg-light rounded text-center">
                    <div class="position-relative">
                        <img class="img-fluid rounded-top" src="img/price-1.jpg" alt=""/>
                        <div class="position-absolute w-100 h-100 top-50 start-50 translate-middle rounded-top d-flex flex-column align-items-center justify-content-center"
                            style={{'background': 'rgba(29, 42, 77, .8)'}}>
                            <h3 class="text-white">Pregnancy Care</h3>
                            <h1 class="display-4 text-white mb-0">
                                <small class="align-top fw-normal"
                                    style={{'fontSize': '22px', 'lineHeight': '45px'}}>$</small>49<small
                                    class="align-bottom fw-normal" style={{'fontSize': '16px', 'lineHeight': '40px'}}>/
                                    Year</small>
                            </h1>
                        </div>
                    </div>
                    <div class="text-center py-5">
                        <p>Emergency Medical Treatment</p>
                        <p>Highly Experienced Doctors</p>
                        <p>Highest Success Rate</p>
                        <p>Telephone Service</p>
                        <a href="#!" class="btn btn-primary rounded-pill py-3 px-5 my-2">Apply Now</a>
                    </div>
                </div>
                </SwiperSlide>
                <SwiperSlide>             
                <div class="bg-light rounded text-center">
                    <div class="position-relative">
                        <img class="img-fluid rounded-top" src="img/price-2.jpg" alt=""/>
                        <div class="position-absolute w-100 h-100 top-50 start-50 translate-middle rounded-top d-flex flex-column align-items-center justify-content-center"
                            style={{'background': 'rgba(29, 42, 77, .8)'}}>
                            <h3 class="text-white">Health Checkup</h3>
                            <h1 class="display-4 text-white mb-0">
                                <small class="align-top fw-normal"
                                    style={{'fontSize': '22px', 'lineHeight': '45px'}}>$</small>99<small
                                    class="align-bottom fw-normal" style={{'fontSize': '16px', 'lineHeight': '40px'}}>/
                                    Year</small>
                            </h1>
                        </div>
                    </div>
                    <div class="text-center py-5">
                        <p>Emergency Medical Treatment</p>
                        <p>Highly Experienced Doctors</p>
                        <p>Highest Success Rate</p>
                        <p>Telephone Service</p>
                        <a href="#!" class="btn btn-primary rounded-pill py-3 px-5 my-2">Apply Now</a>
                    </div>
                </div>
                </SwiperSlide>
                <SwiperSlide>             
                <div class="bg-light rounded text-center">
                    <div class="position-relative">
                        <img class="img-fluid rounded-top" src="img/price-3.jpg" alt=""/>
                        <div class="position-absolute w-100 h-100 top-50 start-50 translate-middle rounded-top d-flex flex-column align-items-center justify-content-center"
                            style={{'background': 'rgba(29, 42, 77, .8)'}}>
                            <h3 class="text-white">Dental Care</h3>
                            <h1 class="display-4 text-white mb-0">
                                <small class="align-top fw-normal"
                                    style={{'fontSize': '22px', 'lineHeight': '45px'}}>$</small>149<small
                                    class="align-bottom fw-normal" style={{'fontSize': '16px', lineHeight: '40px'}}>/
                                    Year</small>
                            </h1>
                        </div>
                    </div>
                    <div class="text-center py-5">
                        <p>Emergency Medical Treatment</p>
                        <p>Highly Experienced Doctors</p>
                        <p>Highest Success Rate</p>
                        <p>Telephone Service</p>
                        <a href="#!" class="btn btn-primary rounded-pill py-3 px-5 my-2">Apply Now</a>
                    </div>
                </div>
                </SwiperSlide>
                <SwiperSlide>             
                <div class="bg-light rounded text-center">
                    <div class="position-relative">
                        <img class="img-fluid rounded-top" src="img/price-4.jpg" alt=""/>
                        <div class="position-absolute w-100 h-100 top-50 start-50 translate-middle rounded-top d-flex flex-column align-items-center justify-content-center"
                            style={{'background': 'rgba(29, 42, 77, .8)'}}>
                            <h3 class="text-white">Operation & Surgery</h3>
                            <h1 class="display-4 text-white mb-0">
                                <small class="align-top fw-normal"
                                    style={{'fontSize': '22px', 'lineHeight': '45px'}}>$</small>199<small
                                    class="align-bottom fw-normal" style={{'fontSize': '16px', lineHeight: '40px'}}>/
                                    Year</small>
                            </h1>
                        </div>
                    </div>
                    <div class="text-center py-5">
                        <p>Emergency Medical Treatment</p>
                        <p>Highly Experienced Doctors</p>
                        <p>Highest Success Rate</p>
                        <p>Telephone Service</p>
                        <a href="#!" class="btn btn-primary rounded-pill py-3 px-5 my-2">Apply Now</a>
                    </div>
                </div>
                </SwiperSlide>
                  <button ref={prevRef2} className="custom-prev2">
                    <i className="bi bi-arrow-left fs-4"/>
                    </button>
                    <button ref={nextRef2} className="custom-next2">
                    <i className="bi bi-arrow-right fs-4"/>
                </button>
                </Swiper>
            </div>
        </div>
    </div>

    <div class="container-fluid py-5">
        <div class="container">
            <div class="text-center mx-auto mb-5" style={{'maxWidth': '500px'}}>
                <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5">Our Doctors</h5>
                <h1 class="display-4">Qualified Healthcare Professionals</h1>
            </div>
            {/* <Swiper  loop={true}  autoplay={{ */}
            <Swiper loop={true}  autoplay={{

							delay: 4000,
							disableOnInteraction: false,
						}}
                        
                        modules={[Navigation,Autoplay, Pagination]}
                        //navigation
                        slidesPerView={2}
                        spaceBetween={45}
                        speed={1000}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                            }}
                            navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                         
						 //modules={[Autoplay, Pagination]}
						//pagination={{ clickable: true }}
                        
						>
                {Array.isArray(doctors) &&doctors.slice(0, 3).map((row,index) => {
                    const staff = getStaffById(row?.staff);
                    return(
                <SwiperSlide>
                <div class="team-item">
                    <div class="row g-0 bg-light rounded overflow-hidden" style={{'height':'350px'}}>
                        <div class="col-12 col-sm-5 h-100">
                            <img id="doctorImage1" class="img-fluid h-100" src={require(`../img/team-${index+1}.jpg`)} style={{'objectFit': 'cover'}}/>
                        </div>
                        <div class="col-12 col-sm-7 h-100 d-flex flex-column">
                            <div class="mt-auto p-4">
                                <h3>{staff?.firstName}</h3>
                                <h6 class="fw-normal fst-italic text-primary mb-4">{row.specializations}</h6>
                                <p class="m-0">{staff?.firstName} has {row.experienceYears} Years of Experience and his/her Consultation Fee is {row.consultationFee} PKR.</p>
                            </div>
                            <div class="d-flex mt-auto border-top p-4">
                                <a class="btn btn-lg btn-primary btn-lg-square rounded-circle me-3" href="#!"><i
                                        class="fab fa-twitter"></i></a>
                                <a class="btn btn-lg btn-primary btn-lg-square rounded-circle me-3" href="#!"><i
                                        class="fab fa-facebook-f"></i></a>
                                <a class="btn btn-lg btn-primary btn-lg-square rounded-circle" href="#!"><i
                                        class="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                </SwiperSlide>
                    )
                })}

                
                <button ref={prevRef} className="custom-prev">
                    <i className="bi bi-arrow-left fs-4"/>
                    </button>
                    <button ref={nextRef} className="custom-next">
                    <i className="bi bi-arrow-right fs-4"/>
                </button>
            </Swiper>
        </div>
    </div>


    <div class="container-fluid bg-primary my-5 py-5">
        <div class="container py-5">
            <div class="text-center mx-auto mb-5" style={{'maxWidth': '500px'}}>
                <h5 class="d-inline-block text-white text-uppercase border-bottom border-5">Find A Doctor</h5>
                <h1 class="display-4 mb-4">Find A Healthcare Professionals</h1>
                <h5 class="text-white fw-normal">Duo ipsum erat stet dolor sea ut nonumy tempor. Tempor duo lorem eos
                    sit sed ipsum takimata ipsum sit est. Ipsum ea voluptua ipsum sit justo</h5>
            </div>
            {/* <div class="mx-auto" stylee={{width: '100%', height: '600px'}}> */}
            <div class="mx-auto" style={{'width': '100%', 'max-width': '600px'}}>
                <div class="input-group">
                    <select class="form-select border-primary w-25" style={{'height': '60px'}}>
                        <option selected>Department</option>
                        <option value="1">Department 1</option>
                        <option value="2">Department 2</option>
                        <option value="3">Department 3</option>
                    </select>
                    <input type="text" class="form-control border-primary w-50" placeholder="Keyword"/>
                    <button class="btn btn-dark border-0 w-25">Search</button>
                </div>
            </div>
        </div>
    </div>


    <div class="container-fluid py-5">
        <div class="container">
            <div class="text-center mx-auto mb-5" style={{'maxWidth': '500px'}}>
                <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5">Testimonial</h5>
                <h1 class="display-4">Patients Say About Our Services</h1>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    
                        <Swiper  loop={true}  autoplay={{
							delay: 3000,
							disableOnInteraction: false,
						}}
						modules={[Autoplay, Pagination]}
						pagination={{ clickable: true }}
                        speed={1000}
                        style={{height:'475px'}}
						>
                        <SwiperSlide>
                        <div class="testimonial-item text-center">
                            <div class="position-relative mb-5">
                                <img class="img-fluid rounded-circle mx-auto" src="img/testimonial-1.jpg" alt=""/>
                                <div class="position-absolute top-100 start-50 translate-middle d-flex align-items-center justify-content-center bg-white rounded-circle"
                                    style={{'width': '60px', 'height': '60px'}}>
                                    <i class="fa fa-quote-left fa-2x text-primary"></i>
                                </div>
                            </div>
                            <p class="fs-4 fw-normal">Dolores sed duo clita tempor justo dolor et stet lorem kasd labore
                                dolore lorem ipsum. At lorem lorem magna ut et, nonumy et labore et tempor diam tempor
                                erat. Erat dolor rebum sit ipsum.</p>
                            <hr class="w-25 mx-auto"/>
                            <h3>Patient Name</h3>
                            <h6 class="fw-normal text-primary mb-3">Profession</h6>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div class="testimonial-item text-center">
                            <div class="position-relative mb-5">
                                <img class="img-fluid rounded-circle mx-auto" src="img/testimonial-2.jpg" alt=""/>
                                <div class="position-absolute top-100 start-50 translate-middle d-flex align-items-center justify-content-center bg-white rounded-circle"
                                    style={{'width': '60px', 'height': '60px'}}>
                                    <i class="fa fa-quote-left fa-2x text-primary"></i>
                                </div>
                            </div>
                            <p class="fs-4 fw-normal">Dolores sed duo clita tempor justo dolor et stet lorem kasd labore
                                dolore lorem ipsum. At lorem lorem magna ut et, nonumy et labore et tempor diam tempor
                                erat. Erat dolor rebum sit ipsum.</p>
                            <hr class="w-25 mx-auto"/>
                            <h3>Patient Name</h3>
                            <h6 class="fw-normal text-primary mb-3">Profession</h6>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div class="testimonial-item text-center">
                            <div class="position-relative mb-5">
                                <img class="img-fluid rounded-circle mx-auto" src="img/testimonial-3.jpg" alt=""/>
                                <div class="position-absolute top-100 start-50 translate-middle d-flex align-items-center justify-content-center bg-white rounded-circle"
                                    style={{'width': '60px', 'height': '60px'}}>
                                    <i class="fa fa-quote-left fa-2x text-primary"></i>
                                </div>
                            </div>
                            <p class="fs-4 fw-normal">Dolores sed duo clita tempor justo dolor et stet lorem kasd labore
                                dolore lorem ipsum. At lorem lorem magna ut et, nonumy et labore et tempor diam tempor
                                erat. Erat dolor rebum sit ipsum.</p>
                            <hr class="w-25 mx-auto"/>
                            <h3>Patient Name</h3>
                            <h6 class="fw-normal text-primary mb-3">Profession</h6>
                        </div>
                        </SwiperSlide>
                        </Swiper>
                    </div>
            </div>
        </div>
    </div>


    <div class="container-fluid py-5">
        <div class="container">
            <div class="text-center mx-auto mb-5" style={{'maxWidth': '500px'}}>
                <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5">Blog Post</h5>
                <h1 class="display-4">Our Latest Medical Blog Posts</h1>
            </div>
            <div class="row g-5">
                <div class="col-xl-4 col-lg-6">
                    <div class="bg-light rounded overflow-hidden">
                        <img class="img-fluid w-100" src="img/blog-1.jpg" alt=""/>
                        <div class="p-4">
                            <a class="h3 d-block mb-3" href="#!">Dolor clita vero elitr sea stet dolor justo diam</a>
                            <p class="m-0">Dolor lorem eos dolor duo et eirmod sea. Dolor sit magna
                                rebum clita rebum dolor stet amet justo</p>
                        </div>
                        <div class="d-flex justify-content-between border-top p-4">
                            <div class="d-flex align-items-center">
                                <img class="rounded-circle me-2" src="img/user.jpg" width="25" height="25" alt=""/>
                                <small>John Doe</small>
                            </div>
                            <div class="d-flex align-items-center">
                                <small class="ms-3"><i class="far fa-eye text-primary me-1"></i>12345</small>
                                <small class="ms-3"><i class="far fa-comment text-primary me-1"></i>123</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-6">
                    <div class="bg-light rounded overflow-hidden">
                        <img class="img-fluid w-100" src="img/blog-2.jpg" alt=""/>
                        <div class="p-4">
                            <a class="h3 d-block mb-3" href="#!">Dolor clita vero elitr sea stet dolor justo diam</a>
                            <p class="m-0">Dolor lorem eos dolor duo et eirmod sea. Dolor sit magna
                                rebum clita rebum dolor stet amet justo</p>
                        </div>
                        <div class="d-flex justify-content-between border-top p-4">
                            <div class="d-flex align-items-center">
                                <img class="rounded-circle me-2" src="img/user.jpg" width="25" height="25" alt=""/>
                                <small>John Doe</small>
                            </div>
                            <div class="d-flex align-items-center">
                                <small class="ms-3"><i class="far fa-eye text-primary me-1"></i>12345</small>
                                <small class="ms-3"><i class="far fa-comment text-primary me-1"></i>123</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-6">
                    <div class="bg-light rounded overflow-hidden">
                        <img class="img-fluid w-100" src="img/blog-3.jpg" alt=""/>
                        <div class="p-4">
                            <a class="h3 d-block mb-3" href="#!">Dolor clita vero elitr sea stet dolor justo diam</a>
                            <p class="m-0">Dolor lorem eos dolor duo et eirmod sea. Dolor sit magna
                                rebum clita rebum dolor stet amet justo</p>
                        </div>
                        <div class="d-flex justify-content-between border-top p-4">
                            <div class="d-flex align-items-center">
                                <img class="rounded-circle me-2" src="img/user.jpg" width="25" height="25" alt=""/>
                                <small>John Doe</small>
                            </div>
                            <div class="d-flex align-items-center">
                                <small class="ms-3"><i class="far fa-eye text-primary me-1"></i>12345</small>
                                <small class="ms-3"><i class="far fa-comment text-primary me-1"></i>123</small>
                            </div>
                        </div>
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

export default Home
