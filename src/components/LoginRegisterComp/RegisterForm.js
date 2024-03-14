// import React, { useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";

// const loginForm = () => {
// 	const form = document.getElementById("log-formBox");
// 	const x = document.getElementById("login");
// 	const y = document.getElementById("register");
// 	const z = document.getElementById("log-btn");

// 	form.style.height = "350px";
// 	x.style.left = "50px";
// 	y.style.left = "450px";
// 	z.style.left = "0px";
// 	z.style.width = "100px";
// };

// function RegisterForm() {
// 	// Define state variables to store user input
// 	const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [phone, setPhone] = useState("");
// 	const [email, setEmail] = useState("");
// 	const [isAdmin, setIsAdmin] = useState(false); // Assuming isAdmin is a boolean

// 	// Function to handle errors
// 	const handleError = (error) => {
// 		console.error("Error:", error.response.data);
// 	};

// 	// Function to handle form submission
// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		try {
// 			const response = await axios.post("http://localhost:3001/register", {
// 				username: username,
// 				password: password,
// 				phone: phone,
// 				email: email,
// 				isAdmin: isAdmin,
// 			});
// 			if (response.data.code === "good") {
// 				const userInfo = response.data.userInfo;

// 				//Record data? ---- TO BE ADDED

// 				//Move back to login
// 				loginForm();
// 			} else {
// 				// Handle registration failure
// 				handleError(new Error(response.data.message));
// 			}
// 		} catch (error) {
// 			handleError(error);
// 		}
// 	};

// 	return (
// 		<form id="register" className="log-input-group" onSubmit={handleSubmit}>
// 			<input
// 				type="text"
// 				className="log-input-field"
// 				placeholder="Enter Username"
// 				value={username}
// 				onChange={(e) => setUsername(e.target.value)}
// 				required
// 			/>
// 			<input
// 				type="password"
// 				className="log-input-field"
// 				placeholder="Enter Password"
// 				value={password}
// 				onChange={(e) => setPassword(e.target.value)}
// 				required
// 			/>
// 			<input
// 				type="phone"
// 				className="log-input-field"
// 				placeholder="Enter Phone Number"
// 				value={phone}
// 				onChange={(e) => setPhone(e.target.value)}
// 				required
// 			/>
// 			<input
// 				type="email"
// 				className="log-input-field"
// 				placeholder="Enter Email"
// 				value={email}
// 				onChange={(e) => setEmail(e.target.value)}
// 				required
// 			/>
// 			<input
// 				type="checkbox"
// 				className="log-check-box"
// 				checked={isAdmin}
// 				onChange={(e) => setIsAdmin(e.target.checked)}
// 			/>
// 			<span>Are you an RSO Owner?</span>
// 			<button type="submit" className="log-submit-btn">
// 				Register
// 			</button>
// 		</form>
// 	);
// }

// export default RegisterForm;

import React, { useState } from "react";

const loginForm = () => {
	const form = document.getElementById("log-formBox");
	const x = document.getElementById("login");
	const y = document.getElementById("register");
	const z = document.getElementById("log-btn");

	form.style.height = "350px";
	x.style.left = "50px";
	y.style.left = "450px";
	z.style.left = "0px";
	z.style.width = "100px";
};

function RegisterForm() {
	return (
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
			<input type="checkbox" className="log-check-box" />
			<span>Are you an RSO Owner?</span>
			<button type="submit" className="log-submit-btn">
				Register
			</button>
		</form>
	);
}

export default RegisterForm;
