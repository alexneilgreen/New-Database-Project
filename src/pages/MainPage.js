import React, { useEffect, useState, useContext, useRef } from "react";
import Cookies from "js-cookie";
import axios from "axios";
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

import pin from "../images/pin.png";
import fullscreenLogo from "../images/fullscreen.png";
import revFullscreenLogo from "../images/rev_fullscreen.png";
import MainHeader from "../components/MainPageComp/MainHeader.js";
import Feed from "../components/MainPageComp/FeedSection.js";
import "../css/MainPageStyles.css";
import MapContext from "../components/MainPageComp/MapContext.js";

const MainPage = () => {
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const [iconFeatures, setIconFeatures] = useState([]);
	const [iconSource, setIconSource] = useState(
		new VectorSource({ features: iconFeatures })
	);
	const [iconLayer, setIconLayer] = useState(
		new VectorLayer({ source: iconSource })
	);
	const [map, setMap] = useState(null);
	const mapRef = useRef(null);

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

	useEffect(() => {
		const fetchUserUniCoords = async () => {
			const userID = Cookies.get("uID");
			try {
				const response = await axios.post(
					"http://localhost:3001/get-user-university",
					{ userID }
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
	}, []);

	useEffect(() => {
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

			mapRef.current = mainMap;

			mapRef.current.on("click", function (event) {
				mapRef.current.forEachFeatureAtPixel(event.pixel, function (feature) {
					console.log("Icon clicked");
				});
				const coordinates = event.coordinate;
				const lonLat = toLonLat(coordinates);
				console.log("Clicked at Lon/Lat:", lonLat);
			});

			setMap(mainMap);

			console.log(
				"Setting context value [mapRef, iconlayer]: ",
				mapRef,
				iconLayer
			);
			MapContext.Provider.value = { mapRef: mapRef, iconLayer: iconLayer };
		} else {
			mapRef.current.getView().setCenter(fromLonLat([longitude, latitude]));
		}
	}, [iconLayer, iconFeatures, longitude, latitude]);

	const addIconToMap = (long, lat) => {
		const iconFeature = new Feature({
			geometry: new Point(fromLonLat([long, lat])),
		});

		const iconStyle = new Style({
			image: new Icon({
				src: pin,
				scale: 0.1,
			}),
		});

		iconFeature.setStyle(iconStyle);

		if (iconLayer) {
			console.log("Vector layer found");
			iconLayer.getSource().addFeature(iconFeature);
			setIconFeatures((prevFeatures) => [...prevFeatures, iconFeature]);
		} else {
			console.log("Vector layer not found");
		}
	};

	const getFullscreenElement = () => {
		return (
			document.fullscreenElement ||
			document.webkitFullscreenElement ||
			document.mozFullscreenElement ||
			document.msFullscreenElement
		);
	};

	const toggleFullscreen = () => {
		if (getFullscreenElement()) {
			document.exitFullscreen();
			document.getElementById("map-btn-image").src = fullscreenLogo;
			console.log("Map Exit Fullscreen");
		} else {
			document
				.getElementById("mapContainer")
				.requestFullscreen()
				.catch(console.log);
			document.getElementById("map-btn-image").src = revFullscreenLogo;
			console.log("Map Enter Fullscreen");
		}
	};

	return (
		<div>
			<MainHeader />
			<div className="main-container">
				<MapContext.Provider value={{ mapRef: null, iconLayer: null }}>
					<Feed />
					<div className="map-section">
						<div className="map-content-box" id="mapContainer">
							<div id="map"></div>
							<button
								className="map-button"
								id="mapbtn"
								onClick={toggleFullscreen}
							>
								<img id="map-btn-image" src={fullscreenLogo} alt="Fullscreen" />
							</button>
						</div>
					</div>
				</MapContext.Provider>
			</div>
		</div>
	);
};

export default MainPage;
