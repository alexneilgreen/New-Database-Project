import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios";
import "../../css/LoginRegisterStyles.css";
import logo from "../../images/Campus Connect Logo.png";

function UniReg() {
  const [uniUsername, setUniUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [uniDescr, setUniDescr] = useState("");

  let uniLat = 0; //Default
  let uniLong = 0; //Default
  let userId;
  let superId;

  const register_Superadmin = async (e) => {
    //Register user
    try {
      const response = await axios.post(
        "http://localhost:3001/register-superadmin",
        {
          uniUsername,
          password,
          phoneNumber,
          email,
          selectedUniversity,
          uniDescr,
          uniLat,
          uniLong,
        }
      );
      console.log("Superadmin register Response:", response);
      if (response.status == 200) {
        //Get message if needed
        userId = response.data.userID;
        superId = response.data.superID;
        //Redirect?
      } else {
        console.error("Registration error: ", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
      return;
    }
  };

  return (
    <div className="page-container">
      <div className="log-form-box" id="log-formBox">
        <img src={logo} alt="Logo" className="logo-image" />
        <form id="register" className="log-input-group">
          <input
            type="text"
            className="log-input-field"
            placeholder="Enter University Username"
            onChange={(e) => setUniUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="log-input-field"
            placeholder="Enter University Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="phone"
            className="log-input-field"
            placeholder="Enter University Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <input
            type="email"
            className="log-input-field"
            placeholder="Enter University Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <select
            className="log-input-field"
            onChange={(e) => setSelectedUniversity(e.target.value)}
            required
          >
            <option value="">Select Your University</option>
            <option value="FAU">Florida Atlantic University</option>
            <option value="FGCU">Florida Gulf Coast University</option>
            <option value="FIU">Florida International University</option>
            <option value="FSU">Florida State University</option>
            <option value="RC">Rollins College</option>
            <option value="UCF">University of Central Florida</option>
            <option value="UF">University of Florida</option>
            <option value="UM">University of Miami</option>
            <option value="UNF">University of North Florida</option>
            <option value="USF">University of South Florida</option>
          </select>
          <textarea
            className="log-input-field"
            placeholder="University Description (Max 200 Characters)"
            maxLength="200"
            onChange={(e) => setUniDescr(e.target.value)}
            required
          />
          <button
            type="submit"
            className="log-submit-btn"
            onClick={register_Superadmin}
          >
            Register
          </button>
        </form>
        <Link to="/" className="reg-link-btn">
          Return to Login Page
        </Link>
      </div>
    </div>
  );
}

export default UniReg;
