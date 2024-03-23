import React from "react";
import { Link } from "react-router-dom";

import "../../css/EventPageStyles.css";

function FormBox() {
	return (
		<div className="event-container">
			<div className="event-form-box" id="formBox">
				<Link to="/main" className="event-link-btn">
					Back to Main Page
				</Link>
				<input type="text" id="eventName" placeholder="Event Name" />
				<input type="text" id="eventLocation" placeholder="Event Location" />
				<input type="text" id="eventTime" placeholder="Event Time" />
				<textarea
					id="eventDescription"
					placeholder="Event Description - 200 Character Max"
					maxLength="200"
				></textarea>
				<div>
					<button type="submit" className="event-edit-btn">
						Edit
					</button>
					<button type="submit" className="event-delete-btn">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default FormBox;
