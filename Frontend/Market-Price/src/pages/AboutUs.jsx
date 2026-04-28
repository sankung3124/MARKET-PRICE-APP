import { useState, useEffect } from "react";
import { ArrowDown, ArrowUp, Package, Store, RefreshCcw, ChartLine, Download } from "lucide-react";

export default function AboutUs() {
	const [products, setProducts] = useState([]);
	const [markets, setMarkets] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [productsRes, marketsRes] = await Promise.all([
					fetch("http://localhost:3000/api/products"),
					fetch("http://localhost:3000/api/markets")
				]);

				const productsData = await productsRes.json();
				const marketsData = await marketsRes.json();

				setProducts(productsData);
				setMarkets(marketsData);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// Calculate report stats
	const calculateReportStats = () => {
		const totalProducts = products.length;
		const activeMarkets = markets.length;
		const avgChange = products.length > 0
			? products.reduce((sum, p) => sum + p.priceChange, 0) / products.length
			: 0;

		return [
			{ label: "Total Products", value: totalProducts.toString(), tone: "tone-green", icon: <Package size={18} /> },
			{ label: "Active Markets", value: activeMarkets.toString(), tone: "tone-blue", icon: <Store size={18} /> },
			{ label: "Price Updates", value: (totalProducts * 1.5).toFixed(0), tone: "tone-orange", icon: <RefreshCcw size={18} /> },
			{ label: "Avg Change", value: `${avgChange > 0 ? '+' : ''}${avgChange.toFixed(1)}%`, tone: "tone-purple", icon: <ChartLine size={18} /> },
		];
	};

	// Get top gainers and losers
	const getGainersAndLosers = () => {
		const sorted = [...products].sort((a, b) => b.priceChange - a.priceChange);
		const gainers = sorted.slice(0, 3).map(p => ({
			name: p.name,
			price: `D ${p.currentPrice}`,
			delta: `+${p.priceChange}%`
		}));
		const losers = sorted.slice(-3).reverse().map(p => ({
			name: p.name,
			price: `D ${p.currentPrice}`,
			delta: `${p.priceChange}%`
		}));
		return { gainers, losers };
	};

	const reportStats = calculateReportStats();
	const { gainers, losers } = getGainersAndLosers();

	if (loading) return <div className="loading">Loading reports...</div>;
	if (error) return <div className="error">Error: {error}</div>;
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
						{markets.map((market) => {
							const marketProducts = products.filter(p => p.market?._id === market._id);
							return (
								<tr key={market._id}>
									<td>{market.name}</td>
									<td>{marketProducts.length}</td>
									<td>Recently</td>
									<td><span className="status-chip">Active</span></td>
									<td className="view-link">View Details</td>
								</tr>
							);
						})}
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
