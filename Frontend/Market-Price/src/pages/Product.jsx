const productStats = [
	{ value: "156", label: "Total Products", tone: "stat-green" },
	{ value: "42", label: "Categories", tone: "stat-blue" },
	{ value: "234", label: "Price Updates Today", tone: "stat-orange" },
	{ value: "4", label: "Active Markets", tone: "stat-purple" },
];

const products = [
	{ name: "Local Rice", category: "Grains", market: "Banjul Central Market", vendor: "Fatou Trading", price: "D 45.5", change: "+2.3%" },
	{ name: "Fresh Fish", category: "Seafood", market: "Bakau Fish Market", vendor: "Omar Fisheries", price: "D 125", change: "-5.2%" },
	{ name: "Palm Oil", category: "Oils", market: "Serrekunda Market", vendor: "Aminata Oils", price: "D 85.75", change: "+1.8%" },
	{ name: "Tomatoes", category: "Vegetables", market: "Brikama Market", vendor: "Lamin Vegetables", price: "D 35.25", change: "-3.1%" },
	{ name: "Onions", category: "Vegetables", market: "Banjul Central Market", vendor: "Isatou Trading", price: "D 28.5", change: "+4.2%" },
	{ name: "Groundnut Oil", category: "Oils", market: "Serrekunda Market", vendor: "Bakary Oils Ltd", price: "D 95", change: "+0.5%" },
];

export default function Product() {
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
					<article key={item.name} className="product-card">
						<span className={`tiny-change ${item.change.startsWith("-") ? "down" : "up"}`}>
							{item.change}
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
							<h4>{item.price}</h4>
							<p>{item.market}</p>
							<div className="time-row">
								<span>{item.vendor}</span>
								<span>{item.name === "Local Rice" ? "2 mins ago" : item.name === "Fresh Fish" ? "5 mins ago" : item.name === "Palm Oil" ? "3 mins ago" : item.name === "Tomatoes" ? "7 mins ago" : item.name === "Onions" ? "4 mins ago" : "6 mins ago"}</span>
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
