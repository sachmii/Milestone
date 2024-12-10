import React, { useState } from "react";
import {
	Checkbox,
	Box,
	Card,
	CardContent,
	FormControlLabel,
	TextField,
	IconButton,
	Typography,
} from "@mui/material";
import axios from "axios";

const TaskCard = ({ task, setTasks }) => {
	const [editTaskId, setEditTaskId] = useState(null);
	const [editTaskTitle, setEditTaskTitle] = useState("");
	const [loading, setLoading] = useState(false);

	const _handleCheckboxChange = async (taskId, checked) => {
		try {
			const token = localStorage.getItem("access_token");
			await axios.patch(
				`http://localhost:8000/tasks/${taskId}`,
				{ completed: checked },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.id === taskId ? { ...task, completed: checked } : task
				)
			);
		} catch (e) {
			console.log("Error when updating task.");
			alert("There was an error when updating the task.");
		}
	};

	const _handleEditClick = (taskId, currentTitle) => {
		setEditTaskId(taskId);
		setEditTaskTitle(currentTitle);
	};

	const _handleSaveClick = async (taskId) => {
		setLoading(true);
		try {
			const token = localStorage.getItem("access_token");
			await axios.patch(
				`http://localhost:8000/tasks/${taskId}`,
				{ title: editTaskTitle },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.id === taskId ? { ...task, title: editTaskTitle } : task
				)
			);
			setEditTaskId(null);
			setEditTaskTitle("");
		} catch (e) {
			console.log("Error when updating task.");
			alert("There was an error when updating the task.");
		}
		setLoading(false);
	};

	const renderTitle = () => {
		if (editTaskId === task.id) {
			return (
				<TextField
					value={editTaskTitle}
					onChange={(e) => setEditTaskTitle(e.target.value)}
					variant="outlined"
					size="small"
					sx={{ fontFamily: "Gamja Flower" }}
					disabled={loading} // Disable the input field while loading
				/>
			);
		}
		return (
			<Typography
				variant="h6"
				component="div"
				sx={{ fontFamily: "Gamja Flower" }}
			>
				{task.title}
			</Typography>
		);
	};

	const renderIconButton = () => (
		<IconButton
			onClick={() =>
				editTaskId === task.id
					? _handleSaveClick(task.id)
					: _handleEditClick(task.id, task.title)
			}
			disabled={loading} // Disable the button while loading
		>
			{editTaskId === task.id ? (
				<img src="/save.png" alt="Save" style={{ width: 20, height: 20 }} />
			) : (
				<img src="/pencil.png" alt="Edit" style={{ width: 20, height: 20 }} />
			)}
		</IconButton>
	);

	const renderCheckbox = () => (
		<FormControlLabel
			control={
				<Checkbox
					checked={task.completed}
					onChange={(e) => _handleCheckboxChange(task.id, e.target.checked)}
				/>
			}
			label={
				<Typography sx={{ color: "text.secondary", fontSize: 16 }}>
					{task.completed ? "Completed" : "Not Completed"}
				</Typography>
			}
		/>
	);

	return (
		<Card variant="outlined" key={task.id}>
			<CardContent>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					{renderTitle()}
					{renderIconButton()}
				</Box>
				<Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
					{renderCheckbox()}
				</Box>
				<Typography variant="body2">{task.description}</Typography>
			</CardContent>
		</Card>
	);
};

export default TaskCard;
