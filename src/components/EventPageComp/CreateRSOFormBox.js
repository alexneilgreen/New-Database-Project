import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests
import logo from "../../images/Campus Connect Logo.png";
import "../../css/EventPageStyles.css";

function FormBox() {
	const [eventName, setEventName] = useState("");
	const [eventLocation, setEventLocation] = useState("");
	const [eventTime, setEventTime] = useState("");
	const [eventDescription, setEventDescription] = useState("");
	const [eventPhone, setEventPhone] = useState("");
	const [eventEmail, setEventEmail] = useState("");
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");

	// async function geocode(location) {
	//   try {
	//     const response = await axios.get(
	//       "https://maps.googleapis.com/maps/api/geocode/json?",
	//       {
	//         params: {
	//           address: location,
	//           key: "ADD KEY HERE",
	//         },
	//       }
	//     );

	//  console.log(response);
	//  let coords = {
	//    lat: response.data.results[0].geometry.location.lat,
	//    long: response.data.results[0].geometry.location.lng,
	//  };
	//  console.log("Coords:", coords);
	//  //Add pin to map
	//  addIconToMap(coords.long, coords.lat);
	//} catch (error) {
	//  console.log(error);
	//}
	//}

	const createEvent = async () => {
		try {
			const response = await axios.post(
				"http://localhost:3001/create-rso-event",
				{
					adminID: "adminID", // Replace with the actual admin ID
					rsoID: "rsoID", // Replace with the actual RSO ID
					eventName: eventName,
					eventDescr: eventDescription,
					eventTime: eventTime,
					eventLat: latitude, // Add Latitude value
					eventLong: longitude, // Add Longitude value
					eventAddress: eventLocation,
					eventPhone: eventPhone,
					eventEmail: eventEmail,
				}
			);
			console.log(response.data);
			// Handle success
		} catch (error) {
			console.error("Error creating event:", error);
			// Handle error
		}
	};

	return (
		<div className="event-container">
			<div className="event-form-box" id="formBox">
				<img src={logo} alt="Logo" className="event-logo" />
				<input
					type="text"
					id="eventName"
					placeholder="Event Name"
					value={eventName}
					onChange={(e) => setEventName(e.target.value)}
				/>
				<input
					type="text"
					id="eventLocation"
					placeholder="Event Location"
					value={eventLocation}
					onChange={(e) => setEventLocation(e.target.value)}
				/>
				<input
					type="text"
					id="eventTime"
					placeholder="Event Time"
					value={eventTime}
					onChange={(e) => setEventTime(e.target.value)}
				/>
				<input
					type="text"
					id="eventPhone"
					placeholder="Event Phone"
					value={eventPhone}
					onChange={(e) => setEventPhone(e.target.value)}
				/>{" "}
				<input
					type="text"
					id="eventEmail"
					placeholder="Event Email"
					value={eventEmail}
					onChange={(e) => setEventEmail(e.target.value)}
				/>{" "}
				<textarea
					id="eventDescription"
					placeholder="Event Description - 200 Character Max"
					maxLength="200"
					value={eventDescription}
					onChange={(e) => setEventDescription(e.target.value)}
				></textarea>
				<button
					type="submit"
					className="event-create-btn"
					onClick={createEvent}
				>
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
