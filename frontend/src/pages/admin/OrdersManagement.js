import React, { useEffect, useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import Navbar from '../../components/Navbar';
import './OrdersManagement.css';

const OrdersManagement = () => {
  const { orders, loading, error, fetchAllOrders, updateOrderStatus } = useOrders();
  const [filter, setFilter] = useState('all');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);
  
  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const sortedOrders = [...filteredOrders].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdating(true);
    await updateOrderStatus(orderId, newStatus);
    setUpdating(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Washing': return 'status-washing';
      case 'Completed': return 'status-completed';
      default: return '';
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="orders-management">
          <h1>Orders Management</h1>
          
          {error && <div className="alert alert-error">{error}</div>}
          
          <div className="filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({orders.length})
            </button>
            <button 
              className={`filter-btn ${filter === 'Pending' ? 'active' : ''}`}
              onClick={() => setFilter('Pending')}
            >
              Pending ({orders.filter(o => o.status === 'Pending').length})
            </button>
            <button 
              className={`filter-btn ${filter === 'Washing' ? 'active' : ''}`}
              onClick={() => setFilter('Washing')}
            >
              Washing ({orders.filter(o => o.status === 'Washing').length})
            </button>
            <button 
              className={`filter-btn ${filter === 'Completed' ? 'active' : ''}`}
              onClick={() => setFilter('Completed')}
            >
              Completed ({orders.filter(o => o.status === 'Completed').length})
            </button>
          </div>

          {loading ? (
            <div className="empty-state">
              <p>Loading orders...</p>
            </div>
          ) : sortedOrders.length === 0 ? (
            <div className="empty-state">
              <p>No orders found</p>
            </div>
          ) : (
            <div className="orders-grid">
              {sortedOrders.map(order => (
                <div key={order.id} className="order-management-card">
                  <div className="order-card-header">
                    <h3>Order #{order.id}</h3>
                    <span className={`status-badge ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="order-card-body">
                    <div className="info-row">
                      <span className="label">Customer:</span>
                      <span>{order.userName}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Email:</span>
                      <span>{order.userEmail}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Service:</span>
                      <span>{order.serviceType.replace('-', ' ').toUpperCase()}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Quantity:</span>
                      <span>{order.quantity} items</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Total:</span>
                      <span className="price">${order.totalPrice}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Ordered:</span>
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                    {order.notes && (
                      <div className="notes">
                        <span className="label">Notes:</span>
                        <p>{order.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="order-card-actions">
                    {order.status === 'Pending' && (
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleStatusChange(order.id, 'Washing')}
                        disabled={updating}
                      >
                        {updating ? 'Updating...' : 'Start Washing'}
                      </button>
                    )}
                    {order.status === 'Washing' && (
                      <button 
                        className="btn btn-success"
                        onClick={() => handleStatusChange(order.id, 'Completed')}
                        disabled={updating}
                      >
                        {updating ? 'Updating...' : 'Mark Complete'}
                      </button>
                    )}
                    {order.status === 'Completed' && (
                      <span className="completed-text">✓ Order Completed</span>
                    )}
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

export default OrdersManagement;
