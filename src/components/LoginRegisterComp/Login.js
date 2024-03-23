import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "../../css/LoginRegisterStyles.css";

const LoginPage = () => {
	return (
		<div className="page-container">
			<div className="log-form-box" id="log-formBox">
				<Link to="/RegHandler" className="link-btn">
					Register
				</Link>
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
			</div>
		</div>
	);
};

export default LoginPage;
