import React, { createContext, useState, useContext, useCallback } from 'react';
import { ordersAPI, adminAPI } from '../api';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within OrderProvider');
  }
  return context;
};

const PRICING = {
  'normal-wash': 5,
  'heavy-wash': 8,
  'delicate-wash': 7,
  'express-wash': 10
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, washing: 0, completed: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Customer: fetch my orders
  const fetchMyOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await ordersAPI.getMyOrders();
      setOrders(data.orders || []);
    } catch (err) {
      const msg = err.code === 'ECONNABORTED' ? 'Request timed out. Is the backend running?' : (err.response?.data?.message || 'Failed to load orders');
      setError(msg);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Admin: fetch all orders
  const fetchAllOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await adminAPI.getAllOrders();
      setOrders(data.orders || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Admin: fetch stats
  const fetchStats = useCallback(async () => {
    try {
      const { data } = await adminAPI.getStats();
      setStats(data.stats || { total: 0, pending: 0, washing: 0, completed: 0 });
    } catch (err) {
      setStats({ total: 0, pending: 0, washing: 0, completed: 0 });
    }
  }, []);

  const createOrder = async (orderData) => {
    setError(null);
    try {
      const { data } = await ordersAPI.create({
        serviceType: orderData.serviceType,
        quantity: parseInt(orderData.quantity, 10),
        notes: orderData.notes || ''
      });
      return { success: true, order: data.order };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to place order';
      return { success: false, message };
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    setError(null);
    try {
      const { data } = await adminAPI.updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === parseInt(orderId) ? data.order : o));
      await fetchStats();
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update status';
      return { success: false, message };
    }
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === parseInt(orderId));
  };

  // Fetch single order (for direct navigation to order status)
  const fetchOrderById = useCallback(async (orderId) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await ordersAPI.getOrderById(orderId);
      return { success: true, order: data.order };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Order not found' };
    } finally {
      setLoading(false);
    }
  }, []);

  const getOrdersByUser = (userId) => {
    return orders.filter(order => order.userId === userId);
  };

  const getAllOrders = () => orders;

  const getOrderStats = () => stats;

  const value = {
    orders,
    stats,
    loading,
    error,
    fetchMyOrders,
    fetchAllOrders,
    fetchStats,
    fetchOrderById,
    createOrder,
    updateOrderStatus,
    getOrderById,
    getOrdersByUser,
    getAllOrders,
    getOrderStats,
    pricing: PRICING
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
