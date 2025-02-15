import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RazorpayPayment from "../RazorpayPayment/RazorpayPayment";
import "../Checkout/Checkout.css";

// Importing from the country-state-city package
import {  State, City } from "country-state-city";

function Checkout() {
  const location = useLocation();
  const { cartItems = [], totalAmount = 0 } = location.state || {}; // Ensuring default values
  console.log(totalAmount);

  const [showPayment, setShowPayment] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobile: "",
    address1: "",
    address2: "",
    state: "",
    city: "",
    pincode: "",
  });
  const [formErrors, setFormErrors] = useState({});
  
  const [states, setStates] = useState([]); 
  const [cities, setCities] = useState([]); 

  useEffect(() => {
    
    const indianStates = State.getStatesOfCountry("IN"); // "IN" is the country code for India
    setStates(indianStates);
    // console.log(states);
    console.log(indianStates);
    
    
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setUserDetails({ ...userDetails, state: selectedState });

    // Fetch cities based on selected state
    if (selectedState) {
      const citiesList = City.getCitiesOfState("IN", selectedState); 
         // console.log(citiesList);
      setCities(citiesList);
   
      
      
      
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowPayment(true);
    }
  };

  const validateForm = () => {
    let errors = {};
    Object.keys(userDetails).forEach((key) => {
      if (!userDetails[key]) {
        errors[key] = `${key} is required`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="chkout-outer">
      <div className="container chk-out">
        <h2>Enter Shipping Details</h2>
        {!showPayment ? (
          <div className="row caart-holder">
            <div className="col-md-8 form-contains">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {Object.keys(userDetails).map((field) => {
                    if (field === "state") {
                      return (
                        <div key={field} className="form-group col-md-6">
                          <label htmlFor={field}>State:</label>
                          <select
                            id={field}
                            name={field}
                            value={userDetails[field]}
                            onChange={handleStateChange}
                            className="form-control"
                          >
                            <option value="">Select State</option>
                            {states.map((state) => (
                              <option key={state.isoCode} value={state.isoCode}>
                                {state.name}
                              </option>
                            ))}
                          </select>
                          {formErrors[field] && <p className="error">{formErrors[field]}</p>}
                        </div>
                      );
                    }
                    if (field === "city") {
                      return (
                        <div key={field} className="form-group col-md-6">
                          <label htmlFor={field}>City:</label>
                          <select
                            id={field}
                            name={field}
                            value={userDetails[field]}
                            onChange={handleInputChange}
                            className="form-control"
                          >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                              <option key={city.name} value={city.name}>
                                {city.name}
                              </option>
                            ))}
                          </select>
                          {formErrors[field] && <p className="error">{formErrors[field]}</p>}
                        </div>
                      );
                    }
                    return (
                      <div key={field} className="form-group col-md-6">
                        <label htmlFor={field}>
                          {field.charAt(0).toUpperCase() + field.slice(1)}:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={field}
                          name={field}
                          value={userDetails[field]}
                          onChange={handleInputChange}
                          placeholder={`Enter ${field}`}
                        />
                        {formErrors[field] && <p className="error">{formErrors[field]}</p>}
                      </div>
                    );
                  })}
                  <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary mt-2 mb-3">
                      Continue
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Cart Items Display */}
            <div className="col-md-4 chkout-summary">
              <div className="summary-content">
                <h3 className="chkout-head-summary text-center">Order Summary</h3>
                <div className="row">
                  {cartItems.map((item, index) => (
                    <div key={index} className="d-flex align-items-center mb-3 des-details">
                      <div className="col-2">
                        <img src={item.image} alt={item.name} className="img-fluid" />
                      </div>
                      <div className="col-10 crt-details">
                        <h3>{item.name}</h3>
                        <p>Price: {item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  <hr />
                  <div className="col-12 text-center final-price">
                    <p> Total Rs: {totalAmount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <RazorpayPayment
            totalAmount={totalAmount}
            userDetails={userDetails}
            cartItems={cartItems || []}
            setShowPayment={setShowPayment}
          />
        )}
      </div>
    </div>
  );
}

export default Checkout;
