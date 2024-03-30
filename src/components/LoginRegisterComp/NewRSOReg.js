import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios";
import "../../css/LoginRegisterStyles.css";
import logo from "../../images/Campus Connect Logo.png";

function NewRSOUserReg() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [rsoCode, setRsoCode] = useState("");
  const [rsoName, setRsoName] = useState("");
  const [rsoDescr, setRsoDescr] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");

  const adminCode = "default"; //Unused: Field in rso table. rsoCode has taken its place

  let rsoId;
  let userId;
  let adminId;

  const register_NewRSO = async (e) => {
    adminCode = rsoCode; //Set adminCode to rsoCode in case it is used instead of rsoCode
    console.log(
      "Registering with the following info: ",
      username,
      password,
      phoneNumber,
      email,
      rsoCode,
      rsoName,
      rsoDescr,
      selectedUniversity
    );

    //Register user
    try {
      const response = await axios.post("http://localhost:3001/register-user", {
        username,
        password,
        phoneNumber,
        email,
        selectedUniversity,
      });
      console.log("Register into exisitng RSO API Response:", response);
      if (response.status == 200) {
        //Get message if needed
        userId = response.data.userID;
      } else {
        console.error("Registration error: ", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
      return;
    }

    //Now try to make the user an admin
    try {
      const response = await axios.post("http://localhost:3001/add-rso-admin", {
        userId,
      });
      console.log("Admin addition response:", response);
      if (response.status == 200) {
        //Get message if needed
        adminId = response.data.adminID;
      } else {
        console.error("Admin addition error: ", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
      return;
    }

    //Now try to create the RSO
    try {
      const response = await axios.post("http://localhost:3001/create-rso", {
        rsoCode,
        adminCode,
        rsoName,
        rsoDescr,
        selectedUniversity,
      });
      console.log("RSO creation response:", response);
      if (response.status == 200) {
        //Get message if needed
        rsoId = response.data.rsoID;
      } else {
        console.error("RSO creation error: ", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
      return;
    }

    //Now try to have the user join the rso
    try {
      const response = await axios.post(
        "http://localhost:3001/join-rso-board",
        {
          adminId,
          rsoId,
          rsoCode,
        }
      );
      console.log("Admin joining RSO response:", response);
      if (response.status == 200) {
        //Get message if needed
        //Move back to login?
      } else {
        console.error("RSO join error: ", response.data.message);
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
            placeholder="RSO Name"
            onChange={(e) => setRsoName(e.target.value)}
            required
          />
          <textarea
            className="log-input-field"
            placeholder="RSO Description (Max 200 Characters)"
            maxLength="200"
            onChange={(e) => setRsoDescr(e.target.value)}
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
          <button
            type="submit"
            className="log-submit-btn"
            onClick={register_NewRSO}
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

export default NewRSOUserReg;
