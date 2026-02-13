import React,{useEffect,useContext,useState} from 'react'
import { Link, useNavigate } from "react-router-dom";

import socialContext from '../context/socialContext'

const UserFooter = () => {
    const context=useContext(socialContext);
        const {socials,getSocials}=context;
    const [facebookLink, setFacebookLink] = useState('');
      const [instagramLink, setInstagramLink] = useState('');
      const [twitterLink, setTwitterLink] = useState('');
      const [youtubeLink, setYoutubeLink] = useState('');
      const [linkedinLink, setLinkedInLink] = useState('');
             let navigate=useNavigate();
      
      const handleSignUpClick = () => {
    navigate('/signup');
  };
      useEffect(() => {
      const fetchData = async () => {
                  const result2 = await getSocials();
               
                };
            
                fetchData();
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
                        <Link to="/" class="text-light mb-2"><i class="fa fa-angle-right me-2"></i>Home</Link>
                        <Link to="/aboutus" class="text-light mb-2"><i class="fa fa-angle-right me-2"></i>About Us</Link>
                        <Link to="/service" class="text-light mb-2"><i class="fa fa-angle-right me-2"></i>Our Services</Link>
                        <Link to="/team" class="text-light mb-2"><i class="fa fa-angle-right me-2"></i>Meet The Team</Link>
                        <Link to="/contact" class="text-light mb-2"><i class="fa fa-angle-right me-2"></i>Contact Us</Link>

                        {/* <a class="text-light mb-2" href="#!"><i class="fa fa-angle-right me-2"></i>Latest Blog</a> */}
                    
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h4 class="d-inline-block text-primary text-uppercase border-bottom border-5 border-secondary mb-4">
                        Popular Links</h4>
                    <div class="d-flex flex-column justify-content-start">
                        <Link to="/" class="text-light mb-2"><i class="fa fa-angle-right me-2"></i>Home</Link>
                        <Link to="/aboutus" class="text-light mb-2"><i class="fa fa-angle-right me-2"></i>About Us</Link>
                        <Link to="/service" class="text-light mb-2"><i class="fa fa-angle-right me-2"></i>Our Services</Link>
                        <Link to="/team" class="text-light mb-2"><i class="fa fa-angle-right me-2"></i>Meet The Team</Link>
                        <Link to="/contact" class="text-light mb-2"><i class="fa fa-angle-right me-2"></i>Contact Us</Link>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h4 class="d-inline-block text-primary text-uppercase border-bottom border-5 border-secondary mb-4">
                        Newsletter</h4>
                    <form action="">
                        <div class="input-group">
                            <input type="text" class="form-control p-3 border-0" placeholder="Your Email Address"/>
                            <button class="btn btn-primary" onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </form>
                    <h6 class="text-primary text-uppercase mt-4 mb-3">Follow Us</h6>
                    <div class="d-flex">
                        <a class="btn btn-lg btn-primary btn-lg-square rounded-circle me-2" target="_blank" href={twitterLink}><i
                                class="fab fa-twitter"></i></a>
                        <a class="btn btn-lg btn-primary btn-lg-square rounded-circle me-2" target="_blank" href={facebookLink}><i
                                class="fab fa-facebook-f"></i></a>
                        <a class="btn btn-lg btn-primary btn-lg-square rounded-circle me-2" target="_blank" href={linkedinLink}><i
                                class="fab fa-linkedin-in"></i></a>
                        <a class="btn btn-lg btn-primary btn-lg-square rounded-circle" target="_blank" href={instagramLink}><i
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
    </div>
  )
}

export default UserFooter
