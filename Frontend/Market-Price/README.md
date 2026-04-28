# Market Price Tracker Frontend

Modern React frontend for a live market price platform focused on The Gambia markets.

This repository contains the frontend architecture, UI system, and interactive dashboard experience for the project. It is built for performance, fast iteration, and clean portfolio presentation.

## Portfolio Context

This project is part of a joint collaboration:

- Frontend: Sankung Jabbie
- Backend: Collaborator

The UI in this repository covers authentication flows and a full analytics dashboard with dedicated pages for Markets, Products, Trends, and Reports.

## Highlights

- React + Vite application architecture
- Responsive dashboard layout with shared navigation shell
- Multi-page experience using React Router
- Mock authentication flow for UI demonstration
- Data-rich cards, tables, forms, and analytics sections
- Clean component-driven structure for future backend integration

## Tech Stack

- React 19
- Vite 7
- React Router DOM
- Lucide React icons
- Tailwind CSS (configured)
- ESLint

## Project Structure

Frontend/Market-Price/
- src/
	- components/
		- auth/
			- Login.jsx
			- Register.jsx
	- pages/
		- HomePage.jsx
		- Product.jsx
		- Trend.jsx
		- AboutUs.jsx
	- App.jsx
	- App.css
	- main.jsx
- public/
- package.json

## Getting Started

### 1) Install dependencies

npm install

### 2) Run development server

npm run dev

### 3) Build for production

npm run build

### 4) Preview production build

npm run preview

## Demo Login Credentials

Use these credentials to access the dashboard without backend setup:

- Email: vendor@markettracker.gm
- Password: Demo@12345

## Notes For Recruiters / Reviewers

- This repository is frontend-focused and intentionally includes a mock-auth path so the UI can be reviewed independently.
- Backend API integration points are structured for straightforward replacement of mock flows.

## Roadmap

- Connect authentication to production backend endpoints
- Replace static dashboard datasets with live API-driven data
- Add role-based page permissions and protected routes
- Improve charting with live time-series visualization

## Author

Sankung Jabbie

Frontend Developer focused on React interfaces, dashboard UX, and product-quality implementation.
