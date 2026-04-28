import { useState, useEffect } from "react";
import { Landmark, UserRound, Clock3, Search, Sprout, Fish, Droplets, Leaf } from "lucide-react";

const categoryIcons = {
	Grains: Sprout,
	Seafood: Fish,
	Oils: Droplets,
	Vegetables: Leaf,
};

export default function HomePage() {
	const [markets, setMarkets] = useState([]);
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch markets
				const marketsResponse = await fetch("http://localhost:3000/api/markets");
				const marketsData = await marketsResponse.json();
				setMarkets(marketsData);

				// Fetch products
				const productsResponse = await fetch("http://localhost:3000/api/products");
				const productsData = await productsResponse.json();
				setProducts(productsData);

				// Calculate categories from products
				const categoryCount = {};
				productsData.forEach(product => {
					categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
				});

				const categoriesData = Object.entries(categoryCount).map(([title, count]) => ({
					title,
					count: `${count} products`,
					icon: categoryIcons[title] || Sprout,
				}));
				setCategories(categoriesData);

			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) return <div className="loading">Loading market data...</div>;
	if (error) return <div className="error">Error: {error}</div>;
	return (
		<section className="dashboard-column">
			<div className="panel">
				<div className="panel-title-row">
					<h2>Market Overview</h2>
					<div className="panel-actions">
						<button className="ghost-btn">All Markets</button>
						<button className="ghost-btn">All Price Changes</button>
					</div>
				</div>

				<div className="market-status-grid">
					{markets.map((market) => (
						<article key={market._id} className="market-status-card">
							<div className="market-row">
								<strong>{market.name}</strong>
								<span className="market-active-dot">Active</span>
							</div>
							<p>Last update: Recently</p>
						</article>
					))}
				</div>

				<div className="map-hero">
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Gambia-CIA_WFB_Map.png/1200px-Gambia-CIA_WFB_Map.png"
						alt="The Gambia map"
					/>
					<div className="map-overlay-text">
						<h3>Interactive Market Map</h3>
						<p>Click on markets to view market details</p>
					</div>
				</div>
			</div>

			<div className="section-title">Product Categories</div>
			<div className="category-grid">
				{categories.map((category) => {
					const Icon = category.icon;
					return (
						<article key={category.title} className="category-card">
							<div className="icon-chip">
								<Icon size={16} />
							</div>
							<h3>{category.title}</h3>
							<p>{category.count}</p>
						</article>
					);
				})}
			</div>

			<div className="section-header-inline">
				<div className="section-title">Current Prices</div>
				<label className="search-box">
					<Search size={14} />
					<input placeholder="Search products..." />
				</label>
			</div>

			<div className="price-card-grid compact">
				{products.slice(0, 6).map((item) => (
					<article key={item._id} className="price-info-card">
						<div className="price-card-top">
							<h3>{item.name}</h3>
							<span className="soft-tag">{item.category}</span>
						</div>
						<div className="price-number">
							D {item.currentPrice}
							<span className={`delta ${item.priceChange >= 0 ? "up" : "down"}`}>
								{item.priceChange > 0 ? `+${item.priceChange}%` : `${item.priceChange}%`}
							</span>
						</div>
						<div className="meta-row"><Landmark size={14} /> {item.market?.name}</div>
						<div className="meta-row"><UserRound size={14} /> {item.vendor?.username}</div>
						<div className="meta-row"><Clock3 size={14} /> Recently updated</div>
					</article>
				))}
			</div>

			<div className="panel form-panel">
				<h2>Update Prices</h2>
				<div className="form-grid">
					<div>
						<label>Product</label>
						<select>
							<option>Select Product</option>
						</select>
					</div>
					<div>
						<label>Market</label>
						<select>
							<option>Select Market</option>
						</select>
					</div>
					<div>
						<label>Price (GMD)</label>
						<input placeholder="0.00" />
					</div>
					<button className="primary-btn">Update Price</button>
				</div>
			</div>
		</section>
	);
}
