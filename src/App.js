import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterHandlerPage from "./pages/RegisterHandlerPage";
import NewUserRegisterPage from "./pages/NewUserRegisterPage"; // Import NewUserRegisterPage
import NewRSOUserRegisterPage from "./pages/NewRSOUserRegisterPage"; // Import NewRSOUserRegisterPage
import ExistingRSOUserRegisterPage from "./pages/ExistingRSOUserRegisterPage"; // Import ExistingRSOUserRegisterPage
import UniversityUserRegisterPage from "./pages/UniversityUserRegisterPage"; // Import UniversityUserRegisterPage

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
			</Routes>
		</BrowserRouter>
	);
}

export default App;
