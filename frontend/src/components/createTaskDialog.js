import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import {
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Button,
} from "@mui/material";
import "../fonts.css";

const CreateTaskDialog = ({ open, setOpen, setTasks }) => {
	const [newTask, setNewTask] = useState({ title: "", description: "" }); // State to manage new task input

	const handleClose = () => {
		setOpen(false);
	};

	const handleAddTask = async () => {
		try {
			const token = localStorage.getItem("access_token");
			const response = await axios.post(
				`http://localhost:8000/tasks/create`,
				{
					title: newTask.title,
					description: newTask.description,
					completed: "False",
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const createdTask = response.data;
			if (createdTask.id) {
				setTasks((prevTasks) => [...prevTasks, createdTask]);
				setNewTask({ title: "", description: "" });
				handleClose();
			} else {
				console.log(`Response: ${response.data}`);
				throw new Error("Task creation failed, no ID returned.");
			}
		} catch (e) {
			console.log("Error when creating task.");
			alert("There was an error when creating the task.");
		}
	};

	// add dialog for creating task
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				component: "form",
				style: {
					background: "linear-gradient(to right bottom, #c7dbff, #ffbae1)",
					borderRadius: 15,
					padding: "20px",
				},
			}}
		>
			<DialogTitle style={{ textAlign: "center", fontWeight: "bold" }}>
				Create New Task
			</DialogTitle>
			<DialogContent>
				<DialogContentText
					style={{ marginBottom: "20px", textAlign: "center" }}
				>
					Please enter the details of the new task you want to create.
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					label="Title"
					type="text"
					fullWidth
					variant="outlined"
					value={newTask.title}
					onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
					style={{ marginBottom: "20px" }}
				/>
				<TextField
					margin="dense"
					label="Description"
					type="text"
					fullWidth
					variant="outlined"
					value={newTask.description}
					onChange={(e) =>
						setNewTask({ ...newTask, description: e.target.value })
					}
					style={{ marginBottom: "20px" }}
				/>
			</DialogContent>
			<DialogActions style={{ justifyContent: "center" }}>
				<Button onClick={handleClose} variant="contained" color="secondary">
					Cancel
				</Button>
				<Button onClick={handleAddTask} variant="contained" color="primary">
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CreateTaskDialog;
