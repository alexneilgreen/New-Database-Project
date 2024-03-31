import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from React Router
import axios from "axios";
import "../../css/LoginRegisterStyles.css";
import logo from "../../images/Campus Connect Logo.png";
import Cookies from "js-cookie";

//TODO: REDIRECT ON SUCCESS
//      FAILURE REPORTING

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	let userId = -1;
	let adminId = -1;
	let superId = -1;
	let university = null;

	const login = async (e) => {
		e.preventDefault();
		console.log("Logging in with credentials: ", username, password);
		try {
			const response = await axios.post("http://localhost:3001/login", {
				username,
				password,
			});
			console.log("Login API Response:", response.data);
			console.log("Login API status:", response.status);

			/*
			userInfo: {
  			  userID: ...
  			  username: ...
  			  phone: ...
  			  email: ...
  			  university: ...
  			}
			*/

			//Superadmin who owns an rso
			if (response.status == 203) {
				userId = response.data.userInfo.userID;
				adminId = response.data.adminID;
				superId = response.data.superID;
				university = response.data.userInfo.university;
				Cookies.set("uID", userId);
				Cookies.set("aID", adminId);
				Cookies.set("sID", superId);
				Cookies.set("uni", university);
				console.log("Response: ", response.data);
				navigate("/main");
			}
			//Superadmin
			else if (response.status == 202) {
				userId = response.data.userInfo.userID;
				superId = response.data.superID;
				university = response.data.userInfo.university;
				Cookies.set("uID", userId);
				Cookies.set("aID", adminId);
				Cookies.set("sID", superId);
				Cookies.set("uni", university);
				console.log("Response: ", response.data);
				navigate("/main");
			}
			//RSO admin
			else if (response.status == 201) {
				userId = response.data.userInfo.userID;
				adminId = response.data.adminID;
				university = response.data.userInfo.university;
				Cookies.set("uID", userId);
				Cookies.set("aID", adminId);
				Cookies.set("sID", superId);
				Cookies.set("uni", university);
				console.log("Response: ", response.data);
				navigate("/main");
			}
			//Reg user
			else if (response.status == 200) {
				userId = response.data.userInfo.userID;
				university = response.data.userInfo.university;
				Cookies.set("uID", userId);
				Cookies.set("aID", adminId);
				Cookies.set("sID", superId);
				Cookies.set("uni", university);
				console.log("Response: ", response.data);
				navigate("/main");
			} else {
				if (response) {
					console.log("Login API error:", response.status);
					document.getElementById("ErrorMessage").innerText =
						response.data.message;
				}
			}
		} catch (error) {
			if (error.response) {
				console.error("Error:", error.response.data);
				console.log("Login API error:", error.response.status);
				document.getElementById("ErrorMessage").innerText =
					error.response.data.message;
			}
		}
	};

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
					<br />
					<button type="submit" className="log-submit-btn" onClick={login}>
						Log In
					</button>
				</form>
				<div id="ErrorMessage" className="errorText"></div>
				<Link to="/RegHandler" className="reg-link-btn">
					Don't have an account? Register
				</Link>
			</div>
		</div>
	);
};

export default LoginPage;
