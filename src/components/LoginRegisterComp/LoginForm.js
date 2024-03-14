// // import React from "react";
// import React, { useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";

// function LoginForm() {
// 	const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");

// 	// Function to handle errors
// 	const handleError = (error) => {
// 		console.error("Error:", error.response.data);
// 	};

// 	const handleLogin = async (e) => {
// 		e.preventDefault();
// 		try {
// 			const response = await axios.post("http://localhost:3001/login", {
// 				username: username,
// 				password: password,
// 			});
// 			if (response.data.code === "good") {
// 				// Extract user information from the response
// 				const userInfo = response.data.userInfo;
// 				// Set cookies based on user type (admin or regular user)
// 				if (response.data.adminId) {
// 					// User is an admin
// 					Cookies.set("isAdmin", true);
// 					Cookies.set("adminId", response.data.adminId);
// 				} else {
// 					// Regular user
// 					Cookies.set("isAdmin", false);
// 				}
// 				// Set other user information in cookies if needed
// 				Cookies.set("userId", userInfo.userId);
// 				Cookies.set("username", userInfo.username);
// 				Cookies.set("phone", userInfo.phone);
// 				Cookies.set("email", userInfo.email);
// 				// Redirect to main page
// 				window.location.href = "/main";
// 			} else {
// 				// Handle invalid username/password
// 				handleError(new Error(response.data.message));
// 			}
// 		} catch (error) {
// 			handleError(error);
// 		}
// 	};

// 	return (
// 		<form id="login" className="log-input-group" onSubmit={handleLogin}>
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
// 			{/* <input type="checkbox" className="log-check-box" />
// 			<span>Remember Password</span> */}
// 			<br />
// 			<button type="submit" className="log-submit-btn">
// 				Log In
// 			</button>
// 		</form>
// 	);
// }

// export default LoginForm;

// import React from "react";
import React, { useState } from "react";

function LoginForm() {
	return (
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
			{/* <input type="checkbox" className="log-check-box" />
			<span>Remember Password</span> */}
			<br />
			<button type="submit" className="log-submit-btn">
				Log In
			</button>
		</form>
	);
}

export default LoginForm;
