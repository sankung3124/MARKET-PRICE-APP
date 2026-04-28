import { useState, useEffect } from "react";

const productStats = [
	{ value: "156", label: "Total Products", tone: "stat-green" },
	{ value: "42", label: "Categories", tone: "stat-blue" },
	{ value: "234", label: "Price Updates Today", tone: "stat-orange" },
	{ value: "4", label: "Active Markets", tone: "stat-purple" },
];

export default function Product() {
	const [markets, setMarkets] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		category: "",
		currentPrice: "",
		market: ""
	});
	const [formLoading, setFormLoading] = useState(false);
	const [formError, setFormError] = useState("");

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

	const handleFormChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleAddProduct = async (e) => {
		e.preventDefault();
		setFormLoading(true);
		setFormError("");

		try {
			const token = localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser")).token : null;
			if (!token) {
				setFormError("Please login to add products");
				return;
			}

			const response = await fetch("http://localhost:3000/api/products", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify({
					name: formData.name,
					category: formData.category,
					currentPrice: parseFloat(formData.currentPrice),
					market: formData.market
				})
			});

			const data = await response.json();

			if (response.ok) {
				// Refresh products list
				const productsRes = await fetch("http://localhost:3000/api/products");
				const productsData = await productsRes.json();
				setProducts(productsData);

				// Reset form
				setFormData({
					name: "",
					category: "",
					currentPrice: "",
					market: ""
				});
			} else {
				setFormError(data.message || "Failed to add product");
			}
		} catch (error) {
			setFormError("Network error. Please try again.");
		} finally {
			setFormLoading(false);
		}
	};

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
						<input
							name="name"
							placeholder="Enter product name"
							value={formData.name}
							onChange={handleFormChange}
							required
						/>
					</div>
					<div>
						<label>Category</label>
						<select
							name="category"
							value={formData.category}
							onChange={handleFormChange}
							required
						>
							<option value="">Select Category</option>
							<option value="Grains">Grains</option>
							<option value="Seafood">Seafood</option>
							<option value="Oils">Oils</option>
							<option value="Vegetables">Vegetables</option>
						</select>
					</div>
					<div>
						<label>Market</label>
						<select
							name="market"
							value={formData.market}
							onChange={handleFormChange}
							required
						>
							<option value="">Select Market</option>
							{markets.map(market => (
								<option key={market._id} value={market._id}>{market.name}</option>
							))}
						</select>
					</div>
					<div>
						<label>Price (GMD)</label>
						<input
							name="currentPrice"
							type="number"
							step="0.01"
							placeholder="0.00"
							value={formData.currentPrice}
							onChange={handleFormChange}
							required
						/>
					</div>
					{formError && <div className="error" style={{gridColumn: '1 / -1'}}>{formError}</div>}
					<button
						className="primary-btn"
						onClick={handleAddProduct}
						disabled={formLoading}
					>
						{formLoading ? "Adding..." : "Add Product"}
					</button>
				</div>
			</div>
		</section>
	);
}
