import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const providers = [{ id: "credentials", name: "Username and Password" }];

export const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();

		const user = {
			username: username,
			password: password,
		};

		try {
			const { data } = await axios.post("http://localhost:8000/token/", user, {
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			});

			localStorage.clear();
			localStorage.setItem("access_token", data.access);
			localStorage.setItem("refresh_token", data.refresh);

			axios.defaults.headers.common[
				"Authorization"
			] = `Bearer ${data["access"]}`;
			window.location.href = "/";
		} catch (error) {
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
