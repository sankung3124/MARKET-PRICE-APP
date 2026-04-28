import { useState, useEffect } from "react";

const productStats = [
	{ value: "156", label: "Total Products", tone: "stat-green" },
	{ value: "42", label: "Categories", tone: "stat-blue" },
	{ value: "234", label: "Price Updates Today", tone: "stat-orange" },
	{ value: "4", label: "Active Markets", tone: "stat-purple" },
];

export default function Product() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch("http://localhost:3000/api/products");
				if (!response.ok) {
					throw new Error("Failed to fetch products");
				}
				const data = await response.json();
				setProducts(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	if (loading) return <div>Loading products...</div>;
	if (error) return <div>Error: {error}</div>;
	return (
		<section className="dashboard-column">
			<div className="panel">
				<div className="panel-title-row">
					<h2>All Products</h2>
					<div className="panel-actions wide">
						<label className="search-box">
							<input placeholder="Search products..." />
						</label>
						<button className="ghost-btn">All Categories</button>
						<button className="ghost-btn">Sort by Price</button>
					</div>
				</div>

				<div className="stats-grid">
					{productStats.map((item) => (
						<article key={item.label} className={`stat-card ${item.tone}`}>
							<h3>{item.value}</h3>
							<p>{item.label}</p>
						</article>
					))}
				</div>
			</div>

			<div className="product-grid">
				{products.map((item) => (
					<article key={item._id} className="product-card">
						<span className={`tiny-change ${item.priceChange < 0 ? "down" : "up"}`}>
							{item.priceChange > 0 ? `+${item.priceChange}%` : `${item.priceChange}%`}
						</span>
						<img
							src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80"
							alt={item.name}
						/>
						<div className="product-card-body">
							<div className="product-top">
								<h3>{item.name}</h3>
								<span className="soft-tag">{item.category}</span>
							</div>
							<h4>D {item.currentPrice}</h4>
							<p>{item.market?.name}</p>
							<div className="time-row">
								<span>{item.vendor?.username}</span>
								<span>Recently updated</span>
							</div>
						</div>
					</article>
				))}
			</div>

			<div className="panel form-panel">
				<h2>Add New Product</h2>
				<div className="form-grid">
					<div>
						<label>Product Name</label>
						<input placeholder="Enter product name" />
					</div>
					<div>
						<label>Category</label>
						<select>
							<option>Select Category</option>
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
					<button className="primary-btn">Add Product</button>
				</div>
			</div>
		</section>
	);
}
