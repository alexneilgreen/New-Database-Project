import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../css/MainPageStyles.css";

function MainHeader() {
	const [showDropdown, setShowDropdown] = useState(false);
	const [buttonBorderRadius, setButtonBorderRadius] = useState("10px");

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
		setButtonBorderRadius(
			buttonBorderRadius === "10px" ? "10px 10px 0px 0px" : "10px"
		);
	};

	return (
		<div className="header-banner">
			{/* <img src={logo} className="header-logo" alt="Logo" /> */}
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
								to="/createEvent"
								className="dropdown-link"
								onClick={toggleDropdown}
							>
								Create Event
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
				<Link to="/" className="header-link" style={{ textDecoration: "none" }}>
					Log Out
				</Link>
			</div>
		</div>
	);
}

export default MainHeader;
