import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

export const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [registrationError, setRegistrationError] = useState("");
	const [email, setEmail] = useState("");

	const handleRegister = async (e) => {
		e.preventDefault();

		const error = validatePassword(password);
		setPasswordError(error);

		if (error) return;

		const user = createUserObject();
		await registerUser(user);
	};

	const validatePassword = (password) => {
		if (password.length < 8) {
			return "Password must be at least 8 characters long.";
		}
		if (!/\d/.test(password)) {
			return "Password must contain at least one number.";
		}
		if (!/[A-Z]/.test(password)) {
			return "Password must containt at least one uppercase letter.";
		}
		return "";
	};

	const createUserObject = () => ({
		username: username,
		password: password,
		email: email,
	});

	const registerUser = async (user) => {
		try {
			const { data } = await axios.post(
				"http://localhost:8000/register/",
				user,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			console.log(data);
			window.location.href = "/login";
		} catch (error) {
			console.error(error);
			setRegistrationError("Registration failed. Please check your details.");
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
					Register
				</Typography>
				{registrationError && (
					<Typography color="error">{registrationError}</Typography>
				)}
				<Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
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
						error={Boolean(passwordError)}
						helperText={passwordError}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="email"
						label="Email"
						type="email"
						id="email"
						autoComplete="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Register
					</Button>
				</Box>
			</Box>
		</Container>
	);
};
