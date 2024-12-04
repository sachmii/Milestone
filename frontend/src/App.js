import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./theme";
import { Login } from "./components/login";
import { Home } from "./components/home"; // Ensure correct import path and export
import { Navigation } from "./components/navigation"; // Ensure correct import path and export
import { Logout } from "./components/logout"; // Ensure correct import path and export

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Navigation></Navigation>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/logout" element={<Logout />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
