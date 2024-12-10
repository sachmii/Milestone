import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	List,
	ListItem,
	ListItemText,
	Container,
	Typography,
	Box,
	Card,
	CardContent,
} from "@mui/material";
import "../fonts.css"; // Import the CSS file with the font

export const TaskList = () => {
	const [tasks, setTasks] = useState([]); // Initialize as an array

	useEffect(() => {
		const getTasks = async () => {
			try {
				const token = localStorage.getItem("access_token");
				const response = await axios.get("http://localhost:8000/tasks/", {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				setTasks(response.data);
			} catch (e) {
				console.log("Error when retrieving tasks for user.");
				alert("There was an error when retrieving your tasks.");
			}
		};

		getTasks();
	}, []);

	const _renderTasks = () => {
		return tasks.map((task) => (
			<Card variant="outlined" key={task.id}>
				<CardContent>
					<Typography
						variant="h5"
						component="div"
						sx={{ fontFamily: "Gamja Flower" }}
					>
						{task.title}
					</Typography>
					<Typography sx={{ color: "text.secondary", mb: 1.5 }}>
						{task.completed ? "Completed" : "Not Completed"}
					</Typography>
					<Typography variant="body2">{task.description}</Typography>
				</CardContent>
			</Card>
		));
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
				<Typography
					component="h1"
					variant="h5"
					color="primary"
					sx={{ mb: 2, fontFamily: "Gamja Flower" }}
				>
					Your Tasks
				</Typography>
				<Container maxWidth="xs">{_renderTasks()}</Container>
			</Box>
		</Container>
	);
};
