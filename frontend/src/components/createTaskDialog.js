import React, { useState, useEffect } from "react";
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

export const CreateTaskDialog = ({ open, setOpen, setTasks }) => {
	const [open, setOpen] = useState(false); // State to manage dialog open/close
	const [newTask, setNewTask] = useState({ title: "", description: "" }); // State to manage new task input

	const _handleClose = () => {
		setOpen(false);
	};

	const _handleClickOpen = () => {
		setOpen(true);
	};

	const _handleAddTask = async () => {
		try {
			const token = localStorage.getItem("access_token");
			await axios.post(
				`http://localhost:8000/tasks/${taskId}`,
				{
					title: newTask.title,
					description: newTask.description,
					completed: "false",
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
		} catch (e) {
			console.log("Error when creating task.");
			alert("There was an error when creating the task.");
		}
	};

	// add dialog for creating task
};
