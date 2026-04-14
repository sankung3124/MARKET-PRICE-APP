import { Link } from "react-router-dom";
import { BarChart3 } from "lucide-react";

export default function Register() {
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

				<form className="auth-form" onSubmit={(e) => e.preventDefault()}>
					<label>Full Name</label>
					<input type="text" placeholder="Enter your name" />

					<label>Email Address</label>
					<input type="email" placeholder="Enter your email" />

					<label>Password</label>
					<input type="password" placeholder="Create a password" />

					<button className="primary-btn" type="submit">Register</button>
				</form>

				<p className="auth-footnote">
					Already have an account? <Link to="/login">Login here</Link>
				</p>
			</div>
		</div>
	);
}
