import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios";
import "../../css/LoginRegisterStyles.css";
import logo from "../../images/Campus Connect Logo.png";

function ExistRSOUserReg() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [rsoCode, setRsoCode] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");

  const adminCode = "default"; //Unused: Field in rso table

  const register_ExistingRSO = async (e) => {
    console.log(
      "Registering with the following info: ",
      username,
      password,
      phoneNumber,
      email,
      rsoCode,
      selectedUniversity
    );

	//register user
    try {
      const response = await axios.post("http://localhost:3001/register-user", {
        username,
        password,
        phoneNumber,
        email,
        rsoCode,
        selectedUniversity,
      });
      console.log("Register into exisitng RSO API Response:", response);
    } catch {}

    //now try to make the user an admin
    try {
      const response = await axios.post("http://localhost:3001/", {
        data,
        moreata,
      });
    } catch {}

	//now try to have the user join the rso
    try {
		const response = await axios.post("http://localhost:3001/", {
		  data,
		  moreata,
		});
	  } catch {}
  };

  return (
    <div className="page-container">
      <div className="log-form-box" id="log-formBox">
        <img src={logo} alt="Logo" className="logo-image" />
        <form id="register" className="log-input-group">
          <input
            type="text"
            className="log-input-field"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="log-input-field"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="phone"
            className="log-input-field"
            placeholder="Enter Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <input
            type="email"
            className="log-input-field"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            className="log-input-field"
            placeholder="RSO Code"
            onChange={(e) => setRsoCode(e.target.value)}
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
          <button type="submit" className="log-submit-btn">
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

export default ExistRSOUserReg;
