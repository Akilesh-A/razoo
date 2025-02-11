
import { Link } from "react-router-dom"
//images
import logo from "../../assets/images/logo-1.png"
//icons
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
//css
import "../Footer/Footer.css";

const Footer = () => {
    return (
        <footer className="footer-wrapper">
            <div className="ft-row-1">
                <div className="container">
                        <div className="row row-gap-4">
                            <div className="col-md-5">
                                <Link to="/">
                                    <img src={logo} alt="" style={{width:"200px"}} />
                                </Link>
                                <ul className="footer-ul-l1">
                                    <li><IoLocationSharp/> Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
                                    <li><FaPhoneAlt/> +91-000-000-0000</li>
                                    <li><MdEmail/>example@gmail.com</li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <h4 className="title-ft">Quick Links</h4>
                                <ul className="ft-ul-wrapper">
                                    <li><Link to="/" className="ft-nav-link">Home</Link></li>
                                    <li><Link to="/About" className="ft-nav-link">About</Link></li>
                                    <li><Link to="/Contact" className="ft-nav-link">Contact</Link></li>
                                    <li><Link to="/Product" className="ft-nav-link">Shop</Link></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <h4 className="title-ft">Customer Service</h4>
                                <ul className="ft-ul-wrapper">
                                    <li><Link to="/Contact" className="ft-nav-link">Contact Us</Link></li>
                                    <li><Link to="/Termsandconditions" className="ft-nav-link">Terms of use</Link></li>
                                    <li><Link to="/Policy" className="ft-nav-link">Privacy Policy</Link></li>
                                </ul>
                            </div>
                        </div>
                </div>
            </div>
            <div className="ft-row-2">
                <div className="container">
                    <h2 className="ft-copy">@Copyrights 2025</h2>
                </div>
            </div>
        </footer>
    )
}

export default Footer