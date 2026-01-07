# PocketFinds Frontend

React frontend for the PocketFinds application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the frontend directory:
```bash
cp .env.example .env
```

3. Update the `.env` file with your backend URL (default is `http://localhost:4000`)

4. Start the development server:
```bash
npm start
```

## Environment Variables

- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:4000)

## Available Routes

- `/login` - User login page
- `/signup` - User registration page
- `/dashboard` - Main dashboard (stall owner)
- `/dashboard/analytics` - Analytics and stats
- `/dashboard/menu` - Menu management

## Features

- User authentication (login/signup)
- Role-based access (customer, stall owner, admin)
- Menu item management (CRUD operations)
- Analytics dashboard with charts
- Responsive design with Tailwind CSS

## Backend API Integration

The frontend connects to the following backend endpoints:

- `POST /api/user/login` - User login
- `POST /api/user/signup` - User registration
- `GET /api/user/profile` - Get user profile
- `GET /api/menu/:stall_id` - Get menu items
- `POST /api/menu` - Create menu item
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item

Make sure the backend server is running before starting the frontend.
