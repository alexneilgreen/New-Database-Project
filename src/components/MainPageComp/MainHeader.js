import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/Campus Connect Logo.png";
import "../../css/MainPageStyles.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function MainHeader() {
	const [showDropdown, setShowDropdown] = useState(false);
	const [buttonBorderRadius, setButtonBorderRadius] = useState("10px");

	const navigate = useNavigate();

	const handleLogout = () => {
		// Remove all cookies
		Cookies.remove("uID");
		Cookies.remove("aID");
		Cookies.remove("sID");
		Cookies.remove("uni");

		// Redirect to the login page after logout
		navigate("/");
	};

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
		setButtonBorderRadius(
			buttonBorderRadius === "10px" ? "10px 10px 0px 0px" : "10px"
		);
	};

	return (
		<div className="header-banner">
			<img src={logo} className="header-logo" alt="Logo" />
			<div className="header-button-container">
				<div className="dropdown">
					<div
						className="header-button"
						onClick={toggleDropdown}
						style={{ borderRadius: buttonBorderRadius }}
					>
						Admin Functions
					</div>
					{showDropdown && (
						<div className="dropdown-content">
							<Link
								to="/createRSOEvent"
								className="dropdown-link"
								onClick={toggleDropdown}
							>
								Create RSO Event
							</Link>
							<Link
								to="/createUniEvent"
								className="dropdown-link"
								onClick={toggleDropdown}
							>
								Create Uni Event
							</Link>
							<Link
								to="/reviewEvent"
								className="dropdown-link"
								onClick={toggleDropdown}
							>
								Review Events
							</Link>
							{/* <Link
								to="/createRSO"
								className="dropdown-link"
								onClick={toggleDropdown}
							>
								Create RSO
							</Link>
							<Link
								to="/joinRSO"
								className="dropdown-link"
								onClick={toggleDropdown}
							>
								Join RSO
							</Link> */}
						</div>
					)}
				</div>
				<div className="header-link" onClick={handleLogout}>
					Log Out
				</div>
			</div>
		</div>
	);
}

export default MainHeader;
