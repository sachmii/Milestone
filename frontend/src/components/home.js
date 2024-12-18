import React, { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
	const [message, setMessage] = useState("");

	useEffect(() => {
		// if user has no access token, redirect to login page
		if (localStorage.getItem("access_token") === null) {
			window.location.href = "/login";
		} else {
			// if user has access token, fetch data from backend (the data being the message from the home view)
			(async () => {
				try {
					const token = localStorage.getItem("access_token");
					const { data } = await axios.get("http://localhost:8000/home/", {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`, // Include the token in the headers
						},
					});
					setMessage(data.message);
				} catch (e) {
					console.log("not auth");
					alert("You are not authenticated.");
				}
			})();
		}
	}, []);

	return (
		<div className="form-signin mt-5 text-center">
			<h3> Hello! {message}</h3>
		</div>
	);
};
