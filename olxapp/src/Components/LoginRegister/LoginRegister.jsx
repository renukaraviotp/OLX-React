import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope, FaMobile, FaAddressBook, FaLocationArrow } from "react-icons/fa";

const LoginRegister = () => {
  const [action, setAction] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    first_name: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    state: '',
    district: ''
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const registerLink = (e) => {
    e.preventDefault();
    setAction('active');
  };

  const loginLink = (e) => {
    e.preventDefault();
    setAction('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register/', formData);
      console.log(response.data);
      alert("Registration successful!");
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error(error);
      alert("Registration failed: " + (error.response?.data?.detail || error.message));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', formData);
      console.log(response.data);
      login(response.data.access); // Use login method from AuthContext
      alert(response.data.message);
      if (response.data.message.includes('Admin')) {
        navigate('/admin-dashboard'); // Redirect to admin dashboard
      } else {
        navigate('/'); // Redirect to home page after successful login
      }
    } catch (error) {
      console.error(error);
      alert("Login failed: " + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <div>
      <br /><br />
      <div className={`wrapper ${action}`}>
        <div className="form-box login">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <div className="input-box">
              <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
              <FaLock className="icon" />
            </div>
            <button type="submit">Login</button>
            <div className="register-link">
              <p>Don't have an account? <a href="" onClick={registerLink}>Register</a></p>
            </div>
          </form>
        </div>

        <div className="form-box register">
          <br /><br />
          <form onSubmit={handleRegister}>
            <h1>Register</h1>
            <div className="input-box">
              <input type="text" name="first_name" placeholder="Full Name" required onChange={handleChange} />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
              <FaEnvelope className="icon" />
            </div>
            <div className="input-box">
              <input type="text" name="phone" placeholder="Mobile Number" onChange={handleChange} />
              <FaMobile className="icon" />
            </div>
            <div className="input-box">
              <textarea name="address" placeholder="Address" onChange={handleChange}></textarea>
              <FaAddressBook className="icon" />
            </div>
            <div className="input-box">
              <select name="country" onChange={handleChange}>
                <option value="">Select Country</option>
                <option value="India">India</option>
                {/* Add more options as needed */}
              </select>
              <FaLocationArrow className="icon" />
            </div>
            <div className="input-box">
              <select name="state" onChange={handleChange}>
                <option value="">Select State</option>
                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                <option value="Daman and Diu">Daman and Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Pondicherry">Pondicherry</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Other Territory">Other Territory</option>
              </select>
              <FaLocationArrow className="icon" />
            </div>
            <div className="input-box">
              <select name="district" onChange={handleChange}>
                <option value="">Select District</option>
                <option value="Kasargod">Kasargod</option>
                <option value="Kannur">Kannur</option>
                <option value="Wayanad">Wayanad</option>
                <option value="Kozhikode">Kozhikode</option>
                <option value="Malappuram">Malappuram</option>
                <option value="Palakkad">Palakkad</option>
                <option value="Thrissur">Thrissur</option>
                <option value="Eranakulam">Eranakulam</option>
                <option value="Idukki">Idukki</option>
                <option value="Kottayam">Kottayam</option>
                <option value="Pathanamthitta">Pathanamthitta</option>
                <option value="Alappuzha">Alappuzha</option>
                <option value="Kollam">Kollam</option>
                <option value="Trivandrum">Trivandrum</option>
              </select>
              <FaLocationArrow className="icon" />
            </div>
            <button type="submit">Register</button>
            <div className="register-link">
              <p>Already have an account? <a href="" onClick={loginLink}>Login</a></p>
            </div>
          </form>
          <br /><br /><br />
        </div>
      </div>
      <br /><br />
    </div>
  );
};

export default LoginRegister;
