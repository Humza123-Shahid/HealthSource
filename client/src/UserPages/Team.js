import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import staffContext from "../context/staffContext";
import doctorContext from "../context/doctorContext";
import departmentContext from "../context/departmentContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/swiperPagination.css";
import "../styles/team.css";
import UserFooter from "../components/UserFooter";
const Team = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const prevRef2 = useRef(null);
  const nextRef2 = useRef(null);
  const context = useContext(staffContext);
  const { staffs, getStaffs } = context;
  const context2 = useContext(doctorContext);
  const { doctors, getDoctors } = context2;
  const context3 = useContext(departmentContext);
  const { departments, getDepartments } = context3;
  //   const [departments, setDepartments] = useState([]);
  //   const [doctors, setDoctors] = useState([]);
  const [activeDept, setActiveDept] = useState(null);
  const [expandedDoctor, setExpandedDoctor] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getStaffs();
      const result2 = await getDepartments();
      const result3 = await getDoctors();
    };
    fetchData();
  }, []);
  const getDoctorById = (id) => doctors.find(d => d.staff === id);

  const handleAccordionToggle = (docId) => {
    setExpandedDoctor(expandedDoctor === docId ? null : docId);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Adds a smooth scrolling animation
    });
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
  };
  return (
    <div>
      <div class="container-fluid py-2 border-bottom d-none d-lg-block">
        <div class="container">
          <div class="row">
            <div class="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
              <div class="d-inline-flex align-items-center">
                <a class="text-decoration-none text-body pe-3" href="#!">
                  <i class="bi bi-telephone me-2"></i>+012 345 6789
                </a>
                <span class="text-body">|</span>
                <a class="text-decoration-none text-body px-3" href="#!">
                  <i class="bi bi-envelope me-2"></i>info@example.com
                </a>
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
              <h1 class="m-0 text-uppercase text-primary">
                <i class="fa fa-clinic-medical me-2"></i>Medinova
              </h1>
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <div class="navbar-nav ms-auto py-0">
                <Link to="/" class="nav-item nav-link">
                  Home
                </Link>
                <Link to="/aboutus" class="nav-item nav-link">
                  About
                </Link>
                <Link to="/service" class="nav-item nav-link">
                  Service
                </Link>
                {/* <a href="price.html" class="nav-item nav-link">Pricing</a> */}
                <div class="nav-item dropdown">
                  <a
                    href="#"
                    class="nav-link dropdown-toggle active"
                    data-bs-toggle="dropdown"
                  >
                    More
                  </a>
                  <div class="dropdown-menu m-0">
                    {/* <a href="blog.html" class="dropdown-item">Blog Grid</a>
                                <a href="detail.html" class="dropdown-item">Blog Detail</a> */}
                    <Link to="/team" class="dropdown-item">
                      The Team
                    </Link>
                    {/* <a href="testimonial.html" class="dropdown-item">Testimonial</a> */}
                    <Link to="/contact" class="dropdown-item">
                      Contact
                    </Link>
                    <Link to="/appointment" class="dropdown-item">
                      Appointment
                    </Link>
                    <Link to="/search" class="dropdown-item">
                      Search
                    </Link>
                  </div>
                </div>
                {/* <a href="login.html" class="nav-item nav-link">Log In</a> */}
                 {!localStorage.getItem('token')?
                <Link to="/login" className="nav-item nav-link"> Login</Link>
                :localStorage.getItem('utype')=="user"?<Link to="/login" className="nav-item nav-link" onClick={handleLogout}>Logout</Link>
                :<Link to="/admin" className="nav-item nav-link">Dashboard</Link>}
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div class="container-fluid py-5">
        <div class="container">
          <div
            class="text-center mx-auto mb-5"
            style={{ "max-width": "500px" }}
          >
            <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5">
              Our Doctors
            </h5>
            <h1 class="display-4">Qualified Healthcare Professionals</h1>
          </div>
          <div className="page-container">
            {/* Left Side: Departments [1] */}
            <div className="left-panel">
              <h2>Departments</h2>
              <ul>
                {departments.map((dept) => (
                  <li
                    key={dept._id}
                    className={activeDept === dept._id ? "active" : ""}
                    onClick={() => setActiveDept(dept._id)}
                  >
                    {dept.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side: Doctors Accordion [3, 4] */}
            <div className="right-panel">
              <h2>Doctors</h2>
              {staffs
                .filter(
                  (staff) =>
                    staff.department != null && staff.department === activeDept,
                )
                .map((stf) => {
                const doctor = getDoctorById(stf._id);

                return(
                  <div key={stf._id} className="accordion-item">
                    <div
                      className="accordion-header"
                      onClick={() => handleAccordionToggle(stf._id)}
                    >
                      {stf.firstName}({doctor?.specializations})
                      {/* {stf.name} - {stf.specialty} */}
                    </div>
                    {expandedDoctor === stf._id && (
                      <div className="accordion-content">
                        <p>{stf?.firstName} has {doctor.experienceYears} Years of Experience and his/her Consultation Fee is Rs{doctor.consultationFee}</p>
                        
                      </div>
                    )}
                  </div>)
              })}
            </div>
          </div>
          {/* <Swiper loop={true}  autoplay={{

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
                <SwiperSlide>
                <div class="team-item">
                    <div class="row g-0 bg-light rounded overflow-hidden" style={{'height':'350px'}}>
                        <div class="col-12 col-sm-5 h-100">
                            <img class="img-fluid h-100" src="img/team-1.jpg" style={{'objectFit': 'cover'}}/>
                        </div>
                        <div class="col-12 col-sm-7 h-100 d-flex flex-column">
                            <div class="mt-auto p-4">
                                <h3>Doctor Name</h3>
                                <h6 class="fw-normal fst-italic text-primary mb-4">Cardiology Specialist</h6>
                                <p class="m-0">Dolor lorem eos dolor duo eirmod sea. Dolor sit magna rebum clita rebum
                                    dolor</p>
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
                <SwiperSlide>

                <div class="team-item">
                    <div class="row g-0 bg-light rounded overflow-hidden" style={{'height':'350px'}}>
                        <div class="col-12 col-sm-5 h-100">
                            <img class="img-fluid h-100" src="img/team-2.jpg" style={{'objectFit': 'cover'}}/>
                        </div>
                        <div class="col-12 col-sm-7 h-100 d-flex flex-column">
                            <div class="mt-auto p-4">
                                <h3>Doctor Name</h3>
                                <h6 class="fw-normal fst-italic text-primary mb-4">Cardiology Specialist</h6>
                                <p class="m-0">Dolor lorem eos dolor duo eirmod sea. Dolor sit magna rebum clita rebum
                                    dolor</p>
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
                <SwiperSlide>

                <div class="team-item">
                    <div class="row g-0 bg-light rounded overflow-hidden" style={{'height':'350px'}}>
                        <div class="col-12 col-sm-5 h-100">
                            <img class="img-fluid h-100" src="img/team-3.jpg" style={{'objectFit': 'cover'}}/>
                        </div>
                        <div class="col-12 col-sm-7 h-100 d-flex flex-column">
                            <div class="mt-auto p-4">
                                <h3>Doctor Name</h3>
                                <h6 class="fw-normal fst-italic text-primary mb-4">Cardiology Specialist</h6>
                                <p class="m-0">Dolor lorem eos dolor duo eirmod sea. Dolor sit magna rebum clita rebum
                                    dolor</p>
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
                <button ref={prevRef} className="custom-prev">
                    <i className="bi bi-arrow-left fs-4"/>
                    </button>
                    <button ref={nextRef} className="custom-next">
                    <i className="bi bi-arrow-right fs-4"/>
                </button>
            </Swiper> */}
        </div>
      </div>

      <UserFooter />

      <a
        class="btn btn-lg btn-primary btn-lg-square back-to-top"
        onClick={scrollToTop}
      >
        <i class="bi bi-arrow-up"></i>
      </a>
    </div>
  );
};

export default Team;
