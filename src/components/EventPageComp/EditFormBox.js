import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/Campus Connect Logo.png";
import "../../css/EventPageStyles.css";
import axios from "axios";
import Cookies from "js-cookie";

//TODO: API hookup, inital population, and data colleciton before submit
//TODO: Implement geocoding

function FormBox() {
	const [eventName, setEventName] = useState(Cookies.get("eName"));
	const [eventLocation, setEventLocation] = useState(Cookies.get("eAddr"));
	const [eventTime, setEventTime] = useState(Cookies.get("eTime"));
	const [eventDescription, setEventDescription] = useState(
		Cookies.get("eDescr")
	);
	const [eventPhone, setEventPhone] = useState(Cookies.get("ePhone"));
	const [eventEmail, setEventEmail] = useState(Cookies.get("eEmail"));
	const [latitude, setLatitude] = useState(Cookies.get("eLat"));
	const [longitude, setLongitude] = useState(Cookies.get("eLong"));
	const navigate = useNavigate();

	let geocoded_lat = 0;
	let geocoded_long = 0;

	useEffect(() => {
		// Required event Cookies to populate fields
		console.log("Cookie value [name] ", Cookies.get("eName"));
		console.log("Cookie value [descr] ", Cookies.get("eDescr"));
		console.log("Cookie value [time] ", Cookies.get("eTime"));
		console.log("Cookie value [lat] ", Cookies.get("eLat"));
		console.log("Cookie value [long] ", Cookies.get("eLong"));
		console.log("Cookie value [address] ", Cookies.get("eAddr"));
		console.log("Cookie value [phone] ", Cookies.get("ePhone"));
		console.log("Cookie value [email] ", Cookies.get("eEmail"));

		setEventName(Cookies.get("eName"));
		setEventDescription(Cookies.get("eDescr"));
		setEventTime(Cookies.get("eTime"));
		setLatitude(Cookies.get("eLat"));
		setLongitude(Cookies.get("eLong"));
		setEventLocation(Cookies.get("eAddr"));
		setEventPhone(Cookies.get("ePhone"));
		setEventEmail(Cookies.get("eEmail"));
	}, []); // Empty dependency array ensures this effect runs only once on component mount

	const removeEventCookies = async () => {
		Cookies.remove("eName");
		Cookies.remove("eDescr");
		Cookies.remove("eTime");
		Cookies.remove("eLat");
		Cookies.remove("eLong");
		Cookies.remove("eAddr");
		Cookies.remove("ePhone");
		Cookies.remove("eEmail");
	};

	async function geocode(location) {
		try {
			const response = await axios.get(
				"https://maps.googleapis.com/maps/api/geocode/json?",
				{
					params: {
						address: location,
						key: "[API KEY HERE]",
					},
				}
			);
			console.log(response);
			let coords = {
				lat: response.data.results[0].geometry.location.lat,
				long: response.data.results[0].geometry.location.lng,
			};
			setLatitude(coords.lat);
			setLongitude(coords.long);
			geocoded_lat = coords.lat;
			geocoded_long = coords.long;
			console.log("Coords:", coords);
		} catch (error) {
			console.log(error);
		}
	}

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

	const editEvent = async (post) => {
		//Get updated info from inputs or cookies
		let adminID = Cookies.get("aID");
		let eventID = Cookies.get("eID");
		console.log("Attempting to edit event of ID: ", eventID);
		await geocode(eventLocation);
		try {
			const response = await axios.put("http://localhost:3001/edit-event", {
				eventID: eventID,
				adminID: adminID,
				eventName: eventName,
				eventDescr: eventDescription,
				eventTime: eventTime,
				eventLat: geocoded_lat, // Add Latitude value
				eventLong: geocoded_long, // Add Longitude value
				eventAddress: eventLocation,
				eventPhone: eventPhone,
				eventEmail: eventEmail,
			});

			if (response.status == 200) {
				console.log("Event successfully updated");
				navigate("/main");
			}
		} catch (error) {
			console.log("Error: ", error);
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
				<textarea
					id="eventDescription"
					placeholder="Event Description - 200 Character Max"
					maxLength="200"
					value={eventDescription}
					onChange={(e) => setEventDescription(e.target.value)}
				></textarea>
				<div className="event-edit-btn-holder">
					<button type="submit" className="event-edit-btn" onClick={editEvent}>
						Edit
					</button>
					<button
						type="submit"
						className="event-delete-btn"
						onClick={deleteEvent}
					>
						Delete
					</button>
				</div>
				<Link
					to="/main"
					className="event-link-btn"
					onClick={removeEventCookies}
				>
					Back to Main Page
				</Link>
			</div>
		</div>
	);
}

export default FormBox;
