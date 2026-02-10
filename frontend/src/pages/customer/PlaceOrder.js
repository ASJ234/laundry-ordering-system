import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import Navbar from '../../components/Navbar';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const { user } = useAuth();
  const { createOrder, pricing } = useOrders();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    serviceType: 'normal-wash',
    quantity: 1,
    notes: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateTotal = () => {
    const pricePerItem = pricing[formData.serviceType] || 5;
    return pricePerItem * formData.quantity;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setLoading(true);
    
    const orderData = {
      ...formData,
      userId: user.id,
      userName: user.name,
      userEmail: user.email
    };

    const result = await createOrder(orderData);
    setLoading(false);
    
    if (result.success) {
      setSuccess('Order placed successfully!');
      setTimeout(() => {
        navigate(`/order-status/${result.order.id}`);
      }, 1500);
    } else {
      setError(result.message || 'Failed to place order');
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="place-order-container">
          <h1>Place Your Order</h1>
          
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-error">{error}</div>}
          
          <div className="order-form-wrapper">
            <form onSubmit={handleSubmit} className="order-form">
              <div className="form-group">
                <label>Service Type</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                >
                  <option value="normal-wash">Normal Wash - $5/item</option>
                  <option value="heavy-wash">Heavy Wash - $8/item</option>
                  <option value="delicate-wash">Delicate Wash - $7/item</option>
                  <option value="express-wash">Express Wash - $10/item</option>
                </select>
              </div>

              <div className="form-group">
                <label>Number of Items</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  max="50"
                  required
                />
              </div>

              <div className="form-group">
                <label>Additional Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Any special instructions..."
                />
              </div>

              <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Service:</span>
                  <span>{formData.serviceType.replace('-', ' ').toUpperCase()}</span>
                </div>
                <div className="summary-row">
                  <span>Quantity:</span>
                  <span>{formData.quantity} items</span>
                </div>
                <div className="summary-row">
                  <span>Price per item:</span>
                  <span>${pricing[formData.serviceType]}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? 'Placing order...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
