import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../api';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [unread, setUnread] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    let intervalId;
    let mounted = true;

    const fetchUnread = async () => {
      if (!isAuthenticated || !isAdmin) return;
      try {
        const { data } = await adminAPI.getUnreadNotificationCount();
        if (mounted) setUnread(data.unread || 0);
      } catch {
        // ignore; don't spam UI
      }
    };

    if (isAuthenticated && isAdmin) {
      fetchUnread();
      intervalId = setInterval(fetchUnread, 15000);
    } else {
      setUnread(0);
    }

    return () => {
      mounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAuthenticated, isAdmin]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🧺 Laundry Service
        </Link>
        
        <div className="navbar-menu">
          {!isAuthenticated ? (
            <>
              <Link to="/" className="navbar-link">Home</Link>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-link">Register</Link>
            </>
          ) : isAdmin ? (
            <>
              <Link to="/admin/dashboard" className="navbar-link">Dashboard</Link>
              <Link to="/admin/orders" className="navbar-link">Orders</Link>
              <Link to="/admin/notifications" className="navbar-link navbar-notifications" aria-label="Notifications">
                🔔
                {unread > 0 && <span className="notification-badge">{unread > 99 ? '99+' : unread}</span>}
              </Link>
              <span className="navbar-user">Admin: {user?.name}</span>
              <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/place-order" className="navbar-link">Place Order</Link>
              <Link to="/order-history" className="navbar-link">My Orders</Link>
              <span className="navbar-user">👤 {user?.name}</span>
              <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
