import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import Navbar from '../../components/Navbar';
import './OrderStatus.css';

const OrderStatus = () => {
  const { orderId } = useParams();
  const { fetchOrderById, loading } = useOrders();
  const [order, setOrder] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      const result = await fetchOrderById(orderId);
      if (result.success) {
        setOrder(result.order);
      } else {
        setFetchError(result.message);
      }
    };
    loadOrder();
  }, [orderId, fetchOrderById]);

  if (loading && !order) {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <div className="empty-state">
            <p>Loading order...</p>
          </div>
        </div>
      </div>
    );
  }

  if (fetchError || (!order && !loading)) {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <div className="error-state">
            <h2>Order Not Found</h2>
            <p>The order you're looking for doesn't exist or you don't have access to it.</p>
            <Link to="/order-history" className="btn btn-primary">Back to Orders</Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusStep = (status) => {
    switch (status) {
      case 'Pending': return 1;
      case 'Washing': return 2;
      case 'Completed': return 3;
      default: return 0;
    }
  };

  const currentStep = getStatusStep(order.status);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="order-status-container">
          <h1>Order Status</h1>
          
          <div className="status-card">
            <div className="order-info">
              <h2>Order #{order.id}</h2>
              <p className="order-date">Placed on {formatDate(order.createdAt)}</p>
            </div>

            <div className="progress-tracker">
              <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
                <div className="step-circle">1</div>
                <div className="step-label">Pending</div>
              </div>
              <div className={`progress-line ${currentStep >= 2 ? 'active' : ''}`}></div>
              <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
                <div className="step-circle">2</div>
                <div className="step-label">Washing</div>
              </div>
              <div className={`progress-line ${currentStep >= 3 ? 'active' : ''}`}></div>
              <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
                <div className="step-circle">3</div>
                <div className="step-label">Completed</div>
              </div>
            </div>

            <div className="order-details-section">
              <h3>Order Details</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Service Type:</span>
                  <span className="detail-value">{order.serviceType.replace('-', ' ').toUpperCase()}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Quantity:</span>
                  <span className="detail-value">{order.quantity} items</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Price per Item:</span>
                  <span className="detail-value">${order.pricePerItem}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Total Amount:</span>
                  <span className="detail-value total-price">${order.totalPrice}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Current Status:</span>
                  <span className={`detail-value status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Last Updated:</span>
                  <span className="detail-value">{formatDate(order.updatedAt)}</span>
                </div>
              </div>
              {order.notes && (
                <div className="notes-section">
                  <span className="detail-label">Notes:</span>
                  <p>{order.notes}</p>
                </div>
              )}
            </div>

            <div className="action-buttons">
              <Link to="/order-history" className="btn btn-secondary">Back to Orders</Link>
              <Link to="/place-order" className="btn btn-primary">Place New Order</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
