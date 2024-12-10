import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Box } from "@mui/material";
import TaskCard from "./taskCard";
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
				<Container maxWidth="xs">
					{tasks.map((task) => (
						<TaskCard key={task.id} task={task} setTasks={setTasks} />
					))}
				</Container>
			</Box>
		</Container>
	);
};
