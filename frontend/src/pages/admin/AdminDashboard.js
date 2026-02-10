import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import Navbar from '../../components/Navbar';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { orders, stats, loading, error, fetchAllOrders, fetchStats } = useOrders();

  useEffect(() => {
    fetchAllOrders();
    fetchStats();
  }, [fetchAllOrders, fetchStats]);

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="admin-dashboard">
          <h1>Admin Dashboard</h1>
          
          {error && <div className="alert alert-error">{error}</div>}
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h3>{loading ? '...' : stats.total}</h3>
                <p>Total Orders</p>
              </div>
            </div>
            <div className="stat-card pending">
              <div className="stat-icon">⏳</div>
              <div className="stat-content">
                <h3>{loading ? '...' : stats.pending}</h3>
                <p>Pending Orders</p>
              </div>
            </div>
            <div className="stat-card washing">
              <div className="stat-icon">🧼</div>
              <div className="stat-content">
                <h3>{loading ? '...' : stats.washing}</h3>
                <p>In Progress</p>
              </div>
            </div>
            <div className="stat-card completed">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>{loading ? '...' : stats.completed}</h3>
                <p>Completed</p>
              </div>
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Orders</h2>
              <Link to="/admin/orders" className="btn btn-primary">View All Orders</Link>
            </div>
            
            {loading ? (
              <div className="empty-state">
                <p>Loading orders...</p>
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="empty-state">
                <p>No orders yet</p>
              </div>
            ) : (
              <div className="orders-table-wrapper">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Service</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.userName}</td>
                        <td>{order.serviceType.replace('-', ' ')}</td>
                        <td>{order.quantity}</td>
                        <td>${order.totalPrice}</td>
                        <td>
                          <span className={`status-badge status-${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>{formatDate(order.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
