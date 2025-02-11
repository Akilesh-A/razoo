import React, { useState } from 'react';
import '../Contact/Contact.css'; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    comment: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    mobile: '',
    email: '',
    comment: '',
  });

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
      isValid = false;
    }

    if (!formData.comment) {
      newErrors.comment = 'Comment is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Data:', formData);
     
    }
  };

  return (
    <div className="contact-container">
      {/* Map Section */}
      <div className="map-container">
        <iframe 
          title="Location Map"
          src='

https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62265.572914295124!2d77.79151043072625!3d12.739607733468766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae70c883f728a3%3A0xd71a6bc0275ac9be!2sHosur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1738671243525!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
          width="100%" 
          height="300" 
          style={{border: 0}} 
          allowFullScreen="" 
          loading="lazy">
        </iframe>
      </div>

  
      <div className="contact-info">
        <h2>Contact Information</h2>
        <p><strong>Email:</strong> customersupport@seelaikaari.com</p>
        <p><strong>Phone Number:</strong> 044-123654789</p>
        <p><strong>WhatsApp:</strong> +91 1234567895</p>
        <p><strong>Address:</strong> AB-149, 2nd Floor, 3rd Main Road</p>
        <p><strong>Working Hours:</strong> 10:30 AM to 6:30 PM Mon-Sun</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <h3>Get in Touch</h3>
        <p className="intro-text">We'd love to hear from you about our entire service. Your comments and suggestions will be highly appreciated. Please complete the form below.</p>

        <div className="form-fields">
          <div className="field-group">
            <label>Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Enter your name" />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="field-group">
            <label>Mobile Number</label>
            <input 
              type="tel" 
              name="mobile" 
              value={formData.mobile} 
              onChange={handleChange} 
              placeholder="Enter your mobile number" />
            {errors.mobile && <p className="error">{errors.mobile}</p>}
          </div>

          <div className="field-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Enter your email" />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className='field-group'>

          </div>

          <div className="field-group-comment">
            <label>Comment</label>
            <textarea 
              name="comment" 
              value={formData.comment} 
              onChange={handleChange} 
              placeholder="Write your message"></textarea>
            {errors.comment && <p className="error">{errors.comment}</p>}
          </div>
        </div>


       <div className='form-button'>
       <button type="submit" className='contact-btn'>Submit</button>
       </div>
      </form>
    </div>
  );
};

export default Contact;
