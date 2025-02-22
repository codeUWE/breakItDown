import { createContext, useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axiosClient
			.get("/api/auth/profile")
			.then((response) => {
				console.log(response.data);

				setUser(response.data);
			})
			.catch((err) => {
				console.log(err);
				setUser(null);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const login = async (data) => {
		axiosClient
			.post("/api/auth/login", data)
			.then((response) => {
				// console.log(response.data);
				setUser(response.data);
				if (response.data.role.name === "Admin") {
					navigate("/admin/dashboard/projects");
				} else {
					navigate("/dashboard");
				}
			})
			.catch((err) => {
				console.log(err);
				setUser(null);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const logout = async (data) => {
		axiosClient
			.post("/api/auth/logout")
			.then((response) => {
				setUser(null);
				navigate("/login");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<AuthContext.Provider value={{ user, isLoading, login, logout, setUser }}>
			{children}
		</AuthContext.Provider>
	);
}
