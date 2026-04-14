import { Landmark, UserRound, Clock3, Search, Sprout, Fish, Droplets, Leaf } from "lucide-react";

const markets = [
	{ name: "Banjul Central Market", updated: "2 mins ago" },
	{ name: "Serrekunda Market", updated: "5 mins ago" },
	{ name: "Brikama Market", updated: "8 mins ago" },
	{ name: "Bakau Fish Market", updated: "12 mins ago" },
];

const categories = [
	{ icon: Sprout, title: "Grains", count: "12 products" },
	{ icon: Fish, title: "Seafood", count: "8 products" },
	{ icon: Droplets, title: "Oils", count: "6 products" },
	{ icon: Leaf, title: "Vegetables", count: "15 products" },
];

const currentPrices = [
	{
		name: "Local Rice",
		category: "Grains",
		price: "D 45.5",
		delta: "+2.3%",
		deltaClass: "up",
		market: "Banjul Central Market",
		trader: "Fatou Trading",
		updated: "Updated 2 mins ago",
	},
	{
		name: "Fresh Fish",
		category: "Seafood",
		price: "D 125",
		delta: "-5.2%",
		deltaClass: "down",
		market: "Bakau Fish Market",
		trader: "Omar Fisheries",
		updated: "Updated 5 mins ago",
	},
	{
		name: "Palm Oil",
		category: "Oils",
		price: "D 85.75",
		delta: "+1.8%",
		deltaClass: "up",
		market: "Serrekunda Market",
		trader: "Aminata Oils",
		updated: "Updated 3 mins ago",
	},
	{
		name: "Tomatoes",
		category: "Vegetables",
		price: "D 35.25",
		delta: "-3.1%",
		deltaClass: "down",
		market: "Brikama Market",
		trader: "Lamin Vegetables",
		updated: "Updated 7 mins ago",
	},
	{
		name: "Onions",
		category: "Vegetables",
		price: "D 28.5",
		delta: "+4.2%",
		deltaClass: "up",
		market: "Banjul Central Market",
		trader: "Isatou Trading",
		updated: "Updated 4 mins ago",
	},
	{
		name: "Groundnut Oil",
		category: "Oils",
		price: "D 95",
		delta: "+0.5%",
		deltaClass: "up",
		market: "Serrekunda Market",
		trader: "Bakary Oils Ltd",
		updated: "Updated 6 mins ago",
	},
];

export default function HomePage() {
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
						<article key={market.name} className="market-status-card">
							<div className="market-row">
								<strong>{market.name}</strong>
								<span className="market-active-dot">Active</span>
							</div>
							<p>Last update: {market.updated}</p>
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
				{currentPrices.map((item) => (
					<article key={item.name} className="price-info-card">
						<div className="price-card-top">
							<h3>{item.name}</h3>
							<span className="soft-tag">{item.category}</span>
						</div>
						<div className="price-number">
							{item.price}
							<span className={`delta ${item.deltaClass}`}>{item.delta}</span>
						</div>
						<div className="meta-row"><Landmark size={14} /> {item.market}</div>
						<div className="meta-row"><UserRound size={14} /> {item.trader}</div>
						<div className="meta-row"><Clock3 size={14} /> {item.updated}</div>
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
