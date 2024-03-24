import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/Campus Connect Logo.png";
import "../../css/EventPageStyles.css";

function FormBox() {
	return (
		<div className="event-container">
			<div className="event-form-box" id="formBox">
				<img src={logo} alt="Logo" className="event-logo" />
				<input type="text" id="eventName" placeholder="Event Name" />
				<input type="text" id="eventLocation" placeholder="Event Location" />
				<input type="text" id="eventTime" placeholder="Event Time" />
				<textarea
					id="eventDescription"
					placeholder="Event Description - 200 Character Max"
					maxLength="200"
				></textarea>
				<button type="submit" className="event-create-btn">
					Create
				</button>
				<Link to="/main" className="event-link-btn">
					Back to Main Page
				</Link>
			</div>
		</div>
	);
}

export default FormBox;
