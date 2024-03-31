import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/LoginRegisterStyles.css";
import logo from "../../images/Campus Connect Logo.png";

function NewUserReg() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [university, setSelectedUniversity] = useState("");
	const navigate = useNavigate();

	let userId;

	const register_User = async (e) => {
		e.preventDefault();
		//Register user
		try {
			const response = await axios.post("http://localhost:3001/register-user", {
				username,
				password,
				phone,
				email,
				university,
			});
			console.log("Register into exisitng RSO API Response:", response);
			if (response.status == 200) {
				//Get message if needed
				userId = response.data.userID;
				// navigate("/");
			} else {
				console.error("Registration error: ", response.data.message);
				document.getElementById("ErrorMessage").innerText =
					response.data.message;
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
						onClick={register_User}
					>
						Register
					</button>
				</form>
				<div id="ErrorMessage" className="errorText"></div>
				<Link to="/" className="reg-link-btn">
					Return to Login Page
				</Link>
			</div>
		</div>
	);
}

export default NewUserReg;
