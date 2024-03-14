import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
// import MainPage from "./pages/MainPage";
// import CreateEventPage from "./pages/CreateEventPage";
// import EditEventPage from "./pages/EditEventPage";
// import CreateRSOPage from "./pages/CreateRSOPage";
// import EditRSOPage from "./pages/EditRSOPage";
// import JoinRSOPage from "./pages/JoinRSOPage";
/*
				<Route path="/main" index element={<MainPage />} />
				<Route path="/createEvent" index element={<CreateEventPage />} />
				<Route path="/editEvent" index element={<EditEventPage />} />
				<Route path="/createRSO" index element={<CreateRSOPage />} />
				<Route path="/editRSO" index element={<EditRSOPage />} />
				<Route path="/joinRSO" index element={<JoinRSOPage />} />
*/

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" index element={<LoginPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
