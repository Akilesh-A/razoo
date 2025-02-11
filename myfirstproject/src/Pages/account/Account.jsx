import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Account.css"
import { toast } from "react-toastify";

const Accout = () => {
    const [edittoggle,setEdittoggle]=useState(false)
    const [defaultuserdetail,setDefaultUserdetail]=useState({
        name:"john",
        email:"john@gmail.com",
        phoneno:"1231231231"
    })
    const [userdetail,setUserdetail]=useState(defaultuserdetail)
    const [userdetailerror,setUserdetailerror]=useState({})
    const handeleditpersonalinfo=(e)=>{
        e.preventDefault()
        if(!handelEditError()){
            return
        }
        console.log(userdetail,defaultuserdetail);
        
        setUserdetail({
            name:"",
            email:"",
            phoneno:""
        })
        setEdittoggle(!edittoggle)
              toast.success("Edited successfully!");
    }
    const handelcancel=()=>{
        
        setEdittoggle(!edittoggle)
    }
    const handelEditError = () => {
        var newErrors = {};
        if (!userdetail.name) newErrors.name = "Name is required.";
    
        if (!userdetail.email) {
          newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(userdetail.email)) {
          newErrors.email = "Invalid email format.";
        }
    
        if (!userdetail.phoneno) {
          newErrors.phoneno = "Phone number is required.";
        } else if (!/^\d{10}$/.test(userdetail.phoneno)) {
          newErrors.phone = "Phone number must be 10 digits.";
        }
        
        setUserdetailerror(newErrors);
    
        return Object.keys(newErrors).length === 0;
      };
  return (
    <>
        <section className='account-wrap-sec'>
            <div className="container">
                <h2 className=''>My Account</h2>
                <div className="row">
                    <div className="col-md-3">
                        <div className='accnt-l-wrap'>
                            <ul className='accnt-ul-wrap'>
                                <li>Dashboard</li>
                                <li><Link to="/Wishlist" className='nav-link'>Your Wishlist</Link></li>
                                <li><Link to="/Cart" className='nav-link'>Your Cart</Link></li>
                                <li>Log Out</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className='accnt-r-wrap'>
                            <h4 className='acct-r-t'>Personal Information</h4>
                            {!edittoggle?
                                <div>
                                <table className='acct-table'>
                                  <tbody>
                                  <tr>
                                        <td>Name:</td>
                                        <td>{defaultuserdetail.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Email:</td>
                                        <td>{defaultuserdetail.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone no:</td>
                                        <td>{defaultuserdetail.phoneno}</td>
                                    </tr>
                                  </tbody>
                                </table>
                                <button className='acct-btn-edit' onClick={()=>setEdittoggle(!edittoggle)}>Edit</button>
                                </div>
                                :
                                <div>
                                    <form action="" onSubmit={handeleditpersonalinfo}>
                                        <div className="row row-gap-4 mt-5">
                                            <div className="col-lg-6 col-md-12 ">
                                        <input type="text" value={userdetail.name}
                          onChange={(e) =>
                            setUserdetail({
                              ...userdetail,
                              name: e.target.value,
                            })
                          } placeholder='Your Name' className='acnt-form-inp'/>
                                        {userdetailerror.name&&<div className='err-acted'>{userdetailerror.name}</div>}
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                            <input type="text" value={userdetail.email}
                          onChange={(e) =>
                            setUserdetail({
                              ...userdetail,
                              email: e.target.value,
                            })
                          } placeholder='Your Email' className='acnt-form-inp' />
                                        {userdetailerror.email&&<div className='err-acted'>{userdetailerror.email}</div>}
                                            
                                            </div>
                                            <div className="col-md-6">
                                            <input type="number" value={userdetail.phoneno}
                          onChange={(e) =>
                            setUserdetail({
                              ...userdetail,
                              phoneno: e.target.value,
                            })
                          } placeholder='Your Phone number' className='acnt-form-inp'/>
                                        {userdetailerror.phoneno&&<div className='err-acted'>{userdetailerror.phoneno}</div>}
    
                                            </div>
                                        </div>
                                        <button className='acct-btn-edit mt-4' type='submit'>Submit</button>
                                        <button className='acct-btn-edit mx-4' onClick={()=>handelcancel()} type='button'>Cancel</button>
                                    </form>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Accout