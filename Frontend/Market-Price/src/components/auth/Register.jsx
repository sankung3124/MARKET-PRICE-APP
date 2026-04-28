import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BarChart3 } from "lucide-react";

export default function Register() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const response = await fetch("http://localhost:3000/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (response.ok) {
				// Registration successful, redirect to login
				navigate("/login");
			} else {
				setError(data.message || "Registration failed");
			}
		} catch (error) {
			setError("Network error. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="auth-page">
			<div className="auth-card">
				<div className="auth-logo">
					<BarChart3 size={28} />
				</div>
				<h1>Market Price Tracker</h1>
				<p className="auth-subtitle">The Gambia&apos;s Premier Market Price Platform</p>

				<div className="auth-tabs">
					<Link to="/login" className="auth-tab">Login</Link>
					<Link to="/register" className="auth-tab active">Register</Link>
				</div>

				<form className="auth-form" onSubmit={handleSubmit}>
					<label>Full Name</label>
					<input
						type="text"
						name="username"
						placeholder="Enter your name"
						value={formData.username}
						onChange={handleChange}
						required
					/>

					<label>Email Address</label>
					<input
						type="email"
						name="email"
						placeholder="Enter your email"
						value={formData.email}
						onChange={handleChange}
						required
					/>

					<label>Password</label>
					<input
						type="password"
						name="password"
						placeholder="Create a password"
						value={formData.password}
						onChange={handleChange}
						required
					/>

					{error && <p className="auth-error">{error}</p>}

					<button className="primary-btn" type="submit" disabled={loading}>
						{loading ? "Registering..." : "Register"}
					</button>
				</form>

				<p className="auth-footnote">
					Already have an account? <Link to="/login">Login here</Link>
				</p>
			</div>
		</div>
	);
}
