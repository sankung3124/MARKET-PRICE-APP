import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import {
	Activity,
	BarChart3,
	CircleUserRound,
	TrendingUp,
} from "lucide-react";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import Trend from "./pages/Trend";
import AboutUs from "./pages/AboutUs";

const navItems = [
	{ to: "/markets", label: "Markets" },
	{ to: "/products", label: "Products" },
	{ to: "/trends", label: "Trends" },
	{ to: "/reports", label: "Reports" },
];

const DashboardLayout = ({ children }) => {
	return (
		<div className="app-shell">
			<header className="top-header">
				<div className="brand-wrap">
					<div className="brand-icon">
						<BarChart3 size={16} />
					</div>
					<div>
						<h1>Market Price Tracker</h1>
						<p>The Gambia Markets</p>
					</div>
				</div>

				<div className="header-meta">
					<div className="live-pill">
						<span className="live-dot" />
						Live Updates
					</div>
					<div className="vendor-box">
						<div>
							<h3>Market Vendor</h3>
							<p>Fatou Trading Co.</p>
						</div>
						<CircleUserRound size={27} color="#9ca3af" />
					</div>
				</div>
			</header>

			<nav className="main-nav">
				{navItems.map((item) => (
					<NavLink
						key={item.to}
						to={item.to}
						className={({ isActive }) =>
							`nav-link ${isActive ? "nav-link-active" : ""}`
						}
					>
						{item.label}
					</NavLink>
				))}
			</nav>

			<main className="page-wrap">{children}</main>
		</div>
	);
};

const ReportsPage = () => {
	return (
		<DashboardLayout>
			<AboutUs />
		</DashboardLayout>
	);
};

const MarketsPage = () => {
	return (
		<DashboardLayout>
			<HomePage />
		</DashboardLayout>
	);
};

const ProductsPage = () => {
	return (
		<DashboardLayout>
			<Product />
		</DashboardLayout>
	);
};

const TrendsPage = () => {
	return (
		<DashboardLayout>
			<Trend />
		</DashboardLayout>
	);
};

function App() {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/markets" element={<MarketsPage />} />
			<Route path="/products" element={<ProductsPage />} />
			<Route path="/trends" element={<TrendsPage />} />
			<Route path="/reports" element={<ReportsPage />} />
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	);
}

export default App;
