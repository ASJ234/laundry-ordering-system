import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Customer Pages
import Home from './pages/customer/Home';
import Login from './pages/customer/Login';
import Register from './pages/customer/Register';
import PlaceOrder from './pages/customer/PlaceOrder';
import OrderHistory from './pages/customer/OrderHistory';
import OrderStatus from './pages/customer/OrderStatus';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import OrdersManagement from './pages/admin/OrdersManagement';
import Notifications from './pages/admin/Notifications';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Customer Routes */}
            <Route path="/place-order" element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
            <Route path="/order-history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
            <Route path="/order-status/:orderId" element={<ProtectedRoute><OrderStatus /></ProtectedRoute>} />
            
            {/* Admin Routes */}
            {/* Use the same login page for both admins and customers */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/orders" element={<AdminRoute><OrdersManagement /></AdminRoute>} />
            <Route path="/admin/notifications" element={<AdminRoute><Notifications /></AdminRoute>} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;
