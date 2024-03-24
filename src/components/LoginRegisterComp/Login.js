import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "../../css/LoginRegisterStyles.css";
import logo from "../../images/Campus Connect Logo.png";

const LoginPage = () => {
	return (
		<div className="page-container">
			<div className="log-form-box" id="log-formBox">
				<img src={logo} alt="Logo" className="logo-image" />
				<div className="log-social-icons">{/* Social media icons */}</div>
				<form id="login" className="log-input-group">
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
					<br />
					<button type="submit" className="log-submit-btn">
						Log In
					</button>
				</form>
				<Link to="/RegHandler" className="reg-link-btn">
					Don't have an account? Register
				</Link>
			</div>
		</div>
	);
};

export default LoginPage;
