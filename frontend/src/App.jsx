import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./lib/auth-context"
import Home from "./pages/Home"
import Discover from "./pages/Discover"
import Dashboard from "./pages/dashboard"
import Analytics from "./pages/dashboardAnalytics"
import Menu from "./pages/menu"
import Map from "./pages/Map"
import Bookmarks from "./pages/Bookmarks"
import TopRated from "./pages/TopRated"
import MyReviews from "./pages/MyReviews"
import Profile from "./pages/Profile"
import BrowseStalls from "./pages/BrowseStalls"
import StallView from "./pages/StallView"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Loading from "./pages/loading"

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <Loading />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) {
    return <Loading />
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/menu"
        element={
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/menu/:stallId"
        element={
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookmarks"
        element={
          <ProtectedRoute>
            <Bookmarks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/top-rated"
        element={
          <ProtectedRoute>
            <TopRated />
          </ProtectedRoute>
        }
      />
      <Route path="/map" element={<Map />} />
      <Route
        path="/browse"
        element={
          <ProtectedRoute>
            <BrowseStalls />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-reviews"
        element={
          <ProtectedRoute>
            <MyReviews />
          </ProtectedRoute>
        }
      />
      <Route
        path="/stall/:stallId"
        element={<StallView />}
      />
      <Route path="/discover" element={<Discover />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
