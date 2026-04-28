import { AlertTriangle, Clock3, TrendingDown, TrendingUp } from "lucide-react";

const trendStats = [
	{ value: "+1.8%", label: "Average Price Increase", icon: <TrendingUp size={16} />, tone: "stat-green" },
	{ value: "67%", label: "Products Trending Up", icon: <TrendingUp size={16} />, tone: "stat-blue" },
	{ value: "12", label: "High Volatility Items", icon: <AlertTriangle size={16} />, tone: "stat-orange" },
	{ value: "5 min", label: "Update Frequency", icon: <Clock3 size={16} />, tone: "stat-purple" },
];

const trends = [
	{ product: "Local Rice", current: "D 45.5", week: "D 44.2", month: "D 42.8", trend: "Up", volatility: "low" },
	{ product: "Fresh Fish", current: "D 125", week: "D 132", month: "D 128.5", trend: "Down", volatility: "high" },
	{ product: "Palm Oil", current: "D 85.75", week: "D 84.2", month: "D 89.3", trend: "Up", volatility: "medium" },
	{ product: "Tomatoes", current: "D 35.25", week: "D 36.4", month: "D 38.9", trend: "Down", volatility: "high" },
	{ product: "Onions", current: "D 28.5", week: "D 27.3", month: "D 26.8", trend: "Up", volatility: "medium" },
	{ product: "Groundnut Oil", current: "D 95", week: "D 94.5", month: "D 93.2", trend: "Up", volatility: "low" },
];

const distributions = [
	{ name: "Banjul Central Market", value: "D 45.00 avg", width: "60%" },
	{ name: "Serrekunda Market", value: "D 53.00 avg", width: "70%" },
	{ name: "Brikama Market", value: "D 61.00 avg", width: "80%" },
	{ name: "Bakau Fish Market", value: "D 69.00 avg", width: "90%" },
];

const performances = [
	{ name: "Grains", change: "+1.2%", up: true },
	{ name: "Seafood", change: "-2.0%", up: false },
	{ name: "Oils", change: "+2.8%", up: true },
	{ name: "Vegetables", change: "-3.6%", up: false },
];

export default function Trend() {
	return (
		<section className="dashboard-column">
			<div className="panel">
				<div className="panel-title-row">
					<h2>Price Trends Analysis</h2>
					<div className="panel-actions">
						<button className="ghost-btn">Last 7 Days</button>
						<button className="ghost-btn">All Categories</button>
					</div>
				</div>

				<div className="stats-grid">
					{trendStats.map((item) => (
						<article key={item.label} className={`stat-card ${item.tone}`}>
							<h3>{item.icon} {item.value}</h3>
							<p>{item.label}</p>
						</article>
					))}
				</div>

				<div className="chart-hero">
					<img
						src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1400&q=80"
						alt="Trend chart"
					/>
					<div className="map-overlay-text dark">
						<h3>Interactive Price Trend Chart</h3>
						<p>Hover over data points to see details</p>
					</div>
				</div>
			</div>

			<div className="panel">
				<h2>Product Trend Details</h2>
				<table className="report-table">
					<thead>
						<tr>
							<th>Product</th>
							<th>Current Price</th>
							<th>1 Week Ago</th>
							<th>1 Month Ago</th>
							<th>Trend</th>
							<th>Volatility</th>
						</tr>
					</thead>
					<tbody>
						{trends.map((row) => (
							<tr key={row.product}>
								<td>{row.product}</td>
								<td>{row.current}</td>
								<td>{row.week}</td>
								<td>{row.month}</td>
								<td className={row.trend === "Up" ? "up-text" : "down-text"}>
									{row.trend === "Up" ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {row.trend}
								</td>
								<td>
									<span className={`volatility ${row.volatility}`}>{row.volatility}</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="section-title">Market Comparison</div>
			<div className="two-col-panel">
				<div className="panel">
					<h2>Price Distribution by Market</h2>
					<div className="bars-wrap">
						{distributions.map((item) => (
							<div key={item.name} className="bar-item">
								<div className="bar-label-row">
									<span>{item.name}</span>
									<span>{item.value}</span>
								</div>
								<div className="bar-track">
									<div className="bar-fill" style={{ width: item.width }} />
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="panel">
					<h2>Category Performance</h2>
					<div className="performance-list">
						{performances.map((item) => (
							<div key={item.name} className="performance-item">
								<span>{item.name}</span>
								<span className={item.up ? "up-text" : "down-text"}>
									{item.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {item.change}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
