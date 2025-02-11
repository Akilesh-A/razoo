
import {Link,NavLink} from "react-router-dom"
import { useState } from "react";
import { useSelector } from "react-redux";
//Css
import "../NavBar/Navbar.css";

//icons
import { FaRegUserCircle,FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart  } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { SiWhatsapp } from "react-icons/si";
import { BsInstagram } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
//images
import logo from "../../assets/images/logo-1.png"

const Navbar = () => {
    const { wishlist, addedcart } = useSelector((state) => ({
        wishlist: state.wishlist.wishlist.length,
        addedcart: state.carts.carts.length,
    }));
    const [searchtoggle,setSearchtoggle]=useState(false)
    const [toggle,setToggle]=useState(false)
    const handelnavclose=()=>{setToggle(!toggle)}
  return (
    <header>
        <nav className='nav-wrapper'>
            <div className="container nav-wrap-inner">
                {searchtoggle&&
                     <div className="search-nav">
                       <div className="pos-ser-btn-p">
                        <button className="nav-search-close-btn" onClick={()=>setSearchtoggle(!searchtoggle)}><IoClose/></button>
                            <h3 className="nav-search-title">Search Our Site</h3>
                            <div className="nav-ser-pro-pos">
                                <input type="text" className="nav-search" placeholder="Search for products.."/>
                                <button className="inp-search-p-btn"><FaSearch/></button>
                            </div>
                       </div>
                     </div>
                }
           
                <div className="row align-items-center">
                    <div className='col-md-4 col-2'>
                        <div className={`bg-mask d-md-none  ${toggle?"d-block":"d-none"}`}></div>
                        <ul className={`nav-ul-wrapper justify-content-start d-md-flex d-none `}>
                           
                            <li className='nav-item'><NavLink to="https://wa.me/910000000000" onClick={handelnavclose} className='nav-link'><SiWhatsapp/></NavLink></li>
                            <li className='nav-item'><NavLink to="/Contact" onClick={handelnavclose}  className='nav-link'><BsInstagram/></NavLink></li>
                            <li className='nav-item'><NavLink to="/About" onClick={handelnavclose} className='nav-link'><MdEmail/></NavLink></li>
                        </ul>
                        <div className='d-md-none d-block'>
                            <button className='nav-toggle-btn' onClick={handelnavclose}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                    <div className='col-md-4 col-5 d-flex justify-content-center'>
                        <Link to="/" className='text-center'><img src={logo} alt="logo" className="logo-nav" /></Link>
                    </div>
                    <div className='col-md-4 col-5 text-end'>
                        <ul className='nav-ul-wrapper justify-content-end nav-c-icon'>
                            <li className='nav-item'><p className='nav-link' onClick={()=>setSearchtoggle(!searchtoggle)}><FaSearch/></p></li>
                            <li className='nav-item'><Link to="/login" className='nav-link '><FaRegUserCircle/></Link></li>
                            <li className='nav-item'><Link to="/Cart" className='nav-link prod-count'><MdOutlineShoppingCart/> <span className="prod-count-num">{addedcart}</span></Link></li>
                            <li className='nav-item'><Link to="/Wishlist" className='nav-link  prod-count'><FaRegHeart/> <span className="prod-count-num">{wishlist}</span></Link></li>
                        </ul>
                    </div>
                </div>
                <div className="nav-r2-wraper">
                <ul className={`nav-ul-wrapper mon-nav-ul ${toggle?"mob-toggles-show":""} `}>
                            <li className="mob-toggle-li d-md-none d-flex">
                                <Link to="/">
                                    <img src={logo} alt="logo" style={{width:"200px"}} />
                                </Link> 
                                <button className="mob-nav-close-btn" onClick={handelnavclose}><IoClose/></button>
                            </li>
                            <li className='nav-item'><NavLink to="/" onClick={handelnavclose} className='nav-link'>Home</NavLink></li>
                            <li className='nav-item'><NavLink to="/Product" onClick={handelnavclose} className='nav-link'>Shop</NavLink></li>
                            <li className='nav-item nav-drop-parent'><p className='nav-link'>Sarees <IoIosArrowDown/></p>
                              <div className="pos-nav-drop">
                                <ul className="nav-dropdown-ul nav-ul-wrapper ">
                                    <li className="nav-item"><p className="nav-link">Bridal Sarees</p></li>
                                    <li className="nav-item"><p className="nav-link">Designer Sarees</p></li>
                                </ul>
                              </div>
                            </li>
                            <li className='nav-item nav-drop-parent'><p  className='nav-link'>Shop by occasion <IoIosArrowDown/></p>
                                <div className="pos-nav-drop">
                                    <ul className="nav-dropdown-ul nav-ul-wrapper ">
                                        <li className="nav-item"><p className="nav-link">Wedding / Reception</p></li>
                                        <li className="nav-item"><p className="nav-link">Engagement</p></li>
                                        <li className="nav-item"><p className="nav-link">
                                        Haldi / Mehendi</p></li>
                                        <li className="nav-item"><p className="nav-link">Sangeet and Cocktail</p></li>
                                        <li className="nav-item"><p className="nav-link">Wedding Guest</p></li>
                                    </ul>
                                </div>
                            </li>
                            <li className='nav-item'><NavLink to="/Contact" onClick={handelnavclose}  className='nav-link'>Contact</NavLink></li>
                            <li className='nav-item nav-drop-parent'><NavLink  onClick={handelnavclose} className='nav-link'>About<IoIosArrowDown/></NavLink>
                            <div className="pos-nav-drop">
                                    <ul className="nav-dropdown-ul nav-ul-wrapper ">
                                        <li className="nav-item"><Link to="/About" className="nav-link">About Seelaikaari</Link></li>
                                        <li className="nav-item"><Link to="/Stories" className="nav-link">The Seelaikaari Story</Link></li>
                                    </ul>
                                </div></li>
                        </ul>
                </div>
            </div>

        </nav>
        
    </header>
    
  )
}

export default Navbar