import React,{ useState, useEffect, useContext, useMemo } from "react";
import { useLocation } from 'react-router-dom';
import Invalid from '../img/InvalidUser.jpg'; 
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import departmentContext from '../context/departmentContext'
import staffContext from '../context/staffContext'
import doctorContext from '../context/doctorContext'
import socialContext from "../context/socialContext";

import UserFooter from "../components/UserFooter";
const customStyles = {
  control: (provided,state) => ({
    ...provided,
    minHeight: '60px', // Set your desired height
    minWidth:'150px',
    color:'#848E9F',
    borderTopLeftRadius: '8px',
    borderBottomLeftRadius: '8px',
    borderColor: "#13C5DD !important",
    zIndex:3,
    boxShadow: state.isFocused
      ? "0 0 0 .25rem rgba(19,197,221,0.25)"
      : provided.boxShadow,
    "&:hover": {
      borderColor: state.isFocused ? "#ced4da" : provided.borderColor, // Ensure consistent hover color
    },
  }),
   singleValue: (provided) => ({
    ...provided,
    color: '#848E9F',
  }),
   input: (provided) => ({
    ...provided,
    color: '#848E9F',
  }),
};
const Search = () => {
        const location = useLocation();
const department_name=location.state?.dname || "";
    const filtered_text=location.state?.searchText || "";
    console.log(department_name)
     console.log(filtered_text)
const [departmentName, setDepartmentName] = useState(department_name);
     const context=useContext(departmentContext);
      const {departments,getDepartments}=context;
       const context2=useContext(staffContext);
      const {staffs,getStaffs}=context2;
      const context3=useContext(doctorContext);
      const {doctors,getDoctors}=context3;
      const context5 = useContext(socialContext);
  const { socials, getSocials } = context5;
  const [facebookLink, setFacebookLink] = useState("");
        const [instagramLink, setInstagramLink] = useState("");
        const [twitterLink, setTwitterLink] = useState("");
        const [youtubeLink, setYoutubeLink] = useState("");
        const [linkedinLink, setLinkedInLink] = useState("");
      const [filteredStaff, setFilteredStaff] = useState([]);

      const [filterText, setFilterText] = useState(filtered_text);
      
const mergedData = filteredStaff.map(staff => {
  const doctor = doctors.find(dc => dc.staff === staff._id);
  return {
    ...staff,
    doctorSpecializations: doctor ? doctor.specializations : 'Unknown',
     doctorExperienceYears: doctor ? doctor.experienceYears : 0,
      doctorConsultationFee: doctor ? doctor.consultationFee : 0,
      doctorPhotoPath: doctor ? doctor.photoPath : 'Unknown'
  };
});
// const mergedDatatext = staffs.map(staff => {
//   const doctor = doctors.find(dc => dc.staff === staff._id);
//   return {
//     ...staff,
//     doctorSpecializations: doctor ? doctor.specializations : 'Unknown',
//      doctorExperienceYears: doctor ? doctor.experienceYears : 0,
//       doctorConsultationFee: doctor ? doctor.consultationFee : 0,
//   };
// });
const mergedDatatext = doctors.map(doctor => {
  const staff = staffs.find(st => st._id === doctor.staff);
  return {
    ...doctor,
    staffFirstName: staff ? staff.firstName : 'Unknown'
     
  };
});

console.log(mergedData);
  // Handle input change and update the filter state
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  // Memoize the filtering process for performance
  const filteredDoctors = useMemo(() => {
    if (!filterText) return mergedData;
console.log('here in filter')
    const lowercasedFilter = filterText.toLowerCase();
 console.log(lowercasedFilter);
  console.log(mergedData);
    // Use the filter method on the merged data
    return mergedData.filter(doctor => {
      console.log(doctor);
      // Check for a match in the product name OR the related category name
      return (
        doctor.firstName.toLowerCase().includes(lowercasedFilter) ||
        // doctor.description.toLowerCase().includes(lowercasedFilter) ||
        doctor.doctorSpecializations.toLowerCase().includes(lowercasedFilter) ||
        String(doctor.doctorExperienceYears).toLowerCase().includes(lowercasedFilter) ||
        String(doctor.doctorConsultationFee).toLowerCase().includes(lowercasedFilter) 
      );
    });
  }, [filterText,mergedData]); // 
  const filteredDoctorstext = useMemo(() => {
    if (!filterText) return mergedDatatext;

    const lowercasedFilter = filterText.toLowerCase();

    // Use the filter method on the merged data
    return mergedDatatext.filter(doctor => {
      // Check for a match in the product name OR the related category name
            console.log(doctor);

      return (
        doctor.staffFirstName.toLowerCase().includes(lowercasedFilter) ||
        // doctor.description.toLowerCase().includes(lowercasedFilter) ||
        doctor.specializations.toLowerCase().includes(lowercasedFilter) ||
        String(doctor.experienceYears).toLowerCase().includes(lowercasedFilter) ||
        String(doctor.consultationFee).toLowerCase().includes(lowercasedFilter) 
      );
    });
  }, [filterText,mergedDatatext]); 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Adds a smooth scrolling animation
    });
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
  };
  const getDoctorById = (id) => doctors.find(d => d.staff === id);
  const getStaffById = (id) => staffs.find(s => s._id === id);

   const handleChange = (selectedOption) => {
    console.log(selectedOption);
    if(selectedOption.value=="" )
    {
        setDepartmentName(null)
    }
    else
    {
      setDepartmentName(selectedOption.value)
    }
    const filteredStf=staffs.filter(staff=>staff.department==selectedOption.value)
    setFilteredStaff(filteredStf);
  }
  const options = [
    { value: "", label: "Department" }, // empty option
    ...departments.map((dpt) => ({
      value: dpt._id,
      label: `${dpt.name}`,
    })),
  ];
  const defaultValue = options.find(d=>d.value==department_name);
  const filterOption = (option, inputValue) => {
    // Only filter based on the 'label' property, for example
    return option.label.toLowerCase().includes(inputValue.toLowerCase());
  };
  useEffect(() => {
      const fetchData = async () => {
        
        const result6=await getDepartments()
        const result7=await getStaffs()
        const result8=await getDoctors()
        const result2 = await getSocials();

      };
      fetchData();
    }, []);
     useEffect(() => {
        const facebook = socials.find((d) => d.platformName == "Facebook");
        const instagram = socials.find((d) => d.platformName == "Instagram");
        const twitter = socials.find((d) => d.platformName == "Twitter");
        const youtube = socials.find((d) => d.platformName == "Youtube");
        const linkedin = socials.find((d) => d.platformName == "LinkedIn");
        setFacebookLink(facebook?.url);
        setInstagramLink(instagram?.url);
        setTwitterLink(twitter?.url);
        setYoutubeLink(youtube?.url);
        setLinkedInLink(linkedin?.url);
      }, [socials]);
     useEffect(() => {
      const filteredStf=staffs.filter(staff=>staff.department==departmentName)
      setFilteredStaff(filteredStf);
    }, [departmentName]);
    
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
               <a class="text-body px-2" target="_blank" href={facebookLink}>
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a class="text-body px-2" target="_blank" href={twitterLink}>
                  <i class="fab fa-twitter"></i>
                </a>
                <a class="text-body px-2" target="_blank" href={linkedinLink}>
                  <i class="fab fa-linkedin-in"></i>
                </a>
                <a class="text-body px-2" target="_blank" href={instagramLink}>
                  <i class="fab fa-instagram"></i>
                </a>
                <a class="text-body ps-2" target="_blank" href={youtubeLink}>
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
            <Link to="/" class="navbar-brand">
                         <h1 class="m-0 text-uppercase text-primary">
                           <i class="fa fa-clinic-medical me-2"></i>Medinova
                         </h1>
                       </Link>
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
                <Link to="/service" class="nav-item nav-link ">
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

      <div class="container-fluid pt-5">
        <div class="container">
          <div
            class="text-center mx-auto mb-5"
            style={{ "max-width": "500px" }}
          >
            <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5">
              Find A Doctor
            </h5>
            <h1 class="display-4 mb-4">Find A Healthcare Professionals</h1>
            <h5 class="fw-normal">
              Duo ipsum erat stet dolor sea ut nonumy tempor. Tempor duo lorem
              eos sit sed ipsum takimata ipsum sit est. Ipsum ea voluptua ipsum
              sit justo
            </h5>
          </div>
          <div class="mx-auto" style={{ width: "100%", "max-width": "670px" }}>
            <div class="input-group">
              {/* <select class="form-select border-primary w-25" style={{'height': '60px'}}>
                        <option selected>Department</option>
                        <option value="1">Department 1</option>
                        <option value="2">Department 2</option>
                        <option value="3">Department 3</option>
                    </select> */}
              <Select
                id="departmentId"
                options={options}
                filterOption={filterOption}
                defaultValue={defaultValue}
                onChange={handleChange}
                name="departmentId"
                placeholder="Department"
                styles={customStyles}
              />
              <input
                type="text"
                class="form-control border-primary w-49"
                placeholder="Keyword"
                onChange={handleFilterChange}
                value={filterText}
              />
              <button class="btn btn-dark border-0 w-25">Search</button>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid py-5">
        <div class="container">
          <div class="row g-5">
            {!departmentName && !filterText && (
                doctors.map((doctor,index) => {
                   const parts = doctor.photoPath?.split('\\')
            const remainingParts = parts?.slice(1);
            const newPath = remainingParts?.join('/');
            console.log(newPath);
            const existingImage=`http://localhost:5000/${newPath}`; // from DB
            const staff=getStaffById(doctor.staff)
            const Index=index%3;
            console.log("here in empty")
            return(
                <div class="col-lg-6 team-item">
              <div class="row g-0 bg-light rounded overflow-hidden">
                <div class="col-12 col-sm-5 h-100">
                  <img
                    class="img-fluid h-100"
                    src={doctor.photoPath?existingImage:Invalid}
                    style={{ "object-fit": "cover" }}
                  />
                </div>
                <div class="col-12 col-sm-7 h-100 d-flex flex-column">
                  <div class="mt-auto p-4">
                    <h3>{staff.firstName}</h3>
                    <h6 class="fw-normal fst-italic text-primary mb-4">
                      {doctor?.specializations}
                    </h6>
                    <p class="m-0">
                      {staff?.firstName} has {doctor?.experienceYears} Years
                              of Experience and his/her Consultation Fee is Rs
                              {doctor?.consultationFee}
                    </p>
                  </div>
                  <div class="d-flex mt-auto border-top p-4">
                    <a
                      class="btn btn-lg btn-primary btn-lg-square rounded-circle me-3"
                      href="#!"
                    >
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a
                      class="btn btn-lg btn-primary btn-lg-square rounded-circle me-3"
                      href="#!"
                    >
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a
                      class="btn btn-lg btn-primary btn-lg-square rounded-circle"
                      href="#!"
                    >
                      <i class="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
        )})
            )}
             {departmentName && filterText && (
                filteredDoctors.map((doctor,index) => {
            const parts = doctor.doctorPhotoPath?.split('\\')
            const remainingParts = parts?.slice(1);
            const newPath = remainingParts?.join('/');
            console.log(newPath);
            const existingImage=`http://localhost:5000/${newPath}`; // from DB
                const Index=index%3;
                return(
                <div class="col-lg-6 team-item">
              <div class="row g-0 bg-light rounded overflow-hidden">
                <div class="col-12 col-sm-5 h-100">
                  <img
                    class="img-fluid h-100"
                    src={doctor.doctorPhotoPath?existingImage:Invalid}
                    style={{ "object-fit": "cover" }}
                  />
                </div>
                <div class="col-12 col-sm-7 h-100 d-flex flex-column">
                  <div class="mt-auto p-4">
                    <h3>{doctor.firstName}</h3>
                    <h6 class="fw-normal fst-italic text-primary mb-4">
                      {doctor.doctorSpecializations}
                    </h6>
                    <p class="m-0">
                      {doctor?.firstName} has {doctor.doctorExperienceYears} Years
                              of Experience and his/her Consultation Fee is Rs
                              {doctor.doctorConsultationFee}
                    </p>
                  </div>
                  <div class="d-flex mt-auto border-top p-4">
                    <a
                      class="btn btn-lg btn-primary btn-lg-square rounded-circle me-3"
                      href="#!"
                    >
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a
                      class="btn btn-lg btn-primary btn-lg-square rounded-circle me-3"
                      href="#!"
                    >
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a
                      class="btn btn-lg btn-primary btn-lg-square rounded-circle"
                      href="#!"
                    >
                      <i class="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>)
})
            )} 
            {departmentName && !filterText && (
               filteredStaff.map((staff,index) => {
            const doctor=getDoctorById(staff._id)
            const Index=index%3;
            const parts = doctor.photoPath?.split('\\')
            const remainingParts = parts?.slice(1);
            const newPath = remainingParts?.join('/');
            console.log(newPath);
            const existingImage=`http://localhost:5000/${newPath}`; // from DB
            console.log("here in empty")
            return(
                <div class="col-lg-6 team-item">
              <div class="row g-0 bg-light rounded overflow-hidden">
                <div class="col-12 col-sm-5 h-100">
                  <img
                    class="img-fluid h-100"
                    src={doctor.photoPath?existingImage:Invalid}
                    style={{ "object-fit": "cover" }}
                  />
                </div>
                <div class="col-12 col-sm-7 h-100 d-flex flex-column">
                  <div class="mt-auto p-4">
                    <h3>{staff.firstName}</h3>
                    <h6 class="fw-normal fst-italic text-primary mb-4">
                      {doctor?.specializations}
                    </h6>
                    <p class="m-0">
                      {staff?.firstName} has {doctor?.experienceYears} Years
                              of Experience and his/her Consultation Fee is Rs
                              {doctor?.consultationFee}
                    </p>
                  </div>
                  <div class="d-flex mt-auto border-top p-4">
                    <a
                      class="btn btn-lg btn-primary btn-lg-square rounded-circle me-3"
                      href="#!"
                    >
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a
                      class="btn btn-lg btn-primary btn-lg-square rounded-circle me-3"
                      href="#!"
                    >
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a
                      class="btn btn-lg btn-primary btn-lg-square rounded-circle"
                      href="#!"
                    >
                      <i class="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
        )})
            )} 
            {!departmentName && filterText && (
               (
                filteredDoctorstext.map((doctor,index) => {
                  const parts = doctor.photoPath?.split('\\')
                  const remainingParts = parts?.slice(1);
                  const newPath = remainingParts?.join('/');
                  console.log(newPath);
                  const existingImage=`http://localhost:5000/${newPath}`; // from DB
                  
                const Index=index%3;
                return(
                <div class="col-lg-6 team-item">
              <div class="row g-0 bg-light rounded overflow-hidden">
                <div class="col-12 col-sm-5 h-100">
                  <img
                    class="img-fluid h-100"
                    // src={require(`../img/team-${Index + 1}.jpg`)}
                    src={doctor.photoPath?existingImage:Invalid}
                    style={{ "object-fit": "cover" }}
                  />
                </div>
                <div class="col-12 col-sm-7 h-100 d-flex flex-column">
                  <div class="mt-auto p-4">
                    <h3>{doctor.staffFirstName}</h3>
                    <h6 class="fw-normal fst-italic text-primary mb-4">
                      {doctor.specializations}
                    </h6>
                    <p class="m-0">
                      {doctor?.staffFirstName} has {doctor.experienceYears} Years
                              of Experience and his/her Consultation Fee is Rs
                              {doctor.consultationFee}
                    </p>
                  </div>
                  <div class="d-flex mt-auto border-top p-4">
                    <a
                      class="btn btn-lg btn-primary btn-lg-square rounded-circle me-3"
                      href="#!"
                    >
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a
                      class="btn btn-lg btn-primary btn-lg-square rounded-circle me-3"
                      href="#!"
                    >
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a
                      class="btn btn-lg btn-primary btn-lg-square rounded-circle"
                      href="#!"
                    >
                      <i class="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
                )})
            )
            )}
             {/* {!departmentName ? filterText?<p></p>:doctors.map(doctor => {
            const staff=getStaffById(doctor.staff)
           
            return(
                <div class="col-lg-6 team-item">
              <div class="row g-0 bg-light rounded overflow-hidden">
                <div class="col-12 col-sm-5 h-100">
                  <img
                    class="img-fluid h-100"
                    src="img/team-1.jpg"
                    style={{ "object-fit": "cover" }}
                  />
                </div>
                <div class="col-12 col-sm-7 h-100 d-flex flex-column">
                  <div class="mt-auto p-4">
                    <h3>{staff.firstName}</h3>
                    <h6 class="fw-normal fst-italic text-primary mb-4">
                      {doctor?.specializations}
                    </h6>
                    <p class="m-0">
                      {staff?.firstName} has {doctor?.experienceYears} Years
                              of Experience and his/her Consultation Fee is Rs
                              {doctor?.consultationFee}
                    </p>
                  </div>
                  <div class="d-flex mt-auto border-top p-4">
                    <a
                      class="btn btn-lg btn-primary btn-lg-square rounded-circle me-3"
                      href="#!"
                    >
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a
                      class="btn btn-lg btn-primary btn-lg-square rounded-circle me-3"
                      href="#!"
                    >
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a
                      class="btn btn-lg btn-primary btn-lg-square rounded-circle"
                      href="#!"
                    >
                      <i class="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
        )})
        
       : (!filterText?filteredStaff.map(staff => {
            const doctor=getDoctorById(staff._id)
            console.log("here in empty")
            return(
                <div class="col-lg-6 team-item">
              <div class="row g-0 bg-light rounded overflow-hidden">
                <div class="col-12 col-sm-5 h-100">
                  <img
                    class="img-fluid h-100"
                    src="img/team-1.jpg"
                    style={{ "object-fit": "cover" }}
                  />
                </div>
                <div class="col-12 col-sm-7 h-100 d-flex flex-column">
                  <div class="mt-auto p-4">
                    <h3>{staff.firstName}</h3>
                    <h6 class="fw-normal fst-italic text-primary mb-4">
                      {doctor?.specializations}
                    </h6>
                    <p class="m-0">
                      {staff?.firstName} has {doctor?.experienceYears} Years
                              of Experience and his/her Consultation Fee is Rs
                              {doctor?.consultationFee}
                    </p>
                  </div>
                  <div class="d-flex mt-auto border-top p-4">
                    <a
                      class="btn btn-lg btn-primary btn-lg-square rounded-circle me-3"
                      href="#!"
                    >
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a
                      class="btn btn-lg btn-primary btn-lg-square rounded-circle me-3"
                      href="#!"
                    >
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a
                      class="btn btn-lg btn-primary btn-lg-square rounded-circle"
                      href="#!"
                    >
                      <i class="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
        )}):
        filteredDoctors.map(doctor => (
                <div class="col-lg-6 team-item">
              <div class="row g-0 bg-light rounded overflow-hidden">
                <div class="col-12 col-sm-5 h-100">
                  <img
                    class="img-fluid h-100"
                    src="img/team-1.jpg"
                    style={{ "object-fit": "cover" }}
                  />
                </div>
                <div class="col-12 col-sm-7 h-100 d-flex flex-column">
                  <div class="mt-auto p-4">
                    <h3>{doctor.firstName}</h3>
                    <h6 class="fw-normal fst-italic text-primary mb-4">
                      {doctor.doctorSpecializations}
                    </h6>
                    <p class="m-0">
                      {doctor?.firstName} has {doctor.doctorExperienceYears} Years
                              of Experience and his/her Consultation Fee is Rs
                              {doctor.doctorConsultationFee}
                    </p>
                  </div>
                  <div class="d-flex mt-auto border-top p-4">
                    <a
                      class="btn btn-lg btn-primary btn-lg-square rounded-circle me-3"
                      href="#!"
                    >
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a
                      class="btn btn-lg btn-primary btn-lg-square rounded-circle me-3"
                      href="#!"
                    >
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a
                      class="btn btn-lg btn-primary btn-lg-square rounded-circle"
                      href="#!"
                    >
                      <i class="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
             )))
      } */}
            {/* {departmentName ?  (<div class="row g-5">): */}
             
            {/* } */}
           
          </div>
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

export default Search;
