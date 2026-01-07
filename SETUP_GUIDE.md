# PocketFinds - Complete Setup Guide

## ✅ What Was Done

### Frontend Changes (NO BACKEND CHANGES MADE!)

1. **Installed Dependencies**
   - axios (API calls)
   - recharts (charts/graphs)
   - lucide-react (icons)
   - clsx & tailwind-merge (utility)
   - tailwindcss, postcss, autoprefixer (styling)

2. **Created Configuration Files**
   - `tailwind.config.js` - Tailwind CSS configuration
   - `postcss.config.js` - PostCSS configuration
   - `.env.example` - Environment variables template

3. **Created Authentication System**
   - `src/lib/auth-context.js` - Authentication context with login/signup/logout
   - `src/pages/Login.jsx` - Login page
   - `src/pages/Signup.jsx` - Signup page
   - Protected routes with automatic redirection

4. **Created UI Components**
   - `src/components/ui/button.jsx`
   - `src/components/ui/input.jsx`
   - `src/components/ui/card.jsx`
   - `src/components/ui/avatar.jsx`
   - `src/components/ui/scroll-area.jsx`
   - `src/lib/utils.js` - cn() utility function

5. **Created API Integration**
   - `src/api/api.js` - Complete API service for all backend endpoints

6. **Fixed Existing Pages**
   - **App.jsx**: Fixed infinite loop, added authentication routing
   - **Dashboard.jsx**: Enhanced with quick stats and actions
   - **Menu.jsx**: Full CRUD operations for menu items
   - **Analytics.jsx**: Fixed undefined data, added complete charts
   - **Loading.jsx**: Updated styling

## 🚀 How to Run

### Backend (Already Running)
Your backend is ready at `http://localhost:4000` (or your configured port)

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd "d:\University\Semester 7\CSE470 Software Engineering\CSE470 Project\PrivRepo\backup-PocketFinds\frontend"
   ```

2. **Create .env file:**
   ```bash
   cp .env.example .env
   ```
   
   Or manually create `.env` with:
   ```
   REACT_APP_API_URL=http://localhost:4000
   ```

3. **Start the frontend:**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

## 📱 Features

### Available Routes
- `/login` - Login page
- `/signup` - Registration page (customer or stall owner)
- `/dashboard` - Main dashboard (protected)
- `/dashboard/analytics` - Analytics with charts (protected)
- `/dashboard/menu` - Menu management (protected)

### User Roles
1. **Customer** - Can browse stalls and items
2. **Stall Owner** - Can manage stall, menu, view analytics
3. **Admin** - Can manage all users and stalls

## 🔗 Backend Integration

The frontend connects to these backend endpoints:

### User Endpoints
- `POST /api/user/login` - Login
- `POST /api/user/signup` - Register
- `GET /api/user/profile` - Get profile

### Stall Endpoints
- `POST /api/stall/create` - Create stall
- `DELETE /api/stall/:stallId` - Delete stall

### Menu Endpoints
- `GET /api/menu/:stall_id` - Get menu items
- `POST /api/menu` - Create item
- `PUT /api/menu/:id` - Update item
- `DELETE /api/menu/:id` - Delete item

### Other Endpoints
- `GET /api/notifications` - Get notifications
- `GET /api/bookmarks` - Get bookmarks
- Dashboard endpoints for different roles

## 🎨 Design

- **Styling**: Tailwind CSS with custom color scheme
- **Icons**: Lucide React
- **Charts**: Recharts library
- **Responsive**: Mobile-first design

## 🔐 Authentication Flow

1. User visits `/dashboard` → redirected to `/login`
2. User logs in → token stored in localStorage
3. Token added to all API requests via axios interceptor
4. User can access protected routes
5. Logout clears token and redirects to login

## 📝 Menu Management Example

1. Go to `/dashboard/menu`
2. Click "Add Item" button
3. Fill in:
   - Item Name (e.g., "Chicken Burger")
   - Category (e.g., "Burgers")
   - Price (e.g., 250)
   - Stock Count (e.g., 50)
   - Stall ID (your stall's MongoDB ObjectId)
4. Click "Add Item"
5. Item appears in the grid
6. Edit or delete items using the icons

## ⚠️ Important Notes

1. **Stall ID Required**: To use menu management, you need a stall ID from your database
2. **Backend Must Be Running**: Start backend server before frontend
3. **CORS**: Make sure backend allows requests from `http://localhost:3000`
4. **Password Requirements**: Strong password needed (uppercase, lowercase, number, special char)

## 🐛 Troubleshooting

### "Network Error" on login/signup
- Check if backend is running
- Verify `REACT_APP_API_URL` in `.env`
- Check browser console for CORS errors

### Can't see menu items
- Need to create a stall first
- Use correct stall ID when adding items

### Token expired
- Logout and login again
- Tokens are valid for 1 day

## 📦 Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── api.js              # API service layer
│   ├── components/
│   │   ├── dashboard/
│   │   │   └── sidebar.jsx     # Sidebar component
│   │   └── ui/                 # Reusable UI components
│   ├── lib/
│   │   ├── auth-context.js     # Authentication context
│   │   └── utils.js            # Utility functions
│   ├── pages/
│   │   ├── dashboard.jsx       # Main dashboard
│   │   ├── dashboardAnalytics.jsx  # Analytics page
│   │   ├── menu.jsx            # Menu management
│   │   ├── Login.jsx           # Login page
│   │   ├── Signup.jsx          # Signup page
│   │   └── loading.jsx         # Loading state
│   ├── App.jsx                 # Main app with routing
│   ├── index.css               # Global styles
│   └── index.js                # Entry point
├── .env.example                # Environment template
├── tailwind.config.js          # Tailwind config
└── package.json                # Dependencies
```

## 🎯 Next Steps

1. Create your stall using `/api/stall/create` endpoint
2. Add menu items using the dashboard
3. Customize colors in `tailwind.config.js`
4. Add more features as needed

---

**Remember**: No backend files were modified! All changes are in the frontend only.
