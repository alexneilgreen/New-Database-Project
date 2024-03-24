import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/Campus Connect Logo.png";
import "../../css/MainPageStyles.css";

function MainHeader() {
	return (
		<div className="header-banner">
			<img src={logo} className="header-logo" alt="Logo" />
			<div className="header-button-container">
				<Link
					to="/main"
					className="header-link"
					style={{ textDecoration: "none" }}
				>
					Back to Main
				</Link>
				<Link to="/" className="header-link" style={{ textDecoration: "none" }}>
					Log Out
				</Link>
			</div>
		</div>
	);
}

export default MainHeader;
