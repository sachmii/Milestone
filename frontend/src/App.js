import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./theme";
import { Login } from "./components/login";
import { Home } from "./components/home";
import { Navigation } from "./components/navigation";
import { Logout } from "./components/logout";
import { Register } from "./components/register";
import { TaskList } from "./components/taskList";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Navigation />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/logout" element={<Logout />} />
					<Route path="/register" element={<Register />} />
					<Route path="/tasks" element={<TaskList />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
