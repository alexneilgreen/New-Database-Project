import React from "react";
import { useEffect } from "react";

import "../../css/LoginRegisterStyles.css";
import facebook from "../../images/facebook.png";
import instagram from "../../images/instagram.png";
import x from "../../images/x.png";
import google from "../../images/google.png";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import FormScript from "./FormScript";

function FormBox() {
	useEffect(() => {
		// This useEffect hook will call the FormScript functionality when the component mounts
	}, []); // empty dependency array means it only runs once when component mounts

	return (
		<div className="log-form-box" id="log-formBox">
			<FormScript /> {/* Render FormScript component */}
			<div className="log-social-icons">
				<a
					href="https://www.facebook.com/login/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={facebook} alt="Facebook" />
				</a>
				<a
					href="https://www.instagram.com/accounts/login/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={instagram} alt="Instagram" />
				</a>
				<a
					href="https://twitter.com/i/flow/login"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={x} alt="X" />
				</a>
				<a
					href="https://accounts.google.com/servicelogin?hl=en-gb"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={google} alt="Google" />
				</a>
			</div>
			<LoginForm />
			<RegisterForm />
		</div>
	);
}

export default FormBox;
