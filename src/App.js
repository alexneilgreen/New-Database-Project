import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterHandlerPage from "./pages/RegisterHandlerPage";
import NewUserRegisterPage from "./pages/NewUserRegisterPage";
import NewRSOUserRegisterPage from "./pages/NewRSOUserRegisterPage";
import ExistingRSOUserRegisterPage from "./pages/ExistingRSOUserRegisterPage";
import UniversityUserRegisterPage from "./pages/UniversityUserRegisterPage";
import MainPage from "./pages/MainPage";
import FeedbackPage from "./pages/FeedbackPage";
import CreateRSOEventPage from "./pages/CreateRSOEventPage";
import CreateUniEventPage from "./pages/CreateUniEventPage";
import EditEventPage from "./pages/EditEventPage";
import ReviewEventPage from "./pages/ReviewEventPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/RegHandler" element={<RegisterHandlerPage />} />
				<Route path="/new-user" element={<NewUserRegisterPage />} />
				<Route path="/new-rso-user" element={<NewRSOUserRegisterPage />} />
				<Route
					path="/existing-rso-user"
					element={<ExistingRSOUserRegisterPage />}
				/>
				<Route
					path="/university-user"
					element={<UniversityUserRegisterPage />}
				/>
				<Route path="/main" index element={<MainPage />} />
				<Route path="/feedback" index element={<FeedbackPage />} />
				<Route path="/createRSOEvent" index element={<CreateRSOEventPage />} />
				<Route path="/createUniEvent" index element={<CreateUniEventPage />} />
				<Route path="/editEvent" index element={<EditEventPage />} />
				<Route path="/reviewEvent" index element={<ReviewEventPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
