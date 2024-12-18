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
	Divider,
} from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationDialog from "./deleteConfirmationDialog";

const TaskCard = ({ task, setTasks }) => {
	const [editTaskIdTitle, setEditTaskIdTitle] = useState(null);
	const [editTaskIdDescription, setEditTaskIdDescription] = useState(null);
	const [editTaskTitle, setEditTaskTitle] = useState("");
	const [editTaskDescription, setEditTaskDescription] = useState("");
	const [loadingTitle, setLoadingTitle] = useState(false);
	const [loadingDescription, setLoadingDescription] = useState(false);
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

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

	const _handleTitleEditClick = (taskId, currentTitle) => {
		setEditTaskIdTitle(taskId);
		setEditTaskTitle(currentTitle);
	};

	const _handleTitleSaveClick = async (taskId) => {
		setLoadingTitle(true);
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
			setEditTaskIdTitle(null);
			setEditTaskTitle("");
		} catch (e) {
			console.log("Error when updating task.");
			alert("There was an error when updating the task.");
		}
		setLoadingTitle(false);
	};

	const _handleDescriptionEditClick = (taskId, currentDescription) => {
		setEditTaskIdDescription(taskId);
		setEditTaskDescription(currentDescription);
	};

	const _handleDescriptionSaveClick = async (taskId) => {
		setLoadingDescription(true);
		try {
			const token = localStorage.getItem("access_token");
			await axios.patch(
				`http://localhost:8000/tasks/${taskId}`,
				{ description: editTaskDescription },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.id === taskId
						? { ...task, description: editTaskDescription }
						: task
				)
			);
			setEditTaskIdDescription(null);
			setEditTaskDescription("");
		} catch (e) {
			console.log("Error when updating task.");
			alert("There was an error when updating the task.");
		}
		setLoadingDescription(false);
	};

	const _handleDelete = async () => {
		try {
			const token = localStorage.getItem("access_token");
			await axios.delete(`http://localhost:8000/tasks/${task.id}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
			setOpenConfirmDialog(false);
		} catch (e) {
			console.log("Error when deleting task.");
			alert("There was an error when deleting the task.");
		}
	};

	const renderTitle = () => {
		if (editTaskIdTitle === task.id) {
			return (
				<TextField
					value={editTaskTitle}
					onChange={(e) => setEditTaskTitle(e.target.value)}
					variant="outlined"
					size="small"
					disabled={loadingTitle} // Disable the input field while loading
				/>
			);
		}
		return (
			<Typography variant="h6" component="div">
				{task.title}
			</Typography>
		);
	};

	const renderDescription = () => {
		if (editTaskIdDescription === task.id) {
			return (
				<TextField
					value={editTaskDescription}
					onChange={(e) => setEditTaskDescription(e.target.value)}
					variant="outlined"
					size="small"
					disabled={loadingDescription} // Disable the input field while loading
				/>
			);
		}
		return <Typography variant="body2">{task.description}</Typography>;
	};

	const renderIconButtonTitle = () => (
		<IconButton
			onClick={() =>
				editTaskIdTitle === task.id
					? _handleTitleSaveClick(task.id)
					: _handleTitleEditClick(task.id, task.title)
			}
			disabled={loadingTitle} // Disable the button while loading
		>
			{editTaskIdTitle === task.id ? (
				<img src="/save.png" alt="Save" style={{ width: 16, height: 16 }} />
			) : (
				<img src="/pencil.png" alt="Edit" style={{ width: 16, height: 16 }} />
			)}
		</IconButton>
	);

	const renderIconButtonDescription = () => (
		<IconButton
			onClick={() =>
				editTaskIdDescription === task.id
					? _handleDescriptionSaveClick(task.id)
					: _handleDescriptionEditClick(task.id, task.description)
			}
			disabled={loadingDescription} // Disable the button while loading
		>
			{editTaskIdDescription === task.id ? (
				<img src="/save.png" alt="Save" style={{ width: 16, height: 16 }} />
			) : (
				<img src="/pencil.png" alt="Edit" style={{ width: 16, height: 16 }} />
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
		<Card
			variant="outlined"
			key={task.id}
			sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 3 }}
		>
			<CardContent>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						mb: 2,
					}}
				>
					{renderTitle()}
					{renderIconButtonTitle()}
				</Box>
				<Divider />
				<Box sx={{ display: "flex", alignItems: "center", mb: 2, mt: 2 }}>
					{renderCheckbox()}
				</Box>
				<Divider />
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						mt: 2,
					}}
				>
					{renderDescription()}
					{renderIconButtonDescription()}
				</Box>
				<Divider sx={{ mt: 2 }} />
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
						mt: 2,
					}}
				>
					<Typography variant="body2" color="textSecondary" sx={{ mr: 1 }}>
						Delete Task
					</Typography>
					<IconButton
						color="secondary"
						aria-label="delete task"
						onClick={() => setOpenConfirmDialog(true)}
					>
						<DeleteIcon />
					</IconButton>
				</Box>
			</CardContent>
			<DeleteConfirmationDialog
				open={openConfirmDialog}
				onClose={() => setOpenConfirmDialog(false)}
				onConfirm={_handleDelete}
			/>
		</Card>
	);
};

export default TaskCard;
