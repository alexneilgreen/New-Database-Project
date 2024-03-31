import React from "react";

import OpenLayers from "./OpenLayers";

import fullscreenLogo from "../../images/fullscreen.png";
import revFullscreenLogo from "../../images/rev_fullscreen.png";

class FullScreen extends React.Component {
	getFullscreenElement() {
		return (
			document.fullscreenElement ||
			document.webkitFullscreenElement ||
			document.mozFullscreenElement ||
			document.msFullscreenElement
		);
	}

	toggleFullscreen = () => {
		if (this.getFullscreenElement()) {
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

	render() {
		return (
			<div className="map-content-box" id="mapContainer">
				<OpenLayers />
				<button className="map-button" id="mapbtn" onClick={this.toggleFullscreen}>
					<img id="map-btn-image" src={fullscreenLogo} alt="Fullscreen" />
				</button>
			</div>
		);
	}
}

export default FullScreen;
