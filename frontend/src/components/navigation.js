import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export function Navigation() {
	// User is not authenticated by default
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		// if user has access token, he is authenticated
		if (localStorage.getItem("access_token") !== null) {
			setIsAuth(true);
		}
	}, []); // Empty dependency array

	const renderAuthButtons = () => {
		if (isAuth) {
			return (
				<>
					<Button color="inherit" component={Link} to="/">
						Home
					</Button>
					<Button color="inherit" component={Link} to="/logout">
						Logout
					</Button>
				</>
			);
		} else {
			return (
				<Box>
					<Button color="inherit" component={Link} to="/login">
						Login
					</Button>
					<Button color="inherit" component={Link} to="/register">
						Register
					</Button>
				</Box>
			);
		}
	};

	return (
		<div className="Navigation">
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
						<img
							src="/logo.png"
							alt="Logo"
							style={{ height: "40px", marginRight: "10px" }}
						/>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							Milestone
						</Typography>
						{renderAuthButtons()}
					</Toolbar>
				</AppBar>
			</Box>
		</div>
	);
}
