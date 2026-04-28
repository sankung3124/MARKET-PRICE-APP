# Market Price Tracker

A comprehensive market data platform for The Gambia, providing real-time price monitoring, customizable alerts, and interactive analytics dashboard for vendors and administrators.

## Features

- **Real-time Price Monitoring**: Track market prices across different categories
- **User Authentication**: Secure login for vendors and admins
- **Product Management**: Add, update, and monitor product prices
- **Market Analytics**: View price trends and statistics
- **Responsive Dashboard**: Modern UI built with React and Tailwind CSS

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, JWT Authentication
- **Frontend**: React, Vite, Tailwind CSS
- **Database**: MongoDB with Mongoose ODM

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sankung3124/MARKET-PRICE-APP.git
   cd MARKET-PRICE-APP
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```
   Create a `.env` file in the Backend directory:
   ```
   PORT=3000
   JWT_SECRET=your_jwt_secret_here
   MONGODB_URI=mongodb://localhost:27017/market-price-app
   ```

3. **Frontend Setup**
   ```bash
   cd ../Frontend/Market-Price
   npm install
   ```

## Running the Application

1. **Start the Backend**
   ```bash
   cd Backend
   npm start
   ```
   Server will run on http://localhost:3000

2. **Start the Frontend**
   ```bash
   cd ../Frontend/Market-Price
   npm run dev
   ```
   Application will be available at http://localhost:5173

## API Endpoints

- `POST /api/auth/login` - User authentication
- `GET /api/products` - Get all products
- `POST /api/products` - Add new product (vendor/admin)
- `GET /api/markets` - Get all markets

## Usage

1. Register as a vendor or admin
2. Login to access the dashboard
3. Add products with current market prices
4. Monitor price trends and analytics
5. Receive alerts on price changes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built for The Gambia's market ecosystem
