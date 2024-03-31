import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/LoginRegisterStyles.css";
import logo from "../../images/Campus Connect Logo.png";

function UniReg() {
	const [username, setUniUsername] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [university, setSelectedUniversity] = useState("");
	const [uniDescr, setUniDescr] = useState("");
	const navigate = useNavigate();

	const universityCoordinates = {
		FAU: { lat: 26.3705, long: -80.1024 },
		FGCU: { lat: 26.4643, long: -81.7737 },
		FIU: { lat: 25.7579, long: -80.3735 },
		FSU: { lat: 30.4426, long: -84.2984 },
		RC: { lat: 28.5924, long: -81.3481 },
		UCF: { lat: 28.6013, long: -81.2001 },
		UF: { lat: 29.6436, long: -82.3549 },
		UM: { lat: 25.7215, long: -80.2793 },
		UNF: { lat: 30.2697, long: -81.5113 },
		USF: { lat: 28.0587, long: -82.4131 },
	};

	let uniLat = 0; //Default
	let uniLong = 0; //Default
	let userID;
	let superID;

	const register_Superadmin = async (e) => {
		e.preventDefault();
		// Set university latitude and longitude based on the selected university
		const coordinates = universityCoordinates[university];
		if (coordinates) {
			uniLat = coordinates.lat;
			uniLong = coordinates.long;
		}

		//Register user
		try {
			const response = await axios.post(
				"http://localhost:3001/register-superadmin",
				{
					username,
					password,
					phone,
					email,
					university,
					uniDescr,
					uniLat,
					uniLong,
				}
			);
			console.log("Superadmin register Response:", response);
			if (response.status == 200) {
				//Get message if needed
				userID = response.data.userID;
				superID = response.data.superID;
				navigate("/");
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
				<div id="ErrorMessage" className="errorText"></div>
				<Link to="/" className="reg-link-btn">
					Return to Login Page
				</Link>
			</div>
		</div>
	);
}

export default UniReg;
