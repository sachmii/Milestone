import React, { Component } from "react";
import { Button, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className="App">
				<Typography variant="h4">This is the Home Page.</Typography>
				<Button variant="contained" color="primary">
					click me
				</Button>
			</div>
		</ThemeProvider>
	);
}

export default App;
