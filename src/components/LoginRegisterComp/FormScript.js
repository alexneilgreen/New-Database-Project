import React from "react";

class FormScript extends React.Component {
	loginForm = () => {
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

	registerForm = () => {
		const form = document.getElementById("log-formBox");
		const x = document.getElementById("login");
		const y = document.getElementById("register");
		const z = document.getElementById("log-btn");

		form.style.height = "500px";
		x.style.left = "-400px";
		y.style.left = "50px";
		z.style.left = "85px";
		z.style.width = "135px";
	};

	render() {
		return (
			<div className="log-button-box">
				<div id="log-btn"></div>
				<button
					type="button"
					className="log-toggle-btn"
					onClick={this.loginForm} // Call the loginForm function
				>
					Log In
				</button>
				<button
					type="button"
					className="log-toggle-btn"
					onClick={this.registerForm} // Call the registerForm function
				>
					Register
				</button>
			</div>
		);
	}
}

export default FormScript;
