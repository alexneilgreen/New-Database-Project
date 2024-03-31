import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat, toLonLat } from "ol/proj";
import { defaults as defaultInteractions } from "ol/interaction";
import axios from "axios";
import Cookies from "js-cookie";

import pin from "../../images/pin.png";
import "../../css/MainPageStyles.css";

const OpenLayers = () => {
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");

	const universityCoordinates = {
		"Test University": { lat: 28.6024, long: -81.2001 },
		FAU: { lat: 26.3705, long: -80.1024 },
		FGCU: { lat: 26.4643, long: -81.7737 },
		FIU: { lat: 25.7579, long: -80.3735 },
		FSU: { lat: 30.4426, long: -84.2984 },
		RC: { lat: 28.5924, long: -81.3481 },
		UCF: { lat: 28.6024, long: -81.2001 },
		UF: { lat: 29.6452, long: -82.3529 },
		UM: { lat: 25.7215, long: -80.2793 },
		UNF: { lat: 30.2697, long: -81.5113 },
		USF: { lat: 28.0587, long: -82.4131 },
	};

	const [iconFeatures, setIconFeatures] = useState([]); // Initialize iconFeatures as an empty array
	const [iconSource, setIconSource] = useState(
		new VectorSource({ features: iconFeatures })
	);
	const [iconLayer, setIconLayer] = useState(
		new VectorLayer({ source: iconSource })
	);
	const [map, setMap] = useState(null); // Define map using useState
	const mapRef = useRef(null);

	// Fetch data before initializing the map
	useEffect(() => {
		const fetchUserUniCoords = async () => {
			const userID = Cookies.get("uID");
			try {
				const response = await axios.post(
					"http://localhost:3001/get-user-university",
					{
						userID,
					}
				);
				console.log("University: ", response.data.university);
				if (response.data.university) {
					const universityName = response.data.university;
					const universityCoords = universityCoordinates[universityName];
					console.log("Coords: ", universityCoords);
					if (universityCoords) {
						setLatitude(universityCoords.lat);
						setLongitude(universityCoords.long);
					}
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchUserUniCoords();
	}, []); // Run only once on component mount

	useLayoutEffect(() => {
		// Create the map only if it hasn't been created yet
		console.log(
			"Map center coords... Long " + longitude + " || Lat: " + latitude
		);

		if (!mapRef.current) {
			console.log("Generating map");
			let mainMap = new Map({
				target: "map",
				layers: [new TileLayer({ source: new OSM() }), iconLayer],
				interactions: defaultInteractions({ doubleClickZoom: false }),
				view: new View({
					center: fromLonLat([longitude, latitude]),
					zoom: 16,
				}),
			});

			//setMap(mainMap);
			mapRef.current = mainMap; // Store the map instance in the ref

			// Add double-click event listener to the map
			mapRef.current.on("dblclick", function (event) {
				const coordinates = event.coordinate;
				const lonLat = toLonLat(coordinates);
				console.log("Double-clicked at Lon/Lat:", lonLat);
				console.log(lonLat[0]);
				console.log(lonLat[1]);
				// You can use the lonLat values as needed, e.g., display in an alert or update a UI element.
				addIconToMap(lonLat[0], lonLat[1]);
			});
			// Attach a click event listener to the map
			mapRef.current.on("click", function (event) {
				mapRef.current.forEachFeatureAtPixel(event.pixel, function (feature) {
					console.log("Icon clicked");
				});
				const coordinates = event.coordinate;
				const lonLat = toLonLat(coordinates);
				console.log("Clicked at Lon/Lat:", lonLat);

				// Update latitude and longitude
				setLatitude(lonLat[0]);
				setLongitude(lonLat[1]);
			});

			setMap(mainMap);
		} else {
			// If map exists, update its center
			mapRef.current.getView().setCenter(fromLonLat([longitude, latitude]));
		}
	}, [iconLayer, iconFeatures, longitude, latitude]);

	const addIconToMap = (long, lat) => {
		const iconFeature = new Feature({
			geometry: new Point(fromLonLat([long, lat])),
		});

		const iconStyle = new Style({
			image: new Icon({
				src: pin, // Use the imported image
				scale: 0.1,
			}),
		});

		iconFeature.setStyle(iconStyle);

		// Access the current VectorLayer from state and add the icon feature
		if (iconLayer) {
			console.log("Vector layer found");
			iconLayer.getSource().addFeature(iconFeature);
			setIconFeatures((prevFeatures) => [...prevFeatures, iconFeature]);
		} else {
			console.log("Vector layer not found");
		}
	};

	return <div id="map"></div>;
};

export default OpenLayers;
