import axios from "axios";

// Create an instance of axios
const instance = axios.create({
	baseURL: "http://localhost:8000", // Base URL for your API
	headers: {
		"Content-Type": "application/json",
	},
});

// Add a request interceptor to include the Authorization header
instance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("access_token");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default instance;
