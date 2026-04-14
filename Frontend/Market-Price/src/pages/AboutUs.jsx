import { ArrowDown, ArrowUp, Package, Store, RefreshCcw, ChartLine, Download } from "lucide-react";

const reportStats = [
	{ label: "Total Products", value: "156", tone: "tone-green", icon: <Package size={18} /> },
	{ label: "Active Markets", value: "4", tone: "tone-blue", icon: <Store size={18} /> },
	{ label: "Price Updates", value: "234", tone: "tone-orange", icon: <RefreshCcw size={18} /> },
	{ label: "Avg Change", value: "+1.8%", tone: "tone-purple", icon: <ChartLine size={18} /> },
];

const gainers = [
	{ name: "Onions", price: "D 28.5", delta: "+4.2%" },
	{ name: "Local Rice", price: "D 45.5", delta: "+2.3%" },
	{ name: "Palm Oil", price: "D 85.75", delta: "+1.8%" },
];

const losers = [
	{ name: "Fresh Fish", price: "D 125", delta: "-5.2%" },
	{ name: "Tomatoes", price: "D 35.25", delta: "-3.1%" },
	{ name: "Yam", price: "D 52.75", delta: "-2.8%" },
];

const marketRows = [
	{ market: "Banjul Central Market", updates: 67, activity: "2 mins ago" },
	{ market: "Serrekunda Market", updates: 54, activity: "5 mins ago" },
	{ market: "Brikama Market", updates: 43, activity: "8 mins ago" },
	{ market: "Bakau Fish Market", updates: 70, activity: "12 mins ago" },
];

export default function AboutUs() {
	return (
		<section className="dashboard-column">
			<div className="panel">
				<div className="panel-title-row">
					<h2>Market Reports &amp; Analytics</h2>
					<div className="panel-actions">
						<button className="ghost-btn">Daily Report</button>
						<button className="primary-btn inline"><Download size={14} /> Export Report</button>
					</div>
				</div>

				<div className="stats-grid">
					{reportStats.map((item) => (
						<article key={item.label} className={`report-stat ${item.tone}`}>
							<div>
								<p>{item.label}</p>
								<h3>{item.value}</h3>
							</div>
							{item.icon}
						</article>
					))}
				</div>
			</div>

			<div className="two-col-panel">
				<div className="panel">
					<div className="title-with-icon">
						<h2>Top Gainers</h2>
						<ArrowUp size={16} className="up-text" />
					</div>
					<div className="simple-list">
						{gainers.map((item) => (
							<article key={item.name} className="list-item positive-bg">
								<div>
									<h4>{item.name}</h4>
									<p>{item.price}</p>
								</div>
								<strong className="up-text">{item.delta}</strong>
							</article>
						))}
					</div>
				</div>

				<div className="panel">
					<div className="title-with-icon">
						<h2>Top Losers</h2>
						<ArrowDown size={16} className="down-text" />
					</div>
					<div className="simple-list">
						{losers.map((item) => (
							<article key={item.name} className="list-item negative-bg">
								<div>
									<h4>{item.name}</h4>
									<p>{item.price}</p>
								</div>
								<strong className="down-text">{item.delta}</strong>
							</article>
						))}
					</div>
				</div>
			</div>

			<div className="panel">
				<h2>Market Activity Report</h2>
				<table className="report-table">
					<thead>
						<tr>
							<th>Market</th>
							<th>Updates Today</th>
							<th>Last Activity</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{marketRows.map((row) => (
							<tr key={row.market}>
								<td>{row.market}</td>
								<td>{row.updates}</td>
								<td>{row.activity}</td>
								<td><span className="status-chip">Active</span></td>
								<td className="view-link">View Details</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="two-col-panel">
				<div className="panel chart-box">
					<h2>Weekly Price Movement</h2>
					<img
						src="https://images.unsplash.com/photo-1642543348745-77fdb4f8d0c3?auto=format&fit=crop&w=1400&q=80"
						alt="Weekly trend chart"
					/>
				</div>
				<div className="panel chart-box">
					<h2>Category Distribution</h2>
					<img
						src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80"
						alt="Category distribution chart"
					/>
				</div>
			</div>

			<div className="panel form-panel">
				<h2>Generate Custom Report</h2>
				<div className="form-grid">
					<div>
						<label>Report Type</label>
						<select>
							<option>Price Analysis</option>
						</select>
					</div>
					<div>
						<label>Date Range</label>
						<select>
							<option>Last 7 Days</option>
						</select>
					</div>
					<div>
						<label>Format</label>
						<select>
							<option>PDF Report</option>
						</select>
					</div>
					<button className="primary-btn">Generate Report</button>
				</div>
			</div>
		</section>
	);
}
