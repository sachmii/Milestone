import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	List,
	ListItem,
	ListItemText,
	TextField,
	Button,
	Container,
	Typography,
	Box,
} from "@mui/material";

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
			<ListItem key={task.id}>
				<ListItemText primary={task.title} secondary={task.description} />
			</ListItem>
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
				<Typography component="h1" variant="h5">
					Your Tasks
				</Typography>
				<List>{_renderTasks()}</List>
			</Box>
		</Container>
	);
};
