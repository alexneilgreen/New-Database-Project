import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../../css/LoginRegisterStyles.css";
import logo from "../../images/Campus Connect Logo.png";

function NewUserReg() {
	return (
		<div className="page-container">
			<div className="log-form-box" id="log-formBox">
				<img src={logo} alt="Logo" className="logo-image" />
				<form id="register" className="log-input-group">
					<input
						type="text"
						className="log-input-field"
						placeholder="Enter Username"
						required
					/>
					<input
						type="password"
						className="log-input-field"
						placeholder="Enter Password"
						required
					/>
					<input
						type="phone"
						className="log-input-field"
						placeholder="Enter Phone Number"
						required
					/>
					<input
						type="email"
						className="log-input-field"
						placeholder="Enter Email"
						required
					/>
					<select className="log-input-field" required>
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

export default NewUserReg;
