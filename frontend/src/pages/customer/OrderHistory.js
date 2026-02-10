import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import Navbar from '../../components/Navbar';
import './OrderHistory.css';

const OrderHistory = () => {
  const { orders, loading, error, fetchMyOrders } = useOrders();

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  // API already returns only current user's orders (filtered by JWT)
  const userOrders = orders;

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Washing': return 'status-washing';
      case 'Completed': return 'status-completed';
      default: return '';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="order-history-container">
          <h1>My Orders</h1>
          
          {error && <div className="alert alert-error">{error}</div>}
          {loading ? (
            <div className="empty-state">
              <p>Loading orders...</p>
            </div>
          ) : userOrders.length === 0 ? (
            <div className="empty-state">
              <p>You haven't placed any orders yet.</p>
              <Link to="/place-order" className="btn btn-primary">Place Your First Order</Link>
            </div>
          ) : (
            <div className="orders-list">
              {userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>Order #{order.id}</h3>
                    <span className={`status-badge ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <div className="detail-row">
                      <span className="label">Service:</span>
                      <span>{order.serviceType.replace('-', ' ').toUpperCase()}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Quantity:</span>
                      <span>{order.quantity} items</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Total:</span>
                      <span className="price">${order.totalPrice}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Ordered:</span>
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                    {order.notes && (
                      <div className="detail-row">
                        <span className="label">Notes:</span>
                        <span>{order.notes}</span>
                      </div>
                    )}
                  </div>
                  <div className="order-actions">
                    <Link to={`/order-status/${order.id}`} className="btn btn-primary">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
