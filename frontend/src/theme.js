import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#1976d2", // Soothing blue
		},
		secondary: {
			main: "#ff4081", // Soft pink
		},
		background: {
			default: "#f5f5f5", // Light gray background for the app
		},
		text: {
			primary: "#333333", // Dark gray text for readability
			secondary: "#555555", // Lighter gray for secondary text
		},
	},
	typography: {
		fontFamily: "'Gamja Flower', 'Roboto', sans-serif", // Add Gamja Flower as the primary font
		h1: {
			fontWeight: 900, // Bold headers
		},
		h2: {
			fontWeight: 600, // Slightly lighter header
		},
		body1: {
			fontWeight: 400, // Regular body text weight
		},
	},
});

export default theme;
