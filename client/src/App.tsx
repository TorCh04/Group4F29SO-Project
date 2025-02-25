import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Nopage from './pages/Nopage';
import './App.css';

// Function to update the <body> class based on the current route
function BodyClassUpdater() {
    const location = useLocation();

    useEffect(() => {
        // Define class names based on the route
        const pageClasses = {
            "/": "hero-background",
            "/login": "login-background",
            "/register": "login-background", // Shares the same background as login
            "/test": "test-background",
            "/DevicesPage": "DevicePages-background",
        };

        // Set <root> class or default to "default-background"
        document.getElementById("root")!.className = pageClasses[location.pathname as keyof typeof pageClasses] || "default-background";
    }, [location]);

    return null;
}


export default function App() {
    return (
      <BrowserRouter>
        {/* This component updates <body> based on the route */}
        <BodyClassUpdater />
        <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/DevicesPage" element={<DevicesPage />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          {/* Nest dashboard pages under DashboardLayout */}
          <Route element={<Dashboard />}>
            <Route path="devices" element={<SmartDevices />} />
            <Route path="energy" element={<EnergyTracker />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
            
            <Route path="*" element={<Nopage />} />
        </Routes>
      </BrowserRouter>
    );
  }