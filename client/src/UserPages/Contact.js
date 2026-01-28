import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Contact = () => {
          const scrollToTop = () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth' // Adds a smooth scrolling animation
          });
        };
          const handleLogout =()=>{
            localStorage.removeItem('token');
          }
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
                        {/* <a href="about.html" class="nav-item nav-link">About</a> */}
                        <Link to="/service" class="nav-item nav-link">Service</Link>
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
            <div class="text-center mx-auto mb-5" style={{'max-width': '500px'}}>
                <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5">Any Questions?</h5>
                <h1 class="display-4">Please Feel Free To Contact Us</h1>
            </div>
            <div class="row g-5 mb-5">
                <div class="col-lg-4">
                    <div class="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center"
                        style={{'height': '200px'}}>
                        <div class="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4"
                            style={{'width': '100px','height': '70px', 'transform': 'rotate(-15deg)'}}>    
                            <i class="fa fa-2x fa-location-arrow text-white" style={{'transform': 'rotate(15deg)'}}></i>
                        </div>
                        <h6 class="mb-0">123 Street, New York, USA</h6>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center"
                        style={{'height': '200px'}}>
                        <div class="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4"
                            style={{'width': '100px','height': '70px', 'transform': 'rotate(-15deg)'}}>
                            <i class="fa fa-2x fa-phone text-white" style={{'transform': 'rotate(15deg)'}}></i>
                        </div>
                        <h6 class="mb-0">+012 345 6789</h6>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center"
                        style={{'height': '200px'}}>
                        <div class="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4"
                            style={{'width': '100px','height': '70px', 'transform': 'rotate(-15deg)'}}>
                            <i class="fa fa-2x fa-envelope-open text-white" style={{'transform': 'rotate(15deg)'}}></i>
                        </div>
                        <h6 class="mb-0">info@example.com</h6>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12" style={{'height': '500px'}}>
                    <div class="position-relative h-100">
                        <iframe class="position-relative w-100 h-100"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
                            frameborder="0" style={{'border':'0'}} allowfullscreen="" aria-hidden="false"
                            tabindex="0"></iframe>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center position-relative" style={{'margin-top': '-200px','z-index': '1'}}>
                <div class="col-lg-8">
                    <div class="bg-white rounded p-5 m-5 mb-0">
                        <form>
                            <div class="row g-3">
                                <div class="col-12 col-sm-6">
                                    <input type="text" class="form-control bg-light border-0" placeholder="Your Name"
                                        style={{'height': '55px'}}/>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <input type="email" class="form-control bg-light border-0" placeholder="Your Email"
                                        style={{'height': '55px'}}/>
                                </div>
                                <div class="col-12">
                                    <input type="text" class="form-control bg-light border-0" placeholder="Subject"
                                        style={{'height': '55px'}}/>
                                </div>
                                <div class="col-12">
                                    <textarea class="form-control bg-light border-0" rows="5"
                                        placeholder="Message"></textarea>
                                </div>
                                <div class="col-12">
                                    <button class="btn btn-primary w-100 py-3" type="submit">Send Message</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="container-fluid bg-dark text-light mt-5 py-5">
        <div class="container py-5">
            <div class="row g-5">
                <div class="col-lg-3 col-md-6">
                    <h4 class="d-inline-block text-primary text-uppercase border-bottom border-5 border-secondary mb-4">
                        Get In Touch</h4>
                    <p class="mb-4">No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et et dolor sed
                        dolor</p>
                    <p class="mb-2"><i class="fa fa-map-marker-alt text-primary me-3"></i>123 Street, New York, USA</p>
                    <p class="mb-2"><i class="fa fa-envelope text-primary me-3"></i>info@example.com</p>
                    <p class="mb-0"><i class="fa fa-phone-alt text-primary me-3"></i>+012 345 67890</p>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h4 class="d-inline-block text-primary text-uppercase border-bottom border-5 border-secondary mb-4">
                        Quick Links</h4>
                    <div class="d-flex flex-column justify-content-start">
                        <a class="text-light mb-2" href="#!"><i class="fa fa-angle-right me-2"></i>Home</a>
                        <a class="text-light mb-2" href="#!"><i class="fa fa-angle-right me-2"></i>About Us</a>
                        <a class="text-light mb-2" href="#!"><i class="fa fa-angle-right me-2"></i>Our Services</a>
                        <a class="text-light mb-2" href="#!"><i class="fa fa-angle-right me-2"></i>Meet The Team</a>
                        <a class="text-light mb-2" href="#!"><i class="fa fa-angle-right me-2"></i>Latest Blog</a>
                        <a class="text-light" href="#!"><i class="fa fa-angle-right me-2"></i>Contact Us</a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h4 class="d-inline-block text-primary text-uppercase border-bottom border-5 border-secondary mb-4">
                        Popular Links</h4>
                    <div class="d-flex flex-column justify-content-start">
                        <a class="text-light mb-2" href="#!"><i class="fa fa-angle-right me-2"></i>Home</a>
                        <a class="text-light mb-2" href="#!"><i class="fa fa-angle-right me-2"></i>About Us</a>
                        <a class="text-light mb-2" href="#!"><i class="fa fa-angle-right me-2"></i>Our Services</a>
                        <a class="text-light mb-2" href="#!"><i class="fa fa-angle-right me-2"></i>Meet The Team</a>
                        <a class="text-light mb-2" href="#!"><i class="fa fa-angle-right me-2"></i>Latest Blog</a>
                        <a class="text-light" href="#!"><i class="fa fa-angle-right me-2"></i>Contact Us</a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h4 class="d-inline-block text-primary text-uppercase border-bottom border-5 border-secondary mb-4">
                        Newsletter</h4>
                    <form action="">
                        <div class="input-group">
                            <input type="text" class="form-control p-3 border-0" placeholder="Your Email Address"/>
                            <button class="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                    <h6 class="text-primary text-uppercase mt-4 mb-3">Follow Us</h6>
                    <div class="d-flex">
                        <a class="btn btn-lg btn-primary btn-lg-square rounded-circle me-2" href="#!"><i
                                class="fab fa-twitter"></i></a>
                        <a class="btn btn-lg btn-primary btn-lg-square rounded-circle me-2" href="#!"><i
                                class="fab fa-facebook-f"></i></a>
                        <a class="btn btn-lg btn-primary btn-lg-square rounded-circle me-2" href="#!"><i
                                class="fab fa-linkedin-in"></i></a>
                        <a class="btn btn-lg btn-primary btn-lg-square rounded-circle" href="#!"><i
                                class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid bg-dark text-light border-top border-secondary py-4">
        <div class="container">
            <div class="row g-5">
                <div class="col-md-6 text-center text-md-start">
                    <p class="mb-md-0">&copy; <a class="text-primary" href="#!">Your Site Name</a>. All Rights Reserved.
                    </p>
                </div>
                <div class="col-md-6 text-center text-md-end">
                    <p class="mb-0">Designed by <a class="text-primary" href="https://htmlcodex.com"
                            target="_blank">HTML Codex</a>. Distributed by <a href="https://themewagon.com"
                            target="_blank">ThemeWagon</a>.</p>
                </div>
            </div>
        </div>
    </div>


    <a class="btn btn-lg btn-primary btn-lg-square back-to-top" onClick={scrollToTop}><i class="bi bi-arrow-up"></i></a>


    </div>
  )
}

export default Contact
