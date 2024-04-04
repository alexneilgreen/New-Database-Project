import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/Campus Connect Logo.png";
import "../../css/MainPageStyles.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function MainHeader() {
	const [showDropdown, setShowDropdown] = useState(false);
	const [buttonBorderRadius, setButtonBorderRadius] = useState("10px");
	const aid = Cookies.get("aID");
	const sid = Cookies.get("sID");

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
				{(aid != -1 || sid != -1) && ( // Check if aid cookie is not -1
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
								{aid != -1 && (
									<>
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
									</>
								)}
								{/* Always show the review events link */}
								<Link
									to="/reviewEvent"
									className="dropdown-link"
									onClick={toggleDropdown}
								>
									Review Events
								</Link>
							</div>
						)}
					</div>
				)}
				<div className="header-link" onClick={handleLogout}>
					Log Out
				</div>
			</div>
		</div>
	);
}

export default MainHeader;
