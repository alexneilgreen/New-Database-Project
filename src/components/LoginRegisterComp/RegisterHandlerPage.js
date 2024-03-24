import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../../css/LoginRegisterStyles.css";

const RegisterHandlerPage = () => {
	return (
		<div className="page-container">
			<div className="log-form-box" id="log-formBox">
				<Link to="/" className="link-btn">
					Return to Login Page
				</Link>
				<Link to="/new-user" className="link-btn-alt">
					Normal User
				</Link>
				<Link to="/new-rso-user" className="link-btn-alt">
					New RSO Admin
				</Link>
				<Link to="/existing-rso-user" className="link-btn-alt">
					Existing RSO Admin
				</Link>
				<Link to="/university-user" className="link-btn-alt">
					University Account
				</Link>
			</div>
		</div>
	);
};

export default RegisterHandlerPage;
