import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/Campus Connect Logo.png";
import "../../css/EventPageStyles.css";
import axios from "axios";
import Cookies from "js-cookie";

//TODO: API hookup, inital population, and data colleciton before submit

/* Required Cookies
    Cookies.get("eID");
    Cookies.get("aID")
    Cookies.get("eName");
    Cookies.get("eDescr");
    Cookies.get("eTime");
    Cookies.get("eLat");
    Cookies.get("eLong");
    Cookies.get("eAddr");
    Cookies.get("ePhone");
    Cookies.get("eEmail");

	GET THE COOKIES IN THE JSX 
	DURING POPULATION
	TO FORCE COOKIE UPDATE
*/

function FormBox() {
	const navigate = useNavigate();

	const deleteEvent = async () => {
		let adminID = Cookies.get("aID");
		let eventID = Cookies.get("eID");
		try {
			const response = await axios.put("http://localhost:3001/delete-event", {
				adminID,
				eventID,
			});

			if (response.status === 200) {
				console.log("Event deleted successfully");
				navigate("/main");
			}
		} catch (error) {
			console.log("Error: ", error);
			// Handle error scenarios
		}
	};

	// const editEvent = async (post) => {
	// 	//Get updated info from inputs or cookies
	// 	let adminID = Cookies.get("aID");
	// 	let eventID = Cookies.get("eID");
	// 	try {
	// 		const response = await axios.post("http://localhost:3001/unfollow-rso", {
	// 			eventID,
	// 			adminID,
	// 			eventName,
	// 			eventDescr,
	// 			eventTime,
	// 			eventLat,
	// 			eventLong,
	// 			eventAddress,
	// 			eventPhone,
	// 			eventEmail,
	// 		});

	// 		if (response.status == 200) {
	// 			console.log("Event successfully updated");
	// 			navigate("/main");
	// 		}
	// 	} catch (error) {
	// 		console.log("Error: ", error);
	// 	}
	// };

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
				<div className="event-edit-btn-holder">
					<button type="submit" className="event-edit-btn">
						Edit
					</button>
					<button type="submit" className="event-delete-btn">
						Delete
					</button>
				</div>
				<Link to="/main" className="event-link-btn">
					Back to Main Page
				</Link>
			</div>
		</div>
	);
}

export default FormBox;
