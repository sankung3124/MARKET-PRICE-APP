import { useState, useEffect } from "react";
import { AlertTriangle, Clock3, TrendingDown, TrendingUp } from "lucide-react";

export default function Trend() {
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

	// Calculate trend statistics
	const calculateTrendStats = () => {
		if (products.length === 0) return [];

		const upCount = products.filter(p => p.priceChange > 0).length;
		const upPercentage = Math.round((upCount / products.length) * 100);
		const avgChange = products.reduce((sum, p) => sum + p.priceChange, 0) / products.length;

		return [
			{
				value: `${avgChange > 0 ? '+' : ''}${avgChange.toFixed(1)}%`,
				label: "Average Price Change",
				icon: <TrendingUp size={16} />,
				tone: "stat-green"
			},
			{
				value: `${upPercentage}%`,
				label: "Products Trending Up",
				icon: <TrendingUp size={16} />,
				tone: "stat-blue"
			},
			{
				value: products.filter(p => Math.abs(p.priceChange) > 5).length.toString(),
				label: "High Volatility Items",
				icon: <AlertTriangle size={16} />,
				tone: "stat-orange"
			},
			{
				value: "5 min",
				label: "Update Frequency",
				icon: <Clock3 size={16} />,
				tone: "stat-purple"
			},
		];
	};

	// Calculate market distributions
	const calculateDistributions = () => {
		const marketPrices = {};
		products.forEach(product => {
			const marketName = product.market?.name || 'Unknown';
			if (!marketPrices[marketName]) {
				marketPrices[marketName] = [];
			}
			marketPrices[marketName].push(product.currentPrice);
		});

		return Object.entries(marketPrices).map(([name, prices]) => {
			const avg = prices.reduce((sum, price) => sum + price, 0) / prices.length;
			return {
				name,
				value: `D ${avg.toFixed(2)} avg`,
				width: `${Math.min(90, 40 + (avg / 100) * 50)}%`
			};
		});
	};

	// Calculate category performances
	const calculatePerformances = () => {
		const categoryChanges = {};
		products.forEach(product => {
			if (!categoryChanges[product.category]) {
				categoryChanges[product.category] = [];
			}
			categoryChanges[product.category].push(product.priceChange);
		});

		return Object.entries(categoryChanges).map(([name, changes]) => {
			const avgChange = changes.reduce((sum, change) => sum + change, 0) / changes.length;
			return {
				name,
				change: `${avgChange > 0 ? '+' : ''}${avgChange.toFixed(1)}%`,
				up: avgChange > 0
			};
		});
	};

	const trendStats = calculateTrendStats();
	const distributions = calculateDistributions();
	const performances = calculatePerformances();

	if (loading) return <div className="loading">Loading trend data...</div>;
	if (error) return <div className="error">Error: {error}</div>;
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
						{products.slice(0, 6).map((product) => (
							<tr key={product._id}>
								<td>{product.name}</td>
								<td>D {product.currentPrice}</td>
								<td>D {(product.currentPrice * (1 - product.priceChange / 100)).toFixed(2)}</td>
								<td>D {(product.currentPrice * (1 - product.priceChange / 50)).toFixed(2)}</td>
								<td className={product.priceChange >= 0 ? "up-text" : "down-text"}>
									{product.priceChange >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
									{product.priceChange >= 0 ? "Up" : "Down"}
								</td>
								<td>
									<span className={`volatility ${Math.abs(product.priceChange) > 5 ? "high" : Math.abs(product.priceChange) > 2 ? "medium" : "low"}`}>
										{Math.abs(product.priceChange) > 5 ? "high" : Math.abs(product.priceChange) > 2 ? "medium" : "low"}
									</span>
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
