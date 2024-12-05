import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

export const Login = () => {
	// State variables to store the username and password
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e) => {
		// Prevents the default behaviour of an event
		// in this case, the form submission event which reloads the page after submitting the form
		e.preventDefault();

		// data from the form input fields
		const user = {
			username: username,
			password: password,
		};

		try {
			const { data } = await axios.post("http://localhost:8000/token/", user, {
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			});

			console.log(data); // Log the response data for debugging

			localStorage.clear();
			localStorage.setItem("access_token", data.access);
			localStorage.setItem("refresh_token", data.refresh);

			// We make sure that the token is attached to the header of all subsequent requests
			axios.defaults.headers.common[
				"Authorization"
			] = `Bearer ${data["access"]}`;

			// Redirect the user to the home page after successful login
			window.location.href = "/";
		} catch (error) {
			console.error(error.response); // Log the error response for debugging
			alert("Login failed. Please check your credentials.");
		}
	};

	return (
		<Container maxWidth="sm">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography component="h1" variant="h5">
					Sign In
				</Typography>
				<Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
						autoFocus
						value={username}
						// Update the username state variable when the user types in the input field
						onChange={(e) => setUsername(e.target.value)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						// Update the password state variable when the user types in the input field
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</Button>
				</Box>
			</Box>
		</Container>
	);
};
